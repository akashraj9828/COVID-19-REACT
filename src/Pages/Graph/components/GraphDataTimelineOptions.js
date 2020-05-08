let graph_data_timeline_options = {
    title: {
        display: true,
        text: 'COVID-19 INDIA DAILY UPDATE'
    },
    tooltips: {
        mode: 'index',
        intersect: false,
        position: 'nearest'
    },
    // responsive: true,
    responsive: true,
    maintainAspectRatio: true,
    scales: {
        xAxes: [{
            stacked: false,

            ticks: {
                autoSkip: true,
                maxTicksLimit: 20
            }
        }],
        yAxes: [{
            stacked: false,
            type: "logarithmic",
        }]
    },
    fill: true,
    lineTension: 0.2,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 1.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 10,
    pointHoverRadius: 50,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 0.2,
    pointHitRadius: 10,
    // plugin: plugin_config,

}

export default graph_data_timeline_options