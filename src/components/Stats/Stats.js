import React, { Component } from 'react';
import {connect} from 'react-redux';
//import Chart from 'chart.js';

class Stats extends Component {

    render() {
      
      return (
        <div>
          <h1>Stats</h1>
          {JSON.stringify(this.props.list)}
        </div>
      )
    }
  }
  
  const mapStateToProps = state => ({
      history: state.history,
      list: state.list,
      plays: state.plays,
    });
  
  export default connect(mapStateToProps)(Stats);