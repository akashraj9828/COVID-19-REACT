import React from "react"

function MenuItem(props) {
    // console.log("menu_prop", props);

    return (
        <a className="nav-link" href={props.data.href}>
            {props.data.text}
        </a>
    )
}
export default MenuItem