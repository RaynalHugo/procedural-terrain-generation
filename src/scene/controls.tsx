import React, { useRef } from "react";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFrame, useThree, extend } from "react-three-fiber";

extend({ OrbitControls });

export function Controls({ attachedDomElement, ...otherProps }: any) {
  const ref = useRef<OrbitControls>();
  const { camera } = useThree();
  useFrame(() => {
    if (ref.current !== undefined) {
      ref.current.update();
    }
  });

  const args = [camera, attachedDomElement];
  // @ts-ignore
  return <orbitControls ref={ref} args={args} {...otherProps} />;
}
