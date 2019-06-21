import React, { Component } from 'react';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render(){
    return (
      <div id="home">
        <button type="button" className="btn btn-light"> <a href="/accounts">click to enter</a></button>
      </div>
    )
  }
}

export default Home;