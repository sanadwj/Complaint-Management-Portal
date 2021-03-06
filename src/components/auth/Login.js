import React, { useState } from 'react';
import axios from 'axios';

const Login = props => {
  // eslint-disable-next-line react/prop-types
  const { handleLogin } = props;
  const [email, setEmail] = useState({ email: '' });
  const [password, setPassword] = useState({ password: '' });

  const handleEmailChange = e => {
    setEmail({
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = e => {
    setPassword({
      [e.target.name]: e.target.value,
    });
  };

  const handleSuccess = data => {
    handleLogin(data);
    console.log(data);
    if (data.user.admin === true) {
      // eslint-disable-next-line react/prop-types
      props.history.push('/admin');
    } else if (data.logged_in === true && data.user.admin === false) {
      // eslint-disable-next-line react/prop-types
      props.history.push('/user-panel');
    } else {
      // eslint-disable-next-line react/prop-types
      props.history.push('/');
    }
  };

  const handleSubmit = e => {
    axios.post('http://localhost:5000/api/v1/sessions', {
      user: {
        email: email.email,
        password: password.password,
      },
    }, { withCredentials: true }).then(res => {
      console.log(res);
      if (res.data.status === 200) {
        // eslint-disable-next-line react/prop-types
        handleSuccess(res.data);
      }
    }).catch(error => {
      console.log('error', error);
    });
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email.email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password.password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
