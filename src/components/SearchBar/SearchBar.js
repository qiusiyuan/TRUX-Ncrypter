import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render(){
    return(
      <div className="input-group input-group-lg">
        <div className="input-group-prepend">
          <span className="input-group-text" id="inputGroup-sizing-lg">Search</span>
        </div>
        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg"
         onChange={this.props.inputOnChange}/>
      </div>
    );
  }
}

SearchBar.propTypes = {
  inputOnChange: PropTypes.func.isRequired,
};

export default SearchBar;