import React from "react";
import { Link } from "react-router-dom";
import Unruly from '../images/Unruly.png'
import Connect_4 from '../images/Connect_4.png'

export default function LandingPage() {
    return (
        <>
        <div>Games</div>
            <Link to='/Unruly'>
                <img src={Unruly} alt='' className="w-1/12"/>
                Unruly
            </Link>
            <Link to='https://statuesque-kitten-d4c683.netlify.app/'>
                <img src={Connect_4} alt='' className="w-1/12"/>
                Connect Four
            </Link>

        </>
    )
}