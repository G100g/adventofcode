const { readFile } = require("../utils");

const replaceAt = (str, index, replacement) => {
  return (
    str.substr(0, index) + replacement + str.substr(index + replacement.length)
  );
};

const slops = async (stepRight = 3, stepDown = 1) => {
  const file = (await readFile(__dirname + "/input.txt", "utf8")).split("\n");

  let tree = 0;

  let x = stepRight;

  const [firstRow] = file.splice(0, 1);

  // console.log(firstRow + " | " + firstRow);

  while (file.length !== 0) {
    const rows = file.splice(0, stepDown);

    const row = rows.pop();

    if (!row) continue;

    if (x + 1 > row.length) {
      x = x - row.length;
    }

    const location = row[x];

    let d = "X";
    if (location === "#") {
      tree++;
      d = "O";
    }

    // rows.forEach((r) => console.log(`${r} | ${r}`));

    // console.log(row + " | " + replaceAt(row, x, d));

    x += stepRight;
  }

  console.log(`${tree} - ${stepRight}x${stepDown}`);
  console.log("");

  return tree;
};

const main = async () => {
  const solutionPartOne = await slops();

  console.log(`Solution Part One: ${solutionPartOne}`);
  console.log("");

  const results = await Promise.all([
    slops(1, 1),
    slops(3, 1),
    slops(5, 1),
    slops(7, 1),
    slops(1, 2),
  ]);

  const solutionPartTwo = results.reduce((t, r) => t * r, 1);

  console.log(`Solution Part Two: ${solutionPartTwo}`);
  console.log("");
};

main();
