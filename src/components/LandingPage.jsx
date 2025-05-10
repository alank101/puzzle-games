import React from "react";
import { Link } from "react-router-dom";
import Unruly from '../images/Unruly.png'
import Connect_4 from '../images/Connect_4.png'
import Placeholder from '../images/Placeholder.png'
import TicTacToe from "./TicTacToe/TicTacToe";

export default function LandingPage() {
    return (
        <div className="flex flex-col items-center pt-8">
            <div className="text-6xl mb-8">Games</div>
            <div className="space-y-4">
                <div className="flex flex-row space-x-16">
                    <div className="flex items-center space-x-2">
                        <Link to='https://statuesque-kitten-d4c683.netlify.app/' className="flex flex-col items-center">
                            {/* repo for this website
                            https://github.com/alank101/arcade-project/tree/main/connect4
                            */}
                            <img src={Connect_4} alt='' className="w-64 h-64" />
                            <span>Connect Four</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link to='/Unruly' className="flex flex-col items-center">
                            <img src={Unruly} alt='' className="w-64 h-64" />
                            <span>Unruly</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link to='/TicTacToe' className="flex flex-col items-center">
                            <img src={TicTacToe} alt='' className="w-64 h-64" />
                            <span>Tic Tac Toe</span>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-row space-x-16">
                    <div className="flex items-center space-x-2">
                        <div className="flex flex-col items-center">
                            <img src={Placeholder} alt='' className="w-64 h-64" />
                            <span>More games coming soon</span>
                        </div>
                    </div>
                </div>
                {/* Add more game links here */}
            </div>
            {/* Footer */}
            <footer className="mt-8 text-center fixed bottom-0 left-0 right-0 mb-4">
                <div className="mb-4">
                    <a href="https://github.com/alank101/puzzle-games" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">
                        GitHub Repository
                    </a>
                </div>
                <div className="mb-4">
                    <a href="https://your-documentation-link.com" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:underline">
                        Documentation
                    </a>
                    <span className="mx-2">|</span>
                    <a href="mailto:alanklinect@gmail.com" className="text-cyan-500 hover:underline">
                        Contact Me
                    </a>
                </div>
                <p className="text-gray-600">
                    © {new Date().getFullYear()} Alan Barry. All rights reserved.
                </p>
            </footer>
        </div>
    )


}