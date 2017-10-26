import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './filteredList.css'

function List(props){
    return (
      <ul className="list-group">
      {
          props.items.map(function(item) {
            var link = 'crypter/'+ item;
            return <li className="list-group-item" data-category={item} key={item}><Link to={link}>{item}</Link></li>
        })
       }
      </ul>
    )  
  }

class FilteredList extends Component {
  constructor(){
    super();
    this.state = {
      items:[],
      initialItems:[],
    };
    this.filterList = this.filterList.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
  }
  filterList(event){
    var updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
  }
  getInitialState(){
     this.setState({
       initialItems: [
         "Apples",
         "Broccoli",
         "Chicken",
         "Duck",
         "Eggs",
         "Fish",
         "Granola",
         "Hash Browns",
         "qq",
         "pp",
         "ll",
         "long"
       ],
       items: []
     })
  }

  componentDidMount(){
    this.getInitialState();
    this.setState({items: this.state.initialItems});
  }

  componentWillMount(){
    this.getInitialState();
    this.setState({items: this.state.initialItems});
  }

  render(){
    return (
      <div className="filter-list">
        <form>
        <fieldset className="form-group">
        <input type="text" className="form-control" placeholder="Search" onChange={this.filterList}/>
        </fieldset>
        </form>
      <List items={this.state.items}/>
      </div>
    );
  }
}

export default FilteredList;