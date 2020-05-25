import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, useResource, extend } from "react-three-fiber";

extend({ OrbitControls });

export function Ligths(props: any) {
  const [pointLight1, pLight1] = useResource<THREE.PointLight>();

  // Rotate mesh every frame, this is outside of React without overhead
  //   useFrame(() => {
  //     if (mesh.current) {
  //       mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  //     }
  //   });

  //   const light = new THREE.AmbientLight(0xffffff, 2);
  //   light.position.set(0, 10, 0);

  //   const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  //   pointLight.position.set(10, 200, 10);
  //   pointLight.castShadow = true;

  //   const pointLight2 = new THREE.PointLight(0xffffff, 1, 100);
  //   pointLight2.position.set(10, 200, 10);
  //   pointLight2.castShadow = true;

  //   const pointLight3 = new THREE.PointLight(0xffffff, 1, 100);
  //   pointLight3.position.set(50, 25, 50);
  //   pointLight3.castShadow = true;

  //   const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
  //   const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, 1);

  //   const updateLights = (resolution, timer) => {
  //     pointLight.position.x =
  //       Math.sin(timer * 7) * (resolution / 2) + resolution / 2;
  //     pointLight.position.z =
  //       Math.sin(timer * 3) * (resolution / 2) + resolution / 2;

  //     pointLight2.position.x =
  //       -Math.sin(timer * 7) * (resolution / 2) + resolution / 2;
  //     pointLight2.position.z =
  //       -Math.sin(timer * 3) * (resolution / 2) + resolution / 2;
  //   };

  useFrame(() => {
    if (pointLight1) {
      pointLight1.current.position.x = 25 * Math.sin(Date.now() / 1000) + 25;
      pointLight1.current.position.y = 10 * Math.sin(Date.now() / 1100) + 10;
      pointLight1.current.position.z = 25 * Math.sin(Date.now() / 1200) + 25;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} color={new THREE.Color("#ffffff")} />
      <pointLight
        attach="light"
        ref={pointLight1}
        position={[1, 2, 1]}
        color={new THREE.Color(0xffcc77)}
        castShadow>
        {pLight1 && <pointLightHelper color="blue" args={[pLight1, 1]} />}
      </pointLight>
      {/* <pointLight position={[10, 200, 10]} castShadow />
      <pointLight position={[50, 25, 50]} castShadow /> */}
    </>
  );
}
