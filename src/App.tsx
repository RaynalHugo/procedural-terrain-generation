import React from "react";
import { Canvas } from "react-three-fiber";
import "./App.css";

import { Terrain } from "./components/terrain";
import { Ligths } from "./components/lights";
import { Controls } from "./components/controls";

function App() {
  return (
    <Canvas camera={{ position: [0, 0, -10] }}>
      <Controls />
      <Ligths />
      <Terrain position={[0, 0, 0]} />
    </Canvas>
  );
}

export default App;
