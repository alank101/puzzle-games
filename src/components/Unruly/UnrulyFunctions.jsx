const threeInRow = ' border-red-500'
const moreThanHalf = ' text-center p-2'

export function threeInRowCheck(board, rowIndex, colIndex) {
    const value = board[rowIndex][colIndex];

    const isMatchingHorizontal = () => {
        let count = 1;
        let i = colIndex - 1;
        while (i >= 0 && board[rowIndex][i].value === value.value) {
            count++;
            i--;
        }

        i = colIndex + 1;
        while (i < board[rowIndex].length && board[rowIndex][i].value === value.value) {
            count++;
            i++;
        }

        return count >= 3;
    };

    const isMatchingVertical = () => {
        let count = 1;
        let i = rowIndex - 1;
        while (i >= 0 && board[i][colIndex].value === value.value) {
            count++;
            i--;
        }

        i = rowIndex + 1;
        while (i < board.length && board[i][colIndex].value === value.value) {
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



function getColumn(array, colIndex) {
    return array.map((row) => row[colIndex]);
}


export function getCellClasses(cell, rowIndex, colIndex, currentBoardArray) {
    const baseClasses = 'flex items-center justify-center cursor-pointer select-none font-bold text-2xl transition-all duration-200';
    
    // Get the value of the cell
    const value = cell.value;
    
    // Base color classes
    let colorClasses = '';
    if (value === 1) {
        colorClasses = 'bg-black border-2 border-black';
    } else if (value === 2) {
        colorClasses = 'bg-white border-2 border-black';
    } else {
        colorClasses = 'bg-transparent border-black';
    }

    // Check for consecutive cells (including pre-generated cells)
    const hasConsecutive = checkConsecutiveCells(currentBoardArray, rowIndex, colIndex);
    const consecutiveClasses = hasConsecutive ? 'border-red-500' : '';

    // Check for more than half in row/column
    const hasMoreThanHalf = checkMoreThanHalf(currentBoardArray, rowIndex, colIndex);
    const moreThanHalfClasses = hasMoreThanHalf ? 'text-red-500' : '';

    return `${baseClasses} ${colorClasses} ${consecutiveClasses} ${moreThanHalfClasses}`;
}

function checkConsecutiveCells(board, rowIndex, colIndex) {
    const size = board.length;
    const value = board[rowIndex][colIndex].value;
    
    if (value === 0) return false;

    // Check horizontal pattern
    if (colIndex > 0 && colIndex < size - 1) {
        const left = board[rowIndex][colIndex - 1].value;
        const right = board[rowIndex][colIndex + 1].value;
        if (left === value && right === value) {
            return true;
        }
    }

    // Check vertical pattern
    if (rowIndex > 0 && rowIndex < size - 1) {
        const up = board[rowIndex - 1][colIndex].value;
        const down = board[rowIndex + 1][colIndex].value;
        if (up === value && down === value) {
            return true;
        }
    }

    // Check for longer sequences
    // Horizontal
    let horizontalCount = 1;
    // Check left
    for (let i = colIndex - 1; i >= 0; i--) {
        if (board[rowIndex][i].value === value) {
            horizontalCount++;
        } else {
            break;
        }
    }
    // Check right
    for (let i = colIndex + 1; i < size; i++) {
        if (board[rowIndex][i].value === value) {
            horizontalCount++;
        } else {
            break;
        }
    }
    if (horizontalCount >= 3) return true;

    // Vertical
    let verticalCount = 1;
    // Check up
    for (let i = rowIndex - 1; i >= 0; i--) {
        if (board[i][colIndex].value === value) {
            verticalCount++;
        } else {
            break;
        }
    }
    // Check down
    for (let i = rowIndex + 1; i < size; i++) {
        if (board[i][colIndex].value === value) {
            verticalCount++;
        } else {
            break;
        }
    }
    if (verticalCount >= 3) return true;

    return false;
}

export function checkMoreThanHalf(board, rowIndex, colIndex) {
    const size = board.length;
    const value = board[rowIndex][colIndex].value;
    
    if (value === 0) return false;

    // Check row count
    let rowCount = 0;
    for (let j = 0; j < size; j++) {
        if (board[rowIndex][j].value === value) {
            rowCount++;
        }
    }
    if (rowCount > size / 2) {
        return true;
    }

    // Check column count
    let colCount = 0;
    for (let i = 0; i < size; i++) {
        if (board[i][colIndex].value === value) {
            colCount++;
        }
    }
    if (colCount > size / 2) {
        return true;
    }

    return false;
}

// Keep the original checkInvalidPatterns for other uses
export function checkInvalidPatterns(board, rowIndex, colIndex) {
    return checkConsecutiveCells(board, rowIndex, colIndex) || 
           checkMoreThanHalf(board, rowIndex, colIndex);
}

const countColors = (row) => {
    const rowCounts = { 0: 0, 1: 0, 2: 0 };
    row.forEach((cell) => {
        rowCounts[cell.value]++;
    });
    return rowCounts;
};

