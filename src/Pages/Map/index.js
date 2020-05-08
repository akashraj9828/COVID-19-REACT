import React from "react"
import Map from "./components/Map"
function Content(props){

return(<div style={{ width: "100%", height: "100%" }}>
    <Map url={props.data_url} timeline_url={props.data_timeline_url}>
    </Map>
</div>)

}

export default Content
