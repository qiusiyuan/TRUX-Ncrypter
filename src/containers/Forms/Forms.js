import React, { Component } from 'react';
import axios from 'axios';
import './form.css';
import {EditForm, Loader} from '../../components';
import { Link } from 'react-router-dom';

class Forms extends Component {
  constructor(props){
    super(props);

    this.state = {
      accountID: props.match.params.accountID || null,
      loading: false,
      account: {},
      formContent: {},
      passwordHide: true,
    };
    this.getAccount = this.getAccount.bind(this);
    this.togglePassword = this.togglePassword.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
    this.addOthersClick = this.addOthersClick.bind(this);
    this.editFormOnSave = this.editFormOnSave.bind(this);
    this.deleteOtherClick = this.deleteOtherClick.bind(this);
    this.reloadClick = this.reloadClick.bind(this);
    this.createClick = this.createClick.bind(this);
  }

  componentDidMount(){
    if(this.state.accountID){
      this.getAccount();
    }
  }

  getAccount(){
    this.setState({
      loading: true
    });
    axios.get(`http://localhost:3001/api/account/${this.state.accountID}`)
      .then(res => {
        this.setState({
          account: res.data.account,
          formContent: res.data.account,
          loading: false,
        });
    });
  }

  togglePassword(){
    this.setState({
      passwordHide : !this.state.passwordHide,
    });
  }

  inputOnChange(e){
    let formContent = Object.assign({},this.state.formContent);
    let target = e.target;
    if (target.getAttribute("parent") && target.getAttribute("parent") === "others"){
      if (! formContent.others) {
        formContent.others = []
      }
      formContent.others[target.id].value = target.value;
    }else{
      formContent[target.id] = target.value;
    }
    this.setState({
      formContent: formContent
    });
  }

  editFormOnSave(obj){
    let formContent = Object.assign({},this.state.formContent);
    if (obj.field === "title"){
      formContent.title = obj.value;
    }else if(obj.field === "others"){
      formContent.others[obj.index].fieldName = obj.value;
    }
    this.setState({
      formContent: formContent
    });
  }

  addOthersClick(){
    let formContent = Object.assign({},this.state.formContent);
    if (!formContent.others){
      formContent.others=[];
    }
    formContent.others.push({fieldName: "", value: ""});
    this.setState({
      formContent: formContent
    });
  }

  deleteOtherClick(evt){
    let index = parseInt(evt.target.id);
    let formContent = Object.assign({},this.state.formContent);
    if (formContent.others && formContent.others.length > index){
      formContent.others.splice(index, 1);
      this.setState({
        formContent: formContent
      });
    }
  }

  reloadClick(){
    window.location.reload();
  }

  createClick(){
    this.setState({
      loading: true
    });
    if (this.state.accountID){ // edit
      let data = {content:[{
        fieldName: "title",
        value: this.state.formContent.title,
      }, {
        fieldName: "username",
        value: this.state.formContent.username,
      },{
        fieldName: "password",
        value: this.state.formContent.password,
      }, {
        fieldName: "others",
        value: this.state.formContent.others,
      }]}
      axios.post(`http://localhost:3001/api/account/${this.state.accountID}/edit`, data)
        .then(res => {
          this.setState({
            loading: false,
          });
      });
    }else{ // create new
      let data = {
        content: this.state.formContent
      };
      axios.post(`http://localhost:3001/api/account/new`, data)
        .then(res => {
          this.setState({
            loading: false,
          });
      });
    }
  }

  render(){
    let formContent = this.state.formContent;
    let inputOnChange = this.inputOnChange;
    return (
      <div id="form">
        <div className="modal-header">
          <div className="form-row">
            {this.state.loading ? <Loader/>: <EditForm labelClass="modal-title h5" onSave={this.editFormOnSave} onSaveParams={{field:"title"}} editing={!this.state.formContent.title&&true} value={this.state.formContent.title} placeholder="Title"/>}
          </div>
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type='button' onClick={this.reloadClick} className="btn btn-outline-secondary"> Reload </button>
            <button type='button' onClick={this.createClick} className="btn btn-outline-info"> {this.state.accountID ? 'Update':'Create'} </button>
            <button type='button' className="btn btn-outline-warning"><Link to="/accounts"> Cancel </Link></button>
          </div>
        </div >
        <div className="padding-form">
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">User</label>
            <div className="col-sm-10">
            {this.state.loading ? <Loader/>:<input type="user" className="form-control" id="username" placeholder="User" value={formContent.username} onChange={inputOnChange}/>}
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10 input-group mb-2">
            {this.state.loading ? <Loader/>:<input type={this.state.passwordHide ? "password": "text"} className="form-control" id="password" placeholder="password" value={formContent.password} onChange={inputOnChange}/>}
              <div className="input-group-prepend">
                <a className="input-group-text" onClick={this.togglePassword}>{this.state.passwordHide ? "show" : "hide"}</a>
              </div>
            </div>
          </div>
          {this.state.loading ? <Loader/>:
          <div id="others">
          <p id="others">others</p>
          {formContent.others && formContent.others.map((match, index)=>{
            let fieldName = match.fieldName;
            let value = match.value;
            return (<div className="form-group row" key={index}>
              <div className="col-sm">
              <EditForm editing={!fieldName&&true} value={fieldName}
                        placeholder="New field"
                        onSave={this.editFormOnSave} 
                        onSaveParams={{field: "others", index: index}}
                        />
              </div>
              <div className="col-md-8">
                <input type="text" className="form-control" parent="others" id={index} ran="st" placeholder="Content" value={value} onChange={inputOnChange}/>
              </div>
              <div className="col-sm-1">
                <button id={index} onClick={this.deleteOtherClick}>X</button>
              </div>
            </div>);
            })}
          </div>}
          <button type="button" className="btn btn-outline-dark" onClick={this.addOthersClick}>+ Others</button>
        </div>
    </div>
    );
  }
}

export default Forms;