import React, { useContext } from "react";
import { observable } from "mobx";

const store = observable({
  mode: "COLORS",
  setMode: (value: "COLORS" | "SELECT" | "TERRAIN") => (store.mode = value),
});

export const useCreateLayoutStore = () => {
  return store;
};

export type LayoutStore = ReturnType<typeof useCreateLayoutStore>;

export const LayoutContext = React.createContext<Partial<LayoutStore>>({});

export const useLayoutContext = () => useContext(LayoutContext);

export const LayoutStoreProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  return (
    <LayoutContext.Provider value={store}>{children}</LayoutContext.Provider>
  );
};

export type TerrainFeaturesStore = { mode: "COLORS" | "SELECT" | "TERRAIN" };
