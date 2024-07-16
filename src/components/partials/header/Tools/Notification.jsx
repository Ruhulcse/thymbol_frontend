import notificationWav from '@/assets/sounds/notification.wav';
import Dropdown from '@/components/ui/Dropdown';
import Icon from '@/components/ui/Icon';
import { selectCurrentToken } from '@/store/api/auth/authSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { formatTimeOrDate } from '@/util/helpers';
import { Menu } from '@headlessui/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';

const notifyToast = ({ title, description, createdAt }) => {
    const notificationSound = new Audio(notificationWav);
    notificationSound.play().catch((error) => {
        console.error('Audio play failed:', error);
    });
    toast.custom((t) => {
        return (
            <div
                className={`${
                    t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
                <div className="flex-1 w-0 p-4">
                    <div className="flex items-start">
                        <div className="ml-3 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                {title}
                            </p>
                            <p className="mt-1 text-sm text-gray-600">
                                {description}
                            </p>
                            <p className="mt-1 text-sm text-gray-400">
                                {formatTimeOrDate(createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex border-l border-gray-200">
                    <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    });
};

const notifyLabel = ({ notification_count }) => {
    return (
        <span className="relative lg:h-[32px] lg:w-[32px]  text-slate-900 lg:dark:bg-slate-900 dark:text-white cursor-pointer rounded-full text-[20px] flex flex-col items-center justify-center">
            <Icon
                icon="heroicons-outline:bell-alert"
                className="text-3xl text-white"
            />
            <span className="absolute lg:-right-1 lg:-top-1 -top-2 -right-2 h-[20px] w-[20px] bg-white text-[15px] font-semibold flex flex-col items-center justify-center rounded-full text-black-500 z-[99]">
                {notification_count}
            </span>
        </span>
    );
};

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    const token = useSelector(selectCurrentToken);

    const fetchNotifications = async () => {
        try {
            const { data } = await fetchWrapper('/push-notificaton/all');
            setNotifications(data.data.reverse());
        } catch (error) {}
    };

    useEffect(() => {
        fetchNotifications();

        const socket = io(import.meta.env.VITE_API_APP_URL, {
            query: { token },
        });

        socket.on('notification', (notification) => {
            console.log('🚀  ~ notification:', notification);

            notifyToast({
                title: notification.title,
                description: notification.description,
                createdAt: notification.createdAt,
            });
            setNotifications((prevNotifications) => [
                notification,
                ...prevNotifications,
            ]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
            {/* <Toaster position="top-right" /> */}
            <Dropdown
                classMenuItems="md:w-[300px] top-[58px] h-[480px] overflow-y-auto"
                label={notifyLabel({
                    notification_count: notifications?.length,
                })}
            >
                <div className="flex justify-between px-4 py-4 border-b border-slate-100 dark:border-slate-600">
                    <div className="text-sm text-slate-800 dark:text-slate-200 font-medium leading-6">
                        Notifications
                    </div>
                    <div className="text-slate-800 dark:text-slate-200 text-xs md:text-right">
                        <Link to="/notifications" className="underline">
                            View all
                        </Link>
                    </div>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
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
                                        {/* <div className="flex-none ltr:mr-3 rtl:ml-3">
                                        <div className="h-8 w-8 bg-white rounded-full">
                                            <img
                                                src={item.image}
                                                alt=""
                                                className={`${
                                                    active
                                                        ? ' border-white'
                                                        : ' border-transparent'
                                                } block w-full h-full object-cover rounded-full border`}
                                            />
                                        </div>
                                    </div> */}
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
                </div>
            </Dropdown>
        </>
    );
};

export default Notification;
