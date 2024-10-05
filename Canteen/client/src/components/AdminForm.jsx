import React, { useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import '../styles/login.css';
import validate from './LoginValidation';
import useForm from './UseForm';

export default function RegisterUser() {
    const { values, errors, handleChange, handleSubmit } = useForm(register, validate);
    const [emailErr, setEmailErr] = useState({});
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false); // Loading state

    async function register() {
        setLoading(true); // Start loading
        try {
            const res = await axios.post(`http://localhost:5000/user/admin/login`, values);
            if (res.data.msg === 'email doesnt exist') {
                setEmailErr({ msg: res.data.msg });
            } else {
                localStorage.setItem('token', res.data.token);
                setShow(true);
            }
        } catch (error) {
            console.error("Login error", error);
            setEmailErr({ msg: "An unexpected error occurred." });
        } finally {
            setLoading(false); // Stop loading
        }
    }

    if (!show) {
        return (
            <div className="login">
                <img src="/food2.PNG" alt="Food" style={{ margin: '0 0 auto auto' }} />
                <h2>
                    <i className="fas fa-utensils"></i>
                    {'    '}NITK NC
                </h2>
                <form style={{ textAlign: 'left' }} onSubmit={handleSubmit}>
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

                    <label className="label">Password</label>
                    <InputGroup
                        className="inputField"
                        leftIcon="lock"
                        placeholder="Enter your password"
                        name="password"
                        type="password" // Mask the password input
                        onChange={handleChange}
                    />
                    {errors.password && <p className="danger">{errors.password}</p>}

                    <Button
                        className="submitBtn bp3-intent-success"
                        type="submit"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
                <Link to="/user">
                    <Button
                        className="submitBtn bp3-intent-primary"
                        style={{ marginTop: '10px' }}
                    >
                        Home
                    </Button>
                </Link>
                <img src="/food1.PNG" alt="Food" />
            </div>
        );
    } else {
        return <Navigate to="/admindash" />;
    }
}
