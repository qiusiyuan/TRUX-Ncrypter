import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render(){
    return (
      <div id="home">
        <button type="button" className="btn btn-light"><Link to="/accounts"> click to enter</Link></button>
      </div>
    )
  }
}

export default Home;