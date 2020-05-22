/* eslint-disable no-eval */
import React, {
    Component
} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import InfoBar from "./InfoBar";
import { getCookie, setCookie} from "./../../../utils/CookieHelper.js"


am4core.useTheme(am4themes_animated);

class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
            show_setting: false,
            bubble: getCookie("bubble") ? eval(getCookie("bubble")) : true,
            tooltip: getCookie("tooltip") ? eval(getCookie("tooltip")) : true,
            legend: getCookie("legend") ? eval(getCookie("legend")) : true,
            horizontal_legend: getCookie("horizontal_legend") ? eval(getCookie("horizontal_legend")) : false,
            fullscreen: getCookie("fullscreen") ? eval(getCookie("fullscreen")) : false,
            dark: getCookie("dark") ? eval(getCookie("dark")) : false,
            info_bar: getCookie("info_bar") ? eval(getCookie("info_bar")) : true,
            map_title: getCookie("map_title") ? eval(getCookie("map_title")) : true,
        }
        this.setup_chart = this.setup_chart.bind(this)
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


    componentDidMount() {
        let url = this.props.url
        let india_map_url = "./data/india_map.json"


        Promise.all([fetch(url), fetch(india_map_url)]).then((responses, err) => {
            let json_data = []

            responses.forEach(res => json_data.push(res.json()))

            Promise.all(json_data).then((json_responses, err) => {
                this.setState({
                    isLoaded: true,
                    data: json_responses[0],
                    am4geodata_indiaHigh: json_responses[1],
                    hovered: {
                        name: "India",
                        value: json_responses[0].total_values.confirmed,
                        active: json_responses[0].total_values.active,
                        deaths: json_responses[0].total_values.deaths,
                        recovered: json_responses[0].total_values.recovered,
                    }
                },
                )
            }).then(
                () => this.setup_chart()
            )
            .catch(err => {
                this.setState({ "error": err })
            })

        }
        ).then(() => { })
        .catch(err => this.setState({ "error": err }))





        // console.log("after api calzzzz", data, am4geodata_indiaHigh, india_dict)
    }

    setup_chart() {
        // console.log(this.chart);
        if (this.chart) {
            this.chart.dispose();
        }
        // this.chart.dispose();

        // console.log("map setup chart");
        // console.log(this.state)
        let enable_bubble = this.state.bubble
        let enable_legend = this.state.legend
        let enable_tooltip = this.state.tooltip
        let heat_legend_horizontal = this.state.horizontal_legend
        let max_cirlce_size = 50
        let min_cirlce_size = 2
        let data = this.state.data
        // console.log("data,", data);

        let am4geodata_indiaHigh = this.state.am4geodata_indiaHigh
        // let india_dict = this.state.india_dict

        let india_total_stats = {
            name: "India",
            value: data.total_values.confirmed,
            active: data.total_values.active,
            deaths: data.total_values.deaths,
            recovered: data.total_values.recovered,
        }



        if (this.state.error) {
            return
        }
        let states_cases = []


        let mapData = []

        var total_len = am4geodata_indiaHigh.features.length
        for (let i = 0; i < total_len; i++) {
            let key = am4geodata_indiaHigh.features[i].properties.name
            if (!key) {
                continue
            }
            if (!parseInt(data.state_wise[key].confirmed)) {
                data.state_wise[key].confirmed = 0
            }

            let confirmed = parseInt(data.state_wise[key].confirmed)

            states_cases.push(confirmed)
        }
        let min_val = Math.min(...states_cases)
        let max_val = Math.max(...states_cases)
        // console.log(india_total_stats);

        for (let i = 0; i < total_len; i++) {
            let key = am4geodata_indiaHigh.features[i].properties.name
            // console.log(key);
            if (!key) {
                continue
            }

            if (!parseInt(data.state_wise[key].confirmed)) {
                data.state_wise[key].confirmed = 0
            }

            let confirmed = parseInt(data.state_wise[key].confirmed)
            let deaths = parseInt(data.state_wise[key].deaths)
            let recovered = parseInt(data.state_wise[key].recovered)
            let active = parseInt(data.state_wise[key].active)
            let statecode = data.state_wise[key].statecode
            states_cases.push(confirmed)
            let color_circle = `rgba(${parseInt(confirmed * 2 / max_val * 255)},40,40,0.8)`
            let color_fill = `rgba(${parseInt(confirmed * 2 / max_val * 255)},40,40,0.8)`
            if (enable_bubble) {
                color_fill = `rgba(${parseInt(confirmed * 2 / max_val * 255)},40,40,0.5)`
            }
            let percent = (parseInt(confirmed) / parseInt(india_total_stats.value)) * 100
            percent = percent.toFixed(2)

            am4geodata_indiaHigh.features[i].properties.value = confirmed
            am4geodata_indiaHigh.features[i].properties.deaths = deaths
            am4geodata_indiaHigh.features[i].properties.recovered = recovered
            am4geodata_indiaHigh.features[i].properties.active = active
            am4geodata_indiaHigh.features[i].properties.color = color_fill
            am4geodata_indiaHigh.features[i].properties.percent = percent
            mapData.push({
                "id": "IN-" + statecode,
                "name": key,
                "value": confirmed,
                "deaths": deaths,
                "recovered": recovered,
                "active": active,
                "percent": percent,
                "color": color_circle,
                "tooltipColor": "red",
            })


        }





        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create map instance
        var chart = am4core.create("map-chart-container", am4maps.MapChart);
        chart.theme = "dark"
        this.chart = chart

        chart.responsive.enabled = true;




        var total_data = data.total_values
        var title = chart.titles.create();
        if (this.state.map_title) {

            title.html = `<h5 class='font-weight-bold m-0 ${this.state.dark ? "text-white" : ""}' style={font-size: 20}>India COVID-19 Spread</h5>
            <h6 class='small m-0 ${this.state.dark ? "text-white" : "text-muted"}'> Last updated: ${total_data.lastupdatedtime}</h6> `;
        }

        chart.geodata = am4geodata_indiaHigh;
        chart.focusable = true;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        // polygonSeries.exclude = ["IN-MH"];
        polygonSeries.useGeodata = true;
        polygonSeries.data = mapData;
        polygonSeries.nonScalingStroke = true;
        polygonSeries.strokeWidth = 0.5;
        polygonSeries.calculateVisualCenter = true;

        if (enable_bubble) {

            var imageSeries = chart.series.push(new am4maps.MapImageSeries());
            imageSeries.data = mapData;
            imageSeries.dataFields.value = "value";


            var imageTemplate = imageSeries.mapImages.template;
            imageTemplate.nonScaling = false

        }

        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.nonScaling = false
        polygonTemplate.propertyFields.fill = `color`;
        // polygonTemplate.propertyFields.fill = `deaths`;
        polygonTemplate.fillOpacity = 1;

        if (enable_tooltip) {

            // set tooltip color
            polygonSeries.tooltip.getFillFromObject = false;
            polygonSeries.tooltip.background.fill = am4core.color("rgba(100,100,100,0.8)");
            polygonSeries.tooltip.label.fill = am4core.color("white");
            // 

            polygonTemplate.tooltipText = `[bold] {name}[/]
        -------
        Total: [bold]{value}[/] 
        Active: [bold]{active}[/] 
        Recovered: [bold]{recovered}[/] 
        Deaths: [bold]{deaths}[/]
        [bold] {percent} % [/]of total

        `;
        }

        let currentComponent = this;

        if (enable_bubble) {

            // set tooltip color
            imageSeries.tooltip.getFillFromObject = false;
            imageSeries.tooltip.background.fill = am4core.color("rgba(100,100,100,0.8)");
            imageSeries.tooltip.label.fill = am4core.color("white");

            var circle = imageTemplate.createChild(am4core.Circle);
            circle.fillOpacity = 1;
            circle.propertyFields.fill = "color";
            if (enable_tooltip) {

                circle.tooltipText = `[bold] {name}[/]
            -------
            Total: [bold]{value}[/] 
            Active: [bold]{active}[/] 
            Recovered: [bold]{recovered}[/] 
            Deaths: [bold]{deaths}[/]
            [bold] {percent} % [/]of total
        `;
            }
            imageSeries.heatRules.push({
                "target": circle,
                "property": "radius",
                "min": min_cirlce_size,
                "max": max_cirlce_size,
                "dataField": "value"
            })

            imageTemplate.adapter.add("latitude", function (latitude, target) {
                var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
                if (polygon) {
                    return polygon.visualLatitude;
                }
                return latitude;
            })

            imageTemplate.adapter.add("longitude", function (longitude, target) {
                var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
                if (polygon) {
                    return polygon.visualLongitude;
                }
                return longitude;
            })



        }

        // heatmap legends
        let heatLegend = null
        if (enable_legend) {

            heatLegend = chart.createChild(am4charts.HeatLegend);
            heatLegend.minColor = am4core.color(`rgba(${min_val},40,40,0.8)`);
            heatLegend.maxColor = am4core.color(`rgba(${max_val},40,40,0.8)`);
            // heatLegend.maxColor = am4core.color("#ED7B84");

            if (heat_legend_horizontal) {
                heatLegend.minValue = min_val;
                heatLegend.maxValue = max_val;
                heatLegend.series = polygonSeries;
                heatLegend.width = am4core.percent(90);

                heatLegend.orientation = "horizontal";
                heatLegend.postion = "absolute"
                heatLegend.x = 20
                // heatLegend.y = am4core.percent(10)
                heatLegend.y = 40
                // heatLegend.markerContainer.height = am4core.percent(100);
                // heatLegend.labels = true;
            } else {
                heatLegend.minValue = min_val;
                heatLegend.maxValue = max_val;
                // heatLegend.series = polygonSeries;

                heatLegend.orientation = "vertical";
                heatLegend.postion = "absolute"
                heatLegend.x = 20
                heatLegend.y = am4core.percent(10)
                // heatLegend.labels = true;
            }
        }
        polygonTemplate.events.on("over", function (ev) {
            currentComponent.setState({
                hovered: ev.target.dataItem._dataContext
            })
            // console.log(ev.target.dataItem._dataContext);
            if (enable_legend) {

                if (!isNaN(ev.target.dataItem.value)) {
                    heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
                } else {
                    heatLegend.valueAxis.hideTooltip();
                }
            }
        });

        polygonTemplate.events.on("out", function (ev) {

            if (enable_legend) {
                heatLegend.valueAxis.hideTooltip();
            }
            currentComponent.setState({
                hovered: india_total_stats
            })


        });

        if (enable_bubble) {

            imageTemplate.events.on("over", function (ev) {
                currentComponent.setState({
                    hovered: ev.target.dataItem._dataContext
                })
                if (enable_legend) {

                    if (!isNaN(ev.target.dataItem.value)) {
                        heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
                    } else {
                        heatLegend.valueAxis.hideTooltip();
                    }
                }
            });

            imageTemplate.events.on("out", function (ev) {
                currentComponent.setState({
                    hovered: india_total_stats
                })
                if (enable_legend) {

                    heatLegend.valueAxis.hideTooltip();
                }
            });

            // console.log(chart);
        }
    }
    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {
        let error = this.state.error
        let isLoaded = this.state.isLoaded
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
                width: "100vw",
                height: "100vh",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: "100",
                background: this.state.dark ? "black" : "white",
            }
            let style = {
                width: "100%",
                height: "100%",
                background: this.state.dark ? "black" : "white",
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
                                    checked={this.state.bubble}
                                    onChange={() => { }}
                                    id="bubble_toggle"
                                />
                                <label className="custom-control-label"
                                    onClick={() => this.handleChange("bubble_toggle", "bubble")}
                                    htmlFor="bubble_toggle">Bubble </label>
                            </div>
                            <div className="custom-control custom-switch " >
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked={this.state.tooltip}
                                    onChange={() => { }}
                                    id="tooltip_toggle"
                                />
                                <label className="custom-control-label"
                                    onClick={() => this.handleChange("tooltip_toggle", "tooltip")}
                                    htmlFor="tooltip_toggle">Tooltip  </label>
                            </div>
                            <div className="custom-control custom-switch " >
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked={this.state.legend}
                                    onChange={() => { }}
                                    id="legend_toggle"
                                />
                                <label className="custom-control-label"
                                    onClick={() => this.handleChange("legend_toggle", "legend")}
                                    htmlFor="legend_toggle"> Scale </label>
                            </div>
                            <div className="custom-control custom-switch " >
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked={this.state.horizontal_legend}
                                    onChange={() => { }}
                                    id="horizontal_legend_toggle"
                                />
                                <label className={`custom-control-label ${this.state.legend ? '' : 'd-none'}`}
                                    onClick={() => this.handleChange("horizontal_legend_toggle", "horizontal_legend")}
                                    htmlFor="horizontal_legend_toggle"> Horizontal </label>
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
                            <div className="custom-control custom-switch " >
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked={this.state.info_bar}
                                    onChange={() => { }}
                                    id="info_bar_toggle"
                                />
                                <label className="custom-control-label"
                                    onClick={() => this.handleChange("info_bar_toggle", "info_bar")}
                                    htmlFor="info_bar_toggle"> Bottom Info </label>
                            </div>
                            <div className="custom-control custom-switch " >
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    checked={this.state.map_title}
                                    onChange={() => { }}
                                    id="map_title_toggle"
                                />
                                <label className="custom-control-label"
                                    onClick={() => this.handleChange("map_title_toggle", "map_title")}
                                    htmlFor="map_title_toggle"> Map Title </label>
                            </div>
                        </div>
                    </div>

                    <div id="map-chart-container" style={{ width: "100%", height: "100%" }}></div>
                    {
                        this.state.info_bar ?
                            <div id="info-bar" style={{ position: "fixed", bottom: "25px", width: "100%", color: this.state.dark ? "white" : "black" }}>
                                <InfoBar data={this.state.hovered} />
                            </div> : ""

                    }
                </div >
            )
        }
    }

}

export default Map