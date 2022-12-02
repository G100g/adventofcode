import { dataToArray, printSolution } from "../utils.js";

export default (data) => {
    const score = {
        X: 1,
        Y: 2,
        Z: 3,
    };

    const moves = {
        AX: 3,
        AY: 6,
        AZ: 0,

        BX: 0,
        BY: 3,
        BZ: 6,

        CX: 6,
        CY: 0,
        CZ: 3,
    };

    const steps = dataToArray(data);

    const total = steps
        .map((moves) => moves.split(" "))
        .reduce((total, [opponent, me]) => {
            return (total += moves[`${opponent}${me}`] + score[me]);
        }, 0);

    printSolution(total);

    const movesTwo = {
        AX: 3,
        AY: 1,
        AZ: 2,

        BX: 1,
        BY: 2,
        BZ: 3,

        CX: 2,
        CY: 3,
        CZ: 1,
    };

    const totalSecond = steps
        .map((moves) => moves.split(" "))
        .reduce((total, [opponent, me]) => {
            total += me === "Y" ? 3 : me === "Z" ? 6 : 0;

            total += movesTwo[`${opponent}${me}`];

            return total;
        }, 0);

    printSolution(totalSecond);
};
