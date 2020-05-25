import React from "react";
import { map, range } from "lodash/fp";
import { observer } from "mobx-react";
import { Box, Flex, Grid, Text } from "theme-ui";

import { useTerrainFeaturesContext } from "../../state/terrain-features";
import { useLayoutContext } from "../../state/layout";

import { SingleColor } from "./single-color";
import { LayerDetails } from "./layer-details";

export const Colors = observer(() => {
  const terrainFeaturesStore = useTerrainFeaturesContext();
  const layoutStore = useLayoutContext();

  return (
    <Flex sx={{ flexDirection: "row", width: "fit-content" }}>
      <Box
        sx={{
          height: "fit-content",
          bg: "background",
          width: "fit-content",
          borderRadius: 1,
          padding: 2,
          margin: 2,
          boxShadow: 0,
        }}>
        Layers
        <Grid
          sx={{
            gridTemplateColumns: "auto auto",
            gap: 2,
            padding: 1,
          }}>
          {map(
            (layerIndex) => (
              <>
                <Text>{layerIndex}</Text>
                <SingleColor layerIndex={layerIndex} />
              </>
            ),
            range(0, terrainFeaturesStore.layers?.length || 0)
          )}
        </Grid>
      </Box>
      {layoutStore.selectedLayer !== null && (
        <Box
          sx={{
            height: "fit-content",
            bg: "background",
            width: "fit-content",
            borderRadius: 1,
            padding: 2,
            margin: 2,
            boxShadow: 0,
          }}>
          <LayerDetails layerIndex={layoutStore.selectedLayer} />
        </Box>
      )}
    </Flex>
  );
});
