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
