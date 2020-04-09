import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import logo from './logo.svg';
import './App.css';
import './Switch.css';
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
  // const install_directory = "/corona/interactive"
  const install_directory = "./"

  const menu_bar = menu_enable ? <Menu menu_items={menuItems} /> : ""
  const container_style = menu_enable ? { width: "100%", height: "90%" } : { width: "100%", height: "100%" }
  // const not_found=<div>404: Page not found</div>
  return (
    <div className="App" style={{ width: "100%", height: "100%" }}>
      <Router path={"./"} basename={install_directory}>
        {menu_bar}

        <div className="" style={container_style}>
          <Switch>
            <Route path="/" exact render={(props) => <CoronaPage2 {...props} data_url={data_url} data_timeline_url={data_timeline_url} />} />
            <Route path="/graph" exact render={(props) => <CoronaPage1 {...props} data_url={data_url} data_timeline_url={data_timeline_url} />} />
            <Route path="/table" exact render={(props) => <TableOnly {...props} data_url={data_url} data_timeline_url={data_timeline_url} />} />
          </Switch>
        </div>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
