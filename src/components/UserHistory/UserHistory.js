import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProductionDetail from '../ProductionDetail/ProductionDetail';


class UserHistory extends Component {

  render() {
    return (
      <div>
        <h1>History</h1>
        {this.props.userHistory.map(p => 
          <ProductionDetail key={p.production_id} p={p}/>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    productions: state.production,
    userHistory: state.history
  });

export default connect(mapStateToProps)(UserHistory);