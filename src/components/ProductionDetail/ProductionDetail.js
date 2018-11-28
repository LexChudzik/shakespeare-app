import React, { Component } from 'react';
import {connect} from 'react-redux';
import Rating from 'react-rating';
import './ProductionDetail.css';
import ToggleListButton from '../ToggleListButton/ToggleListButton';


class ProductionDetail extends Component {

  dateFormat = (dateIn) => {
    let dateOut = new Date(dateIn).toLocaleDateString();
    return dateOut;
  }

  goToLog = () => {
    console.log(this.props.p);
    this.props.history.push(`/log/${this.props.p.production_id}`)
  }

  render() {
    return (
      <div className="card">
        {this.props.p.film_title && (this.props.p.film_title !== this.props.p.play_title) &&<h2>{this.props.p.film_title}</h2>}

        <h3>{this.props.p.play_title}</h3>

        {this.props.p.poster_path && <img alt="poster" src={`https://image.tmdb.org/t/p/w500/${this.props.p.poster_path}`}/>}

        {this.props.p.image_url && <img alt="poster" src={this.props.p.image_url}/>}

        {this.props.p.start_date && this.props.p.end_date &&
          <p>{this.dateFormat(this.props.p.start_date)} - {this.dateFormat(this.props.p.end_date)}</p>}
        
        {this.props.p.theater && <p>{this.props.p.theater}</p>}

        {this.props.p.location && <p>{this.props.p.location}</p>}

        {this.props.p.release_date && <p>{this.dateFormat(this.props.p.release_date)}</p>}

        {this.props.p.production_url && <a href={this.props.p.production_url} rel="noopener noreferrer" target="_blank">theater site</a>}

        {this.props.p.date && <p>View Date: {this.dateFormat(this.props.p.date)} </p> }

        {this.props.p.rating && <Rating initialRating={this.props.p.rating} readonly/>}

        {this.props.p.comments && <p>{this.props.p.comments}</p>}

        {this.props.toLog && <button onClick={this.goToLog}>LOG VIEW</button>}

        {/* <ToggleListButton production_id={this.props.p.production_id}/> */}
      </div>
  )}
}

export default connect()(ProductionDetail);