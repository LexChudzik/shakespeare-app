import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductionDetail from '../ProductionDetail/ProductionDetail';

class UserPage extends Component {
  
  render() {
    return (
      <div>
        {JSON.stringify(this.props)}
        {this.props.productions.map(p => {
          let logged = false;
          this.props.history.forEach(item => {
            if(item.production_id === p.id) { logged = true }
          });
          if(p.medium === 'live' || logged ) { 
          return <ProductionDetail key={p.id} p={p}/>}
          else {return}
        } 
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  productions: state.production,
  history: state.history
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
