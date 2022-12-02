import { dataToArray, printSolution } from "../utils.js";

export default (data) => {
    const dataArray = dataToArray(data);

    let elfIndex = 0;
    const elfCalories = dataArray.reduce(
        (total, calories) => {
            if (calories === "") {
                elfIndex++;
                total[elfIndex] = 0;
                return total;
            }

            total[elfIndex] += parseInt(calories, 10);

            return total;
        },
        [0]
    );

    elfCalories.sort((a, b) => {
        return a > b ? -1 : 1;
    });

    printSolution(elfCalories[0]);

    printSolution(
        elfCalories
            .filter((_, index) => index < 3)
            .reduce((total, calories) => {
                return (total = total + calories);
            }, 0)
    );
};
