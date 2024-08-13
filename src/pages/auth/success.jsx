import Loading from '@/components/Loading';
import { setUser } from '@/store/api/auth/authSlice';
import { getUser } from '@/store/api/user/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const AuthSuccess = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const user = JSON.parse(params.get('user'));

        if (user) {
            dispatch(
                setUser({
                    token: user?.token,
                    user_id: user?._id,
                    userType: user?.userType,
                    SubscriptionType: user?.SubscriptionType
                })
            );
            dispatch(getUser({ user_id: user?._id }));
            localStorage.setItem(
                'auth',
                JSON.stringify({
                    accessToken: user?.token,
                    user_id: user?._id,
                    userType: user?.userType,
                })
            );
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <>
            <Loading />
        </>
    );
};

export default AuthSuccess;
