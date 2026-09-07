"use client";

import { useCallback, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useTexture, Html } from "@react-three/drei";
import { BackSide } from "three";
import * as THREE from "three";

// NASA/JPL Mars Curiosity First Color Panorama — Public Domain
const PANORAMA_URL =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/NASA_Mars_Rover_Curiosity_-_First_Color_Panorama_-_pia15687.jpg/6000px-NASA_Mars_Rover_Curiosity_-_First_Color_Panorama_-_pia15687.jpg";

function MarsScene() {
  const texture = useTexture(PANORAMA_URL);
  texture.colorSpace = THREE.SRGBColorSpace;

  const { camera } = useThree();
  const perspCam = camera as THREE.PerspectiveCamera;
  perspCam.fov = 75;
  perspCam.updateProjectionMatrix();

  // Clamp FOV on change to simulate zoom limits
  const handleChange = useCallback(() => {
    perspCam.fov = Math.max(30, Math.min(100, perspCam.fov));
    perspCam.updateProjectionMatrix();
  }, [perspCam]);

  return (
    <>
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={BackSide} />
      </mesh>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
        rotateSpeed={-0.4}
        zoomSpeed={0.8}
        minPolarAngle={Math.PI * 0.15}
        maxPolarAngle={Math.PI * 0.85}
        target={[0, 0, 0]}
        makeDefault
        onChange={handleChange}
      />
    </>
  );
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-orange-500 border-t-transparent animate-spin" />
        <p className="text-orange-400 font-mono text-xs">載入全景圖...</p>
      </div>
    </Html>
  );
}

export default function PanoramaCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 0.001], fov: 75 }}
        style={{ background: "#050508" }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <MarsScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
