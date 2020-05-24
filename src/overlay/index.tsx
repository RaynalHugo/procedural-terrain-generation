import React from "react";
import { map } from "lodash/fp";

import { Box, Button, Label, Checkbox } from "theme-ui";

import { useTerrainFeaturesContext } from "../state/context";

import { sliders } from "./sliders";

export const Overlay = () => {
  const store = useTerrainFeaturesContext();

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
        {map(
          (Slider) => (
            //@ts-ignore
            <Slider />
          ),
          sliders
        )}
      </Box>
      <Button onClick={console.log}>Click Me</Button>
      <Box sx={{ m: 2, width: "fit-content" }}>
        <Label>
          <Checkbox defaultChecked={true} /> Blend
        </Label>
      </Box>
    </Box>
  );
};
