import React, { useState, useEffect } from "react";

export default function TicTacToe() {
    const [gridSize, setGridSize] = useState(3);
    const [board, setBoard] = useState(createEmptyBoard(gridSize));
    const [isXNext, setIsXNext] = useState(true);
    const [gameMode, setGameMode] = useState('computer'); // 'computer' or 'human'

    function createEmptyBoard(size) {
        return Array(size).fill(null).map(() => Array(size).fill(null));
    }

    const handleClick = (row, col) => {
        if (board[row][col] || calculateWinner(board)) return;

        const newBoard = board.map(row => [...row]);
        newBoard[row][col] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const calculateWinner = (squares) => {
        // Check rows
        for (let i = 0; i < gridSize; i++) {
            if (squares[i].every(square => square === squares[i][0] && square !== null)) {
                return squares[i][0];
            }
        }

        // Check columns
        for (let i = 0; i < gridSize; i++) {
            if (squares.every(row => row[i] === squares[0][i] && row[i] !== null)) {
                return squares[0][i];
            }
        }

        // Check diagonals
        let mainDiagonal = true;
        let antiDiagonal = true;
        for (let i = 0; i < gridSize; i++) {
            if (squares[i][i] !== squares[0][0] || squares[i][i] === null) {
                mainDiagonal = false;
            }
            if (squares[i][gridSize - 1 - i] !== squares[0][gridSize - 1] || squares[i][gridSize - 1 - i] === null) {
                antiDiagonal = false;
            }
        }
        if (mainDiagonal) return squares[0][0];
        if (antiDiagonal) return squares[0][gridSize - 1];

        return null;
    };

    const findBestMove = (board) => {
        // Try to win
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (!board[i][j]) {
                    const newBoard = board.map(row => [...row]);
                    newBoard[i][j] = 'O';
                    if (calculateWinner(newBoard) === 'O') {
                        return [i, j];
                    }
                }
            }
        }

        // Block player from winning
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (!board[i][j]) {
                    const newBoard = board.map(row => [...row]);
                    newBoard[i][j] = 'X';
                    if (calculateWinner(newBoard) === 'X') {
                        return [i, j];
                    }
                }
            }
        }

        // Try to take center if available
        const center = Math.floor(gridSize / 2);
        if (!board[center][center]) {
            return [center, center];
        }

        // Take any available corner
        const corners = [
            [0, 0],
            [0, gridSize - 1],
            [gridSize - 1, 0],
            [gridSize - 1, gridSize - 1]
        ];
        for (const [i, j] of corners) {
            if (!board[i][j]) {
                return [i, j];
            }
        }

        // Take any available edge
        for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
                if (!board[i][j]) {
                    return [i, j];
                }
            }
        }

        return null;
    };

    useEffect(() => {
        if (!isXNext && gameMode === 'computer') {
            const timer = setTimeout(() => {
                const move = findBestMove(board);
                if (move) {
                    const [row, col] = move;
                    const newBoard = board.map(row => [...row]);
                    newBoard[row][col] = 'O';
                    setBoard(newBoard);
                    setIsXNext(true);
                }
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isXNext, board, gameMode]);

    const resetGame = () => {
        setBoard(createEmptyBoard(gridSize));
        setIsXNext(true);
    };

    const winner = calculateWinner(board);
    const status = winner 
        ? `Winner: ${winner}`
        : board.flat().every(square => square)
        ? "Game is a draw!"
        : `Next player: ${isXNext ? 'X' : 'O'}`;

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

            <h1 className="text-center text-4xl md:text-6xl font-bold text-gray-900 mb-6 md:mb-10 tracking-tight">Tic Tac Toe</h1>

            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col gap-6 items-center">
                    <div className="flex flex-wrap gap-4 justify-center">
                        <label className="flex items-center gap-2">
                            <span className="text-gray-700 font-medium">Grid Size:</span>
                            <select 
                                value={gridSize} 
                                onChange={(e) => {
                                    const newSize = Number(e.target.value);
                                    setGridSize(newSize);
                                    setBoard(createEmptyBoard(newSize));
                                    setIsXNext(true);
                                }}
                                className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value={3}>3x3</option>
                                <option value={4}>4x4</option>
                                <option value={5}>5x5</option>
                            </select>
                        </label>

                        <label className="flex items-center gap-2">
                            <span className="text-gray-700 font-medium">Game Mode:</span>
                            <select 
                                value={gameMode} 
                                onChange={(e) => {
                                    setGameMode(e.target.value);
                                    resetGame();
                                }}
                                className="px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="computer">vs Computer</option>
                                <option value="human">vs Human</option>
                            </select>
                        </label>

                        <button 
                            onClick={resetGame}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            Reset Game
                        </button>
                    </div>

                    <div className="text-xl font-semibold text-gray-700">{status}</div>

                    <div 
                        className="grid gap-2 bg-gray-100 p-4 rounded-lg shadow-inner"
                        style={{ 
                            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                            gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
                        }}
                    >
                        {board.map((row, rowIndex) => (
                            row.map((cell, colIndex) => (
                                <button
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`w-16 h-16 bg-white text-3xl font-bold rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                                        !cell ? 'hover:bg-gray-50 cursor-pointer' : 'cursor-not-allowed'
                                    } ${winner === cell ? 'text-green-600' : ''}`}
                                    onClick={() => handleClick(rowIndex, colIndex)}
                                    disabled={cell !== null || (!isXNext && gameMode === 'computer')}
                                >
                                    {cell}
                                </button>
                            ))
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}