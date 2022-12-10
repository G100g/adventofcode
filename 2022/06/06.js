import { printSolution } from "../utils.js";
const checkSequence = (sequence, packetLength = 4) => {
    let last = "";
    for (let i = 0; i < sequence.length; i++) {
        const c = sequence[i];

        if (last.includes(c) || last.length === packetLength) {
            break;
        } else {
            last += c;
        }
    }

    if (last.length < packetLength) {
        return checkSequence(sequence.slice(1), packetLength);
    }

    return last;
};
export default (data) => {
    const sequence = data.split("");

    const marker = checkSequence(sequence);
    const result = data.indexOf(marker) + 4;
    printSolution(result);

    const marker2 = checkSequence(sequence, 14);
    const result2 = data.indexOf(marker2) + 14;
    printSolution(result2);
};
