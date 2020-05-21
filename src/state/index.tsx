import React, { useContext } from "react";

export const StoreContext = React.createContext<{
  state: any;
  setState: (input: any) => void;
}>({ state: {}, setState: () => null });

export const useStoreContext = () => useContext(StoreContext);

export const StoreProvider = ({
  value,
  children,
}: React.PropsWithChildren<{ value: any }>) => {
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
