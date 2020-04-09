import React from "react"
import {Link} from "react-router-dom"
function MenuItem(props) {
    console.log("menu_prop", props);
    if(props.data.out_of_react){
        return (
            <a className="nav-link out" href={props.data.href}>
                <span>{props.data.text}</span>
            </a>
        )
        
    }
    return (
        <Link className="nav-link" to={props.data.href}>
            <span>{props.data.text}</span>
        </Link>
    )
}
export default MenuItem