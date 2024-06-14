import { selectCurrentToken, selectCurrentUserRole } from '@/store/api/auth/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
    console.log("RequireAuth == allowedRoles:", allowedRoles)
    const role = useSelector(selectCurrentUserRole);
    const token = useSelector(selectCurrentToken);
    const location = useLocation();

    console.log(allowedRoles?.includes(role));

    return allowedRoles?.includes(role) ? (
        <Outlet />
    ) : token ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
