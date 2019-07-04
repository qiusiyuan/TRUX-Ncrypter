import React, { Component } from 'react';
import axios from 'axios';
import {InfoBox, SearchBar, Loader} from '../../components';

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
  }

  componentDidMount(){
    this.getAllAccounts();
  }

  getAllAccounts(){
    this.setState({
      loading: true
    });
    axios.get('http://localhost:3001/api/account')
      .then(res => {
        this.setState({
          accounts: res.data.accounts,
          loading: false,
        });
        
      });
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
        <button onClick={this.getAllAccounts}>refresh</button>
        <SearchBar 
          inputOnChange={this.searchValueChange}
        />
        {this.state.loading ? (<Loader/>)
        :  Object.keys(this.state.accounts).map((id) => {
          let account = that.state.accounts[id]; 
          if (Object.values(account).filter(contains(that.state.filter)).length > 0){
            return (<InfoBox
              account={account}
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