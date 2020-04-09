import React from "react"
import { Component } from "react"
// import ListItem from "./TableRow"
// import CardItem from "./CardItem"
import Table from "./Table"
// import SubTable from "./SubTable"

import graph_data_options from "./GraphDataOptions"
import graph_data_timeline_options from "./GraphDataTimelineOptions"
import graph_data_total_options from "./GraphDataTotalOptions"
// import 'chartjs-plugin-datalabels';

import { Bar } from 'react-chartjs-2';
// import { HorizontalBar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
// import { Polar } from 'react-chartjs-2';

// import DataTable from 'react-data-table-component';

// import "./Switch.css"

function setCookie(name, value, days) {
    var expires = "";
    if (value === true || value === false) {
        value = value.toString()
    }
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=./";
    // console.log(name + "=" + (value || "") + expires + "; path=./")
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}


class Graph extends Component {

    constructor(props) {
        super(props)
        this.state = {
            'isLoaded': false,
            'data': {},
            'timeline': {},
            'dataLoaded': false,
            'timelineLoaded': false,
            'log_scale': getCookie("log_scale") ? eval(getCookie("log_scale")) : true,
            'fullscreen': getCookie("fullscreen") ? eval(getCookie("fullscreen")) : false,
            'dark': getCookie("dark") ? eval(getCookie("dark")) : false,
        }
        // this.scales = { '1': "linear", '-1': "logarithmic" }
        this.handleChange = this.handleChange.bind(this)
    }

    getScale() {
        return this.state.log_scale ? "logarithmic" : "linear";
    }

    handleChange(id, key) {
        // console.log(id, key);
        // console.log(key, "=", this.state[key]);
        let checkbox = document.getElementById(id)
        let prev = checkbox.checked
        let new_val = !this.state[key]
        setCookie(key, new_val)
        this.setState({ [key]: new_val }, this.setup_chart)
        // this.forceUpdate();

        return !prev;

    }


    componentDidMount() {
        let url = this.props.url
        // let url ="https://akashraj.tech"
        let timeline_url = this.props.timeline_url
        // this.fetchAndSet(url, 'data')
        // this.fetchAndSet(timeline_url, 'timeline')
        Promise.all([fetch(url), fetch(timeline_url)]).then((responses) => {


            let json_data = []
            responses.forEach(res => json_data.push(res.json()))

            Promise.all(json_data).then(json_responses => {
                this.setState({
                    isLoaded: true,
                    data: json_responses[0],
                    dataLoaded: true,
                    timeline: json_responses[1],
                    timelineLoaded: true,
                })
            }).catch(err => this.setState({ "error": err.message }))
        }
        ).catch(err => this.setState({ "error": err.message }))


    }

    render() {

        const { error, isLoaded, data, timeline } = this.state;
        // console.log(error, isLoaded, data);

        if (error) {
            return <div className="text-danger font-weight-bold"> Error: {error.message} </div>
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

                        let new_confirmed = data.state_wise[key].deltaconfirmed ? parseInt(data.state_wise[key].deltaconfirmed) : 0
                        let new_deaths = data.state_wise[key].deltadeaths ? parseInt(data.state_wise[key].deltadeaths) : 0
                        let new_recovered = data.state_wise[key].deltarecovered ? parseInt(data.state_wise[key].deltarecovered) : 0
                        let new_active = data.state_wise[key].deltaactive ? parseInt(data.state_wise[key].deltaactive) : 0
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







            graph_data_options.title.text = `COVID-19 INDIA STATE WISE (${this.getScale()} scale) (where cases >${min_to_show})`
            graph_data_timeline_options.scales.yAxes[0].type = this.getScale()
            graph_data_options.scales.yAxes[0].type = this.getScale()
            // console.log(graph_data_options);

            // console.log( graph_data_options.title.text);
            // console.log( graph_data_timeline_options.scales.yAxes[0].type);
            // console.log(  graph_data_options.scales.yAxes[0].type);
            if (this.state.log_scale) {
                // let temp=graph_data_timeline
                // graph_data_timeline = { ...graph_data, scale: "log" }
                // graph_data = { ...temp, scale: "log" }
                graph_data_timeline = { ...graph_data_timeline, scale: "log" }
                graph_data = { ...graph_data, scale: "log" }
            }

            console.log(graph_data);

            let this_copy = this;
            let fullscreen_style = {
                // width: "100vw",
                // height: "100vh",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: "100",
                background: this.state.dark ? "black" : "white",
                color: this.state.dark ? "white" : "black",
            }
            let style = {
                // width: "100vw",
                // height: "100%",
                background: this.state.dark ? "black" : "white",
                color: this.state.dark ? "white" : "black",
            }

            return (
                <div style={this.state.fullscreen ? fullscreen_style : style}> {/* This is map */}

                <div className="row w-100 m-0">
                    <div className="setting custom-configuration" >
                        <div className="setting-button" >
                            <button className="btn p-0 px-1 m-0" style={{ background: "rgba(255,255,255,0.8)" }} onClick={function () {
                                this_copy.setState({ show_setting: !this_copy.state.show_setting })
                            }
                            }> <img src="./setting.png" alt="Show setting" width="20px" />
                            </button>
                        </div>
                        <div className={`${this.state.show_setting ? '' : 'd-none'} mt-2  p-2 rounded`} style={{
                            background: this.state.dark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.8)",
                            color: this.state.dark ? "black" : "white",
                        }}>
                            <div className="custom-control custom-switch " >
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked={this.state.log_scale}
                                    onChange={() => { }}
                                    id="log_scale_toggle"
                                />
                                <label className="custom-control-label"
                                    onClick={() => this.handleChange("log_scale_toggle", "log_scale")}
                                    htmlFor="log_scale_toggle">Scale ({this.getScale()}) </label>
                            </div>
                            <div className="custom-control custom-switch " >
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked={this.state.fullscreen}
                                    onChange={() => { }}
                                    id="fullscreen_toggle"
                                />
                                <label className="custom-control-label"
                                    onClick={() => this.handleChange("fullscreen_toggle", "fullscreen")}
                                    htmlFor="fullscreen_toggle"> Fullscreen </label>
                            </div>
                            <div className="custom-control custom-switch " >
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked={this.state.dark}
                                    onChange={() => { }}
                                    id="dark_toggle"
                                />
                                <label className="custom-control-label"
                                    onClick={() => this.handleChange("dark_toggle", "dark")}
                                    htmlFor="dark_toggle"> Dark Mode </label>
                            </div>
                        </div>
                    </div>

                    <h6 className='small text-muted m-0 text-center w-100'> Last updated: {total_data.lastupdatedtime}</h6>
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
                                <Table data={data}
                                    theme={this.state.dark ? "dark" : "light"}
                                />
                            </div>

                            <div className="col-6">
                                {/* {card_list} */}
                            </div>

                        </div >
                    </div >
                </div >
                        </div>

            );
        }


    }
}

export default Graph