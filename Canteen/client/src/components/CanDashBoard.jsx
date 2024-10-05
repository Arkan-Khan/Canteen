import React, { useEffect, useState } from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import axios from 'axios';
import NavBarCan from './NavBarCan';

const ORDER_STATUSES = {
  ACCEPTED: 'Order Accepted',
  REJECTED: 'Order Rejected',
};

export default function CanDashBoard() {
  const [orders, setOrders] = useState([]);
  const [hasOrders, setHasOrders] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: 'Bearer ' + token } };
    
    try {
      const res = await axios.get(`http://localhost:5000/order/canteen/orders`, config);
      setOrders(res.data.orders);
      setHasOrders(Object.keys(res.data.orders).length > 0);
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle the error appropriately here, e.g., set an error state
    }
  };

  const handleOrderUpdate = async (orderId, action) => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: 'Bearer ' + token } };
    
    try {
      await axios.get(`http://localhost:5000/order/canteen/orders/${action}/${orderId}`, config);
      setRefresh(prev => !prev); // Toggle refresh to fetch new data
    } catch (error) {
      console.error(`Error updating order ${action}:`, error);
    }
  };

  const renderOrderStatus = (status) => {
    if (status === ORDER_STATUSES.ACCEPTED) {
      return <h4 style={{ color: '#119a61' }}>Order Status: {status}</h4>;
    } else if (status === ORDER_STATUSES.REJECTED) {
      return <h4 style={{ color: '#dc3c3c' }}>Order Status: {status}</h4>;
    }
    return <h4>Order Status: {status}</h4>;
  };

  if (hasOrders) {
    return (
      <div>
        <NavBarCan />
        <div style={{ marginTop: '10vh' }}>
          {Object.keys(orders).map((key) => {
            const order = orders[key][0]; // Assuming orders[key] has at least one order
            return (
              <Card
                key={key}
                style={{
                  margin: '20px auto',
                  width: '50%',
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr',
                  alignItems: 'center',
                }}
                elevation={Elevation.TWO}
              >
                <div style={{ gridColumn: '1/2', textAlign: 'left' }}>
                  <h3 style={{ color: '#2377aa' }}>Order ID: {key}</h3>
                  {renderOrderStatus(order.order_status)}
                  {orders[key].map((o) => (
                    <p key={o.item_name}>
                      {o.item_name}: {o.price}
                    </p>
                  ))}
                  <h4>Total Price: {order.total_price}</h4>
                  <h5>
                    Customer: {order.name} Ph: {order.phone_num}
                  </h5>
                </div>
                <div style={{ gridColumn: '2/3' }}>
                  {order.order_status !== ORDER_STATUSES.ACCEPTED && order.order_status !== ORDER_STATUSES.REJECTED ? (
                    <>
                      <Button onClick={() => handleOrderUpdate(key, 'accept')} className="bp3-intent-success">
                        Accept
                      </Button>
                      <Button
                        onClick={() => handleOrderUpdate(key, 'reject')}
                        style={{ marginLeft: '20px' }}
                        className="bp3-intent-danger"
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <Button className="bp3-intent-disabled">{order.order_status}</Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <NavBarCan />
        <h1 style={{ marginTop: '15vh' }}>No Orders yet</h1>
      </div>
    );
  }
}
