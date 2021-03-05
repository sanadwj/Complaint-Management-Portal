import React, { useState } from 'react';
import axios from 'axios';

// eslint-disable-next-line no-unused-vars
const Login = props => {
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

  const handleSubmit = e => {
    axios.post('http://localhost:5000/api/v1/sessions', {
      user: {
        email: email.email,
        password: password.password,
      },
    }, { withCredentials: true }).then(res => {
      if (res.data.status === 200) {
        // eslint-disable-next-line react/prop-types
        props.handleSuccess(res.data);
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
