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
    let classes = "";

    switch (value) {
        case 0:
            classes = "bg-transparent text-transparent border-black";
            break;
        case 1:
            classes = "bg-black text-black border-black";
            break;
        case 2:
            classes = "bg-white text-white border-black";
            break;
        default:
            break;
    }

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
        classes += moreThanHalf;
        if (value === 2) classes = classes.replace('text-white', 'text-red-500');
        if (value === 1) classes = classes.replace('text-black', 'text-red-500');
    }

    const columnCounts = countColors(getColumn(currentBoardArray, colIndex));
    let columnDominantColor = -1;
    let columnDominantCount = -1;
    for (const color in columnCounts) {
        if (columnCounts[color] > columnDominantCount) {
            columnDominantColor = parseInt(color);
            columnDominantCount = columnCounts[color];
        }
    }
    if (value === columnDominantColor && columnDominantCount > boardLength / 2) {
        classes += moreThanHalf;
        if (value === 2) classes = classes.replace('text-white', 'text-red-500');
        if (value === 1) classes = classes.replace('text-black', 'text-red-500');
    }

    const { isMatchingHorizontal, isMatchingVertical } = threeInRowCheck(
        currentBoardArray,
        rowIndex,
        colIndex
    );

    if (value !== 0 && (isMatchingHorizontal() || isMatchingVertical())) {
        classes += threeInRow;
    }

    return `w-12 h-12 border-4 m-2 ${classes}`;
}

const countColors = (row) => {
    const rowCounts = { 0: 0, 1: 0, 2: 0 };
    row.forEach((cell) => {
        rowCounts[cell]++;
    });
    return rowCounts;
};

// Function to shuffle an array randomly
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

// Function to generate a solved board with the specified size
export function generateSolvedBoard(size) {
    const board = [];
    for (let i = 0; i < size; i++) {
      board.push(new Array(size).fill(0));
    }
  
    // Helper function to check if the row has equal black and white squares
    function isRowBalanced(row) {
      let blackCount = 0;
      let whiteCount = 0;
      for (let i = 0; i < size; i++) {
        if (board[row][i] === 1) {
          blackCount++;
        } else if (board[row][i] === 2) {
          whiteCount++;
        }
      }
      return blackCount === whiteCount;
    }
  
    // Helper function to fill the row with equal black and white squares
    function fillRow(row) {
      const colors = new Array(size).fill(0).map((_, i) => i % 2 + 1);
      shuffleArray(colors);
  
      for (let col = 0; col < size; col++) {
        board[row][col] = colors[col];
      }
    }
  
    // Step 1: Fill each row with equal black and white squares
    for (let row = 0; row < size; row++) {
      fillRow(row);
      while (!isRowBalanced(row)) {
        fillRow(row);
      }
    }
  
    // Step 2: Shuffle the rows until columns are balanced
    function shuffleRows() {
      for (let row = 0; row < size; row++) {
        fillRow(row);
        while (!isRowBalanced(row)) {
          fillRow(row);
        }
      }
    }
  
    while (true) {
      // Copy the board and shuffle rows
      const tempBoard = board.map((row) => [...row]);
      shuffleRows();
  
      // Check if columns are balanced for the shuffled rows
      let isBalanced = true;
      for (let col = 0; col < size; col++) {
        const column = getColumn(tempBoard, col);
        const counts = countColors(column);
        let blackCount = counts[1] || 0;
        let whiteCount = counts[2] || 0;
        const halfCount = Math.floor(size / 2);
  
        if (blackCount !== halfCount || whiteCount !== halfCount) {
          isBalanced = false;
          break;
        }
      }
  
      if (isBalanced) {
        // If the columns are balanced for the shuffled rows, update the original board
        for (let row = 0; row < size; row++) {
          for (let col = 0; col < size; col++) {
            board[row][col] = tempBoard[row][col];
          }
        }
        break;
      }
    }
  
    return board;
  }