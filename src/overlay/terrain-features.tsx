import React from "react";
import { map } from "lodash/fp";

import { Box } from "theme-ui";

import { TerrainFeatureSlider } from "./sliders";

import { TerrainFeaturesStore } from "../state/terrain-features";

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
        (feature) => (
          <TerrainFeatureSlider key={feature.propName} {...feature} />
        ),
        features
      )}
    </Box>
  );
};

const features = [
  { label: "Min Value", propName: "minValue", min: 0, max: 1, step: 0.01 },
  { label: "Strength", propName: "strength", min: 0.1, max: 100, step: 0.1 },
  {
    label: "Base Roughness",
    propName: "baseRoughness",
    min: 0,
    max: 1.5,
    step: 0.001,
  },
  { label: "Roughness", propName: "roughness", min: 0, max: 10, step: 0.01 },
  { label: "Persistance", propName: "persistance", min: 0, max: 2, step: 0.01 },
  { label: "Layers", propName: "numberOfLayers", min: 1, max: 10, step: 1 },
  // { label: "Resolution", key: "resolution", min: 1, max: 255, step: 10 },
] as {
  label: string;
  propName: keyof TerrainFeaturesStore;
  min: number;
  max: number;
  step: number;
}[];
