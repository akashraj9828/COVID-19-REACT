import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { log } from "util";


am4core.useTheme(am4themes_animated);


class Map extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded:false
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
                // console.log(data);

                // let change = {
                //     [key]: data,
                //     // isLoaded: true,
                //     timelineLoaded: true,
                // }
                // if (key === "data") {
                //     change.dataLoaded = true
                // }
                // if (key === "timeline") {
                //     change.timelineLoaded = true
                // }
                // this.updateState(change)

                // if (this.state.dataLoaded && this.state.timelineLoaded) {
                //     let change = {
                //         isLoaded: true,
                //     }
                //     this.updateState(change)
                // }
                // console.log("after update", this.state);
                return data
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


    async componentDidMount() {

        let url = this.props.url
        let india_map_url = "./data/india_map.json"
        let india_map_dict = "./data/india_map_dict.json"
        let data = await fetch(url).then(res => res.json()).then(
            (data) => {return data},
            (error)=>{
                this.updateState({error:error})
                return{}
            }
        )
        let am4geodata_indiaHigh = await fetch(india_map_url).then(res => res.json()).then(
            (data) => {return data},
            (error)=>{
                this.updateState({error:error})
                return{}
            }
        )
        let india_dict = await fetch(india_map_dict).then(res => res.json()).then(
            (data) => {return data},
            (error)=>{
                this.updateState({error:error})
                return{}
            }
        )

        if(this.state.error){
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
            let color_fill = `rgba(${confirmed},100,100,0.5)`
            am4geodata_indiaHigh.features[i].properties.value = confirmed
            am4geodata_indiaHigh.features[i].properties.deaths = deaths
            am4geodata_indiaHigh.features[i].properties.recovered = recovered
            am4geodata_indiaHigh.features[i].properties.active = active
            am4geodata_indiaHigh.features[i].properties.color = color_fill
            mapData.push(
                {
                    "id": india_dict[key],
                    "name": key,
                    "value": confirmed,
                    "deaths": deaths,
                    "recovered": recovered,
                    "active": active,
                    "color": color_circle,
                }
            )

        }

        this.updateState({
            isLoaded:true,
            error:false,
        })

        let min_val = Math.min(...states_cases)
        let max_val = Math.max(...states_cases)



        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create map instance
        var chart = am4core.create("map-chart-container", am4maps.MapChart);
        // chart.theme = "dark"

        chart.responsive.enabled = true;

        // heatmap
        let heatLegend = chart.createChild(am4charts.HeatLegend);
        heatLegend.minColor = am4core.color(`rgba(${min_val},50,50,0.8)`);
        heatLegend.maxColor = am4core.color(`rgba(${max_val},50,50,0.8)`);
        // heatLegend.maxColor = am4core.color("#ED7B84");
        heatLegend.minValue = min_val;
        heatLegend.maxValue = max_val;
        // heatLegend.series = states_cases;
        heatLegend.width = am4core.percent(100);
        heatLegend.valueAxis.renderer.labels.template.fontSize = 9;
        heatLegend.valueAxis.renderer.minGridDistance = 30;
        heatLegend.orientation = "vertical";
        // heatLegend.markerContainer.height = am4core.percent(100);






        var total_data = data.total_values
        var title = chart.titles.create();
        title.text = ` Total: [bold]${total_data.confirmed}[/] Recovered: [bold]${total_data.recovered}[/] Deaths: [bold]${total_data.deaths}`;
        // title.text = "[bold font-size: 20]India COVID-19 Spread[/]";
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

        var imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.data = mapData;
        imageSeries.dataFields.value = "value";

        var imageTemplate = imageSeries.mapImages.template;
        imageTemplate.nonScaling = false


        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.nonScaling = false
        polygonTemplate.propertyFields.fill = "color";
        polygonTemplate.fillOpacity = 1;
        polygonTemplate.tooltipText = `[bold] {name}[/]
        -------
        Total: [bold]{value}[/] 
        Recovered: [bold]{recovered}[/] 
        Deaths: [bold]{deaths}`;

        var hs = polygonTemplate.states.create("hover");
        hs.propertyFields.fill = "color";
        hs.fillOpacity = 0;

        var circle = imageTemplate.createChild(am4core.Circle);
        circle.fillOpacity = 1;
        circle.propertyFields.fill = "color";
        circle.tooltipText = `[bold] {name}[/]
        -------
        Total: [bold]{value}[/] 
        Recovered: [bold]{recovered}[/] 
        Deaths: [bold]{deaths}`;
        // console.log(states_cases)
        // console.log("max", Math.max(...states_cases))
        imageSeries.heatRules.push({
            "target": circle,
            "property": "radius",
            "min": 5,
            "max": 50,
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



        polygonTemplate.events.on("over", function (ev) {
            if (!isNaN(ev.target.dataItem.value)) {
                heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
            }
            else {
                heatLegend.valueAxis.hideTooltip();
            }
        });

        polygonTemplate.events.on("out", function (ev) {
            heatLegend.valueAxis.hideTooltip();
        });

        imageTemplate.events.on("over", function (ev) {
            if (!isNaN(ev.target.dataItem.value)) {
                heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
            }
            else {
                heatLegend.valueAxis.hideTooltip();
            }
        });

        imageTemplate.events.on("out", function (ev) {
            heatLegend.valueAxis.hideTooltip();
        });


        // console.log(chart);

    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    render() {

        let error=this.state.error
        let isLoaded=this.state.isLoaded
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
                    <img className="mt-5" src="./virus.png" alt="" />
                    <p className="text-center" style={{ margin: "auto" }}>Loading result ...</p>
                </div>
            </div>)
        } else {
            return (

                <div>
                    {/* This is map */}
                    <div id="map-chart-container" style={{ width: "100%", height: "500px" }}></div>
                </div>
            )
        }
    }

}

export default Map