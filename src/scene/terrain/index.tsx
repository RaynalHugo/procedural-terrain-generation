import React, { useRef, useState, useMemo } from "react";
import { map } from "lodash/fp";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

// import grass from "../../textures/grass.png";
// import rocks1 from "../../textures/rocks1.png";
// import rocks2 from "../../textures/rocks2.png";
// import sandyGrass from "../../textures/sandy-grass.png";
// import snow from "../../textures/snow.png";
// import stonyGround from "../../textures/stony-ground.png";
// import water from "../../textures/water.png";

import { generateHeightMap } from "./generate-height-map";
import { generateNoiseMap } from "./generate-noise-map";
import { useTerrainFeaturesContext } from "../../state/terrain-features";
import { useObserver } from "mobx-react";

import { fragmentShader, vertexShader } from "./shaders";

import { createUniforms, formatLayer } from "./uniforms";

import { Color } from "../../state/terrain-features";

const blend = true;

// const waterTexture = new THREE.TextureLoader().load(water);

export function Terrain(props: any) {
  const store = useTerrainFeaturesContext();

  const layers = useObserver(() => store.layers) as Color[];

  const baseRoughness = useObserver(() => store.baseRoughness);
  const minValue = useObserver(() => store.minValue);
  const persistance = useObserver(() => store.persistance);
  const roughness = useObserver(() => store.roughness);
  const strength = useObserver(() => store.strength);
  const numberOfLayers = useObserver(() => store.numberOfLayers);
  const resolution = useObserver(() => store.resolution) as number;

  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>();

  // Set up state for the hovered and active state
  // const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead

  const minValueRef = useRef(minValue);
  minValueRef.current = minValue;

  useFrame(() => {
    if (mesh.current) {
      // @ts-ignore
      mesh.current.material.uniforms.minValue.value = minValue;
      // @ts-ignore
      mesh.current.material.uniforms.strength.value = strength;
      // @ts-ignore
      mesh.current.material.uniforms.colors.value = map(
        formatLayer(blend),
        layers
      );
    }
  });

  const { vertices, indices } = useMemo(() => {
    const noiseMap = generateNoiseMap({
      resolution,
      strength,
      roughness,
      baseRoughness,
      persistance,
      numberOfLayers,
    });

    const { vertices, indices } = generateHeightMap({
      noiseMap,
      resolution,
    });

    const vertices32Array = new Float32Array(vertices);
    return { vertices: vertices32Array, indices };
  }, [
    strength,
    roughness,
    baseRoughness,
    persistance,
    numberOfLayers,
    resolution,
  ]);

  const firstUniforms = useMemo(
    () => createUniforms(minValue || 0, strength || 0, layers, blend),
    // eslint-disable-next-line
    []
  );

  return (
    <mesh
      ref={mesh}
      position={[0, -(strength || 0) * (minValue || 0), 0]}
      //   scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}s
      onClick={(e) => setActive(!active)}
      //   onPointerOver={(e) => setHover(true)}
      //   onPointerOut={(e) => setHover(false)}
    >
      <bufferGeometry
        attach="geometry"
        onUpdate={(geom) => geom.computeVertexNormals()}>
        <bufferAttribute
          attach="index"
          array={indices}
          count={indices.length}
          onUpdate={(attribute) => {
            // @ts-ignore
            attribute.needsUpdate = true;
            // @ts-ignore
            mesh.current && (mesh.current.geometry.verticesNeedUpdate = true);
          }}
          itemSize={1}
        />
        <bufferAttribute
          attachObject={["attributes", "position"]}
          itemSize={3}
          count={vertices.length / 3}
          array={vertices}
          onUpdate={(attribute) => (attribute.needsUpdate = true)}
        />
      </bufferGeometry>

      <shaderMaterial
        precision={"mediump"}
        side={THREE.DoubleSide}
        // flatShading
        attach="material"
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={firstUniforms}
      />
      {/* <meshNormalMaterial
        precision={"mediump"}
        side={THREE.DoubleSide}
        // flatShading
        attach="material"
        // fragmentShader={fragmentShader}
        // vertexShader={vertexShader}
        // uniforms={firstUniforms}
      /> */}
    </mesh>
  );
}
