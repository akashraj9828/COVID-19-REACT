import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Content from "./components/Content"
import Menu from "./components/Menu/Menu"

function App() {
  const menuItems=[
    {text:'Home',
      href:"/",
      },
    // {text:'API INDIA',
    //   href:"/api",
    //   },
    // {text:'API WORLD',
    //   href:"/api_india",
    //   },
  ]

  return (
    <div className="App">
      <Menu menu_items={menuItems}/>
      <Header/>
      <div className="container">
      <Content/>
      </div>
      <Footer/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
