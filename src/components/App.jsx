import React from "react";
import { Routes, Route } from "react-router-dom";
import {default as LandingPage} from './LandingPage'
import Unruly from "./Unruly/Unruly";
import TicTacToe from "./TicTacToe/TicTacToe";




export default function App() {

  return (
    <div className='bg-gray-500 h-screen'>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='Unruly' element={<Unruly /> }></Route>
        <Route path='TicTacToe' element={<TicTacToe />}></Route>
      </Routes>
    </div>
  );
}

