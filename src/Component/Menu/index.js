import React from "react"
import MenuItem from "./MenuItem"
function Menu(props) {

    const menu_list = props.menu_items.map((value, index) => <MenuItem key={index} data={value} />)


    let barClass = ["navbar ", "bg-dark "];

    let logoStyle = {
        height: "30px",
        width: "auto",
    }
    return (
        <nav className={barClass.join('')}>
            <div className="overlay btn-close" />
            <div className="container d-flex">
                <a href="https://akashraj.tech" className="title d-none d-sm-block">
                    <img className="img img-fluid" style={logoStyle} src="./virus.png" alt="Virus" />
                </a>
                <ul>
                    {menu_list}
                </ul>
            </div>
        </nav>
    );


}

export default Menu