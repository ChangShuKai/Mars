import { NextResponse } from "next/server";
import { fetchPerseveranceWeather, fetchCuriosityWeather } from "@/lib/nasa";
import { mars } from "@/lib/proto/mars";

export const runtime = "nodejs";

// InSight Final Archive
const INSIGHT_ARCHIVE = {
  station: "insight",
  rover: "insight",
  name: "洞察號",
  nameEn: "InSight Lander",
  status: "ended",
  instrument: "TWINS (氣象感測套件)",
  location: "厄律西昂平原 · Elysium Planitia",
  note: "任務結束於 2022年12月21日 (Sol 1425)",
  latest: {
    sol: "1425",
    terrestrial_date: "2022-12-18",
    season: "夏末",
    northern_season: "mid summer",
    southern_season: "mid winter",
    ls: "290°",
    temperature: {
      average: -62.2,
      min: -91.7,
      max: -15.9,
      unit: "°C",
    },
    pressure: {
      average: 732.7,
      min: 720.8,
      max: 745.3,
      unit: "Pa",
    },
    wind: {
      average: 5.2,
      min: 0.1,
      max: 18.4,
      unit: "m/s",
      most_common_direction: "SSW",
      compass_degrees: 202.5,
    },
  },
};

// Fallback Perseverance Data if upstream is offline
const FALLBACK_PERSEVERANCE = {
  station: "perseverance",
  rover: "perseverance",
  name: "毅力號",
  nameEn: "Perseverance",
  status: "active",
  instrument: "MEDA (火星環境動力學分析儀)",
  location: "耶澤羅隕石坑 · Jezero Crater",
  latest: {
    sol: "1133",
    terrestrial_date: "2024-04-27",
    season: "秋末 · late autumn",
    ls: "244.1°",
    temperature: {
      average: -52.0,
      min: -79.3,
      max: -24.7,
      unit: "°C",
    },
    ground_temperature: {
      average: -48.5,
      min: -75.0,
      max: -18.2,
      unit: "°C",
    },
    pressure: {
      average: 778.9,
      unit: "Pa",
    },
    wind: {
      average: 4.5,
      unit: "m/s",
      most_common_direction: "NW",
      compass_degrees: 315,
    },
    sunrise: "06:18:07",
    sunset: "17:13:51",
  },
  history: [
    { sol: "1129", date: "2024-04-23", min_temp: -76.5, max_temp: -22.0, pressure: 774.0 },
    { sol: "1130", date: "2024-04-24", min_temp: -77.3, max_temp: -23.2, pressure: 777.1 },
    { sol: "1131", date: "2024-04-25", min_temp: -79.2, max_temp: -17.0, pressure: 774.9 },
    { sol: "1132", date: "2024-04-26", min_temp: -77.9, max_temp: -23.4, pressure: 774.1 },
    { sol: "1133", date: "2024-04-27", min_temp: -79.3, max_temp: -24.7, pressure: 778.9 },
  ],
};

// Fallback Curiosity Data if upstream is offline
const FALLBACK_CURIOSITY = {
  station: "curiosity",
  rover: "curiosity",
  name: "好奇號",
  nameEn: "Curiosity",
  status: "active",
  instrument: "REMS (漫遊者環境監測站)",
  location: "蓋爾隕石坑 · Gale Crater (夏普山)",
  latest: {
    sol: "4995",
    terrestrial_date: "2026-08-25",
    season: "第 12 個月 · Month 12",
    ls: "341°",
    temperature: {
      average: -38.0,
      min: -71.0,
      max: -5.0,
      unit: "°C",
    },
    ground_temperature: {
      average: -40.0,
      min: -84.0,
      max: 4.0,
      unit: "°C",
    },
    pressure: {
      average: 777.0,
      string: "Higher",
      unit: "Pa",
    },
    wind: {
      average: 5.0,
      unit: "m/s",
      most_common_direction: "SW",
      compass_degrees: 225,
    },
    uv_index: "Moderate",
    atmo_opacity: "Sunny",
    sunrise: "06:46",
    sunset: "18:51",
  },
  history: [
    { sol: "4991", date: "2026-08-21", min_temp: -72, max_temp: -7, min_gts: -83, max_gts: 3, pressure: 775 },
    { sol: "4992", date: "2026-08-22", min_temp: -71, max_temp: -6, min_gts: -83, max_gts: 4, pressure: 776 },
    { sol: "4993", date: "2026-08-23", min_temp: -71, max_temp: -6, min_gts: -84, max_gts: 3, pressure: 776 },
    { sol: "4994", date: "2026-08-24", min_temp: -70, max_temp: -7, min_gts: -82, max_gts: 4, pressure: 777 },
    { sol: "4995", date: "2026-08-25", min_temp: -71, max_temp: -5, min_gts: -84, max_gts: 4, pressure: 777 },
  ],
};

