const { readFile } = require("../utils");

const replaceAt = (str, index, replacement) => {
  return (
    str.substr(0, index) + replacement + str.substr(index + replacement.length)
  );
};

const slops = (area, stepRight = 3, stepDown = 1) => {
  let tree = 0;

  let x = stepRight;

  const [firstRow] = area.splice(0, 1);

  // console.log(firstRow + " | " + firstRow);

  while (area.length !== 0) {
    const rows = area.splice(0, stepDown);

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
  const file = (await readFile(__dirname + "/input.txt", "utf8")).split("\n");

  const solutionPartOne = await slops(file.slice());

  console.log(`Solution Part One: ${solutionPartOne}`);
  console.log("");

  const results = [
    slops(file.slice(), 1, 1),
    slops(file.slice(), 3, 1),
    slops(file.slice(), 5, 1),
    slops(file.slice(), 7, 1),
    slops(file.slice(), 1, 2),
  ];

  const solutionPartTwo = results.reduce((t, r) => t * r, 1);

  console.log(`Solution Part Two: ${solutionPartTwo}`);
  console.log("");
};

main();
