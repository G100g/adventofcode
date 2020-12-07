const { readFile } = require("../utils");

const hasShinyBagColor = (bag, rules) => {
  const bagRules = rules[bag];

  if (bagRules.content.some((c) => c.bag === "shiny gold")) {
    return true;
  } else {
    return bagRules.content.some((b) => hasShinyBagColor(b.bag, rules));
  }
};

const countAllBags = (bag, rules, countMe = false) => {
  const { count, content } = rules[bag];

  return content.reduce(
    (t, { bag, count }) => {
      return t + count * countAllBags(bag, rules, true);
    },
    countMe ? 1 : 0
  );
};

const main = async () => {
  const file = (await readFile(__dirname + "/input.txt", "utf8")).split("\n");

  const rules = file.reduce((o, rule) => {
    const [bagColor, contentRules] = rule.split("contain");

    const content =
      contentRules.indexOf("no other bag") !== -1
        ? []
        : contentRules.split(",").map((r) => {
            r = r.trim();
            return {
              bag: r
                .substring(r.indexOf(" ") + 1)
                .replace(" bags", "")
                .replace(" bag", "")
                .replace(".", ""),
              count: Number(r.substr(0, r.indexOf(" ") + 1)),
            };
          });

    const bagName = bagColor.replace(" bags ", "");

    o[bagName] = {
      content,
      count: content.reduce((t, v) => {
        return (t += v.count);
      }, 0),
    };
    return o;
  }, {});

  const solutionPartOne = Object.keys(rules).filter((b) => {
    return hasShinyBagColor(b, rules);
  }).length;
  console.log(`Solution Part One: ${solutionPartOne}`);

  const solutionPartTwo = countAllBags("shiny gold", rules);

  console.log(`Solution Part Two: ${solutionPartTwo}`);
};

main();
