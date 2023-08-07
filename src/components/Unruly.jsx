import React from "react";
import { useState, useEffect } from "react";
// import '../styles/index.css'

export default function Unruly() {
    // const [colors, setColors] = useState(gameBoard)
    const [currentBoardArray, setCurrentBoardArray] = useState(() => {
        return Array.from({ length: 8 }, () => Array.from({ length: 8 }, getRandomNumber));
    });
    const [selectedBoardSize, setSelectedBoardSize] = useState(8)
    const threeInRow = ' border-red-500'
    const moreThanHalf = ' text-center p-2'

    useEffect(() => {
        newGame(selectedBoardSize);
    }, [selectedBoardSize]);

    const colorMapping = {
        0: 'bg-transparent border-black text-transparent',
        1: 'bg-black border-black text-black',
        2: 'bg-white border-black text-white',
    }

    function handleColorChange(rowIndex, colIndex) {
        const newColors = [...currentBoardArray]
        const currentValue = newColors[rowIndex][colIndex];
        switch (currentValue) {
            case 1:
                newColors[rowIndex][colIndex] = 2
                break
            case 2:
                newColors[rowIndex][colIndex] = 0
                break
            default:
                newColors[rowIndex][colIndex] = 1
        }
        setCurrentBoardArray(newColors)
    }

    function threeInRowCheck(board, rowIndex, colIndex) {
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

    function getRandomNumber() {
        return Math.floor(Math.random() * 3);
    }

    function newGame() {
        const newBoard = Array.from({ length: selectedBoardSize }, () =>
            Array.from({ length: selectedBoardSize }, getRandomNumber)
        );
        setCurrentBoardArray(newBoard);
    }

    function handleBoardSizeChange(event) {
        const newBoardSize = parseInt(event.target.value, 10);
        setSelectedBoardSize(newBoardSize)
    }

    function getColumn(array, colIndex) {
        return array.map((row) => row[colIndex]);
    }


    function getCellClasses(value, rowIndex, colIndex, currentBoardArray) {
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


    return (
        <div>
            <div className="p-2">
                {currentBoardArray.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((value, colIndex) => (
                            <div
                                key={colIndex}
                                onClick={() => handleColorChange(rowIndex, colIndex)}
                                className={`w-12 h-12 ${getCellClasses(
                                    value,
                                    rowIndex,
                                    colIndex,
                                    currentBoardArray
                                )} border-4 m-2`}
                            >
                                !
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={newGame}>New Game?</button>
            <label>Board Size:</label>
            <select
                id="boardSize"
                value={selectedBoardSize}
                onChange={handleBoardSizeChange}
            >
                <option value="8">8x8</option>
                <option value="10">10x10</option>
                <option value="12">12x12</option>
                <option value="14">14x14</option>
            </select>
        </div>
    );
}