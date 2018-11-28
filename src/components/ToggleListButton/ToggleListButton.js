import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


class ToggleListButton extends Component {

  state = {
    production_id: this.props.production_id,
    user: this.props.user,
    list_id: false
  }

  componentDidMount() {
    this.checkList();
  }

  addToList = () => {
    axios.post('/api/list', this.state)
      .then((results) => {
        this.props.dispatch({type: 'FETCH_LIST', payload: this.props.user});
    }).catch((error) => {
      console.log('error adding to list', error);
    })
  }

  removeFromList = () => {
    axios.delete(`/api/list/${this.state.list_id}`)
    .then((results) => {
      this.props.dispatch({type: 'FETCH_LIST', payload: this.props.user});
      
    }).catch((error) => {
      console.log('error removing from to list', error);
    })
  }

  checkList = () => {
  this.props.list.forEach(item => {
    if (item.production_id === this.props.production_id) {
      this.setState({list_id: item.list_id});
      console.log(this.state);
      return;
    }
  })}

  render() {
    if (this.state.list_id) {
      return (
        <button onClick={this.removeFromList}>Take Off List</button>
      )} else {
        return(
          <button onClick={this.addToList}>Add to List</button>
        )
    }
  }
}

const mapReduxStateToProps = ( state ) => ({ 
  user: state.user,
  list: state.list
});
  
export default connect(mapReduxStateToProps)(ToggleListButton);