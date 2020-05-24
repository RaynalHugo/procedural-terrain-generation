import React, { useContext } from "react";

import { TerrainFeaturesStore } from ".";

export const TerrainFeaturesContext = React.createContext<
  Partial<TerrainFeaturesStore>
>({});

export const useTerrainFeaturesContext = () =>
  useContext(TerrainFeaturesContext);

export const StoreProvider = ({
  value,
  children,
}: React.PropsWithChildren<{ value: any }>) => {
  return (
    <TerrainFeaturesContext.Provider value={value}>
      {children}
    </TerrainFeaturesContext.Provider>
  );
};
