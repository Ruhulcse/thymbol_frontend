import React from 'react';
import Card from '../ui/Card';

const Analytics = () => {
    return (
        <div>
            <h5 className="font-bold mb-10">Analytics</h5>
            <div className="w-full sm:w-1/2 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                <Card className="flex-1 p-4 bg-white shadow-none w-full sm:w-auto">
                    <h6 className="mb-4 text-xl sm:text-2xl">Active Coupons</h6>
                    <h6 className="text-base sm:text-xl">5 Coupons</h6>
                </Card>
                <Card className="flex-1 p-4 bg-white shadow-none w-full sm:w-auto">
                    <h6 className="mb-4 text-xl sm:text-2xl">Expired Coupons</h6>
                    <h6 className="text-base sm:text-xl">12 Coupons</h6>
                </Card>
            </div>
        </div>
    );
};

export default Analytics;
