// NASA API helper functions

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov";

// ─── Mars Rover Photos (uses NASA Images Library since official rover API is archived) ───

export async function fetchMarsImages(
  rover: "perseverance" | "curiosity",
  options: { page?: number; yearRange?: string } = {}
) {
  const queries = {
    perseverance: "perseverance mars rover jezero",
    curiosity: "curiosity mars rover gale crater",
  };

  const params = new URLSearchParams({
    q: queries[rover],
    media_type: "image",
    page_size: "24",
    page: String(options.page ?? 1),
    ...(options.yearRange ? { year_start: options.yearRange } : {}),
  });

  const res = await fetch(
    `https://images-api.nasa.gov/search?${params}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error(`NASA Images API error: ${res.status}`);
  return res.json();
}

export async function fetchMarsImagesByKeyword(keyword: string, page = 1) {
  const params = new URLSearchParams({
    q: `${keyword} mars`,
    media_type: "image",
    page_size: "24",
    page: String(page),
  });

  const res = await fetch(
    `https://images-api.nasa.gov/search?${params}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error(`NASA Images API error: ${res.status}`);
  return res.json();
}

// ─── InSight Weather ───

export async function fetchInsightWeather() {
  const params = new URLSearchParams({
    api_key: NASA_API_KEY,
    feedtype: "json",
    ver: "1.0",
  });

  try {
    const res = await fetch(
      `${BASE_URL}/insight_weather/?${params}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error("InSight API unavailable");
    const data = await res.json();
    if (!data.sol_keys || data.sol_keys.length === 0) {
      throw new Error("No sol data returned");
    }
    return data;
  } catch {
    return null; // Caller will use fallback
  }
}

// ─── APOD ───

export async function fetchApod() {
  const params = new URLSearchParams({ api_key: NASA_API_KEY });
  const res = await fetch(
    `${BASE_URL}/planetary/apod?${params}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error(`APOD API error: ${res.status}`);
  return res.json();
}

// ─── NASA Image & Video Library (general) ───

export async function fetchNasaImages(query: string, mediaType = "image", pageSize = 12) {
  const params = new URLSearchParams({
    q: query,
    media_type: mediaType,
    page_size: String(pageSize),
  });
  const res = await fetch(
    `https://images-api.nasa.gov/search?${params}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error(`NASA Images API error: ${res.status}`);
  return res.json();
}
