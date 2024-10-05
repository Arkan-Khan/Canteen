import React, { useState } from 'react';
import { Button, InputGroup, RadioGroup, Radio } from '@blueprintjs/core';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

import '../styles/login.css';
import validate from './canregValidation';
import useForm from './UseForm';

export default function RegisterCanteen() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    register,
    validate
  );
  const [emailErr, setEmailErr] = useState({});
  const [show, setShow] = useState(false);

  function register() {
    console.log(values);
    axios.post(`http://localhost:5000/canteen/register`, values).then((res) => {
      console.log(res);
      console.log(res.data);
      
      if (res.data.msg === 'email already registered') {
        setEmailErr({ msg: 'Email already registered' });
      } else {
        setEmailErr({});  // Reset email error on success
        setShow(true);
      }
    });
  }

  if (show) {
    return <Navigate to="/canteen" />;
  }

  return (
    <div className="login">
      <h2>
        <i className="fas fa-utensils"></i>
        {'    '}NITK NC
      </h2>
      <form style={{ textAlign: 'left', fontFamily: 'Verdana' }} onSubmit={handleSubmit}>
        <label className="label">Email Address</label>
        <InputGroup
          className="inputField"
          leftIcon="envelope"
          placeholder="Enter your email"
          name="email"
          onChange={handleChange}
        />
        {emailErr.msg && <p className="danger">{emailErr.msg}</p>}
        {errors.email && <p className="danger">{errors.email}</p>}
        
        <label className="label">Name</label>
        <InputGroup
          className="inputField"
          leftIcon="user"
          placeholder="Enter Canteen Name"
          name="canteen_name"
          onChange={handleChange}
        />
        {errors.canteen_name && <p className="danger">{errors.canteen_name}</p>}

        <label className="label">Phone Number</label>
        <InputGroup
          className="inputField"
          leftIcon="phone"
          placeholder="Enter phone number"
          name="phone_num"
          onChange={handleChange}
        />
        {errors.phone_num && <p className="danger">{errors.phone_num}</p>}

        <label className="label">Address</label>
        <InputGroup
          className="inputField"
          leftIcon="locate"
          placeholder="Enter location"
          name="location"
          onChange={handleChange}
        />
        {errors.location && <p className="danger">{errors.location}</p>}

        <RadioGroup label="Meal Choice" onChange={handleChange} name="type">
          <Radio label="Veg" value="VEG" />
          <Radio label="Veg and Non Veg" value="VEG-NONVEG" />
        </RadioGroup>
        {errors.type && <p className="danger">{errors.type}</p>}

        <label className="label">Password</label>
        <InputGroup
          className="inputField"
          leftIcon="lock"
          placeholder="Enter your password"
          name="password"
          onChange={handleChange}
        />
        {errors.password && <p className="danger">{errors.password}</p>}

        <Button className="submitBtn bp3-intent-success" type="submit">
          Register
        </Button>
      </form>
    </div>
  );
}
