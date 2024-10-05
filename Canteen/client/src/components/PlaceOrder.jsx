import React, { useEffect, useState } from 'react';
import { Button, Alert, Card } from '@blueprintjs/core';
import axios from 'axios';

export default function PlaceOrder(props) {
  const items = props.items;
  const [ordered, setOrdered] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setOrdered(items);
    const initialTotal = items.reduce((acc, item) => acc + parseInt(item.price), 0);
    setTotal(initialTotal);
  }, [items]);

  const handleClick = (item) => {
    const updatedOrders = ordered.filter((order) => order.item_id !== item.item_id);
    setOrdered(updatedOrders);
    setTotal((prevTotal) => prevTotal - parseInt(item.price));
    props.handleDelete(item);
  };

  const submit = () => {
    const itemIds = ordered.map(o => o.item_id);
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: 'Bearer ' + token },
    };
    const values = {
      canteen_id: ordered[0]?.canteen_id,
      order_status: 'Order Placed',
      items: itemIds,
    };

    axios.post('http://localhost:5000/order', values, config)
      .then((res) => {
        console.log(res.data);
        props.handleClear();
        setTotal(0);
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("There was an error placing the order!", error);
      });
  };

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  if (ordered.length !== 0) {
    return (
      <div>
        {ordered.map((item) => (
          <Card
            key={item.item_id}
            style={{
              height: '150px',
              width: '80%',
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <h3>{item.item_name} | Price : {item.price}</h3>
            <Button
              icon="trash"
              className="bp3-intent-danger"
              onClick={() => handleClick(item)}
              style={{ width: '50%', textAlign: 'right' }}
            />
          </Card>
        ))}
        <Card style={{ height: '150px', width: '80%' }}>
          <h3>Total Price : {total}</h3>
          <Button onClick={toggleOverlay}>Place Order</Button>
        </Card>
        <Alert
          isOpen={isOpen}
          onConfirm={submit}
          onCancel={toggleOverlay}
          cancelButtonText={'Cancel'}
          confirmButtonText={'Confirm'}
          transitionDuration={3000}
        >
          Confirm Your Order
        </Alert>
      </div>
    );
  } else {
    return (
      <Card style={{ height: '100px', width: '80%' }}>
        <h3>Total Price : {total}</h3>
      </Card>
    );
  }
}
