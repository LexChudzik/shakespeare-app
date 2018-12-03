import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductionDetail from '../ProductionDetail/ProductionDetail';

class UserPage extends Component {
  
  render() {
    return (
      <div>
        <h1>Upcoming Productions</h1>
        {this.props.productions.map(p => 
          !p.viewing_id && !p.list_id && (p.medium === 'live') && (p.end_date) && (Date(p.end_date) <= Date.now ) &&
          <ProductionDetail key={p.production_id} p={p} history={this.props.history}/>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  productions: state.production,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
