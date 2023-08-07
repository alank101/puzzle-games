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


    function getCellClasses(value, rowIndex, colIndex, currentBoardArray) {
        // Add the necessary logic to determine the classes for each cell based on the conditions
        let classes = colorMapping[value];

        const rowLength = currentBoardArray[0].length;
        const counts = countColors(currentBoardArray[rowIndex]);

        let dominantColor = -1;
        let dominantCount = -1;
        for (const color in counts) {
            if (counts[color] > dominantCount) {
                dominantColor = parseInt(color);
                dominantCount = counts[color];
            }
        }

        if (value === dominantColor && dominantCount > rowLength / 2) {
            // If the current cell has the dominant color and the dominant color has more than half in the row
            classes += moreThanHalf
            if (value === 2) classes = classes.replace('text-white', 'text-red-500')
            if (value === 1) classes = classes.replace('text-black', 'text-red-500')
        }

        // Check if there are at least 3 consecutive cells of the same color in a row
        if (value !== 0) {
            const row = currentBoardArray[rowIndex];
            if (hasThreeInRow(row, value)) {
                classes += threeInRow;
            }
        }

        return classes;
    }

    const countColors = (row) => {
        const counts = { 0: 0, 1: 0, 2: 0 };
        row.forEach((cell) => {
            counts[cell]++;
        });
        return counts;
    };

    const hasThreeInRow = (row, color) => {
        let count = 0;
        for (let i = 0; i < row.length; i++) {
            if (row[i] === color) {
                count++;
                if (count >= 3) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
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