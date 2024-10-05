import React from 'react';
import { Button, Card, Elevation } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

export default function CanteenCard(props) {
  const canteen = props.c;

  return (
    <div className="canteen-card" key={canteen.canteen_id}>
      <Card interactive={true} elevation={Elevation.THREE}>
        <h3 className="canteen-name">{canteen.canteen_name}</h3>
        <p>
          <b>Phone number:</b> {canteen.phone_num}
        </p>
        <p>
          <b>Location:</b> {canteen.location}
        </p>
        <p>
          <b>Type:</b> {canteen.type}
        </p>
        <Link to={`/menu/${canteen.canteen_id}`}>
          <Button className="submitBtn bp3-intent-danger">View Items</Button>
        </Link>
      </Card>
    </div>
  );
}
