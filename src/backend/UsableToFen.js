export function usableToFen(usableBoard) {

    let rawString = "";

    let countSpaces = 0;

    let countBlanks = 0;

    for (let i = 0; i < 8; i++) {

        for (let j = 0; j < 8; j++) {

            if (usableBoard[countSpaces] === " ") {

                countBlanks++;
                countSpaces++;
                continue;

            }

            rawString += String(countBlanks);
            countBlanks = 0;
            rawString += usableBoard[countSpaces];
            countSpaces++;

        }

        rawString += countBlanks;
        countBlanks = 0;
        rawString += "/";

    }

    rawString = rawString.slice(0, -1);

    return rawString;

}