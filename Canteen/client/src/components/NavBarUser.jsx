import React, { useEffect } from 'react';
import { Button, Navbar, Alignment } from '@blueprintjs/core';
import { Link } from 'react-router-dom';

export default function NavBarUser({ view }) {
  useEffect(() => {
    console.log(view);
  }, [view]); // Added dependency to prevent unnecessary re-renders

  const handleLogout = () => {
    console.log('Clearing storage');
    localStorage.clear();
  };

  const navLinks = view
    ? [
        { to: '/canteenlist', icon: 'home', text: 'Home' },
        { to: '/user/orders', icon: 'shopping-cart', text: 'My Orders' },
        { to: '/user', icon: 'power', text: 'Logout', onClick: handleLogout },
      ]
    : [{ to: '/user', icon: 'power', text: 'Home' }];

  return (
    <Navbar fixedToTop className="bp3-dark">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>NITK NC</Navbar.Heading>
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
