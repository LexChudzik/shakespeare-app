import React, { Component } from 'react';
import { connect } from 'react-redux';

class LogFilm extends Component {

  render() {
        return (
            <div>
                {JSON.stringify(this.props.plays)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    plays: state.plays,
  });

export default connect(mapStateToProps)(LogFilm);