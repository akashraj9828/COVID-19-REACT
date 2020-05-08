import React from "react"
import Graph from "./components/Graph"
function Content(props){

return(
    <Graph url={props.data_url} timeline_url={props.data_timeline_url}>
    </Graph>
)

}

export default Content