function numOrNull(v: unknown): number | null {
  if (typeof v === "number" && !isNaN(v)) return v;
  if (typeof v === "string" && v.trim() !== "" && v.trim() !== "--") {
    const parsed = parseFloat(v);
    return isNaN(parsed) ? null : parsed;
  }
  return null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const requestedStation = searchParams.get("station")?.toLowerCase();

  let perseveranceData = FALLBACK_PERSEVERANCE;
  let curiosityData = FALLBACK_CURIOSITY;

  // 1. Fetch Perseverance MEDA
  try {
    const rawMeda = await fetchPerseveranceWeather();
    if (rawMeda?.sols && Array.isArray(rawMeda.sols) && rawMeda.sols.length > 0) {
      // Filter out sols with all "--" to find latest valid sol
      const validSols = rawMeda.sols.filter(
        (s: Record<string, unknown>) =>
          numOrNull(s.min_temp) !== null || numOrNull(s.pressure) !== null
      );
      const latestRaw = validSols.length > 0 ? validSols[validSols.length - 1] : rawMeda.sols[rawMeda.sols.length - 1];

      const minT = numOrNull(latestRaw.min_temp) ?? FALLBACK_PERSEVERANCE.latest.temperature.min;
      const maxT = numOrNull(latestRaw.max_temp) ?? FALLBACK_PERSEVERANCE.latest.temperature.max;
      const press = numOrNull(latestRaw.pressure) ?? FALLBACK_PERSEVERANCE.latest.pressure.average;
      const minGts = numOrNull(latestRaw.min_gts_temp);
      const maxGts = numOrNull(latestRaw.max_gts_temp);

      const history = rawMeda.sols
        .filter((s: Record<string, unknown>) => numOrNull(s.min_temp) !== null || numOrNull(s.pressure) !== null)
        .slice(-7)
        .map((s: Record<string, unknown>) => ({
          sol: String(s.sol),
          date: String(s.terrestrial_date),
          min_temp: numOrNull(s.min_temp),
          max_temp: numOrNull(s.max_temp),
          pressure: numOrNull(s.pressure),
          min_gts: numOrNull(s.min_gts_temp),
          max_gts: numOrNull(s.max_gts_temp),
        }));

      perseveranceData = {
        station: "perseverance",
        rover: "perseverance",
        name: "毅力號",
        nameEn: "Perseverance",
        status: "active",
        instrument: "MEDA (火星環境動力學分析儀)",
        location: "耶澤羅隕石坑 · Jezero Crater",
        latest: {
          sol: String(latestRaw.sol || FALLBACK_PERSEVERANCE.latest.sol),
          terrestrial_date: String(latestRaw.terrestrial_date || FALLBACK_PERSEVERANCE.latest.terrestrial_date),
          season: String(latestRaw.season || FALLBACK_PERSEVERANCE.latest.season),
          ls: `${latestRaw.ls || "244"}°`,
          temperature: {
            average: parseFloat(((minT + maxT) / 2).toFixed(1)),
            min: minT,
            max: maxT,
            unit: "°C",
          },
          ...(minGts !== null && maxGts !== null
            ? {
                ground_temperature: {
                  average: parseFloat(((minGts + maxGts) / 2).toFixed(1)),
                  min: minGts,
                  max: maxGts,
                  unit: "°C",
                },
              }
            : {
                ground_temperature: FALLBACK_PERSEVERANCE.latest.ground_temperature,
              }),
          pressure: {
            average: press,
            unit: "Pa",
          },
          wind: FALLBACK_PERSEVERANCE.latest.wind,
          sunrise: String(latestRaw.sunrise || FALLBACK_PERSEVERANCE.latest.sunrise),
          sunset: String(latestRaw.sunset || FALLBACK_PERSEVERANCE.latest.sunset),
        },
        history: history.length > 0 ? history : FALLBACK_PERSEVERANCE.history,
      };
    }
  } catch (err) {
    console.warn("Perseverance live weather fetch failed, using fallback:", err);
  }

  // 2. Fetch Curiosity REMS
  try {
    const rawRems = await fetchCuriosityWeather();
    if (rawRems?.soles && Array.isArray(rawRems.soles) && rawRems.soles.length > 0) {
      // In MSL API, index 0 is the newest sol!
      const validSoles = rawRems.soles.filter(
        (s: Record<string, unknown>) =>
          numOrNull(s.min_temp) !== null || numOrNull(s.pressure) !== null
      );
      const latestRaw = validSoles.length > 0 ? validSoles[0] : rawRems.soles[0];

      const minT = numOrNull(latestRaw.min_temp) ?? FALLBACK_CURIOSITY.latest.temperature.min;
      const maxT = numOrNull(latestRaw.max_temp) ?? FALLBACK_CURIOSITY.latest.temperature.max;
      const minGts = numOrNull(latestRaw.min_gts_temp) ?? FALLBACK_CURIOSITY.latest.ground_temperature.min;
      const maxGts = numOrNull(latestRaw.max_gts_temp) ?? FALLBACK_CURIOSITY.latest.ground_temperature.max;
      const press = numOrNull(latestRaw.pressure) ?? FALLBACK_CURIOSITY.latest.pressure.average;

      const history = rawRems.soles
        .slice(0, 7)
        .reverse()
        .map((s: Record<string, unknown>) => ({
          sol: String(s.sol),
          date: String(s.terrestrial_date),
          min_temp: numOrNull(s.min_temp),
          max_temp: numOrNull(s.max_temp),
          min_gts: numOrNull(s.min_gts_temp),
          max_gts: numOrNull(s.max_gts_temp),
          pressure: numOrNull(s.pressure),
          uv: String(s.local_uv_irradiance_index || ""),
        }));

      curiosityData = {
        station: "curiosity",
        rover: "curiosity",
        name: "好奇號",
        nameEn: "Curiosity",
        status: "active",
        instrument: "REMS (漫遊者環境監測站)",
        location: "蓋爾隕石坑 · Gale Crater (夏普山)",
        latest: {
          sol: String(latestRaw.sol || FALLBACK_CURIOSITY.latest.sol),
          terrestrial_date: String(latestRaw.terrestrial_date || FALLBACK_CURIOSITY.latest.terrestrial_date),
          season: String(latestRaw.season || FALLBACK_CURIOSITY.latest.season),
          ls: `${latestRaw.ls || "341"}°`,
          temperature: {
            average: parseFloat(((minT + maxT) / 2).toFixed(1)),
            min: minT,
            max: maxT,
            unit: "°C",
          },
          ground_temperature: {
            average: parseFloat(((minGts + maxGts) / 2).toFixed(1)),
            min: minGts,
            max: maxGts,
            unit: "°C",
          },
          pressure: {
            average: press,
            string: String(latestRaw.pressure_string || "Higher"),
            unit: "Pa",
          },
          wind: FALLBACK_CURIOSITY.latest.wind,
          uv_index: String(latestRaw.local_uv_irradiance_index || FALLBACK_CURIOSITY.latest.uv_index),
          atmo_opacity: String(latestRaw.atmo_opacity || FALLBACK_CURIOSITY.latest.atmo_opacity),
          sunrise: String(latestRaw.sunrise || FALLBACK_CURIOSITY.latest.sunrise),
          sunset: String(latestRaw.sunset || FALLBACK_CURIOSITY.latest.sunset),
        },
        history: history.length > 0 ? history : FALLBACK_CURIOSITY.history,
      };
    }
  } catch (err) {
    console.warn("Curiosity live weather fetch failed, using fallback:", err);
  }

  const allStations = {
    timestamp: new Date().toISOString(),
    stations: {
      perseverance: perseveranceData,
      curiosity: curiosityData,
      insight: INSIGHT_ARCHIVE,
    },
  };

  const acceptsProtobuf = request.headers.get("accept")?.includes("application/x-protobuf");

  if (requestedStation === "perseverance") {
    if (acceptsProtobuf) {
      const buffer = mars.StationData.encode(mars.StationData.create(perseveranceData as any)).finish();
      return new NextResponse(buffer as any, { headers: { "Content-Type": "application/x-protobuf", "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } });
    }
    return NextResponse.json(perseveranceData, {
      headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
    });
  }
  if (requestedStation === "curiosity") {
    if (acceptsProtobuf) {
      const buffer = mars.StationData.encode(mars.StationData.create(curiosityData as any)).finish();
      return new NextResponse(buffer as any, { headers: { "Content-Type": "application/x-protobuf", "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } });
    }
    return NextResponse.json(curiosityData, {
      headers: { "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" },
    });
  }
  if (requestedStation === "insight") {
    if (acceptsProtobuf) {
      const buffer = mars.StationData.encode(mars.StationData.create(INSIGHT_ARCHIVE as any)).finish();
      return new NextResponse(buffer as any, { headers: { "Content-Type": "application/x-protobuf", "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800" } });
    }
    return NextResponse.json(INSIGHT_ARCHIVE, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800" },
    });
  }

  if (acceptsProtobuf) {
    const buffer = mars.WeatherResponse.encode(mars.WeatherResponse.create(allStations as any)).finish();
    return new NextResponse(buffer as any, { headers: { "Content-Type": "application/x-protobuf", "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600" } });
  }

  return NextResponse.json(allStations, {
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
