import React, { Component } from 'react';
import {connect} from 'react-redux';
//import Chart from 'chart.js';

class Stats extends Component {

    render() {
      
      return (
        <div>
          <h1>Stats</h1>
          {this.props.stats.playsSeen && <p>You have seen {this.props.stats.playsSeen.length} of {this.props.plays.length} plays.</p>}
          {this.props.stats.playsSeenLive && <p>You have seen {this.props.stats.playsSeenLive.length} of {this.props.plays.length} plays live.</p>}
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