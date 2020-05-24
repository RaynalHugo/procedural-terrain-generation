import React, { useState, useCallback } from "react";
import { get, map } from "lodash/fp";

import { Box, Slider, Text } from "theme-ui";

import { useTerrainFeaturesContext } from "../state/context";
import { observer } from "mobx-react";

import { TerrainFeaturesStore } from "../state";

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

    const setFromEvent = useCallback((event) => {
      // (store[key] as any) = event.target.value;

      (store[key] as any) = event.target.value;
    }, []);
    return (
      <>
        <Text>
          {label}: {value}
        </Text>
        <Slider
          min={min}
          max={max}
          step={step}
          sx={{ mt: 3, mb: 3 }}
          value={value}
          onChange={setFromEvent}
        />
      </>
    );
  });
};

const features = [
  {
    label: "baseRoughness",
    key: "baseRoughness",
    min: 0,
    max: 0.1,
    step: 0.001,
  },
  { label: "minValue", key: "minValue", min: 0, max: 1, step: 0.01 },
  { label: "persistance", key: "persistance", min: 0, max: 2, step: 0.01 },
  { label: "roughness", key: "roughness", min: 0, max: 10, step: 0.01 },
  { label: "strength", key: "strength", min: 0.1, max: 100, step: 0.1 },
  { label: "Layers", key: "numberOfLayers", min: 1, max: 10, step: 1 },
  { label: "Resolution", key: "resolution", min: 1, max: 255, step: 10 },
];

export const sliders = map(createSlider, features);
