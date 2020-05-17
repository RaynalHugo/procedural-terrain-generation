import * as THREE from "three";
import glsl from "glslify";

export const createTerrainMesh = ({ vertices, indices, normal }) => {
  const bufferGeometry = new THREE.BufferGeometry();
  // itemSize = 3 because there are 3 values (components) per vertex
  bufferGeometry.setIndex(indices);
  // bufferGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  bufferGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  // bufferGeometry.setAttribute(
  //   "normal",
  //   new THREE.Float32BufferAttribute(normals, 3)
  // );
  bufferGeometry.computeVertexNormals();

  const material = false
    ? new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      })
    : new THREE.MeshPhysicalMaterial({
        color: 0x9b7653,
        side: THREE.BackSide,
        clearcoat: 1,
        clearcoatRoughness: 1,
        reflectivity: 0.0,
        // roughness: 1,
        // metalness: 0.5,
        flatShading: false,
      });

  const vertexShader = /* glsl */ `
    varying vec3 vUv; 

    void main() {
      vUv = position; 
      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;

  const fragmentShader = /* glsl */ `

    struct Color {
      vec3 color;
      float baseHeight; 
      float baseBlend; 
    };

    const int maxColorCount = 6;
    uniform float strength;
    varying vec3 vUv;

    uniform Color colors[maxColorCount];


    float inverseLerp(float a, float b, float value ) {
      return saturate((value - a) / (b - a));
    }

    void main() {

      float relativeHeight = saturate(vUv.y / strength);

      for (int i = 0; i < maxColorCount; i++ ) {
        float colorStrength = inverseLerp( - colors[i].baseBlend / 2.0, colors[i].baseBlend / 2.0, relativeHeight - colors[i].baseHeight);
        gl_FragColor = (1.0 - colorStrength) * gl_FragColor + colorStrength * vec4(colors[i].color, 1);
      };
    }
  `;

  // gl_FragColor = vec4(mix(colorA, colorB, (vUv.y - 10.0) / 10.0 ), 1);

  let uniforms = {
    strength: { value: 30 },
    colors: {
      value: [
        {
          color: new THREE.Color(0x1982c4),
          baseHeight: 0,
          baseBlend: 0.0,
        },
        {
          color: new THREE.Color(0xc2b280),
          baseHeight: 0.4,
          baseBlend: 0.01,
        },
        {
          color: new THREE.Color(0x63a375),
          baseHeight: 0.5,
          baseBlend: 0.05,
        },
        {
          color: new THREE.Color(0x197278),
          baseHeight: 0.6,
          baseBlend: 0.15,
        },
        {
          color: new THREE.Color(0xa2abab),
          baseHeight: 0.75,
          baseBlend: 0.15,
        },
        {
          color: new THREE.Color(0xffffff),
          baseHeight: 0.85,
          baseBlend: 0.06,
        },
      ],
    },
  };

  // 197278
  // FFBD00

  let shaderMaterial = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    flatShading: true,
    uniforms: uniforms,
    fragmentShader: fragmentShader,
    vertexShader: vertexShader,
  });

  const mesh = new THREE.Mesh(bufferGeometry, shaderMaterial);

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
};
