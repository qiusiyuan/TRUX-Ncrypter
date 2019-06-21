import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import  InfoBox from '../../components/InfoBox';
import  Loader from '../../components/Loader';


class Accounts extends Component {
  constructor(props){
    super(props);

    this.state = {
      accounts: {},
      loading: true,
      filter:'',
      show: {},
    };
    this.getAllAccounts = this.getAllAccounts.bind(this);
    this.searchValueChange = this.searchValueChange.bind(this);
  }

  getAllAccounts(){
    this.setState({
      loading: true
    });
    axios.get('http://localhost:3001/api/account')
      .then(res => {
        this.setState({
          accounts: res.data.accounts,
          show: res.data.accounts,
          loading: false,
        });
        
      });
  }

  searchValueChange(evt){
    console.log(evt);
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
          console.log(id, account)
          return (<InfoBox
                    account={account}
                  />);
        })
        }
      </div>
    )
  }
}

export default Accounts;