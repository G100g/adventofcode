const { readFile } = require("../utils");

const getSeat = (boardingcode) => {
  let seatsRows = new Array(128).fill(1).map((v, index) => index);
  let seatsCols = new Array(8).fill(1).map((v, index) => index);

  boardingcode.split("").forEach((c) => {
    switch (c) {
      case "F":
        seatsRows.splice(seatsRows.length / 2);
        break;
      case "L":
        seatsCols.splice(seatsCols.length / 2);
        break;
      case "B":
        seatsRows.splice(0, seatsRows.length / 2);
        break;
      case "R":
        seatsCols.splice(0, seatsCols.length / 2);
        break;
    }
  });

  return {
    row: seatsRows[0],
    col: seatsCols[0],
  };
};

const getSeatID = (seat) => seat.row * 8 + seat.col;

const main = async () => {
  const boardingPassList = await (
    await readFile(__dirname + "/input.txt", "utf8")
  ).split("\n");

  const seatsIDs = boardingPassList.map(getSeat).map(getSeatID);
  seatsIDs.sort((a, b) => a - b);

  const solutionPartOne = seatsIDs[seatsIDs.length - 1];

  console.log(`Solution Part One: ${solutionPartOne}`);

  const allSeatsIds = [];

  for (let row = 0; row < 128; row++) {
    for (let col = 0; col < 8; col++) {
      const seatID = getSeatID({ row, col });
      if (seatID >= seatsIDs[0] && seatID <= seatsIDs[seatsIDs.length - 1]) {
        allSeatsIds.push(seatID);
      }
    }
  }

  const solutionPartTwo = allSeatsIds.find(
    (seatID) => !seatsIDs.includes(seatID)
  );

  console.log(`Solution Part Two: ${solutionPartTwo}`);
};

main();
