const colorMapping = {
    0: 'bg-transparent border-black text-transparent',
    1: 'bg-black border-black text-black',
    2: 'bg-white border-black text-white',
}

const threeInRow = ' border-red-500'
    const moreThanHalf = ' text-center p-2'

export function threeInRowCheck(board, rowIndex, colIndex) {
    const value = board[rowIndex][colIndex];

    const isMatchingHorizontal = () => {
        let count = 1;
        let i = colIndex - 1;
        while (i >= 0 && board[rowIndex][i] === value) {
            count++;
            i--;
        }

        i = colIndex + 1;
        while (i < board[rowIndex].length && board[rowIndex][i] === value) {
            count++;
            i++;
        }

        return count >= 3;
    };

    const isMatchingVertical = () => {
        let count = 1;
        let i = rowIndex - 1;
        while (i >= 0 && board[i][colIndex] === value) {
            count++;
            i--;
        }

        i = rowIndex + 1;
        while (i < board.length && board[i][colIndex] === value) {
            count++;
            i++;
        }

        return count >= 3;
    };

    return {
        isMatchingHorizontal,
        isMatchingVertical,
    };
}

export function getRandomNumber() {
    return Math.floor(Math.random() * 3);
}



export function getColumn(array, colIndex) {
    return array.map((row) => row[colIndex]);
}


export function getCellClasses(value, rowIndex, colIndex, currentBoardArray) {
    // Add the necessary logic to determine the classes for each cell based on the conditions
    let classes = colorMapping[value];
    const boardLength = currentBoardArray[0].length;
    
    const rowCounts = countColors(currentBoardArray[rowIndex]);
    let rowDominantColor = -1;
    let rowDominantCount = -1;
    for (const color in rowCounts) {
        if (rowCounts[color] > rowDominantCount) {
            rowDominantColor = parseInt(color);
            rowDominantCount = rowCounts[color];
        }
    }
    if (value === rowDominantColor && rowDominantCount > boardLength / 2) {
        classes += moreThanHalf
        if (value === 2) classes = classes.replace('text-white', 'text-red-500')
        if (value === 1) classes = classes.replace('text-black', 'text-red-500')
    }

    const columnCounts = countColors(getColumn(currentBoardArray, colIndex))
    let columnDominantColor = -1;
    let columnDominantCount = -1;
    for (const color in columnCounts) {
        if (columnCounts[color] > columnDominantCount) {
            columnDominantColor = parseInt(color);
            columnDominantCount = columnCounts[color];
        }
    }
    if (value === columnDominantColor && columnDominantCount > boardLength / 2) {
        classes += moreThanHalf
        if (value === 2) classes = classes.replace('text-white', 'text-red-500')
        if (value === 1) classes = classes.replace('text-black', 'text-red-500')
    }


    const { isMatchingHorizontal, isMatchingVertical } = threeInRowCheck(
        currentBoardArray,
        rowIndex,
        colIndex
    );

    if (value !== 0 && (isMatchingHorizontal() || isMatchingVertical())) {
        classes += threeInRow;
    }

    return classes;
}

const countColors = (row) => {
    const rowCounts = { 0: 0, 1: 0, 2: 0 };
    row.forEach((cell) => {
        rowCounts[cell]++;
    });
    return rowCounts;
};