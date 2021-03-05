import React from 'react';
import PropTypes from 'prop-types';

const UserPanel = props => {
  const { loggedInStatus } = props;
  return (
    <div>
      <div>
        Status :
        {' '}
        {loggedInStatus}
      </div>
      <h3>user panel</h3>
    </div>
  );
};

UserPanel.propTypes = {
  loggedInStatus: PropTypes.func,
};

UserPanel.defaultProps = {
  loggedInStatus: null,
};

export default UserPanel;
