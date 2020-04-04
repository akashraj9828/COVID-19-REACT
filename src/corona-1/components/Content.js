import React from "react"
import List from "./List"
function Content(props){

return(<div>
    {/* <List url="https://akashraj.tech/corona/no_log_api"> */}
    <List url={props.data_url} timeline_url={props.data_timeline_url}>
    {/* <List url="./data/api.json" timeline_url="./data/timeline.json"> */}
    </List>
</div>)

}

export default Content
