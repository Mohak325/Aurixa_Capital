// src/components/Globe.tsx
"use client";

import { useRef, useState, Suspense, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, useTexture, Line } from "@react-three/drei";
import * as THREE from "three";
import { DESTINATIONS } from "@/data/destinations";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ── Geographic utilities ─────────────────────────────────────────────
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Compute great-circle 3D arc points between two cities */
function getArcPoints(
  start: THREE.Vector3,
  end: THREE.Vector3,
  segments = 64,
  maxLift = 0.22
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const startNorm = start.clone().normalize();
  const endNorm = end.clone().normalize();
  const angle = startNorm.angleTo(endNorm);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Slerp along unit sphere
    const point = new THREE.Vector3();
    const sinAngle = Math.sin(angle);
    if (sinAngle < 0.0001) {
      point.copy(start);
    } else {
      const a = Math.sin((1 - t) * angle) / sinAngle;
      const b = Math.sin(t * angle) / sinAngle;
      point.x = a * start.x + b * end.x;
      point.y = a * start.y + b * end.y;
      point.z = a * start.z + b * end.z;
    }
    // Arc elevation height
    const elevation = 1 + maxLift * Math.sin(Math.PI * t);
    point.normalize().multiplyScalar(elevation);
    points.push(point);
  }
  return points;
}

// ── Financial Corridor Arc ───────────────────────────────────────────
function CorridorArc({
  from,
  to,
  isActive,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  isActive: boolean;
}) {
  const points = useMemo(() => getArcPoints(from, to, 48, isActive ? 0.25 : 0.18), [from, to, isActive]);

  return (
    <Line
      points={points}
      color={isActive ? "#F2DDA8" : "#C9A24D"}
      lineWidth={isActive ? 1.6 : 0.8}
      transparent
      opacity={isActive ? 0.85 : 0.28}
      dashed={!isActive}
      dashSize={0.06}
      gapSize={0.04}
    />
  );
}

