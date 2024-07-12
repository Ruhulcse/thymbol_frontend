import { Suspense } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

import Loading from '@/components/Loading';
import {
    selectCurrentToken,
    selectCurrentUserRole,
} from '@/store/api/auth/authSlice';
import { useSelector } from 'react-redux';
const AuthLayout = () => {
    const navigate = useNavigate();
    const token = useSelector(selectCurrentToken);
    const role = useSelector(selectCurrentUserRole);

    const route = role === 'consumer' ? 'home' : 'dashboard';

    return (
        <>
            <Suspense fallback={<Loading />}>
                {token ? <Navigate to={`/${route}`} replace /> : <Outlet />}
            </Suspense>
        </>
    );
};

export default AuthLayout;
