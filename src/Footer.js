import React from "react"

function Footer(){
    const footerStyle={position: 'fixed',
        bottom: '0',
        margin: 'auto',
        width: '100%',
        backgroundColor:'white'
    }
    return(
        <footer style={footerStyle}>
            AkashRaj@{new Date().getFullYear()}
        </footer>
    )
}
export default Footer