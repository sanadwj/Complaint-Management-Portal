import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import UserPanel from './UserPanel';
import Home from './Home';

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
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              // eslint-disable-next-line react/jsx-props-no-spreading,max-len
              <Home {...props} loggedInStatus={state.loggedInStatus} handleLogin={handleLogin} handleLogout={handleLogout} />
            )}
          />
          <Route
            exact
            path="/user-panel"
            render={props => (
              // eslint-disable-next-line react/jsx-props-no-spreading
              <UserPanel {...props} loggedInStatus={state.loggedInStatus} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
