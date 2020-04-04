import React from "react"
import Table from "./Table"
import { Component } from "react"

class TableOnly extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
        }


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

            return (

                <div> 
                   <Table data={this.state.data} />
                </div>
            )
        }
    }

}

export default TableOnly