import PageHeaderLinks from '../shared/PageHeaderLinks';
import PushNotificationDataTable from './dataTable';

const PushNotification = () => {
    return (
        <>
            <PageHeaderLinks
                title={'Push Notifications'}
                link={'vouchers/create-vouchers'}
                buttonText={'Create New Notification'}
            />

            <div className="mt-10">
                <PushNotificationDataTable />
            </div>
        </>
    );
};

export default PushNotification;
