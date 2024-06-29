import PricingCard from '@/components/ui/PricingCard';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const premium = ['Premium monthly membership'];

const annual = ['Premium annual membership'];
const ConsumerSubscriptionPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-wrap justify-evenly gap-3 bg-[#f3fcff] pt-10">
            <PricingCard
                title="Monthly Premium"
                headerClass="bg-customBlue"
                titleClass="text-white"
                paymentMethod="$2"
                // paymentAmount={'$33/month'}
                // saveCost={'SAVE 33%'}
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

            <PricingCard
                title="Annual Premium"
                headerClass="bg-customBlue"
                titleClass="text-white"
                paymentMethod="$2"
                // paymentAmount={'$33/month'}
                // saveCost={'SAVE 33%'}
                onClick={() => navigate('/payment')}
            >
                {annual.map((item, i) => (
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

export default ConsumerSubscriptionPage;
