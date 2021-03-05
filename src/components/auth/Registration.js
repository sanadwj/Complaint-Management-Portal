import React, { useState } from 'react';
import axios from 'axios';

const Registration = props => {
  const [email, setEmail] = useState({ email: '' });

  const [password, setPassword] = useState({ password: '' });

  const [confirmation, setConfirmation] = useState({ password_confirmation: '' });

  // const [error, setError] = useState({ registrationErrors: '' });

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

  // const handleErrorChange = e => {
  //   setError({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleSubmit = e => {
    axios.post('http://localhost:5000/registrations ', {
      user: {
        email: email.email,
        password: password.password,
        password_confirmation: confirmation.password_confirmation,
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
        <input
          type="password"
          name="password_confirmation"
          placeholder="Password Confirmation"
          value={confirmation.password_confirmation}
          onChange={handleConfirmationChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
