import { NextResponse } from "next/server";

// Mars orbital parameters for distance calculation
// Using simplified elliptical orbit approximation
function getMarsDistanceKm(): number {
  const now = new Date();
  // J2000.0 epoch: January 1.5, 2000
  const J2000 = 2451545.0;
  const julianDate =
    2440587.5 + now.getTime() / 86400000;
  const T = (julianDate - J2000) / 36525;

  // Earth's mean longitude (degrees)
  const L0 = 280.46646 + 36000.76983 * T;
  // Earth's mean anomaly (degrees)
  const M0 = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  // Earth-Sun distance (AU)
  const M0rad = (M0 * Math.PI) / 180;
  const earthSunDist =
    1.000001018 *
    (1 - 0.01671022 * Math.cos(M0rad) - 0.00014 * Math.cos(2 * M0rad));

  // Mars's mean longitude (degrees)
  const ML = 355.433 + 19141.6964471 * T;
  // Mars's mean anomaly (degrees)
  const MM = 19.3730 + 0.52402068 * (julianDate - J2000);

  const MMrad = (MM * Math.PI) / 180;
  // Mars-Sun distance (AU)
  const marsSunDist =
    1.523679 * (1 - 0.093412 * Math.cos(MMrad) - 0.00443 * Math.cos(2 * MMrad));

  // Angle between Earth and Mars (simplified)
  const angle = ((ML - L0) * Math.PI) / 180;
  // Law of cosines for Earth-Mars distance
  const distAU = Math.sqrt(
    earthSunDist ** 2 +
    marsSunDist ** 2 -
    2 * earthSunDist * marsSunDist * Math.cos(angle)
  );

  return distAU * 149597870.7; // km per AU
}

function getMarsCurrentSol(): number {
  // Mars Sol 0 of MSL reference (Curiosity landing)
  // Curiosity landed: August 6, 2012 05:17:57 UTC
  const marsEpoch = new Date("2012-08-06T05:17:57Z").getTime();
  const nowMs = Date.now();
  const elapsedSeconds = (nowMs - marsEpoch) / 1000;
  // Mars sol = 88775.244 seconds
  return Math.floor(elapsedSeconds / 88775.244);
}

export async function GET() {
  const distanceKm = getMarsDistanceKm();
  const distanceMillion = distanceKm / 1_000_000;
  const lightMinutes = distanceKm / (299792.458 * 60);
  const sol = getMarsCurrentSol();

  return NextResponse.json(
    {
      distance_km: Math.round(distanceKm),
      distance_million_km: Math.round(distanceMillion * 10) / 10,
      light_minutes: Math.round(lightMinutes * 10) / 10,
      mars_sol: sol,
      calculated_at: new Date().toISOString(),
    },
    {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    }
  );
}
