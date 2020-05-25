import React from "react";
import { map } from "lodash/fp";

import { Box } from "theme-ui";

import { sliders } from "./sliders";

export const TerrainFeatures = () => {
  return (
    <Box
      sx={{
        bg: "background",
        width: "fit-content",
        borderRadius: 1,
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
  );
};
