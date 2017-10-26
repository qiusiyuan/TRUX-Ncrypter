import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import NcryDisplay from './components/crypter/ncryDisplay'
import NcrySearcher from './components/crypter/ncrySearcher'

class App extends Component {
  render() {
    return (
    <main>
      <Switch>
        <Route exact path='/' component={NcrySearcher}/>
        <Route exact path='/crypter/:name' component={NcryDisplay}/>
      </Switch>
    </main>
    );
  }
}

export default App;
