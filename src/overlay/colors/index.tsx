import React from "react";
import { map, range } from "lodash/fp";
import { observer } from "mobx-react";
import { Box, Text } from "theme-ui";
import { SketchPicker } from "react-color";

import { useTerrainFeaturesContext } from "../../state/terrain-features";

import { SingleColor } from "./single-color";

export const Colors = observer(() => {
  const store = useTerrainFeaturesContext();

  return (
    <Box
      sx={{
        bg: "background",
        width: "fit-content",
        borderRadius: 1,
        padding: 2,
        margin: 2,
        boxShadow: 0,
      }}>
      COLORS
      {map(
        (layerIndex) => (
          <SingleColor layerIndex={layerIndex} />
        ),
        range(0, store.layers?.length || 0)
      )}
    </Box>
  );
});
