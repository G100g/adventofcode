import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import { getData } from "./utils.js";

const myArgs = process.argv.slice(2);

const argDay = Number(myArgs.pop());
const isTest = myArgs.includes("--test");

const day = `${argDay < 10 ? "0" : ""}${argDay}`;
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(`Running day ${day}${isTest ? " [TEST]" : ""}`);

import(path.resolve(__dirname, day, `${day}.js`)).then(async (module) => {
  const { test: testData, day: dayData } = await getData(day);
  module.default(isTest ? testData : dayData);
});
