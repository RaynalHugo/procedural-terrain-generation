import { useLocalStore } from "mobx-react";
import React, { useContext } from "react";

export const useCreateLayoutStore = () => {
  const store = useLocalStore(() => ({
    mode: "SELECT",

    setMode: (value: "COLORS" | "SELECT" | "TERRAIN") => (store.mode = value),
  }));

  return store;
};

export type LayoutStore = ReturnType<typeof useCreateLayoutStore>;

export const LayoutContext = React.createContext<Partial<LayoutStore>>({});

export const useLayoutContext = () => useContext(LayoutContext);

export const LayoutStoreProvider = ({
  value,
  children,
}: React.PropsWithChildren<{ value: any }>) => {
  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
