import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import logo from './logo.svg';
import './App.css';
import './Switch.css';
import Footer from "./Component/Footer"
import Graph from "./Pages/Graph"
import Map from "./Pages/Map/"
import TableOnly from "./Pages/Graph/Table/TableOnly"
import Menu from "./Component/Menu"

function App() {
  const menuItems = [
    {
      text: 'Map',
      href: "/",
    },
    {
      text: 'Graph',
      href: "./graph",
    },
    {
      text: 'District Wise',
      href: "./table",
    },
    {
      text: 'API',
      href: "../api_india",
      out_of_react: true,
    },
    {
      text: 'Home',
      href: "https://akashraj.tech/",
      out_of_react: true,
    },
  ]
  // original data
  const data_url = "https://akashraj.tech/corona/api_india"
  const data_timeline_url = "https://akashraj.tech/corona/api_india_timeline"

  // dummy data
  // const data_url="./data/api.json"
  // const data_timeline_url="./data/timeline.json"

  const menu_enable = true
  let install_directory = "./"

  const menu_bar = menu_enable ? <Menu menu_items={menuItems} /> : ""
  const container_style = menu_enable ? { width: "100%", height: "90%" } : { width: "100%", height: "100%" }

  if (process.env.NODE_ENV === "production") {
    install_directory = "/corona/interactive"
  }

  return (
    <div className="App" style={{ width: "100%", height: "100%" }}>
      <Router path={"./"} basename={install_directory}>
        {menu_bar}

        <div className="" style={container_style}>
          <Switch>
            <Route path="/" exact render={(props) => <Map {...props} data_url={data_url} data_timeline_url={data_timeline_url} />} />
            <Route path="/graph" exact render={(props) => <Graph {...props} data_url={data_url} data_timeline_url={data_timeline_url} />} />
            <Route path="/table" exact render={(props) => <TableOnly {...props} data_url={data_url} data_timeline_url={data_timeline_url} />} />
          </Switch>
        </div>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
