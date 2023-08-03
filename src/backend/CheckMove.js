import { fenToUsable } from "./FenToUsable";
import { boardPositionLetterToNumber } from "./BoardPositionLetterToNumber";
import { boardPositionNumberToIndex } from "./BoardPositionNumberToIndex";
import { updateFen } from "./UpdateFen";

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

    const oldSpaceNumber = boardPositionLetterToNumber(oldSpace);
    const oldSpaceIndex = boardPositionNumberToIndex(oldSpaceNumber);

    const newSpaceNumber = boardPositionLetterToNumber(newSpace);
    const newSpaceIndex = boardPositionNumberToIndex(newSpaceNumber);

    const difference = [(newSpaceNumber[0] - oldSpaceNumber[0]), (newSpaceNumber[1] - oldSpaceNumber[1])];
    const strDifference = JSON.stringify(difference);

    const absDifference = [Math.abs(difference[0]), Math.abs(difference[1])];
    const strAbsDifference = JSON.stringify(absDifference);

    const activePiece = usableBoard[oldSpaceIndex];
    const pieceIsWhite = usableBoard[oldSpaceIndex].toUpperCase() === usableBoard[oldSpaceIndex];
    const capturedPiece = usableBoard[newSpaceIndex];

    if (newSpaceCheck(activePiece, capturedPiece)) {

        switch (activePiece) {

            case "B":
            case "b":

                if (absDifference[0] === absDifference[1]) {

                    const mod0 = difference[0] / absDifference[0];
                    const mod1 = difference[1] / absDifference[1];

                    for (let i = 1; i < absDifference[0]; i++) {

                        const checkSpace = [oldSpaceNumber[0] + (mod0 * i), oldSpaceNumber[1] + (mod1 * i)];

                        if (usableBoard[boardPositionNumberToIndex(checkSpace)] !== " ") {

                            return [false, rawBoard, previousMoves];

                        }

                    }

                    return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                }
                break;

            case "N":
            case "n":

                if (strAbsDifference === "[1,2]" ||
                    strAbsDifference === "[2,1]") {
                        return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                }
                break;

            case "R":
            case "r":

                if (absDifference.includes(0)) {

                    const value = (difference.indexOf(0) === 0) ? 1 : 0;

                    const mod = difference[value] / absDifference[value];

                    for (let i = 1; i < absDifference[value]; i++) {

                        const checkSpace = value ? [oldSpaceNumber[0], oldSpaceNumber[1] + (mod * i)] : [oldSpaceNumber[0] + (mod * i), oldSpaceNumber[1]];

                        if (usableBoard[boardPositionNumberToIndex(checkSpace)] !== " ") {

                            return [false, rawBoard, previousMoves];

                        }

                    }

                    return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                }
                break;

            case "P":
            case "p":

                if (pieceIsWhite) {
                    if (capturedPiece === " ") {
                        if (strDifference === "[0,1]" ||
                            (strDifference === "[0,2]" &&
                                usableBoard[boardPositionNumberToIndex(
                                    [oldSpaceNumber[0],
                                    oldSpaceNumber[1] + (difference[1] / 2)])] === " " &&
                                !hasMoved)) {
                                    return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                        }
                    } else if (strDifference === "[1,1]" ||
                        strDifference === "[-1,1]") {
                            return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                    }
                } else {
                    if (capturedPiece === " ") {
                        if (strDifference === "[0,-1]" ||
                            (strDifference === "[0,-2]" &&
                                usableBoard[boardPositionNumberToIndex(
                                    [oldSpaceNumber[0],
                                    oldSpaceNumber[1] + (difference[1] / 2)])] === " " &&
                                !hasMoved)) {
                                    return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                        }
                    } else if (strDifference === "[1,-1]" ||
                        strDifference === "[-1,-1]") {
                            return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                    }
                }
                break;

            case "K":
            case "k":

                if (absDifference[0] <= 1 &&
                    absDifference[1] <= 1) {
                        return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                }
                if (pieceIsWhite) {
                    if (!previousMoves.includes("h1")) {
                        if (!hasMoved &&
                            strDifference === "[2,0]") {
                            if (usableBoard[61] === " " &&
                                usableBoard[62] === " ") {
                                rawBoard = updateFen("h1", "f1", rawBoard);
                                previousMoves = [...previousMoves, "h1", "f1"];
                                return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                            }
                        }
                    }
                    if (!previousMoves.includes("a1")) {
                        if (!hasMoved &&
                            strDifference === "[-2,0]") {
                            if (usableBoard[57] === " " &&
                                usableBoard[58] === " " &&
                                usableBoard[59] === " ") {
                                rawBoard = updateFen("a1", "d1", rawBoard);
                                previousMoves = [...previousMoves, "a1", "d1"];
                                return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                            }
                        }
                    }
                } else {
                    if (!previousMoves.includes("h8")) {
                        if (!hasMoved &&
                            strDifference === "[2,0]") {
                            if (usableBoard[5] === " " &&
                                usableBoard[6] === " ") {
                                rawBoard = updateFen("h8", "f8", rawBoard);
                                previousMoves = [...previousMoves, "h8", "f8"];
                                return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                            }
                        }
                    }
                    if (!previousMoves.includes("a8")) {
                        if (!hasMoved &&
                            strDifference === "[-2,0]") {
                            if (usableBoard[1] === " " &&
                                usableBoard[2] === " " &&
                                usableBoard[3] === " ") {
                                rawBoard = updateFen("a8", "d8", rawBoard);
                                previousMoves = [...previousMoves, "a8", "d8"];
                                return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                            }
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

                        const checkSpace = [oldSpaceNumber[0] + (mod0 * i), oldSpaceNumber[1] + (mod1 * i)];

                        if (usableBoard[boardPositionNumberToIndex(checkSpace)] !== " ") {

                            return [false, rawBoard, previousMoves];

                        }

                    }

                    return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                    
                } else if (absDifference.includes(0)) {

                    const value = (difference.indexOf(0) === 0) ? 1 : 0;

                    const mod = difference[value] / absDifference[value];

                    for (let i = 1; i < absDifference[value]; i++) {

                        const checkSpace = value ? [oldSpaceNumber[0], oldSpaceNumber[1] + (mod * i)] : [oldSpaceNumber[0] + (mod * i), oldSpaceNumber[1]];

                        if (usableBoard[boardPositionNumberToIndex(checkSpace)] !== " ") {

                            return [false, rawBoard, previousMoves];

                        }

                    }

                    return [true, updateFen(oldSpace, newSpace, rawBoard), [...previousMoves, oldSpace, newSpace]];
                }
                break;

            default:

                break;

        }

    }

    return [false, rawBoard, previousMoves];

}