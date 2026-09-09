"use client";

import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html, useTexture, Stars } from "@react-three/drei";
import * as THREE from "three";
import { Plane } from "lucide-react";

import type { Mission } from "../sections/MarsMapSection";

const MapMaterial = ({ hd }: { hd: boolean }) => {
  const mapTex = useTexture(hd ? "/mars-map-hd.jpg" : "/mars-map.jpg");
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.userData.uMorph = { value: 1.0 };
    }
  }, []);

  const onBeforeCompile = (shader: any) => {
    if (!materialRef.current) return;
    shader.uniforms.uMorph = materialRef.current.userData.uMorph;
    shader.vertexShader = `
      uniform float uMorph;
      ${shader.vertexShader}
    `.replace(
      '#include <begin_vertex>',
      `
      float r = 2.0; // sphere radius
      float lon = position.x;
      float lat = position.y;
      
      // Flat position
      vec3 flatPos = vec3(position.x * 2.0, position.y * 2.0, 0.0);
      
      // Sphere position
      vec3 spherePos = vec3(
          r * cos(lat) * sin(lon),
          r * sin(lat),
          r * cos(lat) * cos(lon)
      );
      vec3 transformed = mix(flatPos, spherePos, uMorph);
      `
    ).replace(
      '#include <beginnormal_vertex>',
      `
      float lonN = position.x;
      float latN = position.y;
      vec3 sphereNormal = normalize(vec3(
          cos(latN) * sin(lonN),
          sin(latN),
          cos(latN) * cos(lonN)
      ));
      vec3 flatNormal = vec3(0.0, 0.0, 1.0);
      vec3 objectNormal = normalize(mix(flatNormal, sphereNormal, uMorph));
      `
    );
  };

  return (
    <meshStandardMaterial
      ref={materialRef}
      map={mapTex}
      roughness={0.8}
      metalness={0.1}
      onBeforeCompile={onBeforeCompile}
      side={THREE.DoubleSide}
    />
  );
};

const Marker = ({ mission, isGlobe, isSelected, onClick }: { mission: Mission, isGlobe: boolean, isSelected: boolean, onClick: () => void }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const morphTarget = isGlobe ? 1.0 : 0.0;
    
    // We store the current morph value in userData to smoothly animate
    if (groupRef.current.userData.morph === undefined) {
      groupRef.current.userData.morph = morphTarget;
    }
    
    groupRef.current.userData.morph = THREE.MathUtils.lerp(
      groupRef.current.userData.morph,
      morphTarget,
      0.05
    );
    
    const uMorph = groupRef.current.userData.morph;
    
    const lon = THREE.MathUtils.degToRad(mission.lon);
    const lat = THREE.MathUtils.degToRad(mission.lat);
    
    const flatPos = new THREE.Vector3(lon * 2.0, lat * 2.0, 0.05);
    const r = 2.01; // slightly above surface
    const spherePos = new THREE.Vector3(
        r * Math.cos(lat) * Math.sin(lon),
        r * Math.sin(lat),
        r * Math.cos(lat) * Math.cos(lon)
    );
    
    groupRef.current.position.lerpVectors(flatPos, spherePos, uMorph);
    
    // Make marker look at normal
    const normal = spherePos.clone().normalize();
    const flatNormal = new THREE.Vector3(0, 0, 1);
    const currentNormal = new THREE.Vector3().lerpVectors(flatNormal, normal, uMorph).normalize();
    groupRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), currentNormal);
  });

  const isHeli = mission.category === "helicopter";
  const isActive = mission.status === "active";

  return (
    <group ref={groupRef}>
      <Html center style={{ pointerEvents: 'none' }}>
        <button 
           className="relative flex flex-col items-center group cursor-pointer border-none bg-transparent outline-none p-0"
           style={{ pointerEvents: 'auto' }}
           onClick={onClick}
           aria-label={`View details for ${mission.name}`}
           aria-pressed={isSelected}
        >
          {isHeli ? (
            <div
              className="w-6 h-6 rounded-full border-2 border-emerald-300 bg-emerald-700/80 flex items-center justify-center shadow-lg transition-transform hover:scale-125"
              style={{
                boxShadow: `0 0 12px ${mission.glow}`,
                transform: isSelected ? "scale(1.35)" : undefined,
              }}
            >
              <Plane size={13} className="text-white animate-bounce" />
            </div>
          ) : (
            <div
              className="w-4 h-4 rounded-full border-2 border-white transition-all hover:scale-[1.7] shadow-xl"
              style={{
                backgroundColor: mission.color,
                opacity: mission.status === "ended" ? 0.65 : 1,
                boxShadow: isActive ? `0 0 12px ${mission.color}, 0 0 24px ${mission.glow}` : "none",
                transform: isSelected ? "scale(1.75)" : undefined,
              }}
            />
          )}
          <div
            className={`absolute top-full mt-2 px-2 py-0.5 rounded font-mono text-[10px] whitespace-nowrap transition-all shadow-md ${
              isSelected
                ? "opacity-100 bg-space-950 text-white border border-mars-400"
                : "opacity-0 group-hover:opacity-100 bg-space-900/90 text-slate-200 border border-white/20"
            }`}
          >
            <span className="font-bold">{mission.name}</span>
          </div>
        </button>
      </Html>
    </group>
  );
};

