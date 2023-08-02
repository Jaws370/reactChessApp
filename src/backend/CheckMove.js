import { fenToUsable } from "./FenToUsable";
import { boardPositionLetterToNumber } from "./BoardPositionLetterToNumber";
import { boardPositionNumberToIndex } from "./BoardPositionNumberToIndex";
//import { updateFen } from "./UpdateFen";

function newSpaceCheck(activePiece, capturedPiece) {

    if (capturedPiece === " ") {

        return true;

    }

    if (activePiece.toUpperCase() === activePiece) {

        if (capturedPiece.toUpperCase() === capturedPiece) {

            return false;

        }

    } else if (activePiece.toLowerCase() === activePiece) {

        if (capturedPiece.toLowerCase() === capturedPiece) {

            return false;

        }

    }

    return true;

}

export function checkMove(oldSpace, newSpace, rawBoard, previousMoves) {

    const hasMoved = previousMoves.includes(oldSpace);

    const usableBoard = fenToUsable(rawBoard);

    oldSpace = boardPositionLetterToNumber(oldSpace);
    const oldSpaceIndex = boardPositionNumberToIndex(oldSpace);

    newSpace = boardPositionLetterToNumber(newSpace);
    const newSpaceIndex = boardPositionNumberToIndex(newSpace);

    const difference = [(newSpace[0] - oldSpace[0]), (newSpace[1] - oldSpace[1])];
    const strDifference = JSON.stringify(difference);

    const absDifference = [Math.abs(difference[0]), Math.abs(difference[1])];
    const strAbsDifference = JSON.stringify(absDifference);
    
    const activePiece = usableBoard[oldSpaceIndex];
    const capturedPiece = usableBoard[newSpaceIndex];

    if (newSpaceCheck(activePiece, capturedPiece)) {

        switch (activePiece) {

            case "B":
            case "b":

                if (absDifference[0] === absDifference[1]) {

                    const mod0 = difference[0] / absDifference[0];
                    const mod1 = difference[1] / absDifference[1];

                    for (let i = 1; i < absDifference[0]; i++) {

                        const checkSpace = [oldSpace[0] + (mod0 * i), oldSpace[1] + (mod1 * i)];

                        if (usableBoard[boardPositionNumberToIndex(checkSpace)] !== " ") {

                            return false;

                        }

                    }

                    return true;
                }
                break;

            case "N":
            case "n":

                if (strAbsDifference === "[1,2]" ||
                    strAbsDifference === "[2,1]") {
                    return true;
                }
                break;

            case "R":
            case "r":

                if (absDifference.includes(0)) {

                    const value = (difference.indexOf(0) === 0) ? 1 : 0;

                    const mod = difference[value] / absDifference[value];

                    for (let i = 1; i < absDifference[value]; i++) {

                        const checkSpace = value ? [oldSpace[0], oldSpace[1] + (mod * i)] : [oldSpace[0] + (mod * i), oldSpace[1]];

                        if (usableBoard[boardPositionNumberToIndex(checkSpace)] !== " ") {

                            return false;

                        }

                    }

                    return true;
                }
                break;

            case "P":
            case "p":

                if (capturedPiece === " ") {
                    if (strAbsDifference === "[0,1]" ||
                        (strAbsDifference === "[0,2]" &&
                            usableBoard[boardPositionNumberToIndex(
                                [oldSpace[0],
                                oldSpace[1] + (difference[1] / 2)])] === " " &&
                            !hasMoved)) {
                        return true;
                    }
                } else if (strAbsDifference === "[1,1]") {
                    return true;
                }
                break;

            case "K":
            case "k":

                if (absDifference[0] <= 1 &&
                    absDifference[1] <= 1) {
                    return true;
                }
                if (!previousMoves.includes("h1")) {
                    if (!hasMoved &&
                        strDifference === "[2,0]") {
                        if (usableBoard[61] === " " &&
                            usableBoard[62] === " ") {
                            return true;
                        }
                    }
                }
                if (!previousMoves.includes("a1")) {
                    if (!hasMoved &&
                        strDifference === "[-2,0]") {
                        if (usableBoard[57] === " " &&
                            usableBoard[58] === " " &&
                            usableBoard[59] === " ") {
                            return true;
                        }
                    }
                }
                break;

            case "Q":
            case "q":

                if (absDifference[0] === absDifference[1]) {

                    const mod0 = difference[0] / absDifference[0];
                    const mod1 = difference[1] / absDifference[1];

                    for (let i = 1; i < absDifference[0]; i++) {

                        const checkSpace = [oldSpace[0] + (mod0 * i), oldSpace[1] + (mod1 * i)];

                        if (usableBoard[boardPositionNumberToIndex(checkSpace)] !== " ") {

                            return false;

                        }

                    }

                    return true;
                } else if (absDifference.includes(0)) {

                    const value = (difference.indexOf(0) === 0) ? 1 : 0;

                    const mod = difference[value] / absDifference[value];

                    for (let i = 1; i < absDifference[value]; i++) {

                        const checkSpace = value ? [oldSpace[0], oldSpace[1] + (mod * i)] : [oldSpace[0] + (mod * i), oldSpace[1]];

                        if (usableBoard[boardPositionNumberToIndex(checkSpace)] !== " ") {

                            return false;

                        }

                    }

                    return true;
                }
                break;

            default:

                break;

        }

    }

    return false;

}