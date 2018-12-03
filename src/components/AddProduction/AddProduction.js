import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class AddProduction extends Component {

    state = {
        play_id:'',
        theater: '',
        start_date: '',
        end_date: '',
        url: '',
        image_url: '',
        location: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/production/live', this.state)
            .then((results) => {
                this.props.dispatch({type: 'FETCH_PRODUCTIONS', payload: this.props.user })
                const productionId = (results.data[0].id);
                if ( window.confirm('Producution added. Log viewing?') ) {
                    this.props.history.push(`/log/${productionId}`)
                } else {
                    this.props.history.push(`/home`)
                }
            }).catch((error) => {
                console.log('error posting production to server', error); 
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
          });
    }

    render() {
        return (
            <div>
                <h1>Add Producution</h1>
                <form onSubmit={this.handleSubmit}>
                    <input required name="theater" id="theater" onChange={this.handleChange} value={this.state.theater} placeholder="Theater Company"/>
                    <input name="image_url" onChange={this.handleChange} value={this.state.image_url} placeholder="image url"/>
                    <input name="url" onChange={this.handleChange} value={this.state.url} placeholder="website"/>
                    <select required name="play_id" onChange={this.handleChange} value={this.state.play_id}>
                        <option value='' disabled hidden>Select Play</option>
                        {this.props.plays.map(play => (
                            <option key={play.id} value={play.id}>{play.title}</option> 
                        ))}
                    </select>
                    <p>Start:</p>
                    <input type="date" name="start_date" onChange={this.handleChange} value={this.state.start_date} placeholder="start date"/>
                    <p>End:</p>
                    <input type="date" name="end_date" onChange={this.handleChange} value={this.state.end_date} placeholder="end date"/>
                    <br/>
                    <input name="location" onChange={this.handleChange} value={this.state.location} placeholder="location"/>
                    {/* <datalist id="plays" placeholder="play">
                        {this.props.plays.map(play => (
                            <option key={play.id} data-id={play.id}>{play.title}</option> 
                        ))}
                    </datalist> */}
                    <br/>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    plays: state.plays,
    user: state.user,
  });

export default connect(mapStateToProps)(AddProduction);