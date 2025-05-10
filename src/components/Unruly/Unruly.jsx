import React from "react";
import { useState } from "react";
import { getCellClasses } from './UnrulyFunctions'
import { generateBoard } from './UnrulyBoards'

export default function Unruly() {
    const [selectedBoardSize, setSelectedBoardSize] = useState(8);
    const [currentBoardArray, setCurrentBoardArray] = useState(() => {
        return generateBoard(selectedBoardSize);
    });

    function handleColorChange(rowIndex, colIndex) {
        const cell = currentBoardArray[rowIndex][colIndex];
        if (cell.clickable) {
            const newColors = [...currentBoardArray];
            const currentValue = newColors[rowIndex][colIndex].value;
            switch (currentValue) {
                case 1:
                    newColors[rowIndex][colIndex].value = 2;
                    break;
                case 2:
                    newColors[rowIndex][colIndex].value = 0;
                    break;
                default:
                    newColors[rowIndex][colIndex].value = 1;
            }
            setCurrentBoardArray(newColors);
        }
        checkWin(rowIndex, colIndex);
    }

    function handleBoardSizeChange(event) {
        const newBoardSize = parseInt(event.target.value, 10);
        setSelectedBoardSize(newBoardSize);
        setCurrentBoardArray(generateBoard(newBoardSize));
    }

    function checkWin(rowIndex, colIndex) {
        const currentBoardArrayValue = currentBoardArray.flat().reduce((a,b) => a + b.value, 0);
        const expectedValue = Math.pow((currentBoardArray.length / 2),2) * 6;
        const hasRedText = currentBoardArray.flat().some(cell => {
            const classes = getCellClasses(cell, rowIndex, colIndex, currentBoardArray);
            return classes.includes('text-red-500');
        });
    
        const hasRedBorder = currentBoardArray.flat().some(cell => {
            const classes = getCellClasses(cell, rowIndex, colIndex, currentBoardArray);
            return classes.includes('border-red-500');
        });
    
        if(currentBoardArrayValue === expectedValue && !hasRedBorder && !hasRedText) {
            setTimeout(() => {
                alert("Congratulations! You've solved the puzzle!");
            }, 100);
        }
    }

    function newGame() {
        setCurrentBoardArray(generateBoard(selectedBoardSize));
    }

    // Calculate cell size based on board size
    const cellSize = selectedBoardSize <= 8 ? 'w-12 h-12' : 'w-10 h-10';
    const cellMargin = selectedBoardSize <= 8 ? 'm-2' : 'm-1';
    const cellBorder = selectedBoardSize <= 8 ? 'border-4' : 'border-2';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <div className="absolute top-4 left-4">
                <button onClick={() => window.history.back()} className="border-black border-2 p-1 rounded-md bg-white">
                    Back
                </button>
            </div>
            <h1 className="text-center text-4xl md:text-6xl mb-4 md:mb-8">Unruly</h1>
            <div className="w-full max-w-3xl">
                <div className="p-2 overflow-x-auto">
                    <div className="inline-block">
                        {currentBoardArray.map((row, rowIndex) => (
                            <div key={rowIndex} className="flex">
                                {row.map((value, colIndex) => (
                                    <div
                                        key={colIndex}
                                        onClick={() => handleColorChange(rowIndex, colIndex)}
                                        className={`${cellSize} ${cellMargin} ${cellBorder} ${getCellClasses(
                                            value,
                                            rowIndex,
                                            colIndex,
                                            currentBoardArray
                                        )}`}
                                    >
                                        !
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-center">
                    <button onClick={newGame} className="mt-4 border-black border-4 p-2 rounded-md bg-white">New Game?</button>
                </div>
                <div className="flex justify-center items-center gap-4 mt-4">
                    <label className="flex items-center gap-2">
                        Board Size:
                        <select
                            value={selectedBoardSize}
                            onChange={handleBoardSizeChange}
                            className="px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value={8}>8x8</option>
                            <option value={10}>10x10</option>
                        </select>
                    </label>
                </div>
                <p className="text-center pt-4">There should be an equal number of black and white squares in each row and column</p>
                <p className="text-center">No more than 2 consecutive squares should be the same color</p>
                <div className="text-center">
                    <a href="https://www.chiark.greenend.org.uk/~sgtatham/puzzles/doc/unruly.html#unruly" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-cyan-300 underline decoration-1">
                        Full Instructions
                    </a>
                </div>
            </div>
        </div>
    );
}