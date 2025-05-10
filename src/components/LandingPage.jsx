import React from "react";
import { Link } from "react-router-dom";
import Unruly from '../images/Unruly.png'
import Connect_4 from '../images/Connect_4.png'
import Placeholder from '../images/Placeholder.png'
import TicTacToe from "../images/TicTacToe.jpg";

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center min-h-screen p-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-12 tracking-tight">Puzzle Games</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
                <Link to='https://statuesque-kitten-d4c683.netlify.app/' 
                    className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <img src={Connect_4} alt='Connect Four' className="w-64 h-64 object-cover rounded-lg mb-4" />
                    <span className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">Connect Four</span>
                </Link>

                <Link to='/Unruly' 
                    className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <img src={Unruly} alt='Unruly' className="w-64 h-64 object-cover rounded-lg mb-4" />
                    <span className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">Unruly</span>
                </Link>

                <Link to='/TicTacToe' 
                    className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <img src={TicTacToe} alt='Tic Tac Toe' className="w-64 h-64 object-cover rounded-lg mb-4" />
                    <span className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">Tic Tac Toe</span>
                </Link>

                <div className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
                    <img src={Placeholder} alt='Coming Soon' className="w-64 h-64 object-cover rounded-lg mb-4 opacity-75" />
                    <span className="text-xl font-semibold text-gray-500">More games coming soon</span>
                </div>
            </div>

            <footer className="mt-auto w-full max-w-7xl py-8 text-center">
                <div className="space-y-4">
                    <div>
                        <a href="https://github.com/alank101/puzzle-games" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                            GitHub Repository
                        </a>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <a href="https://your-documentation-link.com" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                            Documentation
                        </a>
                        <span className="text-gray-400">|</span>
                        <a href="mailto:alanklinect@gmail.com" 
                           className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200">
                            Contact Me
                        </a>
                    </div>
                    <p className="text-gray-600">
                        © {new Date().getFullYear()} Alan Barry. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}