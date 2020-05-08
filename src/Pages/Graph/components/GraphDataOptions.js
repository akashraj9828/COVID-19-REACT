let graph_data_options={
    title: {
        display: true,
        // text: `COVID-19 INDIA STATE WISE (log scale) (where cases >${min_to_show})`
    },
    tooltips: {
        mode: 'index',
        intersect: false,
        titleAlign: "left",
        bodyAlign: "left",
        footerAlign: "left",
    },
    responsive: true,
    maintainAspectRatio: true,
    // aspectRatio: 10,
    // height:100,
    scales: {
        // scaleLabel :{
        //     fontSize:1
        // },
        xAxes: [{
            stacked: true,
            ticks: {
                autoSkip: true,
                // maxTicksLimit: 10
                reverse: true,
            }

        }],
        yAxes: [{
            stacked: true,
            display: true,
            beginAtZero: false,
            type: "logarithmic",
            ticks: {
                autoSkip: true,
                maxTicksLimit: 5
                // min: 10,
                // max:100,
                // sampleSize:10,
                // autoSkip:true,
                // mirror:true,
                // padding:10,
            }
        }]

    },


}

export default graph_data_options
