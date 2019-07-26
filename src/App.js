import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './containers/Home';
import Accounts from './containers/Accounts';
import Form from './containers/Forms';
//dka
function App() {
  return (
    <div id="mainapp">
      <div className="container-fluid">
        <Router>
          <Route path='/' exact component={Home}/>
          <Route path='/accounts' component={Accounts}/>
          <Route path='/edit' exact component={Form}/>
          <Route path='/edit/:accountID' component={Form}/>
        </Router>
      </div>
    </div>
  );
}

export default App;
