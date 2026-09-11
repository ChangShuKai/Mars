"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Camera } from "lucide-react";
import Image from "next/image";

// Curiosity Camera Categories
const MSL_CATEGORIES = [
  {
    group: "Engineering Cameras",
    cameras: [
      { name: "Front Hazard Avoidance Cameras (Front Hazcam)", code: "FHAZ_RIGHT_A" },
      { name: "Rear Hazard Avoidance Cameras (Rear Hazcam)", code: "RHAZ_RIGHT_A" },
      { name: "Left Navigation Camera", code: "NAV_LEFT_A" },
      { name: "Right Navigation Camera", code: "NAV_RIGHT_A" },
    ]
  },
  {
    group: "Science Cameras",
    cameras: [
      { name: "Chemistry & Camera (ChemCam)", code: "CHEMCAM_RMI" },
      { name: "Mars Descent Imager (MARDI)", code: "MARDI" },
      { name: "Mars Hand Lens Imager (MAHLI)", code: "MAHLI" },
      { name: "Mast Camera (Mastcam)", code: "MAST_RIGHT" },
    ]
  }
];

// Perseverance Camera Categories
const M2020_CATEGORIES = [
  {
    group: "Engineering Cameras",
    cameras: [
      { name: "Front Hazard Avoidance Cameras (Front Hazcam)", code: "FRONT_HAZCAM_LEFT_A" },
      { name: "Rear Hazard Avoidance Cameras (Rear Hazcam)", code: "REAR_HAZCAM_LEFT" },
      { name: "Navigation Camera - Left", code: "NAVCAM_LEFT" },
      { name: "Navigation Camera - Right", code: "NAVCAM_RIGHT" },
      { name: "Sample Caching System (CacheCam)", code: "CACHECAM" },
    ]
  },
  {
    group: "Science Cameras",
    cameras: [
      { name: "Mastcam-Z - Left", code: "MCZ_LEFT" },
      { name: "Mastcam-Z - Right", code: "MCZ_RIGHT" },
      { name: "MEDA SkyCam", code: "SKYCAM" },
      { name: "PIXL Micro Context Camera", code: "PIXL_MCC" },
      { name: "SHERLOC - WATSON", code: "SHERLOC_WATSON" },
      { name: "SHERLOC Context Imager", code: "SHERLOC_ACI" },
      { name: "SuperCam Remote Micro Imager", code: "SUPERCAM_RMI" },
    ]
  },
  {
    group: "Entry, Descent and Landing Cameras",
    cameras: [
      { name: "Parachute Up-Look Camera A", code: "PUCAM1" },
      { name: "Parachute Up-Look Camera B", code: "PUCAM2" },
      { name: "Descent Stage Down-Look Camera", code: "DDCAM" },
      { name: "Rover Up-Look Camera", code: "RUCAM" },
      { name: "Rover Down-Look Camera", code: "RDCAM" },
      { name: "Lander Vision System Camera", code: "LCAM" },
    ]
  }
];

interface RawImage {
  id: string | number;
  url: string;
  title: string;
  sol: number;
  date: string;
  link: string;
}

const fetchMSLImages = async (cameraCode: string): Promise<RawImage[]> => {
  const url = `https://mars.nasa.gov/api/v1/raw_image_items/?order=sol+desc,date_taken+desc&per_page=3&page=0&condition_1=msl:mission&condition_2=${cameraCode}:instrument`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return (data.items || []).map((item: any) => ({
    id: item.id,
    url: item.url,
    title: item.title,
    sol: item.sol,
    date: item.date_taken,
    link: `https://mars.nasa.gov/msl/multimedia/raw-images/${item.id}`,
  }));
};

const fetchM2020Images = async (cameraCode: string): Promise<RawImage[]> => {
  const url = `https://mars.nasa.gov/rss/api/?feed=raw_images&category=mars2020&feedtype=json&search=${cameraCode}&num=3`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return (data.images || []).map((item: any) => ({
    id: item.imageid,
    url: item.image_files?.medium || item.image_files?.small || item.image_files?.full_res,
    title: item.title || item.caption?.slice(0, 50),
    sol: item.sol,
    date: item.date_taken_utc,
    link: item.link || `https://mars.nasa.gov/mars2020/multimedia/raw-images/${item.imageid}`,
  }));
};

