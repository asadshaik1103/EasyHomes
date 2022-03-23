import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import "./App.css";
import NavBar from "./components/nav-bar/Navbar";
import HomeTabs from "./components/home-tabs/HomeTabs";
import FabMenu from "./components/fab-menu/FabMenu";
import Login from "./User/Login";
import Register from "./User/Register";

const isLogin = () => {
  return !!localStorage.getItem("token");
};

const Public = () => <Login />;
const PublicRegister = () => <Register />;
const Private = () => <Dashboard />;

function PrivateOutlet() {
  const auth = isLogin();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

function PublicOutlet() {
  const auth = isLogin();
  return !auth ? <Outlet /> : <Navigate to="/dashboard" />;
}

function PublicRegisterOutlet() {
  const auth = isLogin();
  return !auth ? <Outlet /> : <Navigate to="/register" />;
}


function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<PrivateOutlet />}>
        <Route path="" element={<Private />} />
      </Route>
      <Route path="login" element={<PublicOutlet />}>
        <Route path="" element={<Public />} />
      </Route>
        <Route path="register" element={<PublicRegisterOutlet />}>
              <Route path="" element={<PublicRegister />} />
       </Route>
      <Route path="" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

const Dashboard = () => {
  return (
    <div>
      <NavBar />
      <HomeTabs />
      <FabMenu />
    </div>
  );
};

export default App;
