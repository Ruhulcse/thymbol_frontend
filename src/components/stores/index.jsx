import PageHeaderLinks from '@/components/shared/PageHeaderLinks';
import StoreDataTable from './dataTable';

const Stores = () => {
    return (
        <>
            <PageHeaderLinks
                title={'Stores'}
                link={'create-store'}
                buttonText={'Create New Store'}
            />

            <div className="mt-10">
                <StoreDataTable />
            </div>
        </>
    );
};

export default Stores;
