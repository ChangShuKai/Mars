import { NextResponse } from "next/server";
import { fetchRoverTelemetry } from "@/lib/nasa";
import { RoverWaypointCollection } from "@/types/nasa";

export const runtime = "nodejs";

const FALLBACK_M20 = {
  rover: "perseverance",
  name: "毅力號",
  nameEn: "Perseverance",
  site: 91,
  drive: 806,
  sol: 1965,
  coordinates: {
    lat: 18.4371465,
    lon: 77.23186719,
    elevation: -1927.69,
  },
  distance: {
    total_meters: 45105.7,
    total_km: 45.11,
  },
  attitude: {
    roll: -11.08,
    pitch: -5.06,
    yaw: -102.82,
    tilt: 12.17,
  },
  locationName: "耶澤羅隕石坑三角洲 · Jezero Crater Delta",
  note: "最新回傳動態航點",
};

const FALLBACK_MSL = {
  rover: "curiosity",
  name: "好奇號",
  nameEn: "Curiosity",
  site: 124,
  drive: 2062,
  sol: 5004,
  coordinates: {
    lat: -4.8238128,
    lon: 137.3866207,
    elevation: -3496.88,
  },
  distance: {
    total_meters: 38185.8,
    total_km: 37.87,
  },
  attitude: {
    roll: 3.9,
    pitch: 6.05,
    yaw: -149.17,
    tilt: 7.2,
  },
  locationName: "蓋爾隕石坑夏普山麓 · Mt. Sharp Slopes",
  note: "最新回傳動態航點",
};

function parseTelemetry(data: RoverWaypointCollection, rover: "M20" | "MSL") {
  if (!data?.features || !Array.isArray(data.features) || data.features.length === 0) {
    return rover === "M20" ? FALLBACK_M20 : FALLBACK_MSL;
  }

  const lastFeature = data.features[data.features.length - 1];
  const props = lastFeature.properties || {};
  const coords = lastFeature.geometry?.coordinates || [0, 0, 0];

  const lon = coords[0] ?? (rover === "M20" ? FALLBACK_M20.coordinates.lon : FALLBACK_MSL.coordinates.lon);
  const lat = coords[1] ?? (rover === "M20" ? FALLBACK_M20.coordinates.lat : FALLBACK_MSL.coordinates.lat);
  const elev = coords[2] ?? props.elev_geoid ?? 0;

  const distM = props.dist_total_m ?? props.dist_m ?? 0;
  const distKm = props.dist_km ?? (distM > 0 ? parseFloat((distM / 1000).toFixed(2)) : 0);

  // Sample recent 30 waypoints for trail rendering
  const trailStep = Math.max(1, Math.floor(data.features.length / 50));
  const recentTrail = data.features
    .filter((_, i) => i % trailStep === 0 || i === data.features.length - 1)
    .slice(-40)
    .map((f) => ({
      lon: f.geometry.coordinates[0],
      lat: f.geometry.coordinates[1],
      sol: f.properties.sol,
    }));

  return {
    rover: rover === "M20" ? "perseverance" : "curiosity",
    name: rover === "M20" ? "毅力號" : "好奇號",
    nameEn: rover === "M20" ? "Perseverance" : "Curiosity",
    site: props.site ?? (rover === "M20" ? FALLBACK_M20.site : FALLBACK_MSL.site),
    drive: props.drive ?? (rover === "M20" ? FALLBACK_M20.drive : FALLBACK_MSL.drive),
    sol: props.sol ?? (rover === "M20" ? FALLBACK_M20.sol : FALLBACK_MSL.sol),
    coordinates: {
      lat: parseFloat(lat.toFixed(6)),
      lon: parseFloat(lon.toFixed(6)),
      elevation: parseFloat(elev.toFixed(2)),
    },
    distance: {
      total_meters: parseFloat(distM.toFixed(1)),
      total_km: distKm > 0 ? distKm : (rover === "M20" ? FALLBACK_M20.distance.total_km : FALLBACK_MSL.distance.total_km),
    },
    attitude: {
      roll: props.roll ? parseFloat(props.roll.toFixed(2)) : undefined,
      pitch: props.pitch ? parseFloat(props.pitch.toFixed(2)) : undefined,
      yaw: props.yaw ? parseFloat(props.yaw.toFixed(2)) : undefined,
      tilt: props.tilt ? parseFloat(props.tilt.toFixed(2)) : undefined,
    },
    locationName: rover === "M20" ? FALLBACK_M20.locationName : FALLBACK_MSL.locationName,
    waypointsCount: data.features.length,
    recentTrail,
    updatedAt: new Date().toISOString(),
  };
}

import { mars } from "@/lib/proto/mars";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reqRover = searchParams.get("rover")?.toUpperCase();
  const acceptsProtobuf = request.headers.get("accept")?.includes("application/x-protobuf");

  try {
    if (reqRover === "M20" || reqRover === "PERSEVERANCE") {
      const raw = await fetchRoverTelemetry("M20");
      const telemetry = parseTelemetry(raw, "M20");
      if (acceptsProtobuf) {
        const buffer = mars.RoverData.encode(mars.RoverData.create(telemetry as any)).finish();
        return new NextResponse(buffer as any, {
          headers: { "Content-Type": "application/x-protobuf", "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
        });
      }
      return NextResponse.json(telemetry, {
        headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
      });
    }

    if (reqRover === "MSL" || reqRover === "CURIOSITY") {
      const raw = await fetchRoverTelemetry("MSL");
      const telemetry = parseTelemetry(raw, "MSL");
      if (acceptsProtobuf) {
        const buffer = mars.RoverData.encode(mars.RoverData.create(telemetry as any)).finish();
        return new NextResponse(buffer as any, {
          headers: { "Content-Type": "application/x-protobuf", "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
        });
      }
      return NextResponse.json(telemetry, {
        headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
      });
    }

    // Default: fetch both in parallel
    const [m20Raw, mslRaw] = await Promise.allSettled([
      fetchRoverTelemetry("M20"),
      fetchRoverTelemetry("MSL"),
    ]);

    const m20Data = m20Raw.status === "fulfilled" ? parseTelemetry(m20Raw.value, "M20") : FALLBACK_M20;
    const mslData = mslRaw.status === "fulfilled" ? parseTelemetry(mslRaw.value, "MSL") : FALLBACK_MSL;
    
    const payload = {
      timestamp: new Date().toISOString(),
      rovers: {
        perseverance: m20Data,
        curiosity: mslData,
      },
      fallback: false
    };

    if (acceptsProtobuf) {
      const buffer = mars.RoverLocationResponse.encode(mars.RoverLocationResponse.create(payload as any)).finish();
      return new NextResponse(buffer as any, {
        headers: { "Content-Type": "application/x-protobuf", "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
      });
    }

    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
    });
  } catch (err) {
    console.warn("Rover location handler encountered error:", err);
    const payload = {
      timestamp: new Date().toISOString(),
      rovers: {
        perseverance: FALLBACK_M20,
        curiosity: FALLBACK_MSL,
      },
      fallback: true,
    };
    
    if (acceptsProtobuf) {
      const buffer = mars.RoverLocationResponse.encode(mars.RoverLocationResponse.create(payload as any)).finish();
      return new NextResponse(buffer as any, {
        headers: { "Content-Type": "application/x-protobuf" },
      });
    }

    return NextResponse.json(payload);
  }
}
