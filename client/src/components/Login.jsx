// src/components/Login.jsx

import React, { useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import '../styles/login.css';
import validate from './LoginValidation';
import useForm from './UseForm';

export default function Login() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    login,
    validate
  );
  const [err, setErr] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of Redirect

  function login() {
    axios.post(`http://localhost:5000/user/login`, values).then((res) => {
      if (res.data.msg) {
        setErr({ msg: res.data.msg });
      } else {
        localStorage.setItem('token', res.data.token);
        navigate('/canteenlist'); // Navigate on successful login
      }
    });
  }

  return (
    <div className="login">
      <img src="/food2.PNG" alt="Food" style={{ margin: '0 0 auto auto' }} />
      <h2>
        <i className="fas fa-utensils"></i>
        {'    '}NITK NC
      </h2>
      <form style={{ textAlign: 'left' }} onSubmit={handleSubmit}>
        {err.msg && <p className="danger">{err.msg}</p>}
        <label className="label">Email Address</label>
        <InputGroup
          className="inputField"
          leftIcon="envelope"
          placeholder="Enter your email"
          name="email"
          onChange={handleChange}
        />
        {errors.email && <p className="danger">{errors.email}</p>}
        <label className="label">Password</label>
        <InputGroup
          className="inputField"
          leftIcon="lock"
          placeholder="Enter your password"
          name="password"
          type="password" // Added type for password field
          onChange={handleChange}
        />
        {errors.password && <p className="danger">{errors.password}</p>}
        <Button
          className="submitBtn bp3-intent-success"
          type="submit"
          value="Login"
        >
          Login
        </Button>
      </form>
      <Link to="/register/user">
        <Button
          className="submitBtn bp3-intent-success"
          style={{ marginTop: '10px' }}
        >
          Register
        </Button>
      </Link>
      <Link to="/canteen">
        <Button
          className="submitBtn bp3-intent-primary"
          style={{ marginTop: '10px' }}
        >
          Night Canteen
        </Button>
      </Link>
      <Link to="/user/admin">
        <Button
          className="submitBtn bp3-intent-primary"
          style={{ marginTop: '10px' }}
        >
          Admin
        </Button>
      </Link>
      <Link to="/canteenlist">
        <Button
          className="submitBtn bp3-intent-primary"
          style={{ marginTop: '10px' }}
        >
          List of Canteens
        </Button>
      </Link>
      <div className="im" style={{ margin: 'auto auto 0 0' }}>
        <img src="/food1.PNG" alt="Food" />
      </div>
    </div>
  );
}
