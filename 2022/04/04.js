import { dataToArray, printSolution } from "../utils.js";

const getSectionsFromRange = (range) => {
    const [from, to] = range.split("-");
    return [parseInt(from, 10), parseInt(to, 10)];
};

export default (data) => {
    const sections = dataToArray(data);

    const contained = sections
        .map((p) => {
            const [a, b] = p.split(",");
            const [fromA, toA] = getSectionsFromRange(a);
            const [fromB, toB] = getSectionsFromRange(b);

            const isAContainedInB = fromA >= fromB && toA <= toB;
            const isBContainedInA = fromB >= fromA && toB <= toA;

            return isAContainedInB || isBContainedInA;
        })
        .filter(Boolean);

    printSolution(contained.length);

    const overlaps = sections
        .map((p) => {
            const [a, b] = p.split(",");
            const [fromA, toA] = getSectionsFromRange(a);
            const [fromB, toB] = getSectionsFromRange(b);

            return fromA <= toB && toA >= fromB;
        })
        .filter(Boolean);

    printSolution(overlaps.length);
};
