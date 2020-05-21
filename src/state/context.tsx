import React, { useContext } from "react";

import { Store } from ".";

export const StoreContext = React.createContext<Partial<Store>>({});

export const useStoreContext = () => useContext(StoreContext);

export const StoreProvider = ({
  value,
  children,
}: React.PropsWithChildren<{ value: any }>) => {
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
