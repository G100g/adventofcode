const { readFile } = require("../utils");

const main = async () => {
  const file = await readFile(__dirname + "/input.txt", "utf8");

  const numbers = file.split("\n").map(Number);

  let solution = 0;

  numbers.some((n, i, a) => {
    return a.some((sumTo) => {
      if (n + sumTo == 2020) {
        solution = n * sumTo;
        return true;
      }
      return false;
    });
  });

  console.log(solution);
};

main();
