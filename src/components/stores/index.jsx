import PageHeaderLinks from '../shared/pageHeaderLinks';
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
