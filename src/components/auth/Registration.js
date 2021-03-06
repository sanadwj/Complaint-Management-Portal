/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';

const Registration = props => {
  const { handleLogin } = props;
  const [email, setEmail] = useState({ email: '' });
  const [password, setPassword] = useState({ password: '' });
  const [confirmation, setConfirmation] = useState({ password_confirmation: '' });

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

  const handleConfirmationChange = e => {
    setConfirmation({
      [e.target.name]: e.target.value,
    });
  };

  const handleSuccess = data => {
    handleLogin(data);
    console.log(data.user);
    if (data.user.admin === true) {
      props.history.push('/admin');
    } else if (data.status === 200 && data.user.admin === false) {
      props.history.push('/user-panel');
    } else {
      props.history.push('/');
    }
  };

  const handleSubmit = e => {
    axios.post('http://localhost:5000/api/v1/registrations ', {
      user: {
        email: email.email,
        password: password.password,
        password_confirmation: confirmation.password_confirmation,
      },
    }, { withCredentials: true }).then(res => {
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
          <input
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
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password.password}
            onChange={handlePasswordChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Password Confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            placeholder="Password Confirmation"
            value={confirmation.password_confirmation}
            onChange={handleConfirmationChange}
            required
          />
        </Form.Field>
        <Button type="submit">Register</Button>
      </Form>
    </div>
  );
};

export default Registration;
