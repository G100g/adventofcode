const { readFile } = require("../utils");

const main = async () => {
  const file = await readFile(__dirname + "/input.txt", "utf8");

  const solutionPartOne = 0;
  console.log(`Solution Part One: ${solutionPartOne}`);

  const solutionPartTwo = 0;

  console.log(`Solution Part Two: ${solutionPartTwo}`);
};

main();
