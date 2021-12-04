import { dataToArray, printSolution, sumArrayValues } from "../utils.js";

/**
 *
 * @param {string} row
 * @returns
 */
const createBoardRow = (row) => ({
  numbers: [...row.matchAll(/(\d+)/g)].map((v) => Number(v[0])),
  flags: 0,
});

const createBoardCol = (pos, ...rows) => ({
  numbers: rows.map((r) => Number(r.numbers[pos])),
  flags: 0,
});

/**
 *
 * @param {string[]} rows
 * @returns
 */
const createBoards = (inputRows) => {
  const rows = [...inputRows];
  rows.shift();

  const boards = [];

  while (rows.length > 4) {
    const row0 = createBoardRow(rows[0]);
    const row1 = createBoardRow(rows[1]);
    const row2 = createBoardRow(rows[2]);
    const row3 = createBoardRow(rows[3]);
    const row4 = createBoardRow(rows[4]);

    const col0 = createBoardCol(0, row0, row1, row2, row3, row4);
    const col1 = createBoardCol(1, row0, row1, row2, row3, row4);
    const col2 = createBoardCol(2, row0, row1, row2, row3, row4);
    const col3 = createBoardCol(3, row0, row1, row2, row3, row4);
    const col4 = createBoardCol(4, row0, row1, row2, row3, row4);

    boards.push({
      leftNumbers: [
        ...row0.numbers,
        ...row1.numbers,
        ...row2.numbers,
        ...row3.numbers,
        ...row4.numbers,
      ],
      colsAndRows: [row0, row1, row2, row3, row4, col0, col1, col2, col3, col4],
    });

    rows.splice(0, 6);
  }

  return boards;
};

const startGame = (numbers, boards, reverse = false) => {
  const numberToPick = [...numbers];
  let number = null;
  let lastWinnerComb = null;
  let lastWinnerNumber = null;
  let lastWInnerBoardLeftNumbers = null;
  let leftBoard = 0;

  while (reverse ? leftBoard < boards.length : lastWinnerComb === null) {
    number = numberToPick.shift();
    for (let board of boards) {
      if (!board.wins) {
        for (let comb of board.colsAndRows) {
          if (comb.flags < 5) {
            if (comb.numbers.includes(number)) {
              comb.flags++;
              board.leftNumbers = board.leftNumbers.filter((n) => n !== number);
            }

            if (comb.flags === 5) {
              leftBoard++;
              lastWinnerNumber = number;
              lastWinnerComb = comb.numbers;
              lastWInnerBoardLeftNumbers = board.leftNumbers;
              board.wins = true;
              break;
            }
          }
        }
      }
    }
  }

  return [lastWInnerBoardLeftNumbers, lastWinnerNumber, lastWinnerComb];
};

export default (data) => {
  const rows = dataToArray(data);

  const numbers = rows.shift().split(",").map(Number);

  const [leftNumbers, lastCalledNumber] = startGame(
    numbers,
    createBoards(rows)
  );
  printSolution(sumArrayValues(leftNumbers) * lastCalledNumber);

  const [secondLeftNumbers, secondLastCalledNumber] = startGame(
    numbers,
    createBoards(rows),
    true
  );
  printSolution(sumArrayValues(secondLeftNumbers) * secondLastCalledNumber);
};
