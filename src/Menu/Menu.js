import React from "react"
import MenuItem from "./MenuItem"
import {Link} from "react-router-dom"
function Menu(props) {

    // let menu_list = []

    const menu_list = props.menu_items.map((value, index) => <MenuItem key={index} data={value} />)


    //     menu_list.append(<MenuItem data={element} />)
    // });

    return (
        <nav
            className="nav navbar navbar-light navbar-expand-lg sticky-top justify-content-between"
            style={{ backgroundColor: "#e3f2fd" }}
        >
            <Link className="nav-link navbar-brand" to="/">
                COVID-19
        </Link>
            <button className="navbar-toggler d-none" type="button" data-toggle="collapse" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {menu_list}

        </nav>
    )
}

export default Menu