const GlobeController = ({ isGlobe, meshRef }: { isGlobe: boolean, meshRef: React.RefObject<THREE.Mesh> }) => {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 5));
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    targetPos.current.set(0, 0, isGlobe ? 6 : 3);
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 2000);
    return () => clearTimeout(t);
  }, [isGlobe]);
  
  useFrame(() => {
    const morphTarget = isGlobe ? 1.0 : 0.0;
    
    if (meshRef.current && (meshRef.current.material as THREE.Material).userData.uMorph) {
      (meshRef.current.material as THREE.Material).userData.uMorph.value = THREE.MathUtils.lerp(
        (meshRef.current.material as THREE.Material).userData.uMorph.value,
        morphTarget,
        0.05
      );
    }

    if (animating) {
      camera.position.lerp(targetPos.current, 0.05);
    }
  });

  return null;
};

export default function MarsGlobe({ missions, selected, onSelect, hd, isGlobe, setIsGlobe }: { missions: Mission[], selected: Mission | null, onSelect: (m: Mission) => void, hd: boolean, isGlobe: boolean, setIsGlobe: (v: boolean) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <div className="w-full h-full relative">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        
        <mesh ref={meshRef}>
          <planeGeometry args={[Math.PI * 2, Math.PI, 128, 64]} />
          <MapMaterial hd={hd} />
        </mesh>
        
        {missions.map((m) => (
          <Marker 
            key={m.id} 
            mission={m} 
            isGlobe={isGlobe} 
            isSelected={selected?.id === m.id} 
            onClick={() => onSelect(m)} 
          />
        ))}

        <OrbitControls 
          enablePan={!isGlobe} 
          enableZoom={true}
          enableRotate={isGlobe}
          minDistance={1.5}
          maxDistance={10}
        />
        <GlobeController isGlobe={isGlobe} meshRef={meshRef} />
      </Canvas>
      
      {/* HUD Overlay */}
      <div className="absolute top-4 left-4 z-10">
        <button 
          onClick={() => setIsGlobe(!isGlobe)}
          className="glass-card px-4 py-2 rounded-xl text-white font-mono text-sm border border-mars-500/30 hover:bg-mars-500/20 transition-all shadow-lg flex items-center gap-2"
        >
          <div className={`w-2 h-2 rounded-full ${isGlobe ? 'bg-emerald-400' : 'bg-orange-400'} animate-pulse`}></div>
          {isGlobe ? '切換至 2D 平面地圖' : '切換至 3D 圓形火星'}
        </button>
      </div>
    </div>
  );
}
