import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FormattedText extends Component {
  constructor(props){
    super(props);

    this.state = {};
  }

  render(){
    let width = this.props.width || null;
    let value = this.props.value;
    let style = {'max-width': width,
                'text-overflow': 'ellipsis',
                'overflow': 'hidden',
                'white-space':'nowrap'}
    return(
      <p style={style} data-toggle="tooltip" data-placement="bottom" title={value}>
        {value}
      </p>
    )
  }
}

FormattedText.propTypes = {
  value : PropTypes.string.isRequired,
  width : PropTypes.string,
};

export default FormattedText;