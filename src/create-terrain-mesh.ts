import * as THREE from "three";

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
        wireframe: true
      })
    : new THREE.MeshPhysicalMaterial({
        color: 0x9b7653,
        side: THREE.BackSide,
        clearcoat: 1,
        clearcoatRoughness: 1,
        reflectivity: 0.0,
        // roughness: 1,
        // metalness: 0.5,
        flatShading: false
      });

  function vertexShader() {
    return `
    varying vec3 vUv; 

    void main() {
      vUv = position; 

      vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * modelViewPosition; 
    }
  `;
  }

  function fragmentShader() {
    return `
    uniform vec3 colorA; 
    uniform vec3 colorB; 
    uniform vec3 colorC; 
    uniform vec3 colorD; 
    uniform vec3 colorE; 
    uniform vec3 colorF; 
    varying vec3 vUv;

    void main() {
      if (vUv.y > 23.0) {
        gl_FragColor = vec4(colorA, 1);
      } else if (vUv.y > 22.0) {
        gl_FragColor = vec4(mix(colorB, colorA, (vUv.y - 22.0) / (23.0 - 22.0) ), 1);
      } else if (vUv.y > 20.0) {
        gl_FragColor = vec4(mix(colorC, colorB, (vUv.y - 20.0) / (22.0 - 20.0) ), 1);
        // gl_FragColor = vec4(colorB, 1);
      } else if (vUv.y > 18.2) {
        gl_FragColor = vec4(mix(colorD, colorC, (vUv.y - 18.2) / (20.0 - 18.2) ), 1);
        // gl_FragColor = vec4(colorC, 1);
      } else if (vUv.y > 16.2) {
        gl_FragColor = vec4(mix(colorE, colorD, (vUv.y - 16.2) / (18.2 - 16.2) ), 1);
        // gl_FragColor = vec4(colorD, 1);
      } else if (vUv.y > 15.2) {
        gl_FragColor = vec4(mix(colorF, colorE, (vUv.y - 15.2) / (16.2 - 15.2) ), 1);
        // gl_FragColor = vec4(colorE, 1);
      } else {
        gl_FragColor = vec4(colorF, 1);
      }
    }
  `;
  }

  // gl_FragColor = vec4(mix(colorA, colorB, (vUv.y - 10.0) / 10.0 ), 1);

  let uniforms = {
    colorA: { type: "vec3", value: new THREE.Color(0xffffff) },
    colorB: { type: "vec3", value: new THREE.Color(0x875053) },
    colorC: { type: "vec3", value: new THREE.Color(0x197278) },
    colorD: { type: "vec3", value: new THREE.Color(0x63a375) },
    colorE: { type: "vec3", value: new THREE.Color(0xc2b280) },
    colorF: { type: "vec3", value: new THREE.Color(0x1982c4) }
  };

  // 197278
  // FFBD00

  let shaderMaterial = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    flatShading: true,
    uniforms: uniforms,
    fragmentShader: fragmentShader(),
    vertexShader: vertexShader()
  });

  const mesh = new THREE.Mesh(bufferGeometry, shaderMaterial);

  mesh.castShadow = true;
  mesh.receiveShadow = true;

  return mesh;
};
