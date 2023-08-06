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
        newGame(selectedBoardSize);
    }, [selectedBoardSize]);

    const colorMapping = {
        0: 'bg-transparent border-black',
        1: 'bg-black border-black',
        2: 'bg-white border-black',
        3: 'bg-black border-red-500',
        4: 'bg-white border-red-500'
    }

    function handleColorChange(rowIndex, colIndex) {
        const newColors = [...colors]
        const currentValue = newColors[rowIndex][colIndex];
        switch (currentValue) {
            case 1:
                newColors[rowIndex][colIndex] = 2
                break
            case 2:
                newColors[rowIndex][colIndex] = 0
                break
            case 3:
                newColors[rowIndex][colIndex] = 2
                if (newColors[rowIndex][colIndex - 1] === 3) newColors[rowIndex][colIndex - 1] = 1
                if (newColors[rowIndex][colIndex + 1] === 3) newColors[rowIndex][colIndex + 1] = 1
                if (newColors[rowIndex - 1][colIndex] === 3) newColors[rowIndex - 1][colIndex] = 1
                if (newColors[rowIndex + 1][colIndex] === 3) newColors[rowIndex + 1][colIndex] = 1
                break
            case 4:
                newColors[rowIndex][colIndex] = 0
                if (newColors[rowIndex][colIndex - 1] === 4) newColors[rowIndex][colIndex - 1] = 2
                if (newColors[rowIndex][colIndex + 1] === 4) newColors[rowIndex][colIndex + 1] = 2
                if (newColors[rowIndex - 1][colIndex] === 4) newColors[rowIndex - 1][colIndex] = 2
                if (newColors[rowIndex + 1][colIndex] === 4) newColors[rowIndex + 1][colIndex] = 2
                break
            default:
                newColors[rowIndex][colIndex] = 1
        }
        setColors(newColors)
        checkProgress(rowIndex, colIndex)
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

    function checkProgress(rowIndex, colIndex) {
        const selectedValue = currentBoardArray[rowIndex][colIndex];

        const isMatchingHorizontal = (value) => {
            return (
                currentBoardArray[rowIndex][colIndex - 1] === value &&
                currentBoardArray[rowIndex][colIndex + 1] === value
            );
        };

        const isMatchingVertical = (value) => {
            return (
                currentBoardArray[rowIndex - 1] &&
                currentBoardArray[rowIndex + 1] &&
                currentBoardArray[rowIndex - 1][colIndex] === value &&
                currentBoardArray[rowIndex + 1][colIndex] === value
            );
        };

        const updateCellsHorizontal = (value) => {
            currentBoardArray[rowIndex][colIndex] = value;
            currentBoardArray[rowIndex][colIndex - 1] = value;
            currentBoardArray[rowIndex][colIndex + 1] = value;
        };

        const updateCellsVertical = (value) => {
            currentBoardArray[rowIndex][colIndex] = value;
            currentBoardArray[rowIndex - 1][colIndex] = value;
            currentBoardArray[rowIndex + 1][colIndex] = value;
        }

        if ((selectedValue === 2 && isMatchingVertical(2) && isMatchingHorizontal(2)) ||
            (selectedValue === 1 && isMatchingVertical(1) && isMatchingHorizontal(1))) {
            updateCellsHorizontal(selectedValue === 2 ? 4 : 3);
            updateCellsVertical(selectedValue === 2 ? 4 : 3);
        } else if (selectedValue === 2 && isMatchingHorizontal(2)) {
            updateCellsHorizontal(4);
        } else if (selectedValue === 1 && isMatchingHorizontal(1)) {
            updateCellsHorizontal(3);
        } else if (selectedValue === 1 && isMatchingVertical(1)) {
            updateCellsVertical(3);
        } else if (selectedValue === 2 && isMatchingVertical(2)) {
            updateCellsVertical(4);
        }

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