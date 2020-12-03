const { readFile } = require("../utils");

const main = async () => {
  const file = await readFile(__dirname + "/input.txt", "utf8");

  const numbers = file.split("\n").map(Number);

  let solutionPartOne = 0;

  numbers.some((n, i, a) => {
    return a.some((sumTo) => {
      if (n + sumTo == 2020) {
        solutionPartOne = n * sumTo;
        return true;
      }
      return false;
    });
  });

  console.log(solutionPartOne);

  let solutionPartTwo = 0;

  numbers.some((a, i, numbersOrginal) => {
    return numbersOrginal.some((b) => {
      return numbersOrginal.some((c) => {
        if (a + b + c == 2020) {
          solutionPartTwo = a * b * c;
          return true;
        }
        return false;
      });
    });
  });

  console.log(solutionPartTwo);
};

main();
