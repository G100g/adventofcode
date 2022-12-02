import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const getData = (day) => {
    return import(resolve(__dirname, day, "data.js"));
};

/**
 *
 * @param {string} data
 * @returns []
 */
export const dataToArray = (data) => data.trim().split("\n");

let resultCount = 1;
export const printSolution = (result) => {
    console.log(`Solution ${resultCount} is ${result}`);
    resultCount++;
};

export const sumArrayValues = (a) => a.reduce((t, v) => t + v, 0);
