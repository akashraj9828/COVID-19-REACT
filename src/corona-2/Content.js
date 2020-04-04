import React from "react"
import Map from "./components/Map"
import Timeline from "./components/Timeline"
function Content(props){

return(<div>
    <Map url={props.data_url} timeline_url={props.data_timeline_url}>
    </Map>
    {/* <Timeline url={props.data_url} timeline_url={props.data_timeline_url}>
    </Timeline> */}
</div>)

}

export default Content
