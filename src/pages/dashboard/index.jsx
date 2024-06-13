import PricingCard from '@/components/ui/PricingCard';
import { Icon } from '@iconify/react';
//import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const premium = [
    'Create 6 digital coupons',
    'Send Push Notification',
    'Video reviews',
    'Analytics Dashboard',
    'Add additional stores',
    'Customer Service',
];

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-wrap justify-evenly gap-3">
            <PricingCard
                title="Basic Account"
                headerClass="bg-customBlue"
                titleClass="text-white"
                paymentMethod="Free"
                onClick={() => navigate('/create-store')}
            >
                <div className="flex items-center bg-gray-100 my-2 p-3">
                    <Icon
                        icon="heroicons-solid:check-circle"
                        className="me-2 rounded-full bg-customBlue text-white"
                    />{' '}
                    Create 2 digital coupons
                </div>
            </PricingCard>
            <PricingCard
                title="Premium Account"
                headerClass="bg-customBlue"
                titleClass="text-white"
                paymentMethod="$10"
                paymentAmount={'$33/month'}
                saveCost={'SAVE 33%'}
                onClick={() => navigate('/payment')}
            >
                {premium.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center bg-gray-100 my-2 p-3"
                    >
                        <Icon
                            icon="heroicons-solid:check-circle"
                            className="me-2 rounded-full bg-customBlue text-white"
                        />
                        {item}
                    </div>
                ))}
            </PricingCard>
        </div>
    );
};

export default Dashboard;
