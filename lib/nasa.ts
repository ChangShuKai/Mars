// NASA API helper functions

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";
const BASE_URL = "https://api.nasa.gov";

export async function fetchRoverPhotos(
  rover: "perseverance" | "curiosity",
  options: { sol?: number; earth_date?: string; camera?: string; page?: number } = {}
) {
  const params = new URLSearchParams({
    api_key: NASA_API_KEY,
    ...(options.sol !== undefined ? { sol: String(options.sol) } : {}),
    ...(options.earth_date ? { earth_date: options.earth_date } : {}),
    ...(options.camera ? { camera: options.camera } : {}),
    page: String(options.page ?? 1),
  });

  const res = await fetch(
    `${BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos?${params}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) throw new Error(`Rover API error: ${res.status}`);
  return res.json();
}

export async function fetchLatestRoverPhotos(rover: "perseverance" | "curiosity") {
  const params = new URLSearchParams({ api_key: NASA_API_KEY });
  const res = await fetch(
    `${BASE_URL}/mars-photos/api/v1/rovers/${rover}/latest_photos?${params}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`Latest photos API error: ${res.status}`);
  return res.json();
}

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

export async function fetchApod() {
  const params = new URLSearchParams({ api_key: NASA_API_KEY });
  const res = await fetch(
    `${BASE_URL}/planetary/apod?${params}`,
    { next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error(`APOD API error: ${res.status}`);
  return res.json();
}

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