const CameraImageRow = ({
  camera,
  mission
}: {
  camera: { name: string; code: string };
  mission: "msl" | "m2020";
}) => {
  const [images, setImages] = useState<RawImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      try {
        const data = mission === "msl" 
          ? await fetchMSLImages(camera.code)
          : await fetchM2020Images(camera.code);
        if (mounted) {
          setImages(data);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(true);
          setLoading(false);
        }
      }
    };
    loadData();
    return () => { mounted = false; };
  }, [camera.code, mission]);

  return (
    <div className="mb-6">
      <h4 className="font-display text-sm text-[var(--text-secondary)] mb-3 border-b border-white/10 pb-1">
        {camera.name}
      </h4>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="aspect-[4/3] bg-space-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : error || images.length === 0 ? (
        <div className="flex items-center justify-center aspect-[4/1] bg-space-800/50 rounded-lg border border-white/5 text-[var(--text-muted)] font-mono text-xs">
          無可用圖片
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {images.map((img) => (
            <a
              key={img.id}
              href={img.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10 hover:border-mars-500/50 transition-colors"
            >
              <Image
                src={img.url}
                alt={img.title || "Mars Image"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                <p className="text-[10px] font-mono text-mars-300">Sol {img.sol}</p>
                <div className="flex items-center gap-1 text-[10px] text-white">
                  查看原圖 <ExternalLink size={10} />
                </div>
              </div>
            </a>
          ))}
          {images.length < 3 && Array.from({ length: 3 - images.length }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-[4/3] bg-space-800/30 rounded-lg border border-white/5 flex items-center justify-center">
              <Camera size={16} className="text-white/10" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function RawImagesSection() {
  const [activeTab, setActiveTab] = useState<"msl" | "m2020">("msl");

  return (
    <section id="raw-images" className="relative py-24 bg-space-950">
      <div className="section-padding max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="font-mono text-xs text-mars-400 tracking-[0.3em] uppercase mb-3">
            NASA Raw Images
          </p>
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient mb-4">
            最新探測車原始圖片
          </h2>
          <p className="text-[var(--text-secondary)] font-display text-lg">
            即時獲取好奇號 (Curiosity) 與毅力號 (Perseverance) 各相機所拍攝的最新相片。
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-white/10 pb-4" role="tablist" aria-label="Rover Selection">
          <button
            role="tab"
            aria-selected={activeTab === "msl"}
            onClick={() => setActiveTab("msl")}
            className={`px-6 py-3 rounded-t-lg font-display font-medium transition-colors ${
              activeTab === "msl"
                ? "bg-mars-500/20 text-mars-300 border-b-2 border-mars-500"
                : "text-[var(--text-muted)] hover:text-white hover:bg-space-800"
            }`}
          >
            好奇號 (Curiosity)
          </button>
          <button
            role="tab"
            aria-selected={activeTab === "m2020"}
            onClick={() => setActiveTab("m2020")}
            className={`px-6 py-3 rounded-t-lg font-display font-medium transition-colors ${
              activeTab === "m2020"
                ? "bg-mars-500/20 text-mars-300 border-b-2 border-mars-500"
                : "text-[var(--text-muted)] hover:text-white hover:bg-space-800"
            }`}
          >
            毅力號 (Perseverance)
          </button>
        </div>

        {/* Content */}
        <div className="min-h-[50vh]">
          {(activeTab === "msl" ? MSL_CATEGORIES : M2020_CATEGORIES).map((cat, idx) => (
            <motion.div
              key={`${activeTab}-${cat.group}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="mb-12 bg-space-900/40 rounded-2xl p-6 border border-white/5"
            >
              <h3 className="text-xl font-display font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-mars-500" />
                {cat.group}
              </h3>
              <div className="pl-4 border-l border-white/5">
                {cat.cameras.map((cam) => (
                  <CameraImageRow key={cam.code} camera={cam} mission={activeTab} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-8 text-center font-mono text-[10px] text-[var(--text-muted)]">
          資料來源：NASA Mars Raw Images API
        </div>
      </div>
    </section>
  );
}
