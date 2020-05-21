import React, { useRef, useState, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "react-three-fiber";

import grass from "../../textures/grass.png";
import rocks1 from "../../textures/rocks1.png";
import rocks2 from "../../textures/rocks2.png";
import sandyGrass from "../../textures/sandy-grass.png";
import snow from "../../textures/snow.png";
import stonyGround from "../../textures/stony-ground.png";
import water from "../../textures/water.png";

import { generateHeightMap } from "./generate-height-map";
import { generateNoiseMap } from "./generate-noise-map";
import { useStoreContext } from "../../state/context";
import { useObserver } from "mobx-react";

const blend = true;

const waterTexture = new THREE.TextureLoader().load(water);

let uniforms = (seaLevel: number, strength: number) => ({
  seaLevel: { value: seaLevel },
  strength: { value: strength },
  colors: {
    value: [
      {
        color: new THREE.Color("#0062c4"),
        baseHeight: 0,
        baseBlend: blend ? 0 : 0,
        noiseFactor: 0,
        noiseFrequency: 1,
        noiseOffset: 0,
        texture: waterTexture,
      },
      {
        color: new THREE.Color("#0972d4"),
        baseHeight: 0.1,
        baseBlend: blend ? 0.15 : 0,
        noiseFactor: 0,
        noiseFrequency: 1,
        noiseOffset: 0,
        texture: waterTexture,
      },
      {
        color: new THREE.Color("#1982e4"),
        baseHeight: 0.2,
        baseBlend: blend ? 0.15 : 0,
        noiseFactor: 0,
        noiseFrequency: 1,
        noiseOffset: 0,
        texture: waterTexture,
      },
      {
        color: new THREE.Color("#c2b280"),
        baseHeight: 0.28,
        baseBlend: blend ? 0.01 : 0,
        noiseFactor: 0,
        noiseFrequency: 1,
        noiseOffset: 0,
        texture: new THREE.TextureLoader().load(sandyGrass),
      },
      {
        color: new THREE.Color("#63a375"),
        baseHeight: 0.43,
        baseBlend: blend ? 0.05 : 0,
        noiseFactor: 0.1,
        noiseFrequency: 0.02,
        noiseOffset: 0,
        texture: new THREE.TextureLoader().load(grass),
      },
      {
        color: new THREE.Color("#197278"),
        baseHeight: 0.55,
        baseBlend: blend ? 0.08 : 0,
        noiseFactor: 0.3,
        noiseFrequency: 0.02,
        noiseOffset: 0,
        texture: new THREE.TextureLoader().load(stonyGround),
      },
      {
        color: new THREE.Color("#a2abab"),
        baseHeight: 0.7,
        baseBlend: blend ? 0.1 : 0,
        noiseFactor: 0.1,
        noiseFrequency: 0.02,
        noiseOffset: 0,
        texture: new THREE.TextureLoader().load(rocks1),
      },
      {
        color: new THREE.Color("#ffffff"),
        baseHeight: 0.75,
        baseBlend: blend ? 0.02 : 0,
        noiseFactor: 0.1,
        noiseFrequency: 0.02,
        noiseOffset: 0,
        texture: new THREE.TextureLoader().load(snow),
      },
    ],
  },
});

const vertexShader = /* glsl */ `
varying vec3 vUv; 
uniform float strength;
uniform float seaLevel;

void main() {
  vUv = position; 

  vec3 modifiedPosition = position;

  if (modifiedPosition.y / strength < seaLevel) {
    modifiedPosition.y = seaLevel * strength; 
  }

  vec4 modelViewPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
  gl_Position = projectionMatrix * modelViewPosition; 
}
`;

const fragmentShader = /* glsl */ `

struct Color {
  vec3 color;
  float baseHeight; 
  float baseBlend; 
  float noiseFactor;
  float noiseFrequency;
  float noiseOffset;
  sampler2D texture;
};

uniform sampler2D colorTexture;
const int maxColorCount = 8;
uniform float strength;
varying vec3 vUv;

uniform Color colors[maxColorCount];


float inverseLerp(float a, float b, float value ) {
  return clamp((value - a) / (b - a), 0.0, 1.0);
}

float random (in vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main() {

  float relativeHeight = clamp( vUv.y / strength , 0. ,1.);


//   gl_FragColor = vec4(colors[0].color * vUv.y / strength , 1);
//   gl_FragColor = vec4( relativeHeight ,0,0 , 1);



  for (int i = 0; i < maxColorCount; i++ ) {

    float computedNoise =  noise(vec2((vUv.x + colors[i].noiseOffset) * colors[i].noiseFrequency, (vUv.z + colors[i].noiseOffset) * colors[i].noiseFrequency));
    float noiseFactor = colors[i].noiseFactor;
    float baseBlendAddition = (computedNoise * noiseFactor - noiseFactor / 2.0);

    float colorStrength = inverseLerp( 
      - (colors[i].baseBlend - baseBlendAddition) / 2.0,
      (colors[i].baseBlend + baseBlendAddition) / 2.0,
      relativeHeight - colors[i].baseHeight
    );
    gl_FragColor = 
      (1.0 - colorStrength) * gl_FragColor 
      + colorStrength 
      * ( vec4(
        mix(
          colors[i].color, 
          texture2D( 
            colors[i].texture, 
            vec2(
              mod(vUv.x*10., 512.)/512., 
              mod(vUv.z*10., 512.)/512.
              )
            ).rgb,
          0.3
          ), 
        1)
       ) ; 
  };
// gl_FragColor = vec4(texture2D( colorTexture, vec2(vUv.x, vUv.y)).rgb, 1);
}
`;

export function Terrain({}: any) {
  const store = useStoreContext();
  const seaLevel = useObserver(() => store.seaLevel);
  const strength = useObserver(() => store.strength);
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>();

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead

  const seaLevelRef = useRef(seaLevel);
  seaLevelRef.current = seaLevel;

  useFrame(() => {
    if (mesh.current) {
      // @ts-ignore
      mesh.current.material.uniforms.seaLevel.value = seaLevel;
      // @ts-ignore
      mesh.current.material.uniforms.strength.value = strength;
    }
  });

  const { vertices, indices } = useMemo(() => {
    const noiseMap = generateNoiseMap({
      resolution: 100,
      strength,
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
  }, [strength]);

  const firstUniforms = useMemo(
    () => uniforms(seaLevel || 0, strength || 0),
    []
  );

  return (
    <mesh
      ref={mesh}
      position={[0, -(strength || 0) * (seaLevel || 0), 0]}
      //   scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}s
      onClick={(e) => setActive(!active)}
      //   onPointerOver={(e) => setHover(true)}
      //   onPointerOut={(e) => setHover(false)}
    >
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
          count={vertices.length / 3}
          array={vertices}
          onUpdate={(attribute) => (attribute.needsUpdate = true)}
        />
      </bufferGeometry>

      <shaderMaterial
        side={THREE.DoubleSide}
        // flatShading
        attach="material"
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={firstUniforms}
      />
    </mesh>
  );
}
