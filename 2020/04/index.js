const { readFile } = require("../utils");

const validateByr = (byr) => {
  const value = Number(byr);

  return value >= 1920 && value <= 2002;
};
const validateIyr = (iyr) => {
  const value = Number(iyr);

  return value >= 2010 && value <= 2020;
};
const validateEyr = (eyr) => {
  const value = Number(eyr);

  return value >= 2020 && value <= 2030;
};

const validateHgt = (hgt) => {
  if (!hgt) return false;
  const measureType = hgt.substr(-2, 2);
  const measureValue = Number(hgt.substr(0, hgt.length - 2));

  let valid = false;

  switch (measureType) {
    case "cm":
      valid = measureValue >= 150 && measureValue <= 193;
      break;

    case "in":
      valid = measureValue >= 59 && measureValue <= 76;
      break;
  }

  // console.log(`${hgt} > ${measureType}: ${measureValue} - ${valid}`);

  return valid;
};
const validateHcl = (hcl) => {
  const valid = /^#[a-fA-F0-9]{6}$/.test(hcl);
  // console.log(`hcl: ${hcl} - ${valid}`);

  return valid;
};
const validateEcl = (ecl) => {
  const valid = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].some(
    (c) => c === ecl
  );

  // console.log(`ecl: ${ecl} - ${valid}`);

  return valid;
};
const validatePid = (pid) => {
  const valid = /^\d{9}$/.test(pid);

  // console.log(`pid: ${pid} - ${valid}`);

  return valid;
};

const main = async () => {
  const file = await readFile(__dirname + "/input.txt", "utf8");

  const passports = file.split("\n\n").map((d) => {
    const passport = d
      .replace(/\n/gi, " ")
      .split(" ")
      .map((v) => v.split(":"))
      .reduce((o, [key, value]) => {
        o[key] = value;
        return o;
      }, {});

    return passport;
  });

  // console.dir(passports, { depth: 4 });

  const passportsWithAllRequiredFields = passports.filter(
    ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => {
      return byr && iyr && eyr && hgt && hcl && ecl && pid;
    }
  );

  const solutionPartOne = passportsWithAllRequiredFields.length;
  console.log(`Solution Part One: ${solutionPartOne}`);

  const solutionPartTwo = passportsWithAllRequiredFields.filter(
    ({ byr, iyr, eyr, hgt, hcl, ecl, pid }) => {
      return (
        validateByr(byr) &&
        validateIyr(iyr) &&
        validateEyr(eyr) &&
        validateHgt(hgt) &&
        validateHcl(hcl) &&
        validateEcl(ecl) &&
        validatePid(pid)
      );
    }
  ).length;

  console.log(`Solution Part Two: ${solutionPartTwo}`);
};

main();
