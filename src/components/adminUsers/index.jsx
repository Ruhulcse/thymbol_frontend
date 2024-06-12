import PageHeaderLinks from '@/components/shared/PageHeaderLinks';
import AdminUserDataTable from './dataTable';

const AdminUsers = () => {
    return (
        <>
            <PageHeaderLinks
                title={'Admins'}
                link={'create-admin'}
                buttonText={'Add New Admin'}
            />

            <div className="mt-10">
                <AdminUserDataTable />
            </div>
        </>
    );
};

export default AdminUsers;
