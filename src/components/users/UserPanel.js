/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Form, Card, Icon, Button,
} from 'semantic-ui-react';

const UserPanel = props => {
  const [state, setState] = useState([]);
  const [newState, setNewState] = useState([]);
  const [title, setTitle] = useState({ title: '' });
  const [body, setBody] = useState({ body: '' });
  const [valid, setValid] = useState(false);
  const [status] = useState('pending');

  const { handleLogin, user } = props;

  const handleSuccess = data => {
    handleLogin(data);
  };

  const handleSubmit = e => {
    axios.post('http://localhost:5000/api/v1/complaints', {
      complaint: {
        title: title.title,
        body: body.body,
        check_box: valid,
        user_id: user.id,
        status,
      },
    }, { withCredentials: true }).then(res => {
      if (res.data.status === 200) {
        // eslint-disable-next-line react/prop-types
        handleSuccess(res.data);
        setNewState(res.data.complaint);
      }
    }).catch(error => {
      console.log('error', error);
    });
    e.preventDefault();
  };

  const getData = () => {
    axios.get(`http://localhost:5000/api/v1/complaints/${user.id}`, { withCredentials: true }).then(res => {
      setState(res.data.complaint);
    }).catch(error => {
      console.log(error);
    });
  };
  useEffect(() => {
    getData();
  }, [status]);

  const handleTitleChange = e => {
    setTitle({
      [e.target.name]: e.target.value,
    });
  };

  const handleBodyChange = e => {
    setBody({
      [e.target.name]: e.target.value,
    });
  };

  const handleValidChange = e => {
    setValid({
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ marginTop: 20 }} className="formContainer">
      <Form onSubmit={handleSubmit} width={30}>
        <Form.Field>
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title.title}
            onChange={handleTitleChange}
            required
          />
        </Form.Field>

        <Form.TextArea
          type="textarea"
          name="body"
          placeholder="Your Issue:"
          value={body.body}
          onChange={handleBodyChange}
          required
        />

        <Form.Checkbox
          type="checkbox"
          name="valid"
          value={!valid}
          onChange={handleValidChange}
          required
        />
        <Button type="submit">Submit</Button>
      </Form>
      <br />
      <hr />
      <div style={{ marginTop: 20 }} className="formContainer">

        {state.map(s => (
          <Card key={s.id}>
            <Card.Content header={s.title} />
            <Card.Content description={s.body} />
            <Card.Content extra>
              <Icon />
              {s.status}
            </Card.Content>
          </Card>
        ))}

      </div>
    </div>
  );
};

UserPanel.propTypes = {
  handleLogin: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.string,
};

UserPanel.defaultProps = {
  handleLogin: null,
  user: '',
  id: '',
};

export default UserPanel;
