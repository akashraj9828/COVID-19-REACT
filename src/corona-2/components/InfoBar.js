import React from "react"

function InfoBar(props) {
    const data = props.data
    // console.log('infobar rendered')
    // console.log("info bar props",data);

    let name = "Hover over any state"
    let total = 0
    let active = 0
    let deaths = 0
    let recovered = 0
        if(data){
            name = data.name
            total = data.value
            active = data.active
            deaths = data.deaths
            recovered = data.recovered
        }
    return (<div>
        <h4>
            {/* {} */}
            {name}
        </h4>
       <span><span style={{fontWeight:"bold",color:"black"}}>Cases:  {total} /</span> </span>
       <span><span style={{fontWeight:"bold",color:"orange"}}>Active:  {active} /</span> </span>
       <span><span style={{fontWeight:"bold",color:"red"}}>Deaths:  {deaths} /</span> </span>
       <span><span style={{fontWeight:"bold",color:"green"}}>Recovered:  {recovered} </span> </span>

    </div>)
}

export default InfoBar