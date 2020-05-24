import React, { useState } from "react";
import * as THREE from "three";
import { Canvas } from "react-three-fiber";

import { Terrain } from "./terrain";
import { Ligths } from "./lights";
import { Controls } from "./controls";

import { LayoutStoreProvider } from "../state/layout";
import { TerrainFeaturesStoreProvider } from "../state/terrain-features";

export function Scene({ terrainFeaturesStore, layoutStore }: any) {
  const [ref, setRef] = useState<any>();

  return (
    // @ts-ignore
    <Canvas
      id="canvas"
      camera={{ position: [-10, 50, -10] }}
      onCreated={() => {
        setRef(document.getElementById("canvas"));
      }}>
      <TerrainFeaturesStoreProvider value={terrainFeaturesStore}>
        <LayoutStoreProvider value={layoutStore}>
          {ref && (
            <Controls
              attachedDomElement={ref}
              target={new THREE.Vector3(50, 0, 50)}
            />
          )}
          <Ligths />
          <Terrain position={[0, 0, 0]} />
        </LayoutStoreProvider>
      </TerrainFeaturesStoreProvider>
    </Canvas>
  );
}
