import React from "react";
import { useState } from "react";
import { getCellClasses, checkMoreThanHalf } from './UnrulyFunctions'
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
    const cellSize = selectedBoardSize <= 8 ? 'w-14 h-14' : 'w-12 h-12';
    const cellMargin = selectedBoardSize <= 8 ? 'm-1.5' : 'm-1';
    const cellBorder = selectedBoardSize <= 8 ? 'border-4' : 'border-2';

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
            <div className="absolute top-6 left-6">
                <button 
                    onClick={() => window.history.back()} 
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                >
                    Back
                </button>
            </div>
            <h1 className="text-center text-4xl md:text-6xl font-bold text-gray-900 mb-6 md:mb-10 tracking-tight">Unruly</h1>
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6">
                <div className="p-4 overflow-x-auto flex justify-center">
                    <div className="inline-block bg-gray-300 p-6 rounded-lg">
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
                                        )} transition-colors duration-200`}
                                    >
                                        {checkMoreThanHalf(currentBoardArray, rowIndex, colIndex) ? '!' : ''}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center space-y-6 mt-6">
                    <button 
                        onClick={newGame} 
                        className="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                    >
                        New Game
                    </button>
                    <div className="flex items-center gap-4">
                        <label className="flex items-center gap-3 text-gray-700 font-medium">
                            Board Size:
                            <select
                                value={selectedBoardSize}
                                onChange={handleBoardSizeChange}
                                className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value={8}>8x8</option>
                                <option value={10}>10x10</option>
                            </select>
                        </label>
                    </div>
                    <div className="text-center space-y-2 text-gray-600">
                        <p className="text-sm">There should be an equal number of black and white squares in each row and column</p>
                        <p className="text-sm">No more than 2 consecutive squares should be the same color</p>
                    </div>
                    <a 
                        href="https://www.chiark.greenend.org.uk/~sgtatham/puzzles/doc/unruly.html#unruly" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-sm text-indigo-600 hover:text-indigo-800 underline decoration-1 transition-colors duration-200"
                    >
                        Full Instructions
                    </a>
                </div>
            </div>
        </div>
    );
}