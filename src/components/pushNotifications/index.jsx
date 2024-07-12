import PageHeaderLinks from '../shared/PageHeaderLinks';
import PushNotificationDataTable from './dataTable';

const PushNotification = () => {
    return (
        <>
            <PageHeaderLinks
                title={'Push Notifications'}
                link={'push-notifications/create-push-notification'}
                buttonText={'Create New Notification'}
            />

            <div className="mt-10">
                <PushNotificationDataTable />
            </div>
        </>
    );
};

export default PushNotification;
