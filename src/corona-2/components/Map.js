import React, {
    Component
} from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import InfoBar from "./InfoBar";


am4core.useTheme(am4themes_animated);


class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded: false,
        }
        this.setup_chart = this.setup_chart.bind(this)
        // this.setState = this.setState.bind(this)


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

        let url = this.props.url
        let india_map_url = "./data/india_map.json"
        let india_map_dict = "./data/india_map_dict.json"
        let data = this.getApiData(url, "data")
        let am4geodata_indiaHigh = this.getApiData(india_map_url, "am4geodata_indiaHigh")
        let india_dict = this.getApiData(india_map_dict, "india_dict")

        Promise.all([data, am4geodata_indiaHigh, india_dict]).then((responses) =>
            this.setState({
                isLoaded: true,
                data: responses[0],
                am4geodata_indiaHigh: responses[1],
                india_dict: responses[2],
                hovered: {
                    name: "India",
                    value: responses[0].total_values.confirmed,
                    active: responses[0].total_values.active,
                    deaths: responses[0].total_values.deaths,
                    recovered: responses[0].total_values.recovered,
                }
            })
        ).then(() => this.setup_chart());
        // console.log("after api calzzzz", data, am4geodata_indiaHigh, india_dict)
    }

    setup_chart() {
        // console.log("map setup chart");

        let enable_cirlce = true
        let enable_legend = true
        let enable_tooltip = true
        let max_cirlce_size=50
        let min_cirlce_size=2
        let data = this.state.data
        let am4geodata_indiaHigh = this.state.am4geodata_indiaHigh
        let india_dict = this.state.india_dict

        let india_total_stats = {
            name: "India",
            value: data.total_values.confirmed,
            active: data.total_values.active,
            deaths: data.total_values.deaths,
            recovered: data.total_values.recovered,
        }
        // console.log(data.total_values);

        // console.log(data);
        // console.log(am4geodata_indiaHigh);
        // console.log(india_dict);


        if (this.state.error) {
            return
        }
        let states_cases = []
        // let states_name = []
        // let states_recovered = []
        // let states_active = []
        // let states_death = []

        let mapData = []

        var total_len = am4geodata_indiaHigh.features.length
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
            states_cases.push(confirmed)
            // states_death.push(deaths)
            // states_recovered.push(recovered)
            // states_active.push(active)
            // states_name.push(key)
            // let color_circle = `rgba(${confirmed},${deaths},${recovered},0.2)`
            // let color_fill = `rgba(${confirmed},${deaths},${recovered},0.2)`
            let color_circle = `rgba(${confirmed},50,50,0.8)`
            let color_fill = `rgba(${confirmed},100,100,0.8)`
            am4geodata_indiaHigh.features[i].properties.value = confirmed
            am4geodata_indiaHigh.features[i].properties.deaths = deaths
            am4geodata_indiaHigh.features[i].properties.recovered = recovered
            am4geodata_indiaHigh.features[i].properties.active = active
            am4geodata_indiaHigh.features[i].properties.color = color_fill
            mapData.push({
                "id": india_dict[key],
                "name": key,
                "value": confirmed,
                "deaths": deaths,
                "recovered": recovered,
                "active": active,
                "color": color_circle,
                "tooltipColor": "red",
            })

        }


        let min_val = Math.min(...states_cases)
        let max_val = Math.max(...states_cases)



        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create map instance
        var chart = am4core.create("map-chart-container", am4maps.MapChart);
        // chart.theme = "dark"

        chart.responsive.enabled = true;


        // heatmap legends
        let heatLegend = null
        if (enable_legend) {
            heatLegend = chart.createChild(am4charts.HeatLegend);
            heatLegend.minColor = am4core.color(`rgba(${min_val},50,50,0.8)`);
            heatLegend.maxColor = am4core.color(`rgba(${max_val},50,50,0.8)`);
            // heatLegend.maxColor = am4core.color("#ED7B84");
            heatLegend.minValue = min_val;
            heatLegend.maxValue = max_val;
            // heatLegend.series = states_cases;
            heatLegend.width = am4core.percent(100);
            heatLegend.valueAxis.renderer.labels.template.fontSize = 0;
            heatLegend.valueAxis.renderer.labels.template.visible = false;
            heatLegend.valueAxis.renderer.minGridDistance = 30;
            heatLegend.markerContainer.height = 50;

            heatLegend.orientation = "vertical";
            heatLegend.postion = "absolute"
            heatLegend.x = 10
            heatLegend.y = 40
            // heatLegend.markerContainer.height = am4core.percent(100);
            heatLegend.labels = true;
        }

        var total_data = data.total_values
        var title = chart.titles.create();
        // title.text = ` Cases: [bold]${total_data.confirmed}[/] Recovered: [bold]${total_data.recovered}[/] Deaths: [bold]${total_data.deaths}`;
        title.text = "[bold font-size: 20]India COVID-19 Spread[/]";
        // title.textAlign = "middle";

        chart.geodata = am4geodata_indiaHigh;
        chart.focusable = true;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        // polygonSeries.exclude = ["IN-MH"];
        polygonSeries.useGeodata = true;
        polygonSeries.nonScalingStroke = true;
        polygonSeries.strokeWidth = 0.5;
        polygonSeries.calculateVisualCenter = true;

        if (enable_cirlce) {

            var imageSeries = chart.series.push(new am4maps.MapImageSeries());
            imageSeries.data = mapData;
            imageSeries.dataFields.value = "value";


            var imageTemplate = imageSeries.mapImages.template;
            imageTemplate.nonScaling = false

        }

        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.nonScaling = false
        polygonTemplate.propertyFields.fill = "color";
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
        Deaths: [bold]{deaths}`;
        }
        // var hs = polygonTemplate.states.create("hover");
        // hs.propertyFields.fill = "color";
        // hs.fillOpacity = 0;

        let currentComponent = this;

        if (enable_cirlce) {

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
            Deaths: [bold]{deaths}`;
            }
            // console.log(states_cases)
            // console.log("max", Math.max(...states_cases))
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

        if (enable_cirlce) {

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

                <div> {/* This is map */}
                    <div id="map-chart-container" style={{ width: "100%", height: "100vh" }}></div>

                    <div id="info-bar" style={{ position: "fixed", bottom: "25px", width: "100%" }}>
                        <InfoBar data={this.state.hovered} />
                    </div>
                </div>
            )
        }
    }

}

export default Map