import React from "react"
import {Pie} from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import { HorizontalBar } from 'react-chartjs-2';

function CardItem(props) {
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
    const data = {
        labels:[`${state_data.state}`],
        // label: ["Active","Recovered","Deaths"],
        // labels: ["Active","Recovered","Deaths"],
        // datasets: [
        //     {
        //         // label: "Active",
        //         backgroundColor:[active_col,recovered_col,death_col],
        //         // backgroundColor: active_col,
        //         borderColor: border_col,
        //         borderWidth: 1,
        //         hoverBackgroundColor: [active_col,recovered_col,death_col],
        //         // hoverBackgroundColor: active_col_hover,
        //         hoverBorderColor: border_col_hover,
        //         data: [state_data.active,state_data.recovered,state_data.deaths]
        //     },
        // ]
        // for bar graph
        datasets: [
            // {
            //     label: "Active",
            //     backgroundColor: active_col,
            //     borderColor: border_col,
            //     borderWidth: 1,
            //     hoverBackgroundColor: active_col_hover,
            //     hoverBorderColor: border_col_hover,
            //     data: [state_data.active]
            // },
            {
                label: "Recovered",
                backgroundColor: recovered_col,
                borderColor: border_col,
                borderWidth: 1,
                hoverBackgroundColor: recovered_col_hover,
                hoverBorderColor: border_col_hover,
                data: [state_data.recovered]
            },
            {
                label: "Deaths",
                backgroundColor: death_col,
                borderColor: border_col,
                borderWidth: 1,
                hoverBackgroundColor: death_col_hover,
                hoverBorderColor: border_col_hover,
                data: [-state_data.deaths]
            },
        ]
    };
    let graph_options = {
        title: {
            display: false,
            text: `COVID-19 ${state_data.state}`
        },
        
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 2,
        scales: {
            xAxes: [{
                stacked: true,
                gridLines: {
                    drawBorder: false,
                  },
                //   display: false,
            }],
            yAxes: [{
                stacked: true,
                gridLines: {
                    drawBorder: false,
                  },
                  display: false,

            }]
        },
        legend: {
            display: false
        },
        // for pie chart
        

    }
    if (state_data.hasOwnProperty('active')){

    return (
        <div className="">
            {/* <h6 className="small">
                {state_data.state}
            </h6> */}
            {/* <Bar data={data} */}
            <HorizontalBar data={data}
            width={100}
            height={20}
                options={graph_options}
            />
        </div>
       
    )
    }
    else{
        return(<div style={{display:"none"}}></div>)
    }
}

export default CardItem