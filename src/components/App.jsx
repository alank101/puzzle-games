import React from "react";
import { Routes, Route } from "react-router-dom";
import {default as LandingPage} from './LandingPage'
import Unruly from "./Unruly";
// import * as boards from './UnrulyGameBoards'




export default function App() {

  return (
    <div className='bg-gray-500'>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='Unruly' element={<Unruly /> }></Route>
      </Routes>
    </div>
  );
}

