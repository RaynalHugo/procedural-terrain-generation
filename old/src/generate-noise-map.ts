import { range, map, reduce, clamp } from "lodash/fp";
import { Noise } from "noisejs";

const noise = new Noise(0.2823);

const simplex01 = (x, y) => (noise.simplex2(x, y) + 1) * 0.5;
const perlin01 = (x, y) => (noise.perlin2(x, y) + 1) * 0.5;
const reversedSin = (x, y) => 1 - Math.abs(Math.sin(x)) * Math.abs(Math.sin(y));
const simplex01Sin = (x, y) => 1 - Math.abs(Math.sin(simplex01(x, y)));

export const generateNoiseMap = ({
  noiseFunction = perlin01,
  strength = 5,
  numberOfLayers = 4,
  baseRoughness = 0.05,
  roughness = 3,
  persistance = 0.5,
  minValue = 0,
  resolution,
}) => {
  const range0ResolutionPlus1 = range(0, resolution + 1);
  const baseAccumulator = {
    noiseValue: 0,
    frequency: baseRoughness,
    amplitude: 1,
  };

  const theoricalMax = reduce(
    ({ noiseValue, frequency, amplitude }) => {
      const newNoiseValue = noiseValue + 1 * amplitude;

      return {
        noiseValue: newNoiseValue,
        frequency: frequency * roughness,
        amplitude: amplitude * persistance,
      };
    },
    baseAccumulator,
    range(0, numberOfLayers)
  ).noiseValue;

  const theoricalMin = reduce(
    ({ noiseValue, frequency, amplitude }) => {
      const newNoiseValue = noiseValue + 0 * amplitude;

      return {
        noiseValue: newNoiseValue,
        frequency: frequency * roughness,
        amplitude: amplitude * persistance,
      };
    },
    baseAccumulator,
    range(0, numberOfLayers)
  ).noiseValue;

  // 0.45 to counter random distribution
  const randomCorrection = 0.45;

  const lerp = (value) =>
    clamp(
      0,
      1,
      (value - (theoricalMin + randomCorrection)) /
        (theoricalMax - theoricalMin - 2 * randomCorrection)
    );

  const iteratee = (x, y) => ({ noiseValue, frequency, amplitude }) => {
    const newNoiseValue =
      noiseValue + noiseFunction(x * frequency, y * frequency) * amplitude;

    return {
      noiseValue: newNoiseValue,
      frequency: frequency * roughness,
      amplitude: amplitude * persistance,
    };
  };

  const evaluate = (x, y) =>
    Math.max(
      minValue,
      lerp(
        reduce(iteratee(x, y), baseAccumulator, range(0, numberOfLayers))
          .noiseValue
      )
    ) * strength;

  return map(
    (x) => map((y) => evaluate(x, y), range0ResolutionPlus1),
    range0ResolutionPlus1
  );
};
