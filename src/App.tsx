import React, { useState } from "react";
import { ThemeProvider } from "theme-ui";

import "./App.css";
import { theme } from "./theme";

import { Scene } from "./scene";
import { Overlay } from "./overlay";

import { StoreProvider } from "./state";

function App() {
  const [state, setState] = useState({ seaLevel: 0.4, strength: 30 });
  return (
    <ThemeProvider theme={theme}>
      <Scene state={state} setState={setState} />
      <StoreProvider value={{ state, setState }}>
        <Overlay />
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
