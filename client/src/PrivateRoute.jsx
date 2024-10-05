import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import AccessDenied from './components/AccessDenied.jsx'; // Adjusted import path if necessary
import Access from './Authorization/Access'; // Adjusted import path if necessary

const PrivateRoute = ({ component: Component, action }) => {
  const [perm, setPerm] = useState({ perm: [], show: false, loading: true });
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Navigate to login if no token
      setError('No token found, Navigateing to login...');
      return <Navigate to="/login" />;
    }
    
    const config = {
      headers: { Authorization: 'Bearer ' + token },
    };

    axios.get(`http://localhost:5000/role/`, config)
      .then((res) => {
        return axios.get(`http://localhost:5000/role/permissions/`, {
          params: { role: res.data.role },
        });
      })
      .then((res) => {
        setPerm({ perm: res.data, show: true, loading: false });
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch permissions');
        setPerm({ ...perm, loading: false });
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (perm.loading) {
    return <div>Loading...</div>; // Optional: Add a spinner here
  }

  return (
    <>
      {Access(action, false, perm.perm) ? <Component /> : <AccessDenied />}
    </>
  );
};

export default PrivateRoute;
