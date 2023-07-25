import React from "react";
import { Routes, Route } from "react-router-dom";
import {default as LandingPage} from './LandingPage'
import Unruly from "./Unruly";




export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='Unruly' element={<Unruly />}></Route>
      </Routes>
    </div>
  );
}
