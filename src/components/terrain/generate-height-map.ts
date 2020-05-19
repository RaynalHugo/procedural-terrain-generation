import { range, flatMap } from "lodash/fp";

export const generateHeightMap = ({
  noiseMap,
  resolution,
}: {
  noiseMap: number[][];
  resolution: number;
}) => {
  const rangeOfResolutionPlus1 = range(0, resolution + 1);
  const vertices = flatMap(
    (x) => flatMap((y) => [x, noiseMap[x][y], y], rangeOfResolutionPlus1),
    rangeOfResolutionPlus1
  );

  const normals = flatMap(
    (x) => flatMap((y) => [0, Math.random(), 0], rangeOfResolutionPlus1),
    rangeOfResolutionPlus1
  );

  const indices = new Uint16Array(resolution * resolution * 6);

  let k = 0;
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const a = i * (resolution + 1) + (j + 1);
      const b = i * (resolution + 1) + j;
      const c = (i + 1) * (resolution + 1) + j;
      const d = (i + 1) * (resolution + 1) + (j + 1);

      // generate two faces (triangles) per iteration

      indices[k * 6] = a; // face one
      indices[k * 6 + 1] = b; // face one
      indices[k * 6 + 2] = d; // face one
      indices[k * 6 + 3] = b; // face two
      indices[k * 6 + 4] = c; // face two
      indices[k * 6 + 5] = d; // face two

      k++;
    }
  }

  return { vertices, indices, normals };
};
