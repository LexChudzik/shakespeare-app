import React, { Component } from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import ProductionDetail from '../ProductionDetail/ProductionDetail';
import axios from 'axios';


const emptyState = {
    rating: 0,
    date: '',
    comments: '',
    production: {},
    user: ''
}

class LogView extends Component {

    state = emptyState;

    componentWillMount () {
        this.setState({user: this.props.user.id})
        const production_id = this.props.match.params.productionId;
        axios.get(`/api/production/${production_id}`)
          .then((results) => {
            this.setState({production: results.data[0]});
            console.log(this.state);
          }).catch((error) => {
            console.log('error getting production from server', error);
          })
      }

    // log input search
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleRate = (event) => {
        this.setState({
            rating: event
        })
    }

    // send state to index to search 
    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/view', this.state)
        .then((results) => {
            this.props.dispatch({type: 'FETCH_HISTORY'});
            alert('View logged.');
            this.props.history.push(`/home`);
        }).catch((error) => {
            console.log('error posting production to server', error);
        })
    }

    // Renders to the DOM
    render() {
    return (
        <div>
            <ProductionDetail p={this.state.production}/>
            <form onSubmit={this.handleSubmit}>
                <input required name="date" type="date" onChange={this.handleChange} value={this.state.date}/>
                <Rating name="rating" onChange={this.handleRate} initialRating={this.state.rating}/>
                <textarea name="comments" onChange={this.handleChange} value={this.state.comments}/>
                <input type="submit"/>
            </form>
        </div>
    );
    }
}

const mapReduxStateToProps = ( state ) => ({ user: state.user });

export default connect(mapReduxStateToProps)(LogView);
