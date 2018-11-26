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
                this.props.dispatch({type: 'FETCH_PRODUCTIONS' })
                const productionId = (results.data[0].id);
                if ( window.confirm('Producution added. Log viewing?') ) {
                    this.props.history.push(`/log/${productionId}`)
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
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="theater">Theater:</label>
                    <input required name="theater" id="theater" onChange={this.handleChange} value={this.state.theater} placeholder="Theater"/>

                    <label htmlFor="image_url">Image Link:</label>
                    <input name="image_url" onChange={this.handleChange} value={this.state.image_url} placeholder="image url"/>
                    <input name="url" onChange={this.handleChange} value={this.state.url} placeholder="website"/>
                    <select required name="play_id" onChange={this.handleChange} value={this.state.play_id}>
                        <option value='' disabled hidden>Select Play</option>
                        {this.props.plays.map(play => (
                            <option key={play.id} value={play.id}>{play.title}</option> 
                        ))}
                    </select>
                    <input type="date" name="start_date" onChange={this.handleChange} value={this.state.start_date}/>
                    <input type="date" name="end_date" onChange={this.handleChange} value={this.state.end_date}/>
                    <input name="location" onChange={this.handleChange} value={this.state.location} placeholder="location"/>
                    {/* <datalist id="plays" placeholder="play">
                        {this.props.plays.map(play => (
                            <option key={play.id} data-id={play.id}>{play.title}</option> 
                        ))}
                    </datalist> */}
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    plays: state.plays,
  });

export default connect(mapStateToProps)(AddProduction);