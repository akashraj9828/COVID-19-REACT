import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


class Timeline extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mapLoaded: false,
            mapData: {},
            timelineLoaded: false,
            timeline: {}
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

        // let url = this.props.url
        let timeline_url = this.props.timeline_url
        // this.fetchAndSet(url, 'data')
        // let timeline=this.fetchAndSet(timeline_url, 'timeline')
        let timeline = await fetch(timeline_url).then(res => res.json())
        // let timeline_data=await timeline;

        // console.log('timeline', timeline);

        let timeline_date = []
        let timeline_death = []
        let timeline_cases = []
        let timeline_recovery = []
        let timeline_total = []

        // console.log("state---------", this.state);
        let data=[]
        if (timeline) {
            for (let key in timeline) {
                let obj = timeline[key]
                timeline_date.push(new Date(obj.date + " 2020"))
                timeline_cases.push(obj.dailyconfirmed)
                timeline_recovery.push(obj.dailyrecovered)
                timeline_death.push(-obj.dailydeceased)
                timeline_total.push(obj.totalconfirmed)
                data.push({date:new Date(obj.date + " 2020"),name:"Death" ,value: parseInt(obj.dailyconfirmed)})
                // data.push({date:new Date(obj.date + " 2020"),name:"Recovery" ,value: parseInt(obj.dailyrecovered)})
            }
        }

        // console.log(timeline_date);
        let chart = am4core.create("chart-timeline-container", am4charts.XYChart);
        chart.paddingRight = 20;

        chart.data = data;
        // console.log(data);

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 1;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";

        series.tooltipText = "On {dateX} - {valueY.value} new cases";
        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;

        this.chart = chart;

    }
    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

   
    render() {



        return (

            <div className="my-4">
            <h4>
                Interactive Timeline
            </h4>
            <div id="chart-timeline-container" style={{ width: "100%", height: "500px" }}></div>
            </div>
        )
    }

}

export default Timeline