const { readFile } = require("../utils");

const main = async () => {
  const answers = (await readFile(__dirname + "/input.txt", "utf8")).split(
    "\n\n"
  );

  const solutionPartOne = answers.reduce((total, group) => {
    total += new Set(group.replace(/\n/g, "").split("")).size;
    return total;
  }, 0);

  console.log(`Solution Part One: ${solutionPartOne}`);

  const solutionPartTwo = answers.reduce((total, group) => {
    const groupAnswers = group.replace(/\n/g, "").split("");
    groupAnswers.sort();

    const groupEntries = group.split("\n").length;

    const yesAnswers = Object.entries(
      groupAnswers.reduce((o, yes) => {
        o[yes] = o[yes] !== undefined ? ++o[yes] : 1;

        return o;
      }, {})
    ).filter(([key, value]) => {
      return value === groupEntries;
    }).length;

    return total + yesAnswers;
  }, 0);

  console.log(`Solution Part Two: ${solutionPartTwo}`);
};

main();
