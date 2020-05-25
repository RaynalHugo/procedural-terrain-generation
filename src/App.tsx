import React from "react";
import { ThemeProvider } from "theme-ui";

import "./App.css";
import { theme } from "./theme";

import { Scene } from "./scene";
import { Overlay } from "./overlay";

import { LayoutStoreProvider } from "./state/layout";
import { TerrainFeaturesStoreProvider } from "./state/terrain-features";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Scene />
      <TerrainFeaturesStoreProvider>
        <LayoutStoreProvider>
          <Overlay />
        </LayoutStoreProvider>
      </TerrainFeaturesStoreProvider>
    </ThemeProvider>
  );
}

export default App;
