import React, { Component } from 'react';
import {connect} from 'react-redux';
import ProductionDetail from '../ProductionDetail/ProductionDetail';


class List extends Component {

  render() {
    return (
      <div>
        <h1>To See</h1>
        {this.props.list.map(p => 
          <ProductionDetail key={p.list_id} p={p}/>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
    productions: state.production,
    list: state.list
  });

export default connect(mapStateToProps)(List);