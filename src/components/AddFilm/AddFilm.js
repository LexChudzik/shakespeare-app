import React, { Component } from 'react';
import { connect } from 'react-redux';

const emptyState = {
    search: '',
    movie: {},
    loose_adapt: false,
    play_id: '',
}

class AddFilm extends Component {

    state = emptyState;


    // log input search
    handleChange = (event) => {
        console.log('handleChange input', event.target.name, event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state);
        
    }

    // dispatch to save movie
    handleSave = (movie) => {
        //set movie data to state
        this.setState({
            movie: movie
        })
        // check if film title = play title
        let match = this.props.plays.find(function(play){
            return (play.title.toLowerCase() === movie.title.toLowerCase())
        })
        //if no match prompt user to tag with play title
        if (match == null) {
            this.setState({
                loose_adapt: true,
            })
           alert('Please select a play')
        } else {
            this.setState({
                play_id: match.id
            })
        }
        console.log(this.state);
        
       // this.props.dispatch( { type: 'SEND_SAVE', payload: this.state } );
    }


    // send state to index to search 
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch( { type: 'SEARCH_MOVIES', payload: this.state  } )
        this.clearState();
    }

    clearState = () => {
        this.setState(emptyState);
      }

  // Renders to the DOM
  render() {
    return (
      <div>
        <h1>Search for Movie</h1>
        <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleChange} value={this.state.search} name="search" placeholder="search" />
            <button>Search</button>
        </form>
        <section>
            <ul>
                {this.props.films.map((movie) =>
                <li key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="test"/>
                    <button onClick={()=> {this.handleSave(movie)}}>Save</button>
                    {this.props.plays.find(function(play){
                        return (play.title.toLowerCase() === movie.title.toLowerCase())}) && 
                    <select required name="play_id" onChange={this.handleChange} value={this.state.play_id}>
                        <option value='' disabled hidden>Select Play</option>
                        {this.props.plays.map(play => (
                            <option key={play.id} value={play.id}>{play.title}</option> 
                        ))}
                    </select>}
                </li>
                )}
            </ul>
        </section>
      </div>
    );
  }
}

const mapReduxStateToProps = ( state ) => ({ films: state.films, plays: state.plays });

export default connect(mapReduxStateToProps)(AddFilm);