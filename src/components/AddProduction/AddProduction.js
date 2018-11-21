import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddProduction extends Component {

    state = {
        play_id:'',
        //play_title:'',
        theater: '',
        start_date: '',
        end_date: '',
        url: '',
        image_url: '',
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_PROJECT', payload: this.state });
    }

    handleChange = (event) => {
        console.log(event.target.name, event.target.value);
        
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
                    <label for="theater">Theater:</label>
                    <input required name="theater" id="theater" onChange={this.handleChange} value={this.state.theater} placeholder="Theater"/>

                    <label for="image_url">Image Link:</label>
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