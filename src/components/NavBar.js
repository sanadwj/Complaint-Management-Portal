import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NavBar = props => {
  // const { user, logout } = useContext(AuthContext);
  const { loggedInStatus, handleLogout } = props;

  const { pathname } = window.location;

  const path = pathname === '/' ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const handleLogoutClick = () => {
    axios.delete('http://localhost:5000/logout', { withCredentials: true }).then(() => {
      handleLogout();
    }).catch(error => {
      console.log('error', error);
    });
  };

  const navBar = loggedInStatus === 'LOGGED_IN' ? (
    <div>
      <Menu pointing secondary size="massive" color="violet">
        {/* <Menu.Item name={user.username} active as={Link} to="/" /> */}

        <Menu.Menu position="right">
          <Menu.Item name="logout" as={Link} to="/">
            <button type="button" onClick={() => handleLogoutClick()}>Logout</button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div>
      <Menu pointing secondary size="massive" color="violet">
        <Menu.Item
          name="home"
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name="register"
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );

  return navBar;
};

export default NavBar;
