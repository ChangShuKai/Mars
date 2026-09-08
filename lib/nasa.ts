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

// ─── Mars Live Weather Services (Perseverance MEDA & Curiosity REMS) ───

export async function fetchPerseveranceWeather() {
  const url = "https://mars.nasa.gov/rss/api/?feed=weather&category=mars2020&feedtype=json";
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mars-Explorer/1.0",
      "Accept": "application/json",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Perseverance weather API error: ${res.status}`);
  return res.json();
}

export async function fetchCuriosityWeather() {
  const url = "https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json";
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mars-Explorer/1.0",
      "Accept": "application/json",
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Curiosity weather API error: ${res.status}`);
  return res.json();
}

// ─── Rover Real-time Location & Telemetry (Where is the Rover / MMGIS) ───

export async function fetchRoverTelemetry(rover: "M20" | "MSL") {
  // 1. Try Where is the Rover REST API first
  const restUrl = `https://mars.nasa.gov/maps/location/api/v1/sites/${rover}`;
  try {
    const res = await fetch(restUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)",
        "Referer": "https://mars.nasa.gov/",
        "Accept": "application/json",
      },
      next: { revalidate: 1800 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.features && data.features.length > 0) {
        return data;
      }
    }
  } catch {
    // Fall back to MMGIS endpoint below
  }

  // 2. Fallback to active MMGIS Waypoints GeoJSON
  const mmgisUrl = `https://mars.nasa.gov/mmgis-maps/${rover}/Layers/json/${rover}_waypoints.json`;
  const mmgisRes = await fetch(mmgisUrl, {
    headers: {
      "User-Agent": "Mars-Explorer/1.0",
      "Referer": "https://mars.nasa.gov/",
      "Accept": "application/json",
    },
    next: { revalidate: 1800 },
  });

  if (!mmgisRes.ok) {
    throw new Error(`Rover telemetry API error (${rover}): ${mmgisRes.status}`);
  }

  return mmgisRes.json();
}

