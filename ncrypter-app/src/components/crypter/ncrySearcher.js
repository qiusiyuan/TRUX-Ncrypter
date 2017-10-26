import React, { Component } from 'react';
import logo from './logo.svg';
import './ncrySearcher.css';
import FilteredList from './filteredList'



class NcrySearcher extends Component {
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
      <div>
        <div className='pageWapper'>
          <div className='pageContent'>
            <div id='centerContent'>
              <div id="logo">
                <img src={logo} width="500" height="300" alt="logo"/>
              </div>
              <div id = "search">
                <FilteredList/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default NcrySearcher;