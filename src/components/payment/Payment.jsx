import { loadStripe } from '@stripe/stripe-js';
import { useSelector } from 'react-redux';
import Loading from '../Loading';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { useState } from 'react';

const Payment = () => {
    const { email } = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);
    const buttons = [
        {
            text: 'Credit/Debit Card',
            className: 'btn-md bg-white rounded-full me-2',
            action: () => {
                handleStripePayment();
            },
        },
        {
            text: 'Cash Plus',
            className: 'btn-md bg-white rounded-full',
            action: () => handleCashPlusPayment(),
        },
    ];

    const handleStripePayment = async () => {
        const stripePromise = await loadStripe(
            import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );
        setLoading(true);
        const response = await fetch(
            `${import.meta.env.VITE_API_APP_URL}/create-stripe-session-subscription`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'Application/JSON' },
                body: JSON.stringify({
                    email,
                    priceId: 'price_1PMxvnJggWefJ04AdCGPfWQe',
                }),
            }
        );

        if (response.status === 409) {
            const data = await response.json();
            if (data && data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        } else {
            const session = await response.json();
            stripePromise.redirectToCheckout({
                sessionId: session.id,
            });
        }
        setLoading(false);
    };

    const handleCashPlusPayment = async () => {
        setLoading(true);
        const response = await fetch(
            `${import.meta.env.VITE_API_APP_URL}/youcanpay`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'Application/JSON' },
                
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            if (data && data.paymentUrl) {
                window.location.href = data.paymentUrl;
            }
        }
        setLoading(false);
    };

    if (loading) return <Loading />;

    return (
        <div className="mx-auto w-full md:w-2/4">
            <Card>
                <h6 className="font-bold py-3">
                    Select your preferred payment method
                </h6>
                <p className="text-gray-400 font-normal pb-3 text-sm">
                    Secure Checkout: Your payment information is fully protected
                </p>

                <div className="bg-gray-300 rounded-md p-3">
                    {buttons.map((button) => (
                        <Button
                            key={button.text}
                            className={button.className}
                            text={button.text}
                            onClick={button.action}
                        />
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Payment;
