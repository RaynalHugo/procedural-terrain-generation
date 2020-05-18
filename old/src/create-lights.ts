import * as THREE from "three";

export const createLights = () => {
  const light = new THREE.AmbientLight(0xffffff, 2);
  light.position.set(0, 10, 0);

  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(10, 200, 10);
  pointLight.castShadow = true;

  const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
  pointLight2.position.set(10, 200, 10);
  pointLight2.castShadow = true;

  const pointLight3 = new THREE.PointLight(0xffffff, 1, 100);
  pointLight3.position.set(50, 25, 50);
  pointLight3.castShadow = true;

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
  const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);

  const updateLights = (resolution, timer) => {
    pointLight.position.x =
      Math.sin(timer * 7) * (resolution / 2) + resolution / 2;
    pointLight.position.z =
      Math.sin(timer * 3) * (resolution / 2) + resolution / 2;

    pointLight2.position.x =
      -Math.sin(timer * 7) * (resolution / 2) + resolution / 2;
    pointLight2.position.z =
      -Math.sin(timer * 3) * (resolution / 2) + resolution / 2;
  };
  return {
    lights: [
      light,
      pointLight,
      pointLight2,
      // pointLight3,
      pointLightHelper,
      pointLightHelper2,
    ],
    updateLights,
  };
};
