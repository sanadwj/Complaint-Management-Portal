import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Registration from './auth/Registration';
import Login from './auth/Login';

const Home = props => {
  const { loggedInStatus, handleLogout, handleLogin } = props;

  const handleSuccess = data => {
    handleLogin(data);
    // eslint-disable-next-line react/prop-types
    props.history.push('/user-panel');
  };

  const handleLogoutClick = () => {
    axios.delete('http://localhost:5000/logout', { withCredentials: true }).then(() => {
      handleLogout();
    }).catch(error => {
      console.log('error', error);
    });
  };
  return (

    <div>
      <div>
        Status :
        {' '}
        {loggedInStatus}
      </div>
      <button type="button" onClick={() => handleLogoutClick()}>Logout</button>
      <Registration handleSuccess={handleSuccess} />
      <Login handleSuccess={handleSuccess} />
    </div>
  );
};

Home.propTypes = {
  loggedInStatus: PropTypes.func,
  handleLogout: PropTypes.func,
  handleLogin: PropTypes.func,
};

Home.defaultProps = {
  loggedInStatus: null,
  handleLogout: null,
  handleLogin: null,
};

export default Home;
