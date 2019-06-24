import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import Home from './containers/Home';
import Accounts from './containers/Accounts';

function App() {
  return (
    <div id="mainapp">
      <div className="container-fluid">
        <Accounts/>
      </div>
    </div>
  );
}

export default App;
