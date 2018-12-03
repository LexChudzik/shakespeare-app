import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


class ToggleListButton extends Component {

  state = {
    production_id: this.props.p.production_id,
    user: this.props.user,
    list_id: this.props.p.list_id
  }

  addToList = () => {
    axios.post('/api/list', this.state)
      .then((results) => {
        this.props.dispatch({type: 'FETCH_PRODUCTIONS', payload: this.props.user});
    }).catch((error) => {
      console.log('error adding to list', error);
    })
  }

  checkProductions = () => {
    if (!this.props.p.production_id && this.props.m.play_id)  {
      axios.post('/api/production/film', this.props.m)
        .then((results) => {
          this.props.dispatch({type: 'FETCH_PRODUCTIONS', payload: this.props.user });
          this.setState({production_id: (results.data[0].id)});
          this.addToList();
        }).catch((error) => {
            console.log('error posting production to server', error);
        })
    } else if (!this.props.p.production_id) {
      window.alert('Please select a play from the dropdown')
    } else {
      this.addToList();
    }
  }  

  removeFromList = () => {
    axios.delete(`/api/list/${this.state.list_id}`)
    .then((results) => {
      this.props.dispatch({type: 'FETCH_PRODUCTIONS', payload: this.props.user});
    }).catch((error) => {
      console.log('error removing from to list', error);
    })
  }

  render() {
    if (this.state.list_id) {
      return (
        <button onClick={this.removeFromList}>Remove from List</button>
      )} else {
        return(
          <button onClick={this.checkProductions}>Add to List</button>
        )
    }
  }
}

const mapReduxStateToProps = ( state ) => ({ 
  user: state.user,
});
  
export default connect(mapReduxStateToProps)(ToggleListButton);