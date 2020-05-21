import React, { useState, useCallback } from "react";
import { set } from "lodash/fp";

import { Box, Slider, Text } from "theme-ui";

import { useStoreContext } from "../state";

export const Overlay = () => {
  const { state, setState } = useStoreContext();
  const seaLevel = state.seaLevel;
  const setSeaLevel = useCallback(
    (event) => setState(set("seaLevel", event.target.value / 100)),
    [setState]
  );

  const strength = state.strength;
  const setStrength = useCallback(
    (event) => setState(set("strength", event.target.value)),
    [setState]
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
        <Text>Sea Level</Text>

        <Slider
          sx={{ mt: 3, mb: 3 }}
          value={seaLevel * 100}
          onChange={setSeaLevel}
        />

        <Text>Strength</Text>

        <Slider sx={{ mt: 3, mb: 3 }} value={strength} onChange={setStrength} />
      </Box>
    </Box>
  );
};
