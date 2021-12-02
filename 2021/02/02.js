import { dataToArray, printSolution } from "../utils.js";

export default (data) => {
  const moves = dataToArray(data).map((row) => ({
    command: row[0],
    value: Number(row.split(" ")[1]),
  }));

  const resultOne = moves.reduce(
    (result, { command, value }) => {
      switch (command) {
        case "f":
          result.h += value;
          break;
        case "u":
          result.d -= value;
          break;
        case "d":
          result.d += value;

          break;
      }

      return result;
    },
    { d: 0, h: 0 }
  );

  printSolution(resultOne.d * resultOne.h);

  const resultTwo = moves.reduce(
    (result, { command, value }) => {
      switch (command) {
        case "f":
          result.h += value;
          result.d += result.a * value;
          break;
        case "u":
          result.a -= value;
          break;
        case "d":
          result.a += value;
          break;
      }
      return result;
    },
    { d: 0, h: 0, a: 0 }
  );
  printSolution(resultTwo.d * resultTwo.h);
};
