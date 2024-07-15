import LogoutLogo from '@/assets/images/auth/logout_logo.svg';
import Dropdown from '@/components/ui/Dropdown';
import Icon from '@/components/ui/Icon';
import { Menu } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logOut } from '@/store/api/auth/authSlice';
import { swalConfirm } from '@/util/helpers';
import { useTranslation } from 'react-i18next';

const profileLabel = (user) => {
    return (
        <div className="flex items-center">
            <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
                <div className="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
                    <img
                        src={
                            user.gender === 'male'
                                ? 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg'
                                : 'https://www.womensfestival.eu/wp-content/uploads/2016/04/image-placeholder.jpg'
                        }
                        alt=""
                        className="block w-full h-full object-cover rounded-full"
                    />
                </div>
            </div>
            <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="text-white overflow-hidden text-ellipsis whitespace-nowrap block">
                    {user.userName ?? user?.displayName}
                    <div className="text-white text-xs text-start block mt-1">
                        {user.SubscriptionType}
                    </div>
                </span>

                <span className="text-white text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
                    <Icon icon="heroicons-outline:chevron-down"></Icon>
                </span>
            </div>
        </div>
    );
};

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const { user } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/login');
    };

    const ProfileMenu = [
        {
            label: 'Edit Profile',
            icon: 'heroicons-outline:user',

            action: () => {
                navigate(`/profile/user/edit/${user._id}`);
            },
        },
        {
            label: 'Logout',
            icon: 'heroicons-outline:login',
            action: () => {
                confirmLogout();
            },
        },
    ];

    if (user.userType === 'consumer') {
        ProfileMenu.unshift(
            {
                label: 'Support',
                icon: 'heroicons-outline:question-mark-circle',
                action: () => {
                    navigate('/support');
                },
            },
            {
                label: 'Help Center',
                icon: 'heroicons-outline:information-circle',
                action: () => {
                    navigate('/help-center');
                },
            },
            {
                label: 'Tutorial Video',
                icon: 'heroicons-outline:play',
                action: () => {
                    navigate('/tutorial-video');
                },
            },
            {
                label: 'About',
                icon: 'heroicons-outline:information-circle',
                action: () => {
                    navigate('/about');
                },
            }
        );
    }

    const confirmLogout = async () => {
        const response = await swalConfirm(
            'Are you sure you want to Logout?',
            'Logout',
            'Yes',
            'No',
            LogoutLogo
        );

        if (response.isConfirmed) {
            handleLogout();
        }
    };

    return (
        <Dropdown
            label={profileLabel(user)}
            classMenuItems="w-[180px] top-[58px]"
        >
            {ProfileMenu.map((item, index) => (
                <Menu.Item key={index}>
                    {({ active }) => (
                        <div
                            onClick={() => item.action()}
                            className={`${
                                active
                                    ? 'bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50'
                                    : 'text-slate-600 dark:text-slate-300'
                            } block     ${
                                item.hasDivider
                                    ? 'border-t border-slate-100 dark:border-slate-700'
                                    : ''
                            }`}
                        >
                            <div className={`block cursor-pointer px-4 py-2`}>
                                <div className="flex items-center">
                                    <span className="block text-xl ltr:mr-3 rtl:ml-3">
                                        <Icon icon={item.icon} />
                                    </span>
                                    <span className="block text-sm">
                                        {t(item.label)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </Menu.Item>
            ))}
        </Dropdown>
    );
};

export default Profile;
