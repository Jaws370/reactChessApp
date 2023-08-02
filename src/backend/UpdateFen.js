import { fenToUsable } from "./FenToUsable";
import { usableToFen } from "./UsableToFen";

export function updateFen(oldSpace, newSpace, rawBoard) {

    const alphabetIndex = ["a", "b", "c", "d", "e", "f", "g", "h"];

    oldSpace = oldSpace.split("");
    var oldSpaceIndex = ((8 - Number(oldSpace[1])) * 8) + alphabetIndex.indexOf(oldSpace[0]);

    newSpace = newSpace.split("");
    var newSpaceIndex = ((8 - Number(newSpace[1])) * 8) + alphabetIndex.indexOf(newSpace[0]);

    var usableBoard = fenToUsable(rawBoard);
    var activePiece = usableBoard[oldSpaceIndex];

    usableBoard = usableBoard.substr(0, oldSpaceIndex) + " " + usableBoard.substr(oldSpaceIndex + 1);

    usableBoard = usableBoard.substr(0, newSpaceIndex) + activePiece + usableBoard.substr(newSpaceIndex + 1);

    rawBoard = usableToFen(usableBoard);

    return rawBoard;
}