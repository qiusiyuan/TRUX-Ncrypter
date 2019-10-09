import React, { Component } from 'react';
import './App.css';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './containers/Home';
import Accounts from './containers/Accounts';
import Forms from './containers/Forms';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      page: "accounts",
      id: null
    };
    this.switchPage = this.switchPage.bind(this);
  }

  switchPage(options){
    this.setState(options);
  }

  render(){
    let mainComponent;
    switch(this.state.page){
      case "home":
        mainComponent = <Home switchPage={this.switchPage}/>;
        break;
      case "accounts":
        mainComponent = <Accounts switchPage={this.switchPage}/>;
        break;
      case "forms":
        mainComponent = <Forms switchPage={this.switchPage} match={{params:{accountID: this.state.id}}}/>;
        break;
    }
    
    return (
      <div id="mainapp">
        <div className="container-fluid">
          {mainComponent}
        </div>
      </div>
    );
  }
}

export default App;
