import React from 'react';
import { Button, Navbar, Alignment } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

export default function NavBarUser() {
  const handleLogout = () => {
    console.log('Clearing storage');
    localStorage.clear();
  };

  const navLinks = [
    { to: '/canteen/orders', icon: 'home', text: 'Home' },
    { to: '/canteen/orders', icon: 'shopping-cart', text: 'Orders' },
    { to: '/canteen/menu', icon: 'shopping-cart', text: 'Menu' },
    { to: '/canteen', icon: 'power', text: 'Logout', onClick: handleLogout }
  ];

  return (
    <Navbar fixedToTop className="bp3-dark">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>
          <em>NITK NC</em>
        </Navbar.Heading>
        <Navbar.Divider />
        {navLinks.map(({ to, icon, text, onClick }, index) => (
          <Link key={index} to={to} style={{ textDecoration: 'none', color: '#f5f8fa' }}>
            <Button
              className="bp3-minimal"
              icon={icon}
              text={text}
              onClick={onClick} // Handle logout action if applicable
            />
          </Link>
        ))}
      </Navbar.Group>
    </Navbar>
  );
}
