import React, { useCallback } from "react";
import { get, map } from "lodash/fp";

import { Box, Slider, Text, Flex } from "theme-ui";

import { useTerrainFeaturesContext } from "../state/terrain-features";
import { observer } from "mobx-react";

import { TerrainFeaturesStore } from "../state/terrain-features";

const createSlider = ({
  label,
  key,
  min = 0,
  max = 1,
  step = 0.01,
}: {
  label: string;
  key: keyof TerrainFeaturesStore;
  min?: number;
  max?: number;
  step?: number;
}) => {
  return observer(() => {
    const store = useTerrainFeaturesContext();

    const value = get(key, store) as number;

    const setFromEvent = useCallback(
      (event) => {
        (store[key] as any) = Number(event.target.value);
      },
      [store]
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
  });
};

const features = [
  { label: "Min Value", key: "minValue", min: 0, max: 1, step: 0.01 },
  { label: "Strength", key: "strength", min: 0.1, max: 100, step: 0.1 },
  {
    label: "Base Roughness",
    key: "baseRoughness",
    min: 0,
    max: 1.5,
    step: 0.001,
  },
  { label: "Roughness", key: "roughness", min: 0, max: 10, step: 0.01 },
  { label: "Persistance", key: "persistance", min: 0, max: 2, step: 0.01 },
  { label: "Layers", key: "numberOfLayers", min: 1, max: 10, step: 1 },
  // { label: "Resolution", key: "resolution", min: 1, max: 255, step: 10 },
];

export const sliders = map(createSlider, features);
