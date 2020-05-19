import React, { useRef } from "react";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, useThree, extend } from "react-three-fiber";

extend({ OrbitControls });

export function Controls(props: any) {
  const ref = useRef<OrbitControls>();
  const { camera } = useThree();
  useFrame(() => {
    if (ref.current !== undefined) {
      ref.current.update();
    }
  });

  return (
    // @ts-ignore
    <orbitControls
      ref={ref}
      args={[camera, document.getElementById("root")]}
      {...props}
    />
  );
}
