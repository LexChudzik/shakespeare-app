import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class FilmSearchItem extends Component {

    state = {
        tmdb_id: this.props.movie.id,
        poster_path: this.props.movie.poster_path,
        release_date: this.props.movie.release_date,
        title: this.props.movie.title,
        play_id: '',
        loose_adapt: false,
        match: false,
        logged: false,
        onList: false
    }

    componentDidMount() {
        this.checkTitle();
        this.checkLog();
        this.checkList();
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

    checkLog = () => {
        this.props.userHistory.forEach(item => {
            if (item.tmdb_id === this.props.movie.id) {
                this.setState({
                    logged: true
                })
            }
        });
    }

    checkList = () => {
        this.props.list.forEach(item => {
            if (item.tmdb_id === this.props.movie.id) {
                this.setState({
                    onList: true
                })
            }
        });
    }

        // dispatch to save movie
    handleSave = (event) => {
        event.preventDefault();
        let production_id = '';
        this.props.production.forEach(p => {
            if (p.tmdb_id === this.state.tmdb_id) {
                production_id = p.production_id;
                return
            }
        });
        if (production_id) {
            console.log('already in');
            this.props.history.push(`/log/${production_id}`);
        } else {
            axios.post('/api/production/film', this.state)
            .then((results) => {
                this.props.dispatch({type: 'FETCH_PRODUCTIONS' });
                production_id = (results.data[0].id);
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
                {this.state.onList && <p>on list</p>}
                {this.state.logged && <p>logged</p>}
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
            </li>
        )
    }
}

const mapStateToProps = ( state ) => ({ 
    plays: state.plays, 
    production: state.production,
    list: state.list,
    userHistory: state.history, 
});

export default connect(mapStateToProps)(FilmSearchItem);