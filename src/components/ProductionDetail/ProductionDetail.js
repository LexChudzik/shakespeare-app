import React, { Component } from 'react';
import {connect} from 'react-redux';


class ProductionDetail extends Component {

  dateFormat = (dateIn) => {
    let dateOut = new Date(dateIn).toLocaleDateString();
    return dateOut;
  }

  render() {
    return (
      <div>
        {this.props.p.film_title && <h2>{this.props.p.film_title}</h2>}
        <h3>{this.props.p.play_title}</h3>
        {this.props.p.poster_path && <img alt="poster" src={this.props.p.poster_path}/>}
        {this.props.p.image_url && <img alt="poster" src={this.props.p.image_url}/>}
        {this.props.p.theater && <p>{this.props.p.theater}</p>}
        {this.props.p.location && <p>{this.props.p.location}</p>}
        {this.props.p.start_date && this.props.p.end_date &&
          <p>{this.dateFormat(this.props.p.start_date)} - {this.dateFormat(this.props.p.end_date)}</p>}
        {this.props.p.release_date && <p>{this.dateFormat(this.props.p.release_date)}</p>}
        {this.props.p.production_url && <a href={this.props.p.production_url} rel="noopener noreferrer" target="_blank">theater site</a>}
      </div>
  )}
}

const mapStateToProps = state => ({
  production: state.production,
});

export default connect(mapStateToProps)(ProductionDetail);