import Loading from '@/components/Loading';
import Card from '@/components/ui/Card';
import fetchWrapper from '@/util/fetchWrapper';
import { formatTimeOrDate } from '@/util/helpers';
import { Menu } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const { data } = await fetchWrapper('/push-notificaton/all');
            console.log('🚀  ~ data:', data);
            setNotifications(data.data.reverse());
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    if (loading) return <Loading />;

    return (
        <div>
            <Card bodyClass="p-0 w-full px-24 pt-5 pb-10">
                <div className="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600">
                    <div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6">
                        All Notifications
                    </div>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    <Menu as={Fragment}>
                        {notifications?.map((item, i) => (
                            <Menu.Item key={i}>
                                {({ active }) => (
                                    <div
                                        className={`${
                                            active
                                                ? 'bg-slate-100 dark:bg-slate-700 dark:bg-opacity-70 text-slate-800'
                                                : 'text-slate-600 dark:text-slate-300'
                                        } block w-full px-4 py-2 text-sm  cursor-pointer`}
                                    >
                                        <div className="flex ltr:text-left rtl:text-right">
                                            <div className="flex-1">
                                                <div
                                                    className={`${
                                                        active
                                                            ? 'text-slate-600 dark:text-slate-300'
                                                            : ' text-slate-600 dark:text-slate-300'
                                                    } text-sm`}
                                                >
                                                    {item.title}
                                                </div>
                                                <div
                                                    className={`${
                                                        active
                                                            ? 'text-slate-500 dark:text-slate-200'
                                                            : ' text-slate-600 dark:text-slate-300'
                                                    } text-xs leading-4`}
                                                >
                                                    {item.desc}
                                                </div>
                                                <div className="text-slate-400 dark:text-slate-400 text-xs mt-1">
                                                    {formatTimeOrDate(
                                                        item?.createdAt
                                                    )}
                                                </div>
                                            </div>
                                            {item.unread && (
                                                <div className="flex-0">
                                                    <span className="h-[10px] w-[10px] bg-danger-500 border border-white dark:border-slate-400 rounded-full inline-block"></span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Menu.Item>
                        ))}
                    </Menu>
                </div>
            </Card>
        </div>
    );
};

export default NotificationPage;
