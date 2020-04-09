import React from "react"
import Table from "./Table"
import { Component } from "react"
import {getCookie,setCookie,eraseCookie} from "./../../CookieHelper.js"


class TableOnly extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            'dark': getCookie("dark") ? eval(getCookie("dark")) : false,

        }
        this.handleChange = this.handleChange.bind(this)


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

    async getApiData(url, key) {
        let response = await fetch(url)
        let data = response.json()
        const jsondata = await data
        // console.log(jsondata);
        // this.setState({ [key]: jsondata })
        return jsondata

    }


    componentDidMount() {
        // console.log("map cpmpnent mount");

        let url = this.props.data_url
        let data = this.getApiData(url, "data")

        Promise.all([data]).then((responses) =>
            this.setState({
                isLoaded: true,
                data: responses[0],
            })
        )
        // console.log("after api calzzzz", data, am4geodata_indiaHigh, india_dict)
    }



    render() {
        // console.log("in render", this.state);
        // console.log('map rendered')
        let error = this.state.error
        let isLoaded = this.state.isLoaded
        if (error) {
            return <div> Error: {error.message} </div>
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
            }
            return (
                <div className="loader" >
                    <div className="corona-loading" style={loader_style}>
                        <img className="mt-5"
                            src="./virus.png"
                            alt="" />
                        <p className="text-center" style={{ margin: "auto" }}> Loading result... </p>
                    </div>
                </div>
            )
        }
        else {
            let this_copy = this;
            let fullscreen_style = {
                width: "100%",
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

                    <Table data={this.state.data} 
                                    theme={this.state.dark ? "dark" : "light"}
                                    />
                </div>
            )
        }
    }

}

export default TableOnly