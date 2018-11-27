import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductionDetail from '../ProductionDetail/ProductionDetail';

class UserPage extends Component {
  
  render() {
    return (
      <div>
        <h1>Productions</h1>
        {this.props.productions.map(p => {
          let logged = false;
          this.props.userHistory.forEach(item => {
            if(item.production_id === p.production_id) { 
              logged = true; 
            }
          });

          let onList = false;
          this.props.list.forEach(item => {
            if (item.production_id === p.production_id) {
              onList = true;
            }
          });

          if(p.medium === 'live' && !logged ) { 
          return <ProductionDetail key={p.production_id} p={p} onList={onList} toLog="true" history={this.props.history}/>}
          else {return null}
        } 
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  productions: state.production,
  userHistory: state.history,
  list: state.list,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
