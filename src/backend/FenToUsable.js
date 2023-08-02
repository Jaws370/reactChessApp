export function fenToUsable(rawBoard) {

    let usableBoard = "";

    for (let countSpaces = 0; countSpaces < rawBoard.length; countSpaces++) {

        if (rawBoard[countSpaces] === "/") {

            continue;

        }

        if (!isNaN(rawBoard[countSpaces])) {

            for (var countBlanks = 0; countBlanks < Number(rawBoard[countSpaces]); countBlanks++) {

                usableBoard += " ";

            }

            continue;

        }

        usableBoard += rawBoard[countSpaces];

    }

    return usableBoard;

}