import React from 'react';
import VouchersDataTable from './dataTable';
import { Link } from 'react-router-dom';

const Vouchers = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-10">
                <h5 className="font-bold">Vouchers</h5>
                <Link to="/create-vouchers">
                    <button className="btn btn-primary flex items-center">
                        <div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 mr-2"
                                width={'20px'}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </div>
                        <div className="font-normal">Create New Voucher</div>
                    </button>
                </Link>
            </div>

            <div className="mt-10">
                <VouchersDataTable />
            </div>
        </div>
    );
};

export default Vouchers;
