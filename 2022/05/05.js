import { dataToArray, printSolution } from "../utils.js";

const parseInput = (data) => {
    const [rawcrates, rawmoves] = data.split(/^\n/gm);
    const c = rawcrates.split("\n");
    c.pop();
    const numberofcols = Math.max(
        ...c
            .pop()
            .split(" ")
            .filter(Boolean)
            .map((c) => parseInt(c, 10))
    );
    const cratesMap = c.map((r) => {
        const crates = [];
        for (let i = 0; i < r.length; i += 4) {
            crates.push(r.substring(i + 1, i + 2).trim());
        }

        return crates;
    });

    const crates = [];

    for (let i = 0; i < numberofcols; i++) {
        crates.push(cratesMap.map((cratesRow) => cratesRow[i]).filter(Boolean));
    }

    const moves = dataToArray(rawmoves);

    return [crates, moves];
};

export default (data) => {
    const [crates, moves] = parseInput(data);

    moves.forEach((m) => {
        const [, qty, , from, , to] = m.split(" ");
        const cratesToMove = crates[from - 1].splice(0, qty).reverse();
        crates[to - 1] = [...cratesToMove, ...crates[to - 1]];
    });

    const result = crates.map((c) => c[0]).join("");

    printSolution(result);

    const [crates2, moves2] = parseInput(data);

    moves2.forEach((m) => {
        const [, qty, , from, , to] = m.split(" ");

        const cratesToMove = crates2[from - 1].splice(0, qty);

        crates2[to - 1] = [...cratesToMove, ...crates2[to - 1]];
    });

    const result2 = crates2.map((c) => c[0]).join("");

    printSolution(result2);
};