// ── Light Beacon on Active City ──────────────────────────────────────
function CityBeacon({ position, isActive }: { position: THREE.Vector3; isActive: boolean }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const t = useRef(0);

  // Surface normal orientation
  const orientation = useMemo(() => {
    const normal = position.clone().normalize();
    const up = new THREE.Vector3(0, 1, 0);
    return new THREE.Quaternion().setFromUnitVectors(up, normal);
  }, [position]);

  useFrame((_, delta) => {
    if (!ringRef.current || !isActive) return;
    t.current += delta * 2.2;
    const scale = 1 + 0.6 * (t.current % 1);
    const opacity = Math.max(0, 1 - (t.current % 1));
    ringRef.current.scale.set(scale, scale, scale);
    const mat = ringRef.current.material as THREE.MeshBasicMaterial;
    if (mat) mat.opacity = opacity * 0.6;
  });

  return (
    <group position={position} quaternion={orientation}>
      {/* Light Pillar (visible when active) */}
      {isActive && (
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.003, 0.012, 0.24, 16, 1, true]} />
          <meshBasicMaterial
            color="#F2DDA8"
            transparent
            opacity={0.45}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Pulsing base radar ring */}
      {isActive && (
        <mesh ref={ringRef} rotation-x={Math.PI / 2}>
          <ringGeometry args={[0.02, 0.045, 32]} />
          <meshBasicMaterial
            color="#E6C98A"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  );
}

// ── City Marker + HTML Label ─────────────────────────────────────────
function CityMarker({
  dest,
  index,
  activeIndex,
  onSelect,
}: {
  dest: (typeof DESTINATIONS)[0];
  index: number;
  activeIndex: number;
  onSelect: (i: number) => void;
}) {
  const RADIUS = 1;
  const pos = useMemo(
    () => latLngToVector3(dest.coords.lat, dest.coords.lng, RADIUS + 0.015),
    [dest.coords.lat, dest.coords.lng]
  );
  const isActive = index === activeIndex;
  const [hovered, setHovered] = useState(false);

  // Short airport code / initials
  const cityCodeMap: Record<string, string> = {
    dubai: "DXB",
    london: "LON",
    singapore: "SIN",
    "kuala-lumpur": "KUL",
    india: "BOM",
  };
  const code = cityCodeMap[dest.id] || "HUB";
  const cityName =
    dest.id === "india"
      ? "Mumbai"
      : dest.id === "london"
      ? "London"
      : dest.city.split(" · ")[0].split(",")[0];

  return (
    <group position={pos}>
      <CityBeacon position={new THREE.Vector3(0, 0, 0)} isActive={isActive} />

      {/* Core Dot (Clickable) */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onSelect(index);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[isActive ? 0.024 : hovered ? 0.020 : 0.015, 16, 16]} />
        <meshBasicMaterial
          color={isActive ? "#FFF5DC" : hovered ? "#F2DDA8" : "#C9A24D"}
          transparent
          opacity={isActive ? 1 : 0.85}
        />
      </mesh>

      {/* HTML Badge Label */}
      <Html
        distanceFactor={2.7}
        position={[0, 0.065, 0]}
        center
        style={{ pointerEvents: "auto" }}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(index);
          }}
          className="group relative flex items-center gap-1.5 transition-all duration-300"
          style={{
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: isActive ? "9px" : "8px",
            fontWeight: isActive ? 600 : 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: isActive ? "#F2DDA8" : hovered ? "#FFFFFF" : "rgba(220, 215, 205, 0.85)",
            background: isActive
              ? "rgba(12, 10, 8, 0.94)"
              : hovered
              ? "rgba(18, 15, 12, 0.90)"
              : "rgba(10, 9, 8, 0.75)",
            padding: isActive ? "3px 8px 3px 6px" : "2px 6px",
            borderRadius: "3px",
            border: isActive
              ? "1px solid rgba(230, 201, 138, 0.75)"
              : hovered
              ? "1px solid rgba(201, 162, 77, 0.5)"
              : "1px solid rgba(107, 81, 32, 0.4)",
            boxShadow: isActive
              ? "0 4px 16px rgba(201, 162, 77, 0.3), inset 0 0 10px rgba(201, 162, 77, 0.15)"
              : "0 2px 8px rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(10px)",
            cursor: "pointer",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          <span
            style={{
              width: isActive ? "5px" : "4px",
              height: isActive ? "5px" : "4px",
              borderRadius: "50%",
              backgroundColor: isActive ? "#F2DDA8" : "#C9A24D",
              boxShadow: isActive ? "0 0 6px #F2DDA8" : "none",
              display: "inline-block",
            }}
          />
          <span style={{ color: "rgba(201, 162, 77, 0.95)", fontWeight: 700 }}>{code}</span>
          <span>·</span>
          <span>{cityName}</span>
        </button>
      </Html>
    </group>
  );
}

// ── Realistic Earth Mesh with High-Visibility Luxury Textures ────────
function EarthMesh() {
  const [earthMap, bumpMap, waterMap] = useTexture([
    "/textures/earth-luxury-visible.jpg",
    "/textures/earth-topology.png",
    "/textures/earth-water.png",
  ]);

  earthMap.colorSpace = THREE.SRGBColorSpace;

  return (
    <mesh receiveShadow castShadow>
      <sphereGeometry args={[1, 96, 64]} />
      <meshPhongMaterial
        map={earthMap}
        bumpMap={bumpMap}
        bumpScale={0.035}
        specularMap={waterMap}
        specular={new THREE.Color(0x28384a)} // Subtle velvety steel-navy ocean sheen (no blown-out glare)
        shininess={14}
        emissive={new THREE.Color(0x181e28)} // Soft ambient visibility across all hemispheres
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// ── Glowing Atmosphere Halo ──────────────────────────────────────────
function Atmosphere() {
  return (
    <>
      {/* Outer ambient glow */}
      <mesh>
        <sphereGeometry args={[1.028, 64, 64]} />
        <meshBasicMaterial
          color="#C9A24D"
          transparent
          opacity={0.10}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      {/* Distant soft ethereal aura */}
      <mesh>
        <sphereGeometry args={[1.08, 64, 64]} />
        <meshBasicMaterial
          color="#4169E1"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

// ── Latitude & Longitude Coordinate Lines ─────────────────────────────
function GeoGraticule() {
  const lats = [-60, -30, 0, 30, 60];
  return (
    <group>
      {lats.map((lat) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const r = Math.sin(phi);
        const y = Math.cos(phi);
        return (
          <mesh key={lat} position={[0, y, 0]} rotation-x={Math.PI / 2}>
            <torusGeometry args={[r, 0.0008, 2, 96]} />
            <meshBasicMaterial
              color="#C9A24D"
              transparent
              opacity={lat === 0 ? 0.35 : 0.12}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// ── Complete Globe Scene ─────────────────────────────────────────────
function GlobeScene({
  activeIndex,
  autoRotate,
  onSelect,
  onDragChange,
}: {
  activeIndex: number;
  autoRotate: boolean;
  onSelect: (i: number) => void;
  onDragChange: (d: boolean) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotY = useRef<number>(0);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, rotY: 0 });
  const velocity = useRef(0);
  const { gl, camera } = useThree();
  const RADIUS = 1;

  useEffect(() => {
    camera.position.set(0, 0.1, 2.9);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  // Center view on active destination whenever activeIndex changes
  useEffect(() => {
    const dest = DESTINATIONS[activeIndex];
    if (dest) {
      // Rotate around Y so destination faces camera (+Z)
      const rad = (-dest.coords.lng + 15) * (Math.PI / 180);
      targetRotY.current = rad;
      velocity.current = 0;
    }
  }, [activeIndex]);

  // Interactive mouse/touch drag handlers
  useEffect(() => {
    const canvas = gl.domElement;
    let lastX = 0;

    const onDown = (clientX: number) => {
      isDragging.current = true;
      onDragChange(true);
      lastX = clientX;
      velocity.current = 0;
      dragStart.current = { x: clientX, rotY: groupRef.current?.rotation.y ?? 0 };
    };

    const onMove = (clientX: number) => {
      if (!isDragging.current || !groupRef.current) return;
      const dx = clientX - lastX;
      lastX = clientX;
      velocity.current = dx * 0.004;
      groupRef.current.rotation.y += velocity.current;
      targetRotY.current = groupRef.current.rotation.y;
    };

    const onUp = () => {
      if (isDragging.current) {
        isDragging.current = false;
        onDragChange(false);
      }
    };

    const mDown = (e: MouseEvent) => {
      if (e.button === 0) onDown(e.clientX);
    };
    const mMove = (e: MouseEvent) => onMove(e.clientX);
    const tStart = (e: TouchEvent) => onDown(e.touches[0].clientX);
    const tMove = (e: TouchEvent) => onMove(e.touches[0].clientX);

    canvas.addEventListener("mousedown", mDown);
    window.addEventListener("mousemove", mMove);
    window.addEventListener("mouseup", onUp);
    canvas.addEventListener("touchstart", tStart, { passive: true });
    window.addEventListener("touchmove", tMove, { passive: true });
    window.addEventListener("touchend", onUp);

    return () => {
      canvas.removeEventListener("mousedown", mDown);
      window.removeEventListener("mousemove", mMove);
      window.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("touchstart", tStart);
      window.removeEventListener("touchmove", tMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [gl.domElement, onDragChange]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (isDragging.current) {
      // Handled in onMove
    } else {
      // Damped inertia
      if (Math.abs(velocity.current) > 0.0001) {
        groupRef.current.rotation.y += velocity.current;
        targetRotY.current = groupRef.current.rotation.y;
        velocity.current *= 0.94; // friction
      } else if (autoRotate) {
        groupRef.current.rotation.y += delta * 0.06;
      } else {
        // Smoothly rotate toward active destination
        const diff = targetRotY.current - groupRef.current.rotation.y;
        if (Math.abs(diff) > 0.001) {
          groupRef.current.rotation.y += diff * Math.min(delta * 2.8, 0.12);
        }
      }
    }
  });

  const activePos = useMemo(() => {
    const active = DESTINATIONS[activeIndex];
    return latLngToVector3(active.coords.lat, active.coords.lng, RADIUS + 0.015);
  }, [activeIndex]);

  return (
    <>
      {/* ── Precision Studio Lighting ── */}
      {/* Balanced ambient light so continents are clearly visible across all sides */}
      <ambientLight intensity={1.6} color="#5A677B" />

      {/* Warm key light from upper-right illuminating topography */}
      <directionalLight position={[4, 2.5, 4]} intensity={1.5} color="#FFF8EB" />

      {/* Gold rim back-light outlining the sphere silhouette */}
      <directionalLight position={[-4, 1.5, -3]} intensity={0.9} color="#C9A24D" />

      {/* Soft cool fill from bottom */}
      <pointLight position={[0, -3, 2]} intensity={0.4} color="#3D506E" distance={10} />

      <group ref={groupRef}>
        {/* Atmosphere halo */}
        <Atmosphere />

        {/* Photorealistic Textured Earth */}
        <EarthMesh />

        {/* Graticule grid rings */}
        <GeoGraticule />

        {/* Financial Corridor Arcs between all destination pairs */}
        {DESTINATIONS.map((dest, i) => {
          if (i === activeIndex) return null;
          const fromPos = latLngToVector3(dest.coords.lat, dest.coords.lng, RADIUS + 0.015);
          return (
            <CorridorArc
              key={dest.id}
              from={fromPos}
              to={activePos}
              isActive={true}
            />
          );
        })}

        {/* Interactive City Markers + HTML Badges */}
        {DESTINATIONS.map((dest, i) => (
          <CityMarker
            key={dest.id}
            dest={dest}
            index={i}
            activeIndex={activeIndex}
            onSelect={onSelect}
          />
        ))}
      </group>
    </>
  );
}

// ── Elegant Loading & Fallback Placeholder ───────────────────────────
function GlobeFallback() {
  return (
    <div className="w-full aspect-square flex flex-col items-center justify-center gap-3 bg-[var(--color-ink-950)]">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-[var(--color-gold-500)]/30 animate-ping" />
        <div className="absolute inset-2 rounded-full border border-[var(--color-gold-400)]/60 animate-pulse" />
        <div className="w-4 h-4 rounded-full bg-[var(--color-gold-400)]/40" />
      </div>
      <span className="font-mono text-[10px] text-[var(--color-gold-400)] uppercase tracking-widest">
        Initializing 3D Corridor Globe…
      </span>
    </div>
  );
}

// ── Public API ────────────────────────────────────────────────────────
export interface GlobeProps {
  activeIndex: number;
  onDestinationClick?: (index: number) => void;
}

export default function Globe({ activeIndex, onDestinationClick }: GlobeProps) {
  const [containerRef, isInView] = useInView<HTMLDivElement>({
    threshold: 0.05,
    once: true, // Keep globe active once scrolled into view
  });
  const prefersReduced = useReducedMotion();
  const autoRotate = isInView && !prefersReduced;
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      ref={containerRef}
      className="w-full aspect-square relative select-none"
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
      aria-label="Interactive 3D globe — Aurixa Capital global investment corridors"
      role="img"
    >
      {/* Background radial glow so the globe has a luxury celestial backdrop */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(201, 162, 77, 0.16) 0%, rgba(30, 41, 59, 0.28) 45%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom interaction indicator */}
      <div
        className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none font-mono text-[9px] text-[var(--color-stone-400)] uppercase tracking-widest bg-[var(--color-ink-950)]/80 border border-[var(--color-gold-500)]/30 px-3 py-1 rounded shadow-lg backdrop-blur-sm whitespace-nowrap flex items-center gap-2"
        aria-hidden="true"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold-400)] animate-pulse" />
        <span>Drag to rotate · Click city to explore</span>
      </div>

      {isInView ? (
        <Canvas
          frameloop="always"
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
          camera={{ position: [0, 0.1, 2.9], fov: 42 }}
        >
          <Suspense fallback={null}>
            <GlobeScene
              activeIndex={activeIndex}
              autoRotate={autoRotate}
              onSelect={(i) => onDestinationClick?.(i)}
              onDragChange={setIsDragging}
            />
          </Suspense>
        </Canvas>
      ) : (
        <GlobeFallback />
      )}
    </div>
  );
}
