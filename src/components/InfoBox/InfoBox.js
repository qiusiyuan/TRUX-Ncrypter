import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './infobox.css';
// import { Link } from 'react-router-dom';

class InfoBox extends Component {
  constructor(props){
    super(props);

    this.state = {};
    this.switchPageToFromId = this.switchPageToFromId.bind(this);
  }

  switchPageToFromId(){
    let options = {
      page: "forms",
      id: this.props.id
    }
    this.props.switchPage(options);
  }

  render(){
    let account = this.props.account;
    return(
      <div className='info-box-list border border-info p-3 mb-2 bg-light text-dark'>
        <div className='info-box-title line'>
          <h2> <span className="badge badge-secondary"> { account.title } </span> </h2> 
        </div>
        <div className='info-box-name line'>
          <h5>
          <small className="text-muted">Account:</small>
          { account.username }
          </h5>
        </div>
        <div className='info-box-pass line'>
          <h5>
          <small className="text-muted">password:</small>
          { account.password }
          </h5>
        </div>
        <button className='info-box-details' onClick={this.switchPageToFromId}> Details </button>
      </div>
    );
  }
}

InfoBox.propTypes = {
  account: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};

export default InfoBox;