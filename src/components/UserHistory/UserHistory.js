import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProductionDetail from '../ProductionDetail/ProductionDetail';


class UserHistory extends Component {

  render() {
    return (
      <div>
        <h1>History</h1>
        {this.props.productions.map(p => 
          p.viewing_id && <ProductionDetail key={p.viewing_id} p={p} history={this.props.history}/>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    productions: state.production,
  });

export default connect(mapStateToProps)(UserHistory);