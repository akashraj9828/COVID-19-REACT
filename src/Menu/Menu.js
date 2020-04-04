import React from "react"
import MenuItem from "./MenuItem"
import { Link } from "react-router-dom"
function Menu(props) {

    // let menu_list = []

    const menu_list = props.menu_items.map((value, index) => <MenuItem key={index} data={value} />)


    // menu_list.append(<MenuItem data={element} />)
    // });

    let barClass = ["navbar ", "bg-dark "];

    let logoStyle = {
        height: "30px",
        width: "auto",
        // filter: "grayscale()"
    }
    return (
        <nav className={barClass.join('')}>
            <div className="overlay btn-close" />
            <div className="container d-flex">
                <a href="https://akashraj.tech" className="title">
                    <img className="img img-fluid" style={logoStyle} src="./virus.png" alt="Virus" srcset="" />
                </a>
                <ul>
                    {/* <a href="#news"><span>News</span></a>
                    <a href="#about"><span>About</span></a>
                    <a href="#gallery"><span>Gallery</span></a>
                    <a href="#contact"><span>Contact</span></a> */}
                    {menu_list}
                </ul>
            </div>
        </nav>
    );


}

export default Menu