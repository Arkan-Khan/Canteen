import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';

// Import components
import Login from './components/Login';
import RegisterUser from './components/RegisterUser';
import CanteenList from './components/CanteenList';
import Menu from './components/Menu';
import OrdersUser from './components/OrdersUser';
import LoginCanteen from './components/LoginCanteen';
import CanteenReg from './components/RegisterCanteen';
import CanteenDash from './components/CanDashBoard';
import CanMenu from './components/CanMenu';
import AdminForm from './components/AdminForm';
import AdminDash from './components/AdminDash';
import PageNotFound from './components/PageNotFound';
import AccessDenied from './components/AccessDenied';
import AssignPermission from './components/AssignPermission';
import PrivateRoute from './PrivateRoute.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Navigate from root to user login page */}
          <Route path="/" element={<Navigate to="/user" replace />} />

          {/* User Routes */}
          <Route path="/user" element={<Login />} />
          <Route path="/canteenlist" element={<PrivateRoute component={CanteenList} action="user_canteenlist" />} />
          <Route path="/user/orders" element={<PrivateRoute component={OrdersUser} action="user_user_orders" />} />
          <Route path="/register/user" element={<RegisterUser />} />

          {/* Canteen Routes */}
          <Route path="/canteen" element={<LoginCanteen />} />
          <Route path="/register/canteen" element={<CanteenReg />} />
          <Route path="/canteen/orders" element={<PrivateRoute component={CanteenDash} action="canteen_canteen_dash" />} />
          <Route path="/canteen/menu" element={<PrivateRoute component={CanMenu} action="canteen_canteen_menu" />} />

          {/* Admin Routes */}
          <Route path="/user/admin" element={<AdminForm />} />
          <Route path="/admindash" element={<PrivateRoute component={AdminDash} action="admin_admindash" />} />
          <Route path="/assign_perms" element={<PrivateRoute component={AssignPermission} action="assign_perm" />} />

          {/* Access Denied and Error Pages */}
          <Route path="/access_denied" element={<AccessDenied />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
