import React, { useContext } from "react";
import { observable } from "mobx";

export type LayoutStore = {
  mode: "COLORS" | "SELECT" | "TERRAIN";
  setMode: (mode: "COLORS" | "SELECT" | "TERRAIN") => void;
  selectedLayer: number | null;
  setSelectLayer: (layerIndex: number) => void;
  deselectLayer: () => void;
};

const store = observable({
  mode: "COLORS",
  setMode: (value: "COLORS" | "SELECT" | "TERRAIN") => (store.mode = value),
  selectedLayer: null,
  setSelectLayer: (value) => (store.selectedLayer = value),
  deselectLayer: () => (store.selectedLayer = null),
}) as LayoutStore;

export const useCreateLayoutStore = () => {
  return store;
};

export const LayoutContext = React.createContext<LayoutStore>(store);

export const useLayoutContext = () => useContext(LayoutContext);

export const LayoutStoreProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  return (
    <LayoutContext.Provider value={store}>{children}</LayoutContext.Provider>
  );
};

export type TerrainFeaturesStore = { mode: "COLORS" | "SELECT" | "TERRAIN" };
