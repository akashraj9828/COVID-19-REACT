import React from "react"

function Footer() {
    const footerStyle = {
        position: 'fixed',
        bottom: '0',
        margin: 'auto',
        width: '100%',
        backgroundColor: 'white'
    }
    const footerLinkStyle = {
    color:"darkgrey",

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