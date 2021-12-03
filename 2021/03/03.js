import { dataToArray, printSolution } from "../utils.js";

const getBit = (d, i) => d.map((row) => Number(row[i]));
const getLifeData = (isOxygen, d, pos = 0) => {
  const bit = getBit(d, pos).filter(Boolean).length >= d.length / 2 ? 1 : 0;

  if (d.length === 1) return d;
  return getLifeData(
    isOxygen,
    d.filter((v) => ((Number(v[pos]) === bit) ^ isOxygen ? 0 : 1)),
    ++pos
  );
};

export default (data) => {
  const d = dataToArray(data);

  let gamma = "";
  for (let i = 0; i < d[0].length; i++) {
    const bitGamma = getBit(d, i).filter(Boolean).length > d.length / 2 ? 1 : 0;
    gamma += bitGamma;
  }

  const epsilon = gamma
    .split("")
    .map((v) => Number(v) ^ 1)
    .join("");

  printSolution(parseInt(gamma, 2) * parseInt(epsilon, 2));

  const o2 = parseInt(getLifeData(true, d)[0], 2);
  const co2 = parseInt(getLifeData(false, d)[0], 2);

  printSolution(o2 * co2);
};
