import React, { useCallback } from "react";
import { get } from "lodash/fp";

import { Box, Slider, Text, Flex } from "theme-ui";

import { useTerrainFeaturesContext } from "../state/terrain-features";
import { observer } from "mobx-react";

import { TerrainFeaturesStore } from "../state/terrain-features";

export const TerrainFeatureSlider = observer(
  ({
    label,
    propName,
    min = 0,
    max = 1,
    step = 0.01,
  }: {
    label: string;
    propName: keyof TerrainFeaturesStore;
    min?: number;
    max?: number;
    step?: number;
  }) => {
    const store = useTerrainFeaturesContext();

    const value = store[propName] as number;

    const setFromEvent = useCallback(
      (event) => {
        (store[propName] as any) = Number(event.target.value);
      },
      [propName, store]
    );
    return (
      <Box p={2}>
        <Flex sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>{label}:</Text>
          <Text sx={{ width: "3em", textAlign: "right" }}>{value}</Text>
        </Flex>
        <Slider
          min={min}
          max={max}
          step={step}
          sx={{ mt: 2, mb: 1 }}
          value={value}
          onChange={setFromEvent}
        />
      </Box>
    );
  }
);
