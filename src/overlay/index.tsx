import React from "react";
import { Box, Select, Text } from "theme-ui";
import { observer } from "mobx-react";

import { useLayoutContext } from "../state/layout";

import { TerrainFeatures } from "./terrain-features";
import { Colors } from "./colors";

export const Overlay = observer(() => {
  const store = useLayoutContext();

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
          borderRadius: 1,
          padding: 2,
          margin: 2,
          boxShadow: 0,
        }}>
        <Text>Mode</Text>
        <Select
          sx={{ width: 120 }}
          placeholder="Select..."
          onChange={(event) =>
            // @ts-ignore
            store.setMode && store.setMode(event.target.value)
          }>
          <option value={"SELECT"}>Select...</option>
          <option value={"COLORS"}>Colors</option>
          <option value={"TERRAIN"}>Terrain</option>
        </Select>
      </Box>
      {store.mode === "TERRAIN" && <TerrainFeatures />}
      {store.mode === "COLORS" && <Colors />}
    </Box>
  );
});
