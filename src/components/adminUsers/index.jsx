import PageHeaderLinks from '@/components/shared/PageHeaderLinks';
import AdminUserDataTable from './dataTable';
import { useTranslation } from 'react-i18next';

const AdminUsers = () => {
    const { t } = useTranslation();
    return (
        <>
            <PageHeaderLinks
                title={'Admins'}
                link={'admins/create-admin'}
                buttonText={t('Add New Admin')}
            />

            <div className="mt-10">
                <AdminUserDataTable />
            </div>
        </>
    );
};

export default AdminUsers;
