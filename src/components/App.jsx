import React from "react";
import { Routes, Route } from "react-router-dom";
import {default as LandingPage} from './LandingPage'
import Unruly from "./Unruly/Unruly";
import TicTacToe from "./TicTacToe/TicTacToe";

export default function App() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='Unruly' element={<Unruly /> }></Route>
        <Route path='TicTacToe' element={<TicTacToe />}></Route>
      </Routes>
    </div>
  );
}

