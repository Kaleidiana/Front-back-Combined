import React, { useState } from 'react';

const AddUser = () => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    gender: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:4000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
      .then(response => response.json())
      .then(data => {
        setMessage('User added successfully');
        setForm({
          username: '',
          email: '',
          password: ''
        });
      })
      .catch(error => {
        console.error('Error adding user:', error);
        setMessage('Error adding user');
      });
  };

  return (
    <div className="add-user">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        
        <button type="submit" className="btn btn-success">Add User</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddUser;
