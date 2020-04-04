import React from "react"
import { Component } from "react"
import ListItem from "./ListItem"
import CardItem from "./CardItem"
import Table from "./Table"
import SubTable from "./SubTable"

import graph_data_options from "./GraphDataOptions"
import graph_data_timeline_options from "./GraphDataTimelineOptions"
import graph_data_total_options from "./GraphDataTotalOptions"
// import 'chartjs-plugin-datalabels';

import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import { Polar } from 'react-chartjs-2';

import DataTable from 'react-data-table-component';


class List extends Component {

    constructor(props) {
        super(props)
        this.state = {
            'isLoaded': false,
            'data': {},
            'timeline': {},
            'dataLoaded': false,
            'timelineLoaded': false,
        }
    }

    updateState(obj) {
        // console.log("Update called with", obj);

        let copy_state = Object.assign({}, this.state)
        let keys = Object.keys(obj)
        for (let key in keys) {
            // console.log(keys[key]);
            let kk = keys[key]
            copy_state[kk] = obj[kk]
        }
        // copy_state[key] = value
        // console.log("new state should have been", copy_state);

        this.setState(
            copy_state
        )
    }
    fetchAndSet(url, key) {
        // console.log("before update ", this.state);
        fetch(url).then(res => res.json()).then(
            (data) => {

                let change = {
                    [key]: data,
                    // isLoaded: true,
                }
                if (key === "data") {
                    change.dataLoaded = true
                }
                if (key === "timeline") {
                    change.timelineLoaded = true
                }
                this.updateState(change)

                if (this.state.dataLoaded && this.state.timelineLoaded) {
                    let change = {
                        isLoaded: true,
                    }
                    this.updateState(change)
                }
                // console.log("after update", this.state);
                return true
            },
            (error) => {
                let change = {
                    error: error,
                    isLoaded: true,
                }
                this.updateState(change)

            }
        )
    }
    componentDidMount() {
        let url = this.props.url
        let timeline_url = this.props.timeline_url
        this.fetchAndSet(url, 'data')
        this.fetchAndSet(timeline_url, 'timeline')
    }

