// Checks if the pregenerated board is valid
function isValidBoard(board) {
    const size = board.length;
    
    // Check rows
    for (let i = 0; i < size; i++) {
        let blackCount = 0;
        let whiteCount = 0;
        let consecutiveCount = 1;
        let lastColor = null;
        
        for (let j = 0; j < size; j++) {
            const color = board[i][j];
            if (color === 0) continue; // Skip empty cells
            if (color === 1) blackCount++;
            if (color === 2) whiteCount++;
            
            if (color === lastColor) {
                consecutiveCount++;
                if (consecutiveCount > 2) return false;
            } else {
                consecutiveCount = 1;
            }
            lastColor = color;
        }
        
        // Only check counts if the row is complete
        if (board[i].every(cell => cell !== 0)) {
            if (blackCount !== whiteCount) return false;
        }
    }
    
    // Check columns
    for (let j = 0; j < size; j++) {
        let blackCount = 0;
        let whiteCount = 0;
        let consecutiveCount = 1;
        let lastColor = null;
        
        for (let i = 0; i < size; i++) {
            const color = board[i][j];
            if (color === 0) continue; // Skip empty cells
            if (color === 1) blackCount++;
            if (color === 2) whiteCount++;
            
            if (color === lastColor) {
                consecutiveCount++;
                if (consecutiveCount > 2) return false;
            } else {
                consecutiveCount = 1;
            }
            lastColor = color;
        }
        
        // Only check counts if the column is complete
        if (board.every(row => row[j] !== 0)) {
            if (blackCount !== whiteCount) return false;
        }
    }
    
    return true;
}

// Creates a valid Unruly Board
function generateValidBoard(size) {
    const board = Array(size).fill().map(() => Array(size).fill(0));
    const maxAttempts = 1000; // Prevent infinite loops
    let attempts = 0;

    // Fill the board randomly while maintaining rules
    while (attempts < maxAttempts) {
        // Try to fill each cell
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (board[i][j] === 0) {
                    // Try each color
                    const colors = [1, 2];
                    // Shuffle colors to randomize
                    for (let k = colors.length - 1; k > 0; k--) {
                        const l = Math.floor(Math.random() * (k + 1));
                        [colors[k], colors[l]] = [colors[l], colors[k]];
                    }

                    let validColorFound = false;
                    for (const color of colors) {
                        board[i][j] = color;
                        if (isValidBoard(board)) {
                            validColorFound = true;
                            break;
                        }
                    }

                    if (!validColorFound) {
                        // If no valid color found, reset the cell and try again
                        board[i][j] = 0;
                        // Reset the entire board and start over
                        for (let x = 0; x < size; x++) {
                            for (let y = 0; y < size; y++) {
                                board[x][y] = 0;
                            }
                        }
                        break;
                    }
                }
            }
        }

        // Check if the board is complete
        if (board.every(row => row.every(cell => cell !== 0))) {
            break;
        }

        attempts++;
    }

    // If we couldn't generate a valid board, fall back to a checkerboard pattern
    if (attempts >= maxAttempts) {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                board[i][j] = ((i + j) % 2 === 0) ? 1 : 2;
            }
        }
    }

    // Clear cells to create the puzzle
    const cellsToClear = Math.floor(size * size * 0.4); // Clear 40% of cells
    const cells = [];
    
    // Create array of all cell positions
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            cells.push([i, j]);
        }
    }
    
    // Shuffle cells
    for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cells[i], cells[j]] = [cells[j], cells[i]];
    }
    
    // Clear cells
    for (let i = 0; i < cellsToClear; i++) {
        const [row, col] = cells[i];
        board[row][col] = 0;
    }
    
    return board;
}

function generateBoard(size) {
    const generatedBoard = generateValidBoard(size);

    // Add the 'clickable' property to each cell
    const boardWithClickability = generatedBoard.map(row =>
        row.map(cellValue => ({
            value: cellValue,
            clickable: cellValue === 0 // Set clickable to true for value 0 cells
        }))
    );

    return boardWithClickability;
}

export { generateBoard }