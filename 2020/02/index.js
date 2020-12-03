const { readFile } = require("../utils");

const main = async () => {
  const file = await readFile(__dirname + "/input.txt", "utf8");

  let solution = 0;

  const passwords = file
    .split("\n")
    .map((row) => {
      const r = row.split(": ");
      const char = r[0].split(" ")[1];
      const range = r[0].split(" ")[0].split("-").map(Number);

      return {
        char,
        range,
        password: r[1],
      };
    })
    .forEach(({ password, range, char }) => {
      const charCount = password.replace(new RegExp(`[^${char}]`, "gi"), "")
        .length;

      if (charCount >= range[0] && charCount <= range[1]) {
        solution++;
      }
    });

  console.log(solution);
};

main();
