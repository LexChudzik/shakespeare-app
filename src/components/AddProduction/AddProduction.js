import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddProduction extends Component {

    state = {
        play:'',
        theater: '',
        start_date: '',
        end_date: '',
        url: '',
        image_url: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
          });
        console.log(this.state);  
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.props.plays)}
                <form onSubmit={this.handleSubmit}>
                    <input name="theater" onChange={this.handleChange} value={this.state.theater} placeholder="Theater"/>
                    <input name="image_url" onChange={this.handleChange} value={this.state.image_url} placeholder="image url"/>
                    <input name="url" onChange={this.handleChange} value={this.state.url} placeholder="website"/>
                    <select name="play" onChange={this.handleChange} value={this.state.play} placeholder="play">
                        <option value='' disabled hidden>Select Play</option>
                        {this.props.plays.map(play => (
                            <option key={play.id} value={play.id}>{play.title}</option> 
                        ))}
                    </select>
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