import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProductionDetail from '../ProductionDetail/ProductionDetail';


class UserHistory extends Component {

  state = {
    history: []
  }

  componentWillMount() {
    this.props.dispatch({type:'FETCH_HISTORY', payload: this.props.user})
  }

  render() {
    return (
      <div>
        <h1>History</h1>
        {this.props.userHistory.map(p => 
          p.viewing_id && <ProductionDetail key={p.viewing_id} p={p} history={this.props.history}/>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    user: state.user,
    userHistory: state.userHistory
  });

export default connect(mapStateToProps)(UserHistory);