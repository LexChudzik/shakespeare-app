import React, { Component } from 'react';
import { connect } from 'react-redux';

const emptyState = {
    search: '',

    loose_adapt: false
}

class AddFilm extends Component {

    state = emptyState


    // log input search
    handleChange = (event) => {
        console.log('handleChange input', event.target.name, event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
        console.log(this.state);
        
    }

    // dispatch to save movie
    handleSave = (movie, loose_adapt) => {
        this.props.dispatch( { type: 'SEND_SAVE', payload: movie, loose_adapt } );
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
                    <label htmlFor="loose_adapt">This is a loose adaptation</label>
                    <input type="checkbox" name="loose_adapt" checked={this.state.loose_adapt} onChange={this.handleChange}/>
                    <button onClick={()=> {this.handleSave(movie, this.state.loose_adapt)}}>Save</button>
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