import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

import { generateHeightMap } from "./generate-height-map";
import { generateNoiseMap } from "./generate-noise-map";

export function Terrain(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<{ rotation: { x: number; y: number } }>();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) {
      //   mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  const { vertices, indices } = useMemo(() => {
    const noiseMap = generateNoiseMap({
      resolution: 100,
      strength: 10,
      roughness: 4,
      baseRoughness: 0.01,
      persistance: 0.5,
    });

    const { vertices, indices } = generateHeightMap({
      noiseMap,
      resolution: 100,
    });

    const vertices32Array = new Float32Array(vertices);
    return { vertices: vertices32Array, indices };
  }, []);

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      //   onPointerOver={(e) => setHover(true)}
      //   onPointerOut={(e) => setHover(false)}
    >
      {/* <boxBufferGeometry attach="geometry" args={[1, 1, 1]} /> */}
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="index"
          array={indices}
          count={indices.length}
          itemSize={1}
        />
        <bufferAttribute
          attachObject={["attributes", "position"]}
          itemSize={3}
          // @ts-ignore
          count={vertices.length / 3}
          array={vertices}
        />
      </bufferGeometry>
      <meshStandardMaterial
        side={THREE.DoubleSide}
        flatShading
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
}
