export function boardPositionLetterToNumber (letterBoardPosition) {

    const alphabetIndex = ["a", "b", "c", "d", "e", "f", "g", "h"];

    var numberBoardPosition = letterBoardPosition.split("");

    numberBoardPosition = [
        alphabetIndex.indexOf(numberBoardPosition[0]) + 1, 
        Number(numberBoardPosition[1])
    ];

    return numberBoardPosition;

}