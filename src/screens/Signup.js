import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const nav = useNavigate();
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", location: ""});
  const handleChange = (event) => {
    setCredentials({...credentials, [event.target.name]:event.target.value});
  }
  const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await fetch('http://localhost:5000/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.location
        })
      });
      const json = await response.json();
      console.log(json);
      if(!json.success)
        alert('Enter valid credentials!');
      if(json.success)
        nav('/login');
  }
  return (
    <>
      <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="location"
            value={credentials.location}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
        <Link to='/login' className="m-3 btn btn-danger">Already a user</Link>
      </form>
      </div>
    </>
  );
};

export default Signup;
