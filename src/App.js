import React from 'react';
import './App.css';
import { HashRouter, Route } from "react-router-dom";
import Home from './containers/Home';
import Accounts from './containers/Accounts';
import Form from './containers/Forms';

function App() {
  return (
    <div id="mainapp">
      <div className="container-fluid">
        <HashRouter>
          <Route path='/' exact component={Accounts}/>
          <Route path='/accounts' component={Accounts}/>
          <Route path='/edit' exact component={Form}/>
          <Route path='/edit/:accountID' component={Form}/>
        </HashRouter>
      </div>
    </div>
  );
}

export default App;
