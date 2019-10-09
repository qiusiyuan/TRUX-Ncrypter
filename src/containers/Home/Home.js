import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {};

    this.switchPageToAccounts = this.switchPageToAccounts.bind(this);
  }

  switchPageToAccounts(){
    this.props.switchPage({page:"accounts"});
  }
  
  render(){
    return (
      <div id="home">
        <button type="button" className="btn btn-light" onClick={this.switchPageToAccounts}>click to enter</button>
      </div>
    )
  }
}

export default Home;