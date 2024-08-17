import Loading from '@/components/Loading';
import {
    selectCurrentUser,
    selectCurrentUserRole,
    setUser,
} from '@/store/api/auth/authSlice';
import { getUser } from '@/store/api/user/userSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const SuccessPage = () => {
    const [loading, setLoading] = useState(false);
    const user_id = useSelector(selectCurrentUser);
    const { email } = useSelector((state) => state.user.user);
    console.log('🚀  ~ email:', email);
    const [searchParams] = useSearchParams();
    const payment_key = searchParams.get('key');
    const dispatch = useDispatch();

    const savedPaymentProcessInfo = localStorage.getItem('payment_process');
    const parsedSavedPaymentProcessInfo = JSON.parse(savedPaymentProcessInfo);
    const user_type = useSelector(selectCurrentUserRole);

    const updatePaymentStatus = async (payload) => {
        setLoading(true);

        try {
            const response = await fetchWrapper.post(
                'payment_success',
                payload
            );
            if (response.status === 200) {
                localStorage.removeItem('payment_process');
                dispatch(getUser({ user_id }));
                dispatch(setUser({ SubscriptionType: 'premium' }));
                const authData = {
                    ...JSON.parse(localStorage.getItem('auth')),
                    SubscriptionType: 'premium',
                };
                localStorage.setItem('auth', JSON.stringify(authData));
            }
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const payload = {
            email,
            type: 'premium',
        };
        if (payment_key) {
            if (parsedSavedPaymentProcessInfo?.payment_key === payment_key) {
                payload.price_id = parsedSavedPaymentProcessInfo.price_id;
                updatePaymentStatus(payload);
            }
        } else if (email) {
            updatePaymentStatus(payload);
        }
    }, [payment_key, email]);

    if (loading) {
        return (
            <div>
                <Loading />
                <p className="text-center">
                    Processing your payment. Please don't refresh or close the
                    browser
                </p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6  md:mx-auto">
                <svg
                    viewBox="0 0 24 24"
                    className="text-green-600 w-16 h-16 mx-auto my-6"
                >
                    <path
                        fill="currentColor"
                        d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                    ></path>
                </svg>
                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Thank you for completing your secure online payment.
                    </p>
                    <p> Have a great day! </p>
                    <div className="py-10 text-center">
                        <a
                            href={
                                user_type === 'consumer'
                                    ? '/home'
                                    : '/dashboard'
                            }
                            className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                        >
                            GO BACK
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
