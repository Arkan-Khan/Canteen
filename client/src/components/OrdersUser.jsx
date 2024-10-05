import React, { useEffect, useState } from 'react';
import NavBarUser from './NavBarUser';
import axios from 'axios';
import { Card, Elevation } from '@blueprintjs/core';

export default function OrdersUser() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const res = await axios.get('http://localhost:5000/order/user/orders', config);
      setOrders(res.data.orders || []); // Fallback to empty array if no orders
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const renderOrderStatus = (status) => {
    let color;
    if (status === 'Order Accepted') color = '#119a61';
    else if (status === 'Order Rejected') color = '#dc3c3c';
    
    return (
      <h4 style={{ color: color || 'inherit' }}>
        Order Status: {status}
      </h4>
    );
  };

  const renderOrderCards = () => {
    return Object.keys(orders).map((key) => (
      <Card
        key={key}
        style={{ width: '50%', margin: '20px auto' }}
        elevation={Elevation.TWO}
      >
        <h3>Order ID: {key}</h3>
        {renderOrderStatus(orders[key][0].order_status)}
        {orders[key].map((o, index) => (
          <p key={index}>
            {o.item_name}: {o.price}
          </p>
        ))}
        <h4>Total Price: {orders[key][0].total_price}</h4>
        <h5>
          Canteen: {orders[key][0].canteen_name} Ph: {orders[key][0].phone_num}
        </h5>
      </Card>
    ));
  };

  return (
    <div>
      <NavBarUser view={true} />
      <div style={{ marginTop: '10vh' }}>
        {orders.length > 0 ? renderOrderCards() : <h1 style={{ marginTop: '15vh' }}>No Orders</h1>}
      </div>
    </div>
  );
}
