import { NextRequest, NextResponse } from "next/server";
import { fetchMarsImages, fetchMarsImagesByKeyword } from "@/lib/nasa";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rover = (searchParams.get("rover") || "perseverance") as "perseverance" | "curiosity";
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page") || "1");

  try {
    let data;
    if (keyword) {
      data = await fetchMarsImagesByKeyword(`${keyword} ${rover}`, page);
    } else {
      data = await fetchMarsImages(rover, { page });
    }
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
