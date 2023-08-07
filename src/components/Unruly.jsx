import React from "react";
import { useState, useEffect } from "react";
import { getCellClasses, generateSolvedBoard } from './UnrulyFunctions'

export default function Unruly() {
    // const [colors, setColors] = useState(gameBoard)
    const [currentBoardArray, setCurrentBoardArray] = useState(() => {
        return generateSolvedBoard(8)
    });
    const [selectedBoardSize, setSelectedBoardSize] = useState(8)


    useEffect(() => {
        newGame(selectedBoardSize);
    }, [selectedBoardSize]);



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

    function handleBoardSizeChange(event) {
        const newBoardSize = parseInt(event.target.value, 10);
        setSelectedBoardSize(newBoardSize)
    }

    function newGame() {
        const newBoard = generateSolvedBoard(selectedBoardSize)
        setCurrentBoardArray(newBoard);
    }

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