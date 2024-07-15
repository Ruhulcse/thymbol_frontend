import { Icon } from '@iconify/react';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import PricingCard from '../ui/PricingCard';

const premium = [
    'Create 6 digital coupons',
    'Send Push Notification',
    'Video reviews',
    'Analytics Dashboard',
    'Add additional stores',
    'Customer Service',
];

const Subscription = () => {
    const navigate = useNavigate();
    return (
        <>
            <PricingCard
                title={t('Basic Account')}
                headerClass="bg-customBlue"
                titleClass="text-white"
                paymentMethod={t('Free')}
                onClick={() => navigate('/stores/create-store')}
            >
                <div className="flex items-center bg-gray-100 my-2 p-3">
                    <Icon
                        icon="heroicons-solid:check-circle"
                        className="me-2 rounded-full bg-customBlue text-white"
                    />{' '}
                    {t('Create 2 digital coupons')}
                </div>
            </PricingCard>
            <PricingCard
                title={t('Premium Account')}
                headerClass="bg-customBlue"
                titleClass="text-white"
                paymentMethod="$10"
                paymentAmount={t('$33/month')}
                saveCost={t('SAVE 33%')}
                onClick={() => navigate('/dashboard/payment')}
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
                        {t(item)}
                    </div>
                ))}
            </PricingCard>
        </>
    );
};

export default Subscription;
