import React from "react"
import {getCookie} from "./CookieHelper.js"

// function getCookie(name) {
//     var nameEQ = name + "=";
//     var ca = document.cookie.split(';');
//     for (var i = 0; i < ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) === ' ') c = c.substring(1, c.length);
//         if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
//     }
//     return null;
// }


function Footer() {
    let dark=getCookie("dark") ? eval(getCookie("dark")) : false
    const footerStyle = {
        position: 'fixed',
        bottom: '0',
        margin: 'auto',
        width: '100%',
        // backgroundColor: 'white'
        background: dark ? "black" : "white",
        
    }
    const footerLinkStyle = {
        color: dark ? "wheat" : "darkgrey",
    // color:"darkgrey",
    
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