import { NextRequest, NextResponse } from "next/server";
import { fetchLatestRoverPhotos, fetchRoverPhotos } from "@/lib/nasa";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rover = (searchParams.get("rover") || "perseverance") as "perseverance" | "curiosity";
  const latest = searchParams.get("latest") === "true";
  const camera = searchParams.get("camera") || undefined;
  const page = Number(searchParams.get("page") || "1");

  try {
    let data;
    if (latest) {
      data = await fetchLatestRoverPhotos(rover);
    } else {
      data = await fetchRoverPhotos(rover, { camera, page });
    }
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
