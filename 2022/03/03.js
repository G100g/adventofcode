import { dataToArray, printSolution } from "../utils.js";

const getItemTypeValue = (char) => {
    const code = char.charCodeAt(0);

    return code > 90 ? code - 96 : code - 38;
};

export default (data) => {
    const backpack = dataToArray(data);

    const total = backpack
        .map((pack) => pack.split(""))
        .map((pack) => {
            const a = pack.slice(0, pack.length / 2);
            const b = pack.slice(pack.length / 2);
            const r = b.filter((item) => a.includes(item));
            return r.pop();
        })
        .reduce((total, item) => {
            total += getItemTypeValue(item);
            return total;
        }, 0);

    printSolution(total);

    const alphabetLowerCase = "abcdefghijklmnopqrstuvwxyz".split("");
    const alphabet = [
        ...alphabetLowerCase.map((char) => char.toUpperCase()),
        ...alphabetLowerCase,
    ];

    const groupitems = [];

    for (let i = 0; i < backpack.length; i += 3) {
        groupitems.push([backpack[i], backpack[i + 1], backpack[i + 2]]);
    }

    const totalSecond = groupitems
        .map((group) => {
            const type = alphabet
                .map((char) => {
                    return (
                        group[0].includes(char) &&
                        group[1].includes(char) &&
                        group[2].includes(char) &&
                        char
                    );
                })
                .filter(Boolean);

            return type;
        })
        .reduce((total, [item]) => {
            total += getItemTypeValue(item);
            return total;
        }, 0);

    printSolution(totalSecond);
};
