import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import ToggleListButton from '../ToggleListButton/ToggleListButton';

class FilmSearchItem extends Component {

    state = {
        tmdb_id: this.props.movie.id,
        poster_path: this.props.movie.poster_path,
        release_date: this.props.movie.release_date,
        title: this.props.movie.title,
        play_id: '',
        loose_adapt: false,
        match: false,
        production: { 
            production_id: ''
        }
    }

    componentDidMount() {
        this.checkProductions();
        this.checkTitle();
    }

    componentDidUpdate(prevProps) {
        if (this.props.productions !== prevProps.productions) {
          this.checkProductions();
        }
      }

    checkProductions = () => {
        this.props.productions.forEach(p =>{
            if (p.tmdb_id === this.props.movie.id) {
                this.setState({
                    production: p
                })
            }
        })        
    }

    checkTitle = () => {
        let title = this.props.movie.title.toLowerCase();
        let match =  (this.props.plays.find(function(play){
            return (play.title.toLowerCase() === title ) }));
        if (match) {
            this.setState({
                play_id: match.id,
                match: true
            })
        }
    }

    // dispatch to save movie
    handleSave = (event) => {
        event.preventDefault();
        if (this.state.production.production_id !== '') {
            console.log('already in');
            this.props.history.push(`/log/${this.state.production.production_id}`);
        } else {
            axios.post('/api/production/film', this.state)
            .then((results) => {
                this.props.dispatch({type: 'FETCH_PRODUCTIONS', payload: this.props.user });
                let production_id = (results.data[0].id);
                console.log(production_id);
                
                this.props.history.push(`/log/${production_id}`);
            }).catch((error) => {
                console.log('error posting production to server', error);
            })
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }
    

    render() {
        return (
            <li className="card">
                <h3>{this.props.movie.title}</h3>
                <p>{this.props.movie.release_date}</p>
                {this.props.movie.poster_path &&
                    <img src={`https://image.tmdb.org/t/p/w500/${this.props.movie.poster_path}`} alt="poster"/>}
                <form onSubmit={this.handleSave}>
                    {(this.state.match === false) && 
                    <select required name="play_id" onChange={this.handleChange} value={this.state.play_id}>
                        <option value='' disabled hidden>Select Play</option>
                        {this.props.plays.map(play => (
                            <option key={play.id} value={play.id}>{play.title}</option> 
                        ))}
                    </select>}
                    <label htmlFor="loose_adapt">This is a loose adaptaion:</label>
                    <input type="checkbox" id="loose_adapt" value={this.state.loose_adapt} name="loose_adapt" onChange={this.handleChange}/>
                    <button type="submit">Log Viewing</button>
                </form>
                {!this.state.production.viewing_id && <ToggleListButton p={this.state.production} m={this.state}/>}
            </li>
        )
    }
}

const mapStateToProps = ( state ) => ({ 
    plays: state.plays, 
    productions: state.production,
    user: state.user,
});

export default connect(mapStateToProps)(FilmSearchItem);