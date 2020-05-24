import React, { useState } from "react";
import { ThemeProvider } from "theme-ui";

import "./App.css";
import { theme } from "./theme";

import { Scene } from "./scene";
import { Overlay } from "./overlay";

import { StoreProvider } from "./state/context";
import { useCreateTerrainFeaturesStore } from "./state";

function App() {
  const store = useCreateTerrainFeaturesStore();

  return (
    <ThemeProvider theme={theme}>
      <Scene store={store} />
      <StoreProvider value={store}>
        <Overlay />
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
