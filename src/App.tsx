import React, { useState } from "react";
import { ThemeProvider } from "theme-ui";

import "./App.css";
import { theme } from "./theme";

import { Scene } from "./scene";
import { Overlay } from "./overlay";

function App() {
  const [state, setState] = useState({ seaLevel: 0.4 });
  return (
    <ThemeProvider theme={theme}>
      <Scene state={state} setState={setState} />
      <Overlay state={state} setState={setState} />
    </ThemeProvider>
  );
}

export default App;
