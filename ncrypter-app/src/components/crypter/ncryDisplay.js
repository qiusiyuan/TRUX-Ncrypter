import React, { Component } from 'react';

class NcryDisplay extends Component {
  constructor(){
    super();
    this.state = {
    };
  }

  // This method is called before first render. Props and configurations can be set here.
  componentWillMount(){
  }

  // This method is called once all our children Elements and our Component instances
  // are mounted onto the UI. The fetchImageList method is called here to get the list.
  componentDidMount(){
  }

  // This method is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method.
  componentWillUnmount() {
  }
  
  render(){
    return(
      <div id="main">
      {/* <div id="lg">
        <img src="./logo.svg" width="450" height="270"/>
      </div>
      <div id = "search">
        <input id="searchbar" type="text" name="search" placeholder="Search.."/>
      </div> */}
      <p>This is some text in a paragraph.</p>
    </div>
    );
  };
}

export default NcryDisplay;