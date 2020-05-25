import React from "react";
import { get } from "lodash/fp";
import { observer } from "mobx-react";
import { Box, Text } from "theme-ui";

import Color from "color";

import { useTerrainFeaturesContext } from "../../state/terrain-features";
import { useLayoutContext } from "../../state/layout";

export const SingleColor = observer(
  ({ layerIndex }: { layerIndex: number | null }) => {
    const terrainFeaturesStore = useTerrainFeaturesContext();
    const layoutStore = useLayoutContext();
    const color = get(`layers[${layerIndex}].color`, terrainFeaturesStore);

    if (color == null || layerIndex == null) return null;

    return (
      <Box
        onClick={() => layoutStore.setSelectLayer(layerIndex)}
        // onClick={() => setOpened((current) => !current)}
        sx={{
          width: "5.3em",
          fontSize: 0,
          paddingTop: 1,
          paddingBottom: 1,
          paddingLeft: 1,
          paddingRight: 1,
          borderRadius: 0,
          bg: color,
          boxShadow: 0,
          cursor: "pointer",
          color: Color(color).isLight() ? "black" : "white",
        }}>
        <Text>{color}</Text>
      </Box>
    );
  }
);
