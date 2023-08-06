import React from "react";
import { useState, useEffect } from "react";
// import '../styles/index.css'

export default function Unruly() {
    // const [colors, setColors] = useState(gameBoard)
    const [colors, setColors] = useState(() => {
        return Array.from({ length: 8 }, () => Array.from({ length: 8 }, getRandomNumber));
    });
    const [selectedBoardSize, setSelectedBoardSize] = useState(8)
    const [currentBoardArray, setCurrentBoardArray] = useState([])

    useEffect(() => {
        newGame();
    }, []);

    const colorMapping = {
        0: 'bg-transparent border-black',
        1: 'bg-black border-black',
        2: 'bg-white border-black',
        3: 'bg-black border-red-500',
        4: 'bg-white border-red-500'
    }

    function handleColorChange(rowIndex, colIndex) {
        const newColors = colors.map((row) => [...row]);
        const currentValue = newColors[rowIndex][colIndex];
        switch (currentValue) {
            case 1:
                newColors[rowIndex][colIndex] = 2;
                break;
            case 2:
                newColors[rowIndex][colIndex] = 0;
                break;
            case 3:
                newColors[rowIndex][colIndex] = 2;
                break;
            case 4:
                newColors[rowIndex][colIndex] = 0;
                break;
            default:
                newColors[rowIndex][colIndex] = 1;
        }
        setColors(newColors);
        checkRowsAndColumns(rowIndex, colIndex, newColors);
    }

    function getRandomNumber() {
        return Math.floor(Math.random() * 3);
    }

    function newGame() {
        const newBoard = Array.from({ length: selectedBoardSize }, () =>
            Array.from({ length: selectedBoardSize }, getRandomNumber)
        );
        setColors(newBoard);
        setCurrentBoardArray(newBoard)
    }


    function handleBoardSizeChange(event) {
        const newBoardSize = parseInt(event.target.value, 10);
        setSelectedBoardSize(newBoardSize)
    }

    function checkRowsAndColumns(rowIndex, colIndex, board) {
        const row = board[rowIndex];
        const column = board.map((row) => row[colIndex]);

        if (checkThreeInRow(row, rowIndex, colIndex, board)) {
            markThreeInRow(row, rowIndex);
        }

        if (checkThreeInRow(column, colIndex, rowIndex, board)) {
            markThreeInRow(column, colIndex);
        }
    }

    function checkThreeInRow(rowOrColumn, currentIndex, fixedIndex, board) {
        if (rowOrColumn.length < 3) return false;

        const currentColor = rowOrColumn[currentIndex];
        const startIndex = findStartIndex(rowOrColumn, currentIndex);
        const endIndex = findEndIndex(rowOrColumn, currentIndex);

        return endIndex - startIndex >= 2 && checkColorSequence(rowOrColumn, startIndex, endIndex, currentColor);
    }

    function findStartIndex(array, currentIndex) {
        let startIndex = currentIndex;
        while (startIndex > 0 && array[startIndex - 1] === array[currentIndex]) {
            startIndex--;
        }
        return startIndex;
    }

    function findEndIndex(array, currentIndex) {
        let endIndex = currentIndex;
        while (endIndex < array.length - 1 && array[endIndex + 1] === array[currentIndex]) {
            endIndex++;
        }
        return endIndex;
    }

    function checkColorSequence(array, startIndex, endIndex, targetColor) {
        for (let i = startIndex; i <= endIndex; i++) {
            if (array[i] !== targetColor) {
                return false;
            }
        }
        return true;
    }

    function markThreeInRow(rowOrColumn, fixedIndex) {
        const updatedColors = colors.map((row) => [...row]);

        for (let i = 0; i < rowOrColumn.length; i++) {
            const index = fixedIndex < colors.length ? i : fixedIndex;
            const col = fixedIndex < colors.length ? fixedIndex : i;
            const currentValue = rowOrColumn[i];
            if (currentValue !== 0) {
                updatedColors[index][col] = 3;
            }
        }

        setColors(updatedColors);
    }



    return (
        <div>
            <div className="p-2">
                {colors.map((row, rowIndex) => (
                    <div key={rowIndex} className='flex' >
                        {row.map((value, colIndex) => (
                            <div
                                key={colIndex}
                                onClick={() => handleColorChange(rowIndex, colIndex)}
                                className={`w-12 h-12 ${colorMapping[value]} border-4 m-2`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={newGame}>New Game?</button>
            <label>Board Size:</label>
            <select id='boardSize' value={selectedBoardSize} onChange={handleBoardSizeChange}>
                <option value='8'>8x8</option>
                <option value='10'>10x10</option>
                <option value='12'>12x12</option>
                <option value='14'>14x14</option>
            </select>
        </div>
    )
}