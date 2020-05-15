import * as THREE from "three";
import { WEBGL } from "three/examples/jsm/WebGL";

import { generateNoiseMap } from "./generate-noise-map";
import { generateHeightMap } from "./generate-height-map";
import { createLights } from "./create-lights";
import { createTerrainMesh } from "./create-terrain-mesh";
import { createCameras } from "./create-cameras";

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const resolution = 100;

const noiseMap = generateNoiseMap({
  resolution,
  strength: 30,
  numberOfLayers: 6,
  baseRoughness: 0.03,
  roughness: 2.3,
  persistance: 0.4,
  minValue: 0.5
});
const { vertices, indices, normals } = generateHeightMap({
  noiseMap,
  resolution
});

const mesh = createTerrainMesh({ vertices, indices, normals });
scene.add(mesh);

const { lights, updateLights } = createLights();
lights.forEach(light => scene.add(light));

const { camera, controls } = createCameras({ renderer, resolution });

function animate() {
  const timer = 0.0001 * Date.now();

  updateLights(resolution, timer);
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
