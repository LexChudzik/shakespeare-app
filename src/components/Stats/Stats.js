import React, { Component } from 'react';
import {connect} from 'react-redux';
//import Chart from 'chart.js';

class Stats extends Component {

    render() {
      
      return (
        <div>
          <h1>Stats</h1>
          {JSON.stringify(this.props.stats)}
        </div>
      )
    }
  }
  
  const mapStateToProps = state => ({
    productions: state.production,
    plays: state.plays,
    stats: state.stats
  });
  
  export default connect(mapStateToProps)(Stats);