import cashPlus from '@/assets/images/payment/cash_plus.svg';
import { loadStripe } from '@stripe/stripe-js';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../Loading';
import Button from '../ui/Button';
import Card from '../ui/Card';

const Payment = ({ price_id }) => {
    const { email } = useSelector((state) => state.user.user);
    const [loading, setLoading] = useState(false);
    const payment_key = useMemo(() => uuidv4(), []);

    localStorage.setItem(
        'payment_process',
        JSON.stringify({
            payment_key,
            price_id,
        })
    );

    const buttons = [
        {
            text: 'Credit/Debit Card',
            className: 'btn-md bg-white h-[47px] rounded-full me-2',
            action: () => {
                handleStripePayment();
            },
            img: null,
        },
        {
            text: null,
            className: 'btn-md bg-white h-[47px] rounded-full',
            action: () => handleCashPlusPayment(),
            img: cashPlus,
        },
    ];

    const handleStripePayment = async () => {
        const stripePromise = await loadStripe(
            import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
        );
        setLoading(true);
        const response = await fetch(
            `${
                import.meta.env.VITE_API_APP_URL
            }/create-stripe-session-subscription`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'Application/JSON' },
                body: JSON.stringify({
                    email,
                    priceId: price_id,
                    key: payment_key,
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

                <div className="bg-gray-300 rounded-md p-3 flex items-center">
                    {buttons.map((button) => (
                        <Button
                            key={button.text}
                            className={button.className}
                            onClick={button.action}
                        >
                            {button.text ? (
                                button.text
                            ) : (
                                <div className="flex items-center justify-center w-full h-full">
                                    <img
                                        src={button.img}
                                        alt="payment"
                                        className="object-fill flex items-center justify-center"
                                    />
                                </div>
                            )}
                        </Button>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Payment;
