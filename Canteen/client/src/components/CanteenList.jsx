// src/components/CanteenList.jsx

import React, { useEffect, useState } from 'react';
import { Button, InputGroup } from '@blueprintjs/core';
import axios from 'axios';
import CanteenCard from './CanteenCard';
import NavBarUser from './NavBarUser';
import Access from '../Authorization/Access';

export default function CanteenList() {
  const [canteen, setCanteen] = useState([]);
  const [menu, setMenu] = useState([]);
  const [show, setShow] = useState(false);
  const [rules, setRules] = useState({ page: false, op: [] });

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.get(`http://localhost:5000/role/`, config)
      .then((res) => {
        axios.get(`http://localhost:5000/role/permissions/`, {
          params: { role: res.data.role },
        })
        .then((res) => {
          console.log(res.data);
          const rul = Access('user_canteenlist', true, res.data);
          console.log(rul);
          setRules(rul);
          setShow(rul); // Show is set to true or false based on rul
        });
      });

    fetchData(); // Fetch data after fetching roles and permissions
  }, []);

  const fetchData = () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios.get('http://localhost:5000/canteen', config)
      .then((res) => {
        const can_data = res.data.nc;
        console.log(can_data);
        setCanteen(can_data);
      });

    axios.get(`http://localhost:5000/menu`, config)
      .then((res) => {
        const menu_data = res.data.menu;
        console.log(menu_data);
        setMenu(menu_data);
      });
  };

  if (show) {
    return (
      <div>
        {rules.op['user_canteenlist'].includes('view_only') ? (
          <NavBarUser view={false} />
        ) : (
          <NavBarUser view={true} />
        )}

        <div style={{ marginTop: '10vh' }}>
          {canteen.map((c) => (
            <CanteenCard key={c.canteen_id} c={c} />
          ))}
        </div>
      </div>
    );
  } else {
    return <div>No access to view canteen list.</div>; // Optional message for better UX
  }
}
