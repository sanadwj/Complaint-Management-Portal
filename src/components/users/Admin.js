import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h1>
        HI:
        {' '}
        {state.map(s => (
          // eslint-disable-next-line react/jsx-key
          <div>
            <span>{s.user_id}</span>
            <span>{s.title}</span>
            <span>{s.body}</span>
            <span>{s.status}</span>

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
            <button type="button" onClick={() => updateData(s.id)}>Update</button>
          </div>
        ))}
      </h1>
    </div>
  );
};

export default Admin;
