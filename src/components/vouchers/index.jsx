import PageHeaderLinks from '@/components/shared/PageHeaderLinks';
import { useTranslation } from 'react-i18next';
import VouchersDataTable from './dataTable';

const Vouchers = () => {
    const { t } = useTranslation();
    return (
        <>
            <PageHeaderLinks
                title={'Vouchers'}
                link={'vouchers/create-vouchers'}
                buttonText={t('Create New Voucher')}
            />

            <div className="mt-10">
                <VouchersDataTable />
            </div>
        </>
    );
};

export default Vouchers;
