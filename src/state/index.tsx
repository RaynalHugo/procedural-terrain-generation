import { useLocalStore } from "mobx-react";

export const useCreateTerrainFeaturesStore = () => {
  const store = useLocalStore(() => ({
    minValue: 0.4,
    strength: 30,
    roughness: 4,
    baseRoughness: 0.01,
    persistance: 0.5,
    resolution: 255,
    numberOfLayers: 6,
  }));

  return store;
};

export type TerrainFeaturesStore = ReturnType<
  typeof useCreateTerrainFeaturesStore
>;
