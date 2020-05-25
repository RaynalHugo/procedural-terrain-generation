import React, { useContext } from "react";

import { observable } from "mobx";

export type Color = {
  color: string;
  baseHeight: number;
  baseBlend: number;
  noiseFactor: number;
  noiseFrequency: number;
  noiseOffset: number;
};

const defaults = {
  minValue: 0.4,
  strength: 30,
  roughness: 4,
  baseRoughness: 0.5,
  persistance: 0.5,
  resolution: 255,
  numberOfLayers: 6,
  layers: [
    {
      color: "#0062c4",
      baseHeight: 0,
      baseBlend: 0,
      noiseFactor: 0,
      noiseFrequency: 1,
      noiseOffset: 0,
      //   texture: waterTexture,
    },
    {
      color: "#0972d4",
      baseHeight: 0.1,
      baseBlend: 0.15,
      noiseFactor: 0,
      noiseFrequency: 1,
      noiseOffset: 0,
      //   texture: waterTexture,
    },
    {
      color: "#1982e4",
      baseHeight: 0.2,
      baseBlend: 0.15,
      noiseFactor: 0,
      noiseFrequency: 1,
      noiseOffset: 0,
      //   texture: waterTexture,
    },
    {
      color: "#c2b280",
      baseHeight: 0.28,
      baseBlend: 0.01,
      noiseFactor: 0,
      noiseFrequency: 1,
      noiseOffset: 0,
      //   texture: new THREE.TextureLoader().load(sandyGrass),
    },
    {
      color: "#63a375",
      baseHeight: 0.43,
      baseBlend: 0.05,
      noiseFactor: 0.1,
      noiseFrequency: 0.02,
      noiseOffset: 0,
      //   texture: new THREE.TextureLoader().load(grass),
    },
    {
      color: "#197278",
      baseHeight: 0.55,
      baseBlend: 0.08,
      noiseFactor: 0.3,
      noiseFrequency: 0.02,
      noiseOffset: 0,
      //   texture: new THREE.TextureLoader().load(stonyGround),
    },
    {
      color: "#a2abab",
      baseHeight: 0.7,
      baseBlend: 0.1,
      noiseFactor: 0.1,
      noiseFrequency: 0.02,
      noiseOffset: 0,
      //   texture: new THREE.TextureLoader().load(rocks1),
    },
    {
      color: "#ffffff",
      baseHeight: 0.75,
      baseBlend: 0.02,
      noiseFactor: 0.1,
      noiseFrequency: 0.02,
      noiseOffset: 0,
      //   texture: new THREE.TextureLoader().load(snow),
    },
  ],
  setLayer: (index: number) => (newValues: Partial<Color>) => {
    Object.assign(store.layers[index], newValues);
  },
};

const store = observable(defaults);

export type TerrainFeaturesStore = typeof defaults;

export const TerrainFeaturesContext = React.createContext<
  Partial<TerrainFeaturesStore>
>(store);

export const useTerrainFeaturesContext = () =>
  useContext(TerrainFeaturesContext);

export const TerrainFeaturesStoreProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  return (
    <TerrainFeaturesContext.Provider value={store}>
      {children}
    </TerrainFeaturesContext.Provider>
  );
};
