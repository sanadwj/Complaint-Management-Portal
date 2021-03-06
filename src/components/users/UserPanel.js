/* eslint react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Item, Button } from 'semantic-ui-react';

const UserPanel = props => {
  const [state, setState] = useState(['title', 'body', 'status']);
  const [title, setTitle] = useState({ title: '' });
  const [body, setBody] = useState({ body: '' });
  const [valid, setValid] = useState(false);
  const [status] = useState('pending');

  const { handleLogin, user } = props;

  const handleSuccess = data => {
    handleLogin(data);
  };

  console.log(state);
  const handleSubmit = e => {
    axios.post('http://localhost:5000/api/v1/complaints ', {
      complaint: {
        title: title.title,
        body: body.body,
        check_box: valid,
        user_id: user.id,
        status,
      },
    }, { withCredentials: true }).then(res => {
      console.log('res', res);
      if (res.data.status === 200) {
        // eslint-disable-next-line react/prop-types
        handleSuccess(res.data);
      }
    }).catch(error => {
      console.log('error', error);
    });
    e.preventDefault();
  };

  const getData = () => {
    axios.get(`http://localhost:5000/api/v1/complaints/${user.id}`, { withCredentials: true }).then(res => {
      console.log(res);
      setState(res.data.complaint);
    }).catch(error => {
      console.log(error);
    });
  };

  useEffect(() => {
    getData();
  }, []);

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
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Meta>{state.id}</Item.Meta>
              <Item.Header>{state.title}</Item.Header>
              <Item.Description>
                {state.body}
              </Item.Description>
              <Item.Extra>{state.status}</Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>

      </div>
    </div>
  );
};

UserPanel.propTypes = {
  handleLogin: PropTypes.func,
  user: PropTypes.objectOf(PropTypes.string),
  id: PropTypes.number,
};

UserPanel.defaultProps = {
  handleLogin: null,
  user: '',
  id: null,
};

export default UserPanel;
