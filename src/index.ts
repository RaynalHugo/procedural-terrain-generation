import * as THREE from "three";
import { WEBGL } from "three/examples/jsm/WebGL";

import { generateNoiseMap } from "./generate-noise-map";
import { generateHeightMap } from "./generate-height-map";
import { createLights } from "./create-lights";
import { createTerrainMesh } from "./create-terrain-mesh";
import { createCameras } from "./create-cameras";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio || 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const options = {
  resolution: 1000,
  seaLevel: 0.3,
  strength: 200,
  numberOfLayers: 6,
  baseRoughness: 0.002,
  roughness: 3,
  persistance: 0.4,
};

const noiseMap = generateNoiseMap(options);
const { vertices, indices, normals } = generateHeightMap({
  noiseMap,
  resolution: options.resolution,
});

const mesh = createTerrainMesh({
  vertices,
  indices,
  normal: normals,
  seaLevel: options.seaLevel,
  strength: options.strength,
});
scene.add(mesh);

const { lights, updateLights } = createLights();
lights.forEach((light) => scene.add(light));

const { camera, controls } = createCameras({
  renderer,
  resolution: options.resolution,
});

function animate() {
  const timer = 0.0001 * Date.now();

  // mesh.material.uniforms.seaLevel.value = seaLevel;

  updateLights(options.resolution, timer);
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

if (WEBGL.isWebGLAvailable()) {
  animate();
} else {
  const warning = WEBGL.getWebGLErrorMessage();
  document.getElementById("container").appendChild(warning);
}
