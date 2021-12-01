import { dataToArray, printSolution } from "../utils.js";

const countIncSteps = (data) => {
  return data.reduce((inc, currentValue, i, a) => {
    const previousValue = a[i - 1] || currentValue;
    const newInc = currentValue - previousValue;

    if (newInc > 0) {
      inc++;
    }

    return inc;
  }, 0);
};

const getStepGroups = (data) => {
  const groups = [];

  while (data.length > 2) {
    const window = data.slice(0, 3).map(Number);
    groups.push(window[0] + window[1] + window[2]);
    data.shift();
  }
  return groups;
};

export default (data) => {
  const dataArray = dataToArray(data);

  printSolution(countIncSteps(dataArray));

  printSolution(countIncSteps(getStepGroups(dataArray)));
};
