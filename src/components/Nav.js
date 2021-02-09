import React from 'react';
import "./Nav.css";
import * as GrFont from "react-icons/gr"

function Nav() {
    return (
        <>
            <nav>
                <GrFont.GrSend className="icon send"/>
                <h2>ChatApp</h2>
            </nav>
        </>
    )
}

export default Nav
