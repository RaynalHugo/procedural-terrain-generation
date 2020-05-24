import React from "react";
import { ThemeProvider } from "theme-ui";

import "./App.css";
import { theme } from "./theme";

import { Scene } from "./scene";
import { Overlay } from "./overlay";

import { LayoutStoreProvider, useCreateLayoutStore } from "./state/layout";
import {
  TerrainFeaturesStoreProvider,
  useCreateTerrainFeaturesStore,
} from "./state/terrain-features";

function App() {
  const terrainFeaturesStore = useCreateTerrainFeaturesStore();
  const layoutStore = useCreateLayoutStore();

  return (
    <ThemeProvider theme={theme}>
      <Scene
        terrainFeaturesStore={terrainFeaturesStore}
        layoutStore={layoutStore}
      />
      <TerrainFeaturesStoreProvider value={terrainFeaturesStore}>
        <LayoutStoreProvider value={layoutStore}>
          <Overlay />
        </LayoutStoreProvider>
      </TerrainFeaturesStoreProvider>
    </ThemeProvider>
  );
}

export default App;
