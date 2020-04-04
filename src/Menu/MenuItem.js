import React from "react"
import {Link} from "react-router-dom"
function MenuItem(props) {
    // console.log("menu_prop", props);

    return (
        <Link className="nav-link" to={props.data.href}>
            <span>{props.data.text}</span>
        </Link>
    )
}
export default MenuItem