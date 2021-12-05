import { dataToArray, printSolution } from "../utils.js";

const printGrid = (grid) => {
  for (let row of grid) {
    console.log(row.map((v) => (v === 0 ? "." : v)).join(""));
  }
};
/**
 *
 * @typedef {Number[]} Point
 */
/**
 *
 * @param {Point[]} points
 */
const calculateLinePoints = (points) => {};

export default (data) => {
  const lines = dataToArray(data).map((v) =>
    v.split(" -> ").map((v) => v.split(",").map(Number))
  );
  const grid = new Array(10).fill(new Array(10).fill(0));

  const hvlines = lines
    .filter((v) => {
      const [x0, y0] = v[0];
      const [x1, y1] = v[1];
      return x0 === x1 || y0 === y1;
    })
    .map((points) => [...points, calculateLinePoints(points)]);

  console.log(lines);
  console.log(hvlines);

  printGrid(grid);

  printSolution();

  printSolution();
};
