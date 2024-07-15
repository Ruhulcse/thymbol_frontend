import PageHeaderLinks from '@/components/shared/PageHeaderLinks';
import StoreDataTable from './dataTable';
import { t } from 'i18next';

const Stores = () => {
    return (
        <>
            <PageHeaderLinks
                title={'Stores'}
                link={'stores/create-store'}
                buttonText={t('Create New Store')}
            />

            <div className="mt-10">
                <StoreDataTable />
            </div>
        </>
    );
};

export default Stores;
