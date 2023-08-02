export function boardPositionNumberToIndex (numberBoardPosition) {

    var boardIndex = ((8 - Number(numberBoardPosition[1])) * 8) + numberBoardPosition[0] -1;

    return boardIndex;
    
}