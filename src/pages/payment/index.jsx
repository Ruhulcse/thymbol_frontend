import Payment from '@/components/payment/Payment';

const PaymentPage = () => {
    const price_id = import.meta.env.VITE_STRIPE_PRICE_ID_BUSINESS;
    return (
        <div className="app_height flex flex-col items-center justify-center">
            <Payment price_id={price_id} />
        </div>
    );
};

export default PaymentPage;
