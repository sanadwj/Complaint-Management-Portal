import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Item, Select, Button } from 'semantic-ui-react';

const Admin = () => {
  const selects = ['resolved', 'dismissed'];
  const [state, setState] = useState([]);
  const [status, setStatus] = useState([]);

  const getData = () => {
    axios.get('http://localhost:5000/api/v1/complaints', { withCredentials: true }).then(res => {
      console.log(res.data.complaint.status);
      setState(res.data.complaint);
    }).catch(error => {
      console.log(error);
    });
  };

  const updateData = id => {
    // eslint-disable-next-line no-undef
    axios.patch(`http://localhost:5000/api/v1/complaints/${id}`, {
      complaint: {
        status,
      },
    }, { withCredentials: true }).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);
    });
  };

  const handleStatusChange = e => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    getData();
  }, [status]);

  return (
    <div style={{ marginTop: 20 }} className="formContainer">
      <h1>Admin Page</h1>
      <Item.Group style={{ marginTop: 20 }}>
        <Item>

          {' '}
          {state.map(s => (
          // eslint-disable-next-line react/jsx-key
            <Item.Content style={{ marginTop: 20 }}>
              <Item.Meta>{s.user_id}</Item.Meta>
              <Item.Header>{s.title}</Item.Header>
              <Item.Description>{s.body}</Item.Description>
              <Item.Extra>{s.status}</Item.Extra>

              <select value={status.value} onChange={handleStatusChange}>
                <option>Select</option>
                {selects.map(select => (
                  <option
                    key={select}
                    value={select}
                  >
                    {select}
                  </option>
                ))}
              </select>
              <Button type="button" onClick={() => updateData(s.id)}>Update</Button>
            </Item.Content>
          ))}
        </Item>
      </Item.Group>
    </div>
  );
};

export default Admin;
