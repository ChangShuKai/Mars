import { NextResponse } from "next/server";
import { fetchApod } from "@/lib/nasa";

export async function GET() {
  try {
    const data = await fetchApod();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=172800" },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
