import React from "react";
import { Link } from "react-router-dom";
import Unruly from '../images/Unruly.png'

export default function LandingPage() {
    return (
        <>
            <Link to='/Unruly'>
                <img src={Unruly} alt='' className="w-1/6"/>
                Unruly
            </Link>

        </>
    )
}