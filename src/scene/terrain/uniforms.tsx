import { map } from "lodash/fp";
import * as THREE from "three";

// import grass from "../../textures/grass.png";
// import rocks1 from "../../textures/rocks1.png";
// import rocks2 from "../../textures/rocks2.png";
// import sandyGrass from "../../textures/sandy-grass.png";
// import snow from "../../textures/snow.png";
// import stonyGround from "../../textures/stony-ground.png";
// import water from "../../textures/water.png";

// const blend = true;

// const waterTexture = new THREE.TextureLoader().load(water);

import { Color } from "../../state/terrain-features";

export const formatLayer = (blend: boolean) => ({
  color,
  baseHeight,
  baseBlend,
  noiseFactor,
  noiseFrequency,
  noiseOffset,
}: Color) => ({
  color: new THREE.Color(color),
  baseHeight: baseHeight,
  baseBlend: blend ? baseBlend : 0,
  noiseFactor,
  noiseFrequency,
  noiseOffset,
  // texture: waterTexture,
});

export const createUniforms = (
  minValue: number,
  strength: number,
  colors: Color[],
  blend: boolean = true
) => ({
  minValue: { value: minValue },
  strength: { value: strength },
  colors: {
    value: map(formatLayer(blend), colors),
  },
});
