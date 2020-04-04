import React from "react"
import CardItem from './CardItem'

import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import { HorizontalBar } from 'react-chartjs-2';

function ListItem(props) {
    // console.log(props);
    let new_col = "rgba(245,227,66,0.5)"
    // let new_col="rgba(255,50,40,0.4)"
    let active_col = "rgba(245,227,66,0.5)"
    let recovered_col = "rgba(81,245,66,0.5)"
    let death_col = "rgba(255,99,132,0.5)"

    let new_col_hover = "rgba(245,227,66,0.8)"
    let active_col_hover = "rgba(245,227,66,0.8)"
    let recovered_col_hover = "rgba(81,245,66,0.8)"
    let death_col_hover = "rgba(255,99,132,0.8)"

    let border_col = "rgba(201, 179, 193, 1)"
    let border_col_hover = "rgba(201, 179, 193, 1)"

    const state_data = props.data
    // console.log(state_data);


    // let text_col: [active_col, recovered_col, death_col]
    // let text = [state_data.active, state_data.recovered, state_data.deaths]

    active_col = "orange";
    death_col = "red";
    recovered_col = "green";
    border_col = "black";
    if (state_data.hasOwnProperty('active')) {

        return (

            <tr>
                <th scope="row">{props.rank}</th>
                <td>{state_data.state}</td>
                <td style={{ color: border_col }}>{state_data.confirmed}
                    <span className="blinking"> {state_data.delta.confirmed ? " (+" + state_data.delta.confirmed + ")" : ""}</span>
                </td>
                <td style={{ color: active_col }}>{state_data.active}
                    <span className="blinking" style={{ color: active_col }}> {state_data.delta.active ? " (+" + state_data.delta.active + ")" : ""}</span>
                </td>

                <td style={{ color: death_col }}>{state_data.deaths}
                    <span className="blinking" style={{ color: death_col }}> {state_data.delta.deaths ? " (+" + state_data.delta.deaths + ")" : ""}</span>
                </td>
                <td style={{ color: recovered_col }}>{state_data.recovered}
                    <span className="blinking" style={{ color: recovered_col }}>{state_data.delta.recovered ? " (+" + state_data.delta.recovered + ")" : ""}</span>
                </td>

                {/* <td ><CardItem data={props.data} /></td> */}
            </tr>
            // <li className="list-group-item">
        )

    } else {
        return (<tr style={{ display: "none" }}></tr>)
    }
}

export default ListItem