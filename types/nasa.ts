// NASA TypeScript Types

export interface RoverPhoto {
  id: number;
  sol: number;
  camera: {
    id: number;
    name: string;
    rover_id: number;
    full_name: string;
  };
  img_src: string;
  earth_date: string;
  rover: {
    id: number;
    name: string;
    landing_date: string;
    launch_date: string;
    status: string;
    max_sol: number;
    max_date: string;
    total_photos: number;
  };
}

export interface RoverPhotosResponse {
  photos: RoverPhoto[];
}

export interface InsightSol {
  AT?: {
    av: number;
    ct: number;
    mn: number;
    mx: number;
  };
  HWS?: {
    av: number;
    ct: number;
    mn: number;
    mx: number;
  };
  PRE?: {
    av: number;
    ct: number;
    mn: number;
    mx: number;
  };
  WD?: Record<string, {
    compass_degrees: number;
    compass_point: string;
    compass_right: number;
    compass_up: number;
    ct: number;
  }>;
  First_UTC: string;
  Last_UTC: string;
  Month_ordinal: number;
  Northern_season: string;
  Southern_season: string;
  Season: string;
}

export interface InsightWeatherResponse {
  sol_keys: string[];
  validity_checks: Record<string, unknown>;
  [sol: string]: InsightSol | string[] | Record<string, unknown>;
}

export interface ApodResponse {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: "image" | "video";
  service_version: string;
  title: string;
  url: string;
  thumbnail_url?: string;
}

export interface NasaImageItem {
  href: string;
  data: Array<{
    center: string;
    title: string;
    nasa_id: string;
    date_created: string;
    keywords?: string[];
    media_type: string;
    description: string;
  }>;
  links?: Array<{
    href: string;
    rel: string;
    render?: string;
  }>;
}

export interface NasaImagesResponse {
  collection: {
    version: string;
    href: string;
    items: NasaImageItem[];
    metadata: { total_hits: number };
  };
}

export type RoverName = "perseverance" | "curiosity";

export type PerseveranceCamera =
  | "EDL_RUCAM"
  | "EDL_RDCAM"
  | "EDL_DDCAM"
  | "EDL_PUCAM1"
  | "EDL_PUCAM2"
  | "NAVCAM_LEFT"
  | "NAVCAM_RIGHT"
  | "MCZ_RIGHT"
  | "MCZ_LEFT"
  | "FRONT_HAZCAM_LEFT_A"
  | "FRONT_HAZCAM_RIGHT_A"
  | "REAR_HAZCAM_LEFT"
  | "REAR_HAZCAM_RIGHT"
  | "SKYCAM"
  | "SHERLOC_WATSON";

export type CuriosityCamera =
  | "FHAZ"
  | "RHAZ"
  | "MAST"
  | "CHEMCAM"
  | "MAHLI"
  | "MARDI"
  | "NAVCAM"
  | "PANCAM"
  | "MINITES";

// ─── Perseverance (MEDA) Weather Types ───
export interface PerseveranceSol {
  terrestrial_date: string;
  sol: string;
  ls: string;
  season: string;
  min_temp: number | string;
  max_temp: number | string;
  pressure: number | string;
  sunrise: string;
  sunset: string;
  min_gts_temp?: number | string;
  max_gts_temp?: number | string;
  wind_speed?: number | string;
  wind_direction?: string;
}

export interface PerseveranceWeatherResponse {
  sols: PerseveranceSol[];
  sol_hours?: Array<Record<string, unknown>>;
}

// ─── Curiosity (REMS) Weather Types ───
export interface CuriositySol {
  id: string;
  terrestrial_date: string;
  sol: string;
  ls: string;
  season: string;
  min_temp: string;
  max_temp: string;
  pressure: string;
  pressure_string?: string;
  abs_humidity?: string;
  wind_speed?: string;
  wind_direction?: string;
  atmo_opacity?: string;
  sunrise?: string;
  sunset?: string;
  local_uv_irradiance_index?: string;
  min_gts_temp?: string;
  max_gts_temp?: string;
}

export interface CuriosityWeatherResponse {
  descriptions?: Record<string, string>;
  soles: CuriositySol[];
}

// ─── Rover Telemetry & Waypoint Types ───
export interface RoverWaypointProperty {
  RMC?: string;
  site?: number;
  drive?: number;
  sol?: number;
  elev_geoid?: number;
  elev_radii?: number;
  lon?: number;
  lat?: number;
  roll?: number;
  pitch?: number;
  yaw?: number;
  tilt?: number;
  dist_m?: number;
  dist_total_m?: number;
  dist_km?: number;
  dist_mi?: number;
  final?: string;
  Note?: string;
}

export interface RoverWaypointFeature {
  type: "Feature";
  properties: RoverWaypointProperty;
  geometry: {
    type: "Point";
    coordinates: [number, number, number]; // [lon, lat, elevation]
  };
}

export interface RoverWaypointCollection {
  type: "FeatureCollection";
  name?: string;
  features: RoverWaypointFeature[];
}

export interface RoverTelemetry {
  rover: "perseverance" | "curiosity";
  name: string;
  nameEn: string;
  sol: number;
  drive: number;
  coordinates: {
    lat: number;
    lon: number;
    elevation: number;
  };
  distance: {
    total_meters: number;
    total_km: number;
  };
  attitude?: {
    roll?: number;
    pitch?: number;
    yaw?: number;
  };
  updatedAt: string;
}

