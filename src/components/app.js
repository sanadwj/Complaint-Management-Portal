import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserPanel from './UserPanel';

// eslint-disable-next-line react/prefer-stateless-function
const App = () => (
  <div className="app">
    <Router>
      <Switch>
        <Route exact path="/" component={UserPanel} />
      </Switch>
    </Router>
  </div>
);

export default App;
