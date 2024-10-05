import React, { useEffect, useState } from 'react';
import { Button, Card } from '@blueprintjs/core';
import axios from 'axios';
import PlaceOrder from './PlaceOrder';
import NavBarUser from './NavBarUser';
import Access from '../Authorization/Access';

export default function Menu({ match }) {
  const [menu, setMenu] = useState([]);
  const [items, setItems] = useState([]);
  const [rules, setRules] = useState({ page: false, op: [] });
  const [show, setShow] = useState(false);
  const cid = match.params.id;

  useEffect(() => {
    const fetchRoleAndPermissions = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const { data: roleData } = await axios.get(`http://localhost:5000/role/`, config);
        const { data: permData } = await axios.get(`http://localhost:5000/role/permissions/`, {
          params: { role: roleData.role },
        });
        
        const rul = Access('user_menu', true, permData);
        setRules(rul);
        setShow(rul);
      } catch (error) {
        console.error("Error fetching role and permissions:", error);
      }
    };

    const fetchMenu = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        const { data } = await axios.get(`http://localhost:5000/menu/${cid}`, config);
        setMenu(data.menu);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchRoleAndPermissions();
    fetchMenu();
  }, [cid]);

  const handleOrders = (item) => setItems(prev => [...prev, item]);
  const handleDelete = (item) => setItems(prev => prev.filter(i => i.item_id !== item.item_id));
  const handleClear = () => setItems([]);

  if (!show) return <div></div>; // Optionally, a loading spinner can be added here.

  return (
    <div>
      <NavBarUser view={rules.op['user_menu'].includes('view_only')} />
      <div style={{ marginTop: '10vh', display: 'grid', gridTemplateColumns: '2fr 1fr', gridGap: '50px' }}>
        <div style={{ overflowY: 'scroll', height: '90vh' }}>
          {menu.map(m => (
            <div key={m.item_id} style={{ margin: '10px auto', width: '50%', textAlign: 'left' }}>
              <Card style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', alignItems: 'center' }}>
                <div>
                  <h3 style={{ color: '#230444' }}>{m.item_name}</h3>
                  <p><b>Description:</b> {m.description}</p>
                  <p><b>Price:</b> {m.price}</p>
                  <p><b>Type:</b> {m.item_type}</p>
                </div>
                {rules.op['user_menu'].includes('add_items') && (
                  <Button
                    onClick={() => handleOrders(m)}
                    className="submitBtn bp3-intent-danger"
                  >
                    Add
                  </Button>
                )}
              </Card>
            </div>
          ))}
        </div>
        {rules.op['user_menu'].includes('place_order') && (
          <PlaceOrder
            items={items}
            handleDelete={handleDelete}
            handleClear={handleClear}
            style={{ textAlign: 'center', overflowY: 'scroll', height: '90vh' }}
          />
        )}
      </div>
    </div>
  );
}
