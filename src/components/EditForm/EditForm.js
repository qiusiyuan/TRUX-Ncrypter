import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      value: this.props.value || "",
      editing: this.props.editing || false,
      onShow: false,
    };
   
    this.inputOnChange = this.inputOnChange.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
  }

  toggleEditing(){
    let editing = this.state.editing;
    this.setState({
      editing: !this.state.editing,
    }, function(){
      if (editing){
        let params = this.props.onSaveParams;
        params.value = this.state.value;
        this.props.onSave(params);
      }else{
        this.setState({
          value: this.props.value
        });
      }
    });    
  }

  inputOnChange(e){
    this.setState({
      value: e.target.value,
    });
  }

  render(){
    return(
      <div className="input-group mb-2" onMouseOver={()=>this.setState({onShow:true})} onMouseOut={()=>this.setState({onShow:false})}>
        <div>
        {
          this.state.editing ? 
          (<input type="text" className="form-control" placeholder={this.props.placeholder||"New"} value={this.state.value} onChange={this.inputOnChange}/>)
          :(<label className={"col-sm-2 col-form-label" + this.props.labelClass||''}>{this.props.value}</label>)
        }
        </div>
        <div className="input-group-prepend" >
          <button style={this.state.onShow || this.state.editing ? {}:{visibility: "hidden"}} className="btn btn-outline-info" onClick={this.toggleEditing}>{this.state.editing ? "save" : "edit"}</button>
        </div>
      </div>
    );
  }
}

EditForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onSaveParams: PropTypes.object,
  labelClass: PropTypes.string,
  value: PropTypes.string,
  editing: PropTypes.bool,
};

export default EditForm;