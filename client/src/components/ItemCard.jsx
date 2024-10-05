// src/components/ItemCard.jsx

import React from 'react';
import { Button, Card } from '@blueprintjs/core';

export default function ItemCard(props) {
  const { m: item, handleOrders } = props;

  const handleChange = () => {
    handleOrders(item.item_id);
  };

  return (
    <div
      style={{ margin: '10px auto', width: '50%', textAlign: 'left' }}
      key={item.canteen_id}
    >
      <Card>
        <h3>{item.item_name}</h3>
        <p>{item.description}</p>
        <p>Price: {item.price}</p>
        <p>Type: {item.item_type}</p>
        <Button onClick={handleChange}>Add</Button>
      </Card>
    </div>
  );
}
