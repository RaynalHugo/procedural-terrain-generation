import React, { useRef } from "react";
import { get } from "lodash/fp";
import { observer } from "mobx-react";

import { ChromePicker } from "react-color";

import { useTerrainFeaturesContext, Color } from "../../state/terrain-features";
// import { useLayoutContext } from "../../state/layout";
import { Slider, Box, Flex, Text } from "theme-ui";

export const LayerDetails = observer(
  ({ layerIndex }: { layerIndex: number | null }) => {
    const terrainFeaturesStore = useTerrainFeaturesContext();
    // const layoutStore = useLayoutContext();

    const ColorPickerRef = useRef();

    const color = get(`layers[${layerIndex}].color`, terrainFeaturesStore);

    if (color == null || layerIndex == null) return null;
    console.log(ColorPickerRef);
    return (
      <>
        <ChromePicker
          //@ts-ignore
          // ref={ColorPickerRef}
          color={color}
          onChange={({ hex }) =>
            terrainFeaturesStore.setLayer(layerIndex)({ color: hex })
          }
        />

        <GenericSlider feature={"baseBlend"} layerIndex={layerIndex} />
        <GenericSlider feature={"baseHeight"} layerIndex={layerIndex} />
        <GenericSlider feature={"noiseFactor"} layerIndex={layerIndex} />
        <GenericSlider feature={"noiseFrequency"} layerIndex={layerIndex} />
        <GenericSlider feature={"noiseOffset"} layerIndex={layerIndex} />
      </>
    );
  }
);

const GenericSlider = observer(
  ({ layerIndex, feature }: { layerIndex: number; feature: keyof Color }) => {
    const terrainFeaturesStore = useTerrainFeaturesContext();
    const value = terrainFeaturesStore.layers[layerIndex][feature];

    return (
      <Box p={2}>
        <Flex sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{feature}:</Text>
          <Text sx={{ width: "3em", textAlign: "right" }}>{value}</Text>
        </Flex>
        <Slider
          min={0}
          max={1}
          step={0.01}
          sx={{ mt: 2, mb: 1 }}
          value={value}
          onChange={(event) =>
            terrainFeaturesStore.setLayer(layerIndex)({
              [feature]: Number(event.target.value),
            })
          }
        />
      </Box>
    );
  }
);
