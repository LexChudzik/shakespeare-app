import React, { Component } from 'react';
import {connect} from 'react-redux';


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
      history: state.history,
      stats: state.stats,
      plays: state.plays,
    });
  
  export default connect(mapStateToProps)(Stats);