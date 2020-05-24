import React, { useContext } from "react";

import { useLocalStore } from "mobx-react";

export const useCreateTerrainFeaturesStore = () => {
  const store = useLocalStore(() => ({
    minValue: 0.4,
    strength: 30,
    roughness: 4,
    baseRoughness: 0.5,
    persistance: 0.5,
    resolution: 255,
    numberOfLayers: 6,
  }));

  return store;
};

export type TerrainFeaturesStore = ReturnType<
  typeof useCreateTerrainFeaturesStore
>;

export const TerrainFeaturesContext = React.createContext<
  Partial<TerrainFeaturesStore>
>({});

export const useTerrainFeaturesContext = () =>
  useContext(TerrainFeaturesContext);

export const TerrainFeaturesStoreProvider = ({
  value,
  children,
}: React.PropsWithChildren<{ value: any }>) => {
  return (
    <TerrainFeaturesContext.Provider value={value}>
      {children}
    </TerrainFeaturesContext.Provider>
  );
};
