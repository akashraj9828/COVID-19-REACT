import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import logo from './logo.svg';
import './App.css';
import Header from "./Header"
import Footer from "./Footer"
import CoronaPage1 from "./corona-1/components/Content"
import CoronaPage2 from "./corona-2/Content"
import TableOnly from "./corona-1/components/TableOnly"
import Menu from "./Menu/Menu"

function App() {
  const menuItems = [
    {
      text: 'Map',
      href: "/",
    },
    {
      text: 'Graph',
      href: "/graph",
    },
    {
      text: 'District Wise',
      href: "/table",
    },
    {
      text: 'Home',
      href: "/../",
    },
  ]

  const data_url = "https://akashraj.tech/corona/api_india"
  const data_timeline_url = "https://akashraj.tech/corona/api_india_timeline"
  // const data_url="./data/api.json"
  // const data_timeline_url="./data/timeline.json"
  const menu_enable=true
  const install_directory = "/corona/visualized"
  // const install_directory = "./"

  const menu_placeholder=menu_enable?  <Menu menu_items={menuItems} /> : ""
  const container_style =menu_enable? { width: "100%", height: "90%" }:{ width: "100%", height: "100%" }

  return (
    <div className="App" style={{ width: "100%", height: "100%" }}>
      <Router path={"./"} basename={install_directory}>
        {menu_placeholder}
        
        {/* <Header /> */}
        {/* <div className="container"> */}
        {/* <div className="mx-2 mx-md-5 mx-xl-5 px-0 px-md-5 px-xl-5"> */}
        <div className="px-1" style={container_style}>
          <Switch>
            {/* <Route path="/" exact component={CoronaPage1} /> */}
            <Route path="/" exact render={(props) => <CoronaPage2 {...props} data_url={data_url} data_timeline_url={data_timeline_url} />} />
            <Route path="/graph" exact render={(props) => <CoronaPage1 {...props} data_url={data_url} data_timeline_url={data_timeline_url} />} />
            <Route path="/table" exact render={(props) => <TableOnly {...props} data_url={data_url} data_timeline_url={data_timeline_url} />} />
            {/* <Route path="/2" component={CoronaPage2} /> */}
          </Switch>
        </div>
      </Router>
      <Footer />

    </div>
  );
}

export default App;
