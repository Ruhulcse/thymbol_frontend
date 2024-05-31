import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import('./pages/dashboard'));
const Login = lazy(() => import('./pages/auth/login'));
const Signup = lazy(() => import('./pages/auth/register'));

import Layout from './layout/Layout';
import AuthLayout from './layout/AuthLayout';

function App() {
   
    return (
        <main className="App  relative">
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
                <Route path="/*" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </main>
    );
}

export default App;
