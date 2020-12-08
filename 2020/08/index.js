const { readFile } = require("../utils");

const parseInstructions = (txt) => {
  return txt
    .split("\n")
    .map((r) => r.split(" "))
    .map(([cmd, arg]) => ({ cmd, arg: Number(arg) }));
};

/**
 *
 * @param {Array} ins
 */

const runCode = (ins) => {
  let acc = 0;
  const insRan = new WeakMap();
  let row = 0;
  let stopped = false;

  while (row !== ins.length - 1) {
    const action = ins[row];

    if (insRan.has(action)) {
      stopped = true;
      break;
    }

    insRan.set(action, action);

    switch (action.cmd) {
      case "jmp":
        row = row + action.arg;

        break;
      case "acc":
        acc += action.arg;
      case "nop":
      default:
        row++;
        if (row >= ins.length) {
          row = 0;
        }
        break;
    }
  }

  return { acc, stopped };
};

const toggleCmd = (cmd) => {
  switch (cmd) {
    case "nop":
      return "jmp";

    case "jmp":
      return "nop";
  }
  return cmd;
};

const fixCode = (ins) => {
  for (let index = 0; index < ins.length; index++) {
    // Fix cmd
    ins[index].cmd = toggleCmd(ins[index].cmd);

    const { acc, stopped } = runCode(ins);

    if (!stopped) {
      return acc;
    }

    // Revert code
    ins[index].cmd = toggleCmd(ins[index].cmd);
  }
};

const main = async () => {
  const instructions = parseInstructions(
    await readFile(__dirname + "/input.txt", "utf8")
  );

  const solutionPartOne = runCode(instructions).acc;
  console.log(`Solution Part One: ${solutionPartOne}`);

  const solutionPartTwo = fixCode(instructions);

  console.log(`Solution Part Two: ${solutionPartTwo}`);
};

main();
