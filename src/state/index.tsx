import { useLocalStore } from "mobx-react";

export const useCreateStore = () => {
  const store = useLocalStore(() => ({
    seaLevel: 0.4,
    strength: 30,
    setSeaLevel: (value: number) => (store.seaLevel = value),
    setStrength: (value: number) => (store.strength = value),
  }));

  return store;
};

export type Store = ReturnType<typeof useCreateStore>;
