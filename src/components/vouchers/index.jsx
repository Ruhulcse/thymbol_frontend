import PageHeaderLinks from '../shared/pageHeaderLinks';
import VouchersDataTable from './dataTable';

const Vouchers = () => {
    return (
        <>
            <PageHeaderLinks
                title={'Vouchers'}
                link={'create-vouchers'}
                buttonText={'Create New Voucher'}
            />

            <div className="mt-10">
                <VouchersDataTable />
            </div>
        </>
    );
};

export default Vouchers;
