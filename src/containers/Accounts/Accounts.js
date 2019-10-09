import React, { Component } from 'react';
import axios from 'axios';
import {InfoBox, SearchBar, Loader, isElectron} from '../../components';
// import { Link } from 'react-router-dom';
class Accounts extends Component {
  constructor(props){
    super(props);

    this.state = {
      accounts: {},
      loading: true,
      filter:'',
    };
    this.getAllAccounts = this.getAllAccounts.bind(this);
    this.searchValueChange = this.searchValueChange.bind(this);
    this.switchPageToForms = this.switchPageToForms.bind(this);
  }

  componentDidMount(){
    this.getAllAccounts();
  }

  switchPageToForms(){
    this.props.switchPage({page:"forms", id: null});
  }

  getAllAccounts(){
    this.setState({
      loading: true
    }); 
    if (isElectron()) {
      window.ipcRenderer.send('accounts', 'new accounts');
      window.ipcRenderer.once("accounts-reply", (event, arg) => {
        this.setState({
          accounts: arg.accounts,
          loading: false,
        });
      })
    } else{
      axios.get('http://localhost:3001/api/account')
      .then(res => {
        this.setState({
          accounts: res.data.accounts,
          loading: false,
        });
      });
    } 
  }

  searchValueChange(evt){
    this.setState({
      filter: evt.target.value,
    });
  }

  render(){
    let that = this;
    return (
      <div id="Accounts">
        <div className="form-group row">
          <div className="col-md-10">
            <SearchBar 
              inputOnChange={this.searchValueChange}
            /> 
          </div>
          <div className="col-sm">
            <div class="btn-group btn-group-lg" role="group">
              <button type="button" className="btn btn-light" onClick={this.getAllAccounts}>Reload</button>
              <button type="button" className="btn btn-light" onClick={this.switchPageToForms}>Create</button>
            </div>
          </div>
        </div>
        {this.state.loading ? (<Loader/>)
        :  Object.keys(this.state.accounts).map((id) => {
          let account = that.state.accounts[id]; 
          if (Object.values(account).filter(contains(that.state.filter)).length > 0 || account.alias.filter(contains(that.state.filter)).length > 0){
            return (<InfoBox
              account={account}
              id={id}
              switchPage={this.props.switchPage}
            />);
          }
        })
        }
      </div>
    )
  }
}

function contains(sub){
  return function(main){
    return main.includes(sub);
  }
}

export default Accounts;