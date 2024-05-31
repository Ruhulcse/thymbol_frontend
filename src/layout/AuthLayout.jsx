import React, { useEffect, Suspense } from 'react';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';

import Loading from '@/components/Loading';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/store/api/auth/authSlice';
const AuthLayout = () => {
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken);

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Toaster />
                {token ? <Navigate to="/dashboard" replace /> : <Outlet />}
            </Suspense>
        </>
    );
};

export default AuthLayout;
