import React, { useState, useCallback } from "react";
import { set } from "lodash/fp";

import { Box, Slider, Text } from "theme-ui";

import { useStoreContext } from "../state/context";
import { useObserver } from "mobx-react";

import { SeaLevel, Strength } from "./sliders";

export const Overlay = () => {
  const store = useStoreContext();
  const { setStrength, setSeaLevel } = useObserver(() => {
    const { setStrength, setSeaLevel } = store;
    return { setStrength, setSeaLevel };
  });
  const seaLevel = useObserver(() => store.seaLevel);
  const strength = useObserver(() => store.strength);
  const setSeaLevelFromEvent = useCallback(
    (event) => setSeaLevel && setSeaLevel(event.target.value / 100),
    []
  );

  const setStrengthFromEvent = useCallback(
    (event) => setStrength && setStrength(event.target.value),
    []
  );

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        "*": { pointerEvents: "all" },
      }}>
      <Box
        sx={{
          bg: "background",
          width: "fit-content",
          borderRadius: 0,
          padding: 1,
          margin: 2,
          boxShadow: 0,
        }}>
        <SeaLevel />
        <Strength />
      </Box>
    </Box>
  );
};
