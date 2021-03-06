/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Checkbox, Form } from 'semantic-ui-react';

const Login = props => {
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
      props.history.push('/admin');
    } else if (data.logged_in === true && data.user.admin === false) {
      props.history.push('/user-panel');
    } else {
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
        handleSuccess(res.data);
      }
    }).catch(error => {
      console.log('error', error);
    });
    e.preventDefault();
  };
  return (
    <div style={{ marginTop: 20 }} className="formContainer">
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Email</label>
          <Form.Input
            type="email"
            name="email"
            placeholder="Email"
            value={email.email}
            onChange={handleEmailChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Form.Input
            type="password"
            name="password"
            placeholder="Password"
            value={password.password}
            onChange={handlePasswordChange}
            required
          />
        </Form.Field>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
