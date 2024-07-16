import { useTranslation } from 'react-i18next';
import PageHeaderLinks from '../shared/PageHeaderLinks';
import PushNotificationDataTable from './dataTable';

const PushNotification = () => {
    const { t } = useTranslation();
    return (
        <>
            <PageHeaderLinks
                title={t('Push Notifications')}
                link={'push-notifications/create-push-notification'}
                buttonText={t('Create New Notification')}
            />

            <div className="mt-10">
                <PushNotificationDataTable />
            </div>
        </>
    );
};

export default PushNotification;
