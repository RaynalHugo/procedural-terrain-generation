import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const createCameras = ({ renderer, resolution }) => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1420
  );

  camera.position.x = resolution;
  camera.position.y = resolution / 2;
  camera.position.z = resolution;

  const controls = new OrbitControls(camera, renderer.domElement);
  const target = new THREE.Vector3(resolution / 2, -10, resolution / 2);
  controls.target = target;

  return { camera, controls };
};
