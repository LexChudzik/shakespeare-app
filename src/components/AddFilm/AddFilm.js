import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilmSearchItem from '../FilmSeachItem/FilmSearchItem';

const emptyState = {
    search: '',
}

class AddFilm extends Component {

    state = emptyState;

    // log input search
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
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
                {this.props.films.map((movie, i) => {
                    return (<FilmSearchItem key={i} movie={movie} history={this.props.history}/>);
                })}
            </ul>
        </section>
      </div>
    );
  }
}

const mapReduxStateToProps = ( state ) => ({ films: state.films });

export default connect(mapReduxStateToProps)(AddFilm);