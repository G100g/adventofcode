const { promisify } = require("util");

const fs = require("fs");

const readFile = promisify(fs.readFile);

module.exports = {
  readFile,
};
