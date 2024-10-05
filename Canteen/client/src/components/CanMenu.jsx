import React, { useEffect, useState } from 'react';
import {
  Button,
  InputGroup,
  Card,
  HTMLSelect,
  Elevation,
} from '@blueprintjs/core';
import axios from 'axios';
import NavBarCan from './NavBarCan';
import useForm from './UseForm';
import validate from './MenuValidate';

import '../styles/canMenu.css';

export default function CanMenu() {
  const { values, errors, handleChange, handleSubmit } = useForm(submitForm, validate);
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    fetchMenu();
    fetchItems();
  }, [refreshTrigger]);

  const fetchMenu = () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.get(`http://localhost:5000/menu/`, config)
      .then(res => setMenu(res.data.menu))
      .catch(err => console.error('Error fetching menu:', err));
  };

  const fetchItems = () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.get(`http://localhost:5000/item/`, config)
      .then(res => setItems(res.data.item))
      .catch(err => console.error('Error fetching items:', err));
  };

  function submitForm(e) {
    e.preventDefault();
    if (!selectedItemId || !updatedPrice) {
      alert('Please select an item and enter a price.');
      return;
    }
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`http://localhost:5000/menu/update/${selectedItemId}/${updatedPrice}`, config)
      .then(res => {
        console.log(res);
        setRefreshTrigger(prev => !prev); // Toggle to refresh data
      })
      .catch(err => console.error('Error updating menu item:', err));
  }

  const handleDelete = (item) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`http://localhost:5000/menu/delete/${item.item_id}`, config)
      .then(res => {
        console.log(res);
        setRefreshTrigger(prev => !prev); // Toggle to refresh data
      })
      .catch(err => console.error('Error deleting menu item:', err));
  };

  return (
    <div>
      <NavBarCan />
      <div className="containerMenu">
        <div style={{ marginTop: '10vh' }} className="menu">
          {menu.map((m) => (
            <div style={{ margin: '10px auto', width: '50%', textAlign: 'left' }} key={m.item_id}>
              <Card elevation={Elevation.TWO}>
                <h3 style={{ color: '#2377aa' }}>{m.item_name}</h3>
                <p><b>Description :</b> {m.description}</p>
                <p><b>Price :</b> {m.price}</p>
                <p><b>Type :</b> {m.item_type}</p>
                <Button
                  icon="trash"
                  onClick={() => handleDelete(m)}
                  className="bp3-intent-danger"
                >
                  Delete
                </Button>
              </Card>
            </div>
          ))}
        </div>
        <form onSubmit={submitForm} className="menuForm">
          <label className="label">Select Item </label>
          <HTMLSelect name="item_select" onChange={(e) => setSelectedItemId(e.target.value)}>
            <option value="">Select Item</option>
            {items.map((item) => (
              <option key={item.item_id} value={item.item_id}>
                {item.item_name} {item.item_type}
              </option>
            ))}
          </HTMLSelect>
          <InputGroup
            className="inputField"
            leftIcon="dollar"
            placeholder="Enter price"
            name="price"
            onChange={(e) => setUpdatedPrice(e.target.value)}
            type="number"
          />
          <Button
            className="submitBtn bp3-intent-success"
            type="submit"
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
}
