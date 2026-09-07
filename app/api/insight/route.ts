import { NextResponse } from "next/server";
import { fetchInsightWeather } from "@/lib/nasa";

// InSight's final known data (mission ended Dec 21, 2022, Sol 1425)
// Source: NASA InSight Mission Archive
const FINAL_INSIGHT_DATA = {
  source: "archive",
  note: "InSight lander mission ended December 21, 2022. This is the final recorded data.",
  sol: "1425",
  earth_date: "2022-12-18",
  season: "Summer",
  northern_season: "mid summer",
  southern_season: "mid winter",
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
};

export async function GET() {
  // Try live API first
  const liveData = await fetchInsightWeather();

  if (liveData && liveData.sol_keys?.length > 0) {
    const latestSol = liveData.sol_keys[liveData.sol_keys.length - 1];
    const solData = liveData[latestSol] as Record<string, unknown>;

    return NextResponse.json(
      {
        source: "live",
        sol: latestSol,
        earth_date: (solData.Last_UTC as string)?.split("T")[0] ?? "",
        season: solData.Season,
        northern_season: solData.Northern_season,
        southern_season: solData.Southern_season,
        temperature: solData.AT
          ? {
              average: (solData.AT as { av: number }).av,
              min: (solData.AT as { mn: number }).mn,
              max: (solData.AT as { mx: number }).mx,
              unit: "°C",
            }
          : FINAL_INSIGHT_DATA.temperature,
        pressure: solData.PRE
          ? {
              average: (solData.PRE as { av: number }).av,
              min: (solData.PRE as { mn: number }).mn,
              max: (solData.PRE as { mx: number }).mx,
              unit: "Pa",
            }
          : FINAL_INSIGHT_DATA.pressure,
        wind: solData.HWS
          ? {
              average: (solData.HWS as { av: number }).av,
              min: (solData.HWS as { mn: number }).mn,
              max: (solData.HWS as { mx: number }).mx,
              unit: "m/s",
              most_common_direction:
                (solData.WD as Record<string, { compass_point: string }>)?.["most_common"]?.compass_point ?? "N/A",
              compass_degrees:
                (solData.WD as Record<string, { compass_degrees: number }>)?.["most_common"]?.compass_degrees ?? 0,
            }
          : FINAL_INSIGHT_DATA.wind,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800",
        },
      }
    );
  }

  // Fallback to archived data
  return NextResponse.json(FINAL_INSIGHT_DATA, {
    headers: {
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800",
    },
  });
}
