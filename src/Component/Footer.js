/* eslint-disable no-eval */
import React from "react"
import {getCookie} from "../utils/CookieHelper.js"

function Footer() {
    let dark=getCookie("dark") ? eval(getCookie("dark")) : false
    const footerStyle = {
        position: 'fixed',
        bottom: '0',
        margin: 'auto',
        width: '100%',
        background: dark ? "black" : "white",
        
    }
    const footerLinkStyle = {
        color: dark ? "wheat" : "darkgrey",
    }

    return (
        <footer style={footerStyle}>
            <a style={footerLinkStyle} href="https://akashraj.tech">
                 AkashRaj @{new Date().getFullYear()}
            </a>
        </footer>
    )
}
export default Footer