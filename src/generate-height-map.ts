import { range, flatMap } from "lodash/fp";

export const generateHeightMap = ({ noiseMap, resolution }) => {
  const rangeOfResolutionPlus1 = range(0, resolution + 1);
  const vertices = flatMap(
    x => flatMap(y => [x, noiseMap[x][y], y], rangeOfResolutionPlus1),
    rangeOfResolutionPlus1
  );

  const normals = flatMap(
    x => flatMap(y => [0, Math.random(), 0], rangeOfResolutionPlus1),
    rangeOfResolutionPlus1
  );

  const indices = [];

  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const a = i * (resolution + 1) + (j + 1);
      const b = i * (resolution + 1) + j;
      const c = (i + 1) * (resolution + 1) + j;
      const d = (i + 1) * (resolution + 1) + (j + 1);

      // generate two faces (triangles) per iteration

      indices.push(a, b, d); // face one
      indices.push(b, c, d); // face two
    }
  }

  return { vertices, indices, normals };
};
