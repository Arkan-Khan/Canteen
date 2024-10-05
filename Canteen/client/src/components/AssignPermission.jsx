import React, { useState, useEffect } from 'react';
import { Button, Navbar, Alignment, HTMLSelect } from '@blueprintjs/core';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AssignPermission() {
    const roles = ['user', 'visitor', 'canteen'];
    const permissions = [
        'user_canteenlist',
        'user_menu',
        'user_user_orders',
        'canteen_canteen_menu',
        'canteen_canteen_dash',
    ];
    const operations = {
        user_menu: ['view_only', 'add_items', 'place_order'],
        user_canteenlist: ['view_only'],
    };
    
    const [items, setItems] = useState({ perm: [], ops: [] });
    const [role, setRole] = useState('');
    const [perm, setPerm] = useState({ perm: '', show: false });
    const [ops, setOps] = useState('');
    const [message, setMessage] = useState(''); // For feedback messages

    useEffect(() => {
        axios.get(`http://localhost:5000/role/operations/`)
            .then((res) => {
                setItems({ perm: res.data.perm, ops: res.data.ops });
            })
            .catch((error) => {
                console.error("Error fetching roles and operations", error);
            });
    }, []);

    const handlePerm = (val) => {
        setPerm({ perm: val, show: val in operations });
    };

    const handleSubmit = (action) => {
        const values = { role, perm: perm.perm, ops };
        const url = action === 'assign' ? 'http://localhost:5000/role/assign/' : 'http://localhost:5000/role/delete/';
        
        axios.post(url, values)
            .then((res) => {
                setMessage(`Successfully ${action === 'assign' ? 'assigned' : 'deleted'} permission.`);
                // Reset form fields if needed
                setRole('');
                setPerm({ perm: '', show: false });
                setOps('');
            })
            .catch((error) => {
                console.error("Error assigning permission", error);
                setMessage(`Failed to ${action === 'assign' ? 'assign' : 'delete'} permission.`);
            });
    };

    const handleLogout = () => {
        console.log('Clear storage');
        localStorage.clear();
    };

    return (
        <div>
            <Navbar fixedToTop={true} className="bp3-dark">
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>NITK NC</Navbar.Heading>
                    <Navbar.Divider />
                    <Link to={`/admindash`} style={{ textDecoration: 'none', color: '#f5f8fa' }}>
                        <Button className="bp3-minimal" text="Admin Dash" />
                    </Link>
                    <Link to={`/user`} style={{ textDecoration: 'none', color: '#f5f8fa' }}>
                        <Button className="bp3-minimal" icon="power" text="Logout" onClick={handleLogout} />
                    </Link>
                </Navbar.Group>
            </Navbar>
            <div style={{ marginTop: '10vh' }}>
                <h1>Roles with permissions</h1>
                <table style={{ margin: 'auto', textAlign: 'left', border: '1px solid black' }}>
                    <thead>
                        <tr>
                            <th style={{ borderRight: '1px solid black' }}>Role</th>
                            <th>Permission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.perm.map((i, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px solid black' }}>{i.roles} </td>
                                <td>{i.permission}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h1>Roles with permission and operations</h1>
                <table style={{ margin: 'auto', textAlign: 'left', border: '1px solid black' }}>
                    <thead>
                        <tr>
                            <th style={{ borderRight: '1px solid black' }}>Role</th>
                            <th style={{ borderRight: '1px solid black' }}>Permission</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.ops.map((i, index) => (
                            <tr key={index}>
                                <td style={{ borderRight: '1px solid black' }}>{i.roles} </td>
                                <td style={{ borderRight: '1px solid black' }}>{i.permission}</td>
                                <td>{i.operation}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '10vh auto' }}>
                <HTMLSelect onChange={(e) => setRole(e.target.value)} style={{ width: '250px' }} placeholder="Select Role">
                    {roles.map((r, index) => <option key={index}>{r}</option>)}
                </HTMLSelect>
                <HTMLSelect onChange={(e) => handlePerm(e.target.value)} style={{ width: '250px' }} placeholder="Select Permission">
                    {permissions.map((p, index) => <option key={index}>{p}</option>)}
                </HTMLSelect>
                {perm.show && (
                    <HTMLSelect onChange={(e) => setOps(e.target.value)} style={{ width: '250px' }} placeholder="Select Operations">
                        {operations[perm.perm]?.map((op, index) => <option key={index}>{op}</option>)}
                    </HTMLSelect>
                )}
                <Button onClick={() => handleSubmit('assign')} className="bp3-intent-success">Assign</Button>
                <Button onClick={() => handleSubmit('delete')} className="bp3-intent-danger">Delete</Button>
            </div>
            {message && <p>{message}</p>} {/* Feedback message */}
        </div>
    );
}
