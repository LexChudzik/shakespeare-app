import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
// import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import AddProduction from '../AddProduction/AddProduction';
import AddFilm from '../AddFilm/AddFilm';
import LogView from '../LogView/LogView';
import UserHistory from '../UserHistory/UserHistory';
import Stats from '../Stats/Stats';
import List from '../List/List';

import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
library.add(far, faStar)

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
    this.props.dispatch({type: 'FETCH_PLAYS'});
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <div className="main">
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            <Route
              exact
              path="/add"
              component={AddProduction}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            <ProtectedRoute
              exact
              path="/film"
              component={AddFilm}
            />
            <ProtectedRoute
              exact
              path="/log/:productionId"
              component={LogView}
            />
            <ProtectedRoute
              exact
              path="/stats"
              component={Stats}
            />
            <ProtectedRoute
              exact
              path="/userHisory"
              component={UserHistory}
            />
            <ProtectedRoute
              exact
              path="/list"
              component={List}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
  )}
}

export default connect()(App);
