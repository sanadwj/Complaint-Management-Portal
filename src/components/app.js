/* eslint react/jsx-props-no-spreading: 0 */
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import UserPanel from './users/UserPanel';
import Home from './Home';
import NavBar from './NavBar';
import Login from './auth/Login';
import Registration from './auth/Registration';
import 'semantic-ui-css/semantic.min.css';
import Admin from './users/Admin';

const App = () => {
  const [state, setState] = useState({
    loggedInStatus: 'NOT_LOGGED_IN',
    user: {},
  });

  const handleLogin = data => {
    setState({
      loggedInStatus: 'LOGGED_IN',
      user: data.user,
    });
  };

  const handleLogout = () => {
    setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      user: {},
    });
  };

  const checkLoginStatus = () => {
    axios.get('http://localhost:5000/logged_in', { withCredentials: true }).then(res => {
      if (res.data.logged_in && state.loggedInStatus === 'NOT_LOGGED_IN') {
        setState({
          loggedInStatus: 'LOGGED_IN',
          user: res.data.user,
        });
      } else if (!res.data.logged_in && state.loggedInStatus === 'LOGGED_IN') {
        setState({
          loggedInStatus: 'NOT_LOGGED_IN',
          user: {},
        });
      }
    }).catch(error => {
      console.log('error', error);
    });
  };

  useEffect(() => {
    checkLoginStatus();
  });

  return (
    <div className="app">
      <Router>
        <NavBar
          loggedInStatus={state.loggedInStatus}
          handleLogout={handleLogout}
        />
        <Route
          exact
          path="/login"
          render={props => (
            <Login {...props} handleLogin={handleLogin} />
          )}
        />
        <Route
          exact
          path="/register"
          render={props => (
            <Registration {...props} handleLogin={handleLogin} />
          )}

        />
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/admin"
          render={props => (
            state.loggedInStatus === 'LOGGED_IN'
              ? (
                <Admin
                  {...props}
                  handleLogin={handleLogin}
                  loggedInStatus={state.loggedInStatus}
                />
              ) : <Home />
          )}
        />
        <Route
          exact
          path="/user-panel"
          render={props => (
            state.loggedInStatus === 'LOGGED_IN'
              ? (
                <UserPanel
                  {...props}
                  handleLogin={handleLogin}
                  loggedInStatus={state.loggedInStatus}
                  user={state.user}
                />
              )
              : <Home />
          )}
        />
      </Router>
    </div>
  );
};

export default App;
