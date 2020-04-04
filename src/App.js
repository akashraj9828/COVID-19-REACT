import React from 'react';
import { BrowserRouter as Router, Switch, Route }  from 'react-router-dom'

// import logo from './logo.svg';
import './App.css';
import Header from "./Header"
import Footer from "./Footer"
import CoronaPage1 from "./corona-1/components/Content"
import CoronaPage2 from "./corona-2/Content"
import Menu from "./Menu/Menu"

function App() {
  const menuItems = [
    {
      text: 'Home',
      href: "/",
    },
    {
      text: 'Graphs',
      href: "/graphs",
    },
    // {
    //   text: 'Sample 3',
    //   href: "/3",
    // },
  ] 

  // const data_url="https://akashraj.tech/corona/no_log_api"
  const data_url="https://akashraj.tech/corona/api_india"
  const data_timeline_url="https://akashraj.tech/corona/api_india_timeline"
  // const data_url="./data/api.json"
  // const data_timeline_url="./data/timeline.json"

  return (
    <div className="App">
      <Router path="/" basename={"/corona/react"}>
        <Menu menu_items={menuItems} />
        <Header />
        {/* <div className="container"> */}
        <div className="mx-2 mx-md-5 mx-xl-5 px-0 px-md-5 px-xl-5">
          <Switch>
            {/* <Route path="/" exact component={CoronaPage1} /> */}
            <Route path="/" exact render={(props)=> <CoronaPage2 {...props} data_url={data_url} data_timeline_url={data_timeline_url} />} />
            <Route path="/graphs" exact render={(props)=> <CoronaPage1 {...props} data_url={data_url} data_timeline_url={data_timeline_url} />} />
            {/* <Route path="/2" component={CoronaPage2} /> */}
          </Switch>
        </div>
      </Router>
      <Footer />

    </div>
  );
}

export default App;