    render() {

        const { error, isLoaded, data, timeline } = this.state;
        // console.log(error, isLoaded, data);

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            let loader_style = {
                position: "fixed",
                width: "100%",
                height: "100%",
                left: "0",
                right: "0",
                top: "58px",
                background: "#fff",
                zIndex: "999999999",
                bottom: "0",
                // display: "flex",
            }
            return (<div className="loader">
                <div className="corona-loading" style={loader_style}>
                    <img src="./virus.png" alt="" />
                    <p className="text-center" style={{ margin: "auto" }}>Loading result ...</p>
                </div>
            </div>)
        } else {

            let min_to_show = 20;
            let data_list = []
            let card_list = []
            // statewise
            let total_data = []
            let graph_data = {}
            //    graph option at end
            let states_name = []
            let states_cases = []
            let states_recovered = []
            let states_active = []
            let states_death = []

            // timeline
            let graph_data_timeline = {}
            //    graph option at end
            let timeline_date = []
            let timeline_death = []
            let timeline_cases = []
            let timeline_recovery = []
            let timeline_total = []

            let graph_data_total_pie = {}

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


            let dataTable_data = []
            let columns = {}
            if (this.state.isLoaded) {
                if (this.state.dataLoaded) {
                    // console.log("loggggggg", data.state_wise);
                    let all_keys = Object.keys(data.state_wise)
                    let i = 1;

                    for (let key in all_keys) {
                        // console.log(key);
                        key = all_keys[key]
                        if (!data.state_wise[key].confirmed) {
                            continue
                        }
                        let confirmed = parseInt(data.state_wise[key].confirmed)
                        let deaths = parseInt(data.state_wise[key].deaths)
                        let recovered = parseInt(data.state_wise[key].recovered)
                        let active = parseInt(data.state_wise[key].active)

                        let new_confirmed = data.state_wise[key].delta.confirmed ? parseInt(data.state_wise[key].delta.confirmed) : 0
                        let new_deaths = data.state_wise[key].delta.deaths ? parseInt(data.state_wise[key].delta.deaths) : 0
                        let new_recovered = data.state_wise[key].delta.recovered ? parseInt(data.state_wise[key].delta.recovered) : 0
                        let new_active = data.state_wise[key].delta.active ? parseInt(data.state_wise[key].delta.active) : 0
                        let district_wise = data.state_wise[key].district


                        if (confirmed > min_to_show) {

                            states_cases.push(confirmed)
                            states_death.push(deaths)
                            states_recovered.push(recovered)
                            states_active.push(active)
                            states_name.push(key)
                        }
                        dataTable_data.push(
                            {
                                id: i,
                                state: key,
                                total: confirmed,
                                active: active,
                                deaths: deaths,
                                recovered: recovered,
                                new_total: new_confirmed,
                                new_active: new_active,
                                new_deaths: new_deaths,
                                new_recovered: new_recovered,
                                district_wise: district_wise,
                            }
                        )

                        // data_list.push(
                        //     <ListItem key={key} rank={i} data={data.state_wise[key]} />
                        // )
                        // card_list.push(
                        //     <CardItem key={i} rank={i} data={data.state_wise[key]} />
                        // )
                        i++
                    }

                    columns = [
                        {
                            name: '#',
                            selector: 'id',
                            sortable: true,
                            style: {
                                fontWeight: "500",
                            },
                            width: "50px"
                        },
                        {
                            name: 'State',
                            selector: 'state',
                            sortable: true,
                            left: true,
                            style: {
                                fontWeight: "500",
                            },

                        },
                        {
                            name: 'Total',
                            selector: 'total',
                            sortable: true,
                            left: true,
                            style: {
                                color: "black",
                                fontWeight: "500",
                            },
                            format: row => <span>{row.total} <small className="blinking">{row.new_total > 0 ? "+" + row.new_total : ""}</small></span>,
                            // cell:row => <div><div style={{ fontWeight: "bold" }}>{row.total}</div> +{row.new_total}</div>,
                            width: "100px"

                        },
                        {
                            name: 'Active',
                            selector: 'active',
                            sortable: true,
                            left: true,
                            style: {
                                color: "orange",
                                fontWeight: "500",
                            },
                            format: row => <span>{row.active} <small className="blinking" style={{ color: "red" }}>{row.new_active > 0 ? "+" + row.new_active : ""}</small></span>,
                            width: "100px"


                        },
                        {
                            name: 'Deaths',
                            selector: 'deaths',
                            sortable: true,
                            left: true,
                            style: {
                                color: "red",
                                fontWeight: "500",
                            },
                            format: row => <span>{row.deaths} <small className="blinking">{row.new_deaths > 0 ? "+" + row.new_deaths : ""}</small></span>,
                            width: "100px"


                        },
                        {
                            name: 'Recovered',
                            selector: 'recovered',
                            sortable: true,
                            left: true,
                            style: {
                                color: "green",
                                fontWeight: "500",
                            },
                            format: row => <span>{row.recovered} <small className="blinking">{row.new_recovered > 0 ? "+" + row.new_recovered : ""}</small></span>,
                            width: "100px"


                        },

                    ];
                    total_data = data.total_values;
                    graph_data_total_pie = {
                        labels: ["Active", "Recovered", "Deaths"],
                        datasets: [
                            {
                                // label: "Active",
                                backgroundColor: [active_col, recovered_col, death_col],
                                // backgroundColor: active_col,
                                borderColor: border_col,
                                borderWidth: 1,
                                hoverBackgroundColor: [active_col, recovered_col, death_col],
                                // hoverBackgroundColor: active_col_hover,
                                hoverBorderColor: border_col_hover,
                                data: [total_data.active, total_data.recovered, total_data.deaths],

                            }]


                    };
                    graph_data = {
                        labels: states_name,
                        datasets: [
                            {
                                // label: "India COVID-19-cases",
                                label: "Active",
                                backgroundColor: active_col,
                                borderColor: border_col,
                                borderWidth: 1,
                                hoverBackgroundColor: active_col_hover,
                                hoverBorderColor: border_col_hover,
                                data: states_active,

                            }, {
                                // label: "India COVID-19-cases",
                                label: "Recovered",
                                backgroundColor: recovered_col,
                                borderColor: border_col,
                                borderWidth: 1,
                                hoverBackgroundColor: recovered_col_hover,
                                hoverBorderColor: border_col_hover,
                                data: states_recovered
                            }, {
                                // label: "India COVID-19-cases",
                                label: "Deaths",
                                backgroundColor: death_col,
                                borderColor: border_col,
                                borderWidth: 1,
                                hoverBackgroundColor: death_col_hover,
                                hoverBorderColor: border_col_hover,
                                data: states_death
                            },

                        ]
                    };
                }
                if (this.state.timelineLoaded) {

                    for (let key in timeline) {
                        let obj = timeline[key]
                        timeline_date.push(obj.date)
                        timeline_cases.push(obj.dailyconfirmed)
                        timeline_recovery.push(obj.dailyrecovered)
                        timeline_death.push(obj.dailydeceased)
                        timeline_total.push(obj.totalconfirmed)
                    }
                    graph_data_timeline = {
                        labels: timeline_date,
                        datasets: [
                            {
                                // label: "India COVID-19-cases",
                                type: 'line',
                                // fill:0,
                                fill: false,
                                label: "Total Till Date",
                                backgroundColor: death_col,
                                borderColor: "red",
                                borderWidth: 0.2,
                                hoverBackgroundColor: death_col_hover,
                                hoverBorderColor: border_col_hover,
                                data: timeline_total,

                            },
                            {
                                label: "New Cases",
                                backgroundColor: new_col,
                                borderColor: border_col,
                                borderWidth: 0.2,
                                hoverBackgroundColor: new_col_hover,
                                hoverBorderColor: border_col_hover,
                                data: timeline_cases
                            },
                            {
                                label: "New Recovery",
                                backgroundColor: recovered_col,
                                borderColor: border_col,
                                borderWidth: 0.2,
                                hoverBackgroundColor: recovered_col_hover,
                                hoverBorderColor: border_col_hover,
                                data: timeline_recovery
                            },
                            {
                                label: "New Deaths",
                                backgroundColor: death_col,
                                borderColor: border_col,
                                borderWidth: 0.2,
                                hoverBackgroundColor: death_col_hover,
                                hoverBorderColor: border_col_hover,
                                data: timeline_death
                            },

                        ]
                    };
                    // console.log(graph_data_timeline);

                }
            }


            let plugin_config = {
                // datalabels: {
                //     display: 'auto',
                // //    display: true,
                //    color: 'white',
                // //    padding:10,
                // offset:100,
                // anchor:"end"
                // }
            }







            graph_data_options.title.text = `COVID-19 INDIA STATE WISE (log scale) (where cases >${min_to_show})`
            return (
                <div className="row">
                    <div className="col-12 col-lg-6 my-2">
                        <h3>Total</h3>

                        <Pie data={graph_data_total_pie}
                            options={graph_data_total_options}
                        />
                        <span className="m-auto font-weight-bold"> Total: {total_data.confirmed} </span>
                        <span className="m-auto font-weight-bold">/ Active: {total_data.active}</span>
                        <span className="m-auto font-weight-bold">/ Deaths: {total_data.deaths}</span>
                        <span className="m-auto font-weight-bold">/ Recovered: {total_data.recovered}</span>
                        {/* <span class="m-auto font-weight-bold"> Mortality: % </span> */}
                        {/* <span class="m-auto font-weight-bold"> Survival: % </span> */}
                    </div>
                    <div className="col-12 col-lg-6 my-2 mt-4">
                        <h3>State Wise data</h3>
                        <Bar data={graph_data}
                            width={100}
                            height={80}
                            options={graph_data_options}
                        />
                    </div>

                    <div className="col-12 my-2 mt-4">
                        <div className="row">
                            <div className="col-12 my-2">
                                <h3>Timeline of India</h3>

                                <Line data={graph_data_timeline}
                                    width={100}
                                    height={60}
                                    options={graph_data_timeline_options}
                                />

                            </div>
                            <div className="col-12 my-2">
                                <h3>State Wise Data</h3>
                            </div>
                            <div className="table-responsive">
                                <Table data={data} />
                            </div>

                            <div className="col-6">
                                {/* {card_list} */}
                            </div>

                        </div >
                    </div >
                </div >


            );
        }


    }
}

export default List