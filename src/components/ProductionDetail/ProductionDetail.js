import React, { Component } from 'react';
import {connect} from 'react-redux';
import Rating from 'react-rating';
import './ProductionDetail.css';
import ToggleListButton from '../ToggleListButton/ToggleListButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

class ProductionDetail extends Component {

  dateFormat = (dateIn) => {
    let dateOut = new Date(dateIn).toLocaleDateString();
    return dateOut;
  }

  goToLog = () => {
    console.log(this.props.p);
    this.props.history.push(`/log/${this.props.p.production_id}`)
  }

  deleteLog = () => {
    if ( window.confirm('Delete this log?') ) {
      axios.delete(`/api/history/${this.props.p.viewing_id}`)
      .then((results) => {
        this.props.dispatch({type:'FETCH_HISTORY', payload: this.props.user})
      }).catch((error) => {
        console.log('error getting production from server', error);
      })
    }
  }

  render() {
    return (
      <div className="card">

        {/* image */}
        {(this.props.p.poster_path || this.props.p.image_url) &&
        <div className="card-image">
          {this.props.p.poster_path && <img alt="poster" src={`https://image.tmdb.org/t/p/w500/${this.props.p.poster_path}`}/>}
          {this.props.p.image_url && <img alt="poster" src={this.props.p.image_url}/>}
        </div>}

          {/* title */}
        <div className="card-title">
          {this.props.p.film_title && (this.props.p.film_title !== this.props.p.play_title) &&<h2>{this.props.p.film_title}</h2>}
          <h3>{this.props.p.play_title}</h3>
        </div>

        <div className="card-subtitle">
          {this.props.p.start_date && this.props.p.end_date &&
            <p>{this.dateFormat(this.props.p.start_date)} - {this.dateFormat(this.props.p.end_date)}</p>}
          {this.props.p.release_date && <p>{this.dateFormat(this.props.p.release_date)}</p>}
          {this.props.p.theater && <p>{this.props.p.theater}</p>}
          {this.props.p.location && <p>{this.props.p.location}</p>}
          {this.props.p.production_url && <a href={this.props.p.production_url} rel="noopener noreferrer" target="_blank">theater website</a>}
        </div>

        <div className="card-history">
          {this.props.p.date && <p>Seen {this.dateFormat(this.props.p.date)} </p> }
          {this.props.p.rating && <Rating 
            initialRating={this.props.p.rating} 
            readonly
            emptySymbol={<FontAwesomeIcon className="rating" icon={["far", "star"]} />}
            fullSymbol={<FontAwesomeIcon className="rating" icon={["fas", "star"]} />}
            />}
          {this.props.p.comments && <p>{this.props.p.comments}</p>}
        </div>

        {!this.props.log  &&  
        <div className="card-buttons">
          {!this.props.p.viewing_id && <ToggleListButton p={this.props.p}/>} 
          {!this.props.p.viewing_id && <button onClick={this.goToLog}>Log Viewing</button>}
          {this.props.p.viewing_id && <button onClick={this.deleteLog}>Delete Log</button>}
        </div>}

      </div>
  )}
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(ProductionDetail);