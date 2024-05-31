import React, { useEffect } from 'react';
import DeleteLogo from '@/assets/images/auth/trash_logo.svg';
import { swalConfirm, swalError } from '@/util/helpers';
import toast from 'react-hot-toast';
import fetchWrapper from '@/util/fetchWrapper';
import { useSelector } from 'react-redux';
import { logOut } from '@/store/api/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const DeleteUserProfilePage = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    useEffect(() => {
        deleteUserProfile();
    }, []);

    const deleteUserProfile = async () => {
        try {
            const resp = await swalConfirm(
                'Are you sure you want to delete the account?',
                'Delete Account',
                'Yes',
                'No',
                DeleteLogo
            );

            if (resp.isConfirmed) {
                handleDeleteAccount();
            }
        } catch (error) {
            toast.error(error);
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetchWrapper.delete(`/user/${user._id}`);
            if(response) {
                localStorage.removeItem('auth');
                dispatch(logOut());
                navigate('/login');
            }
        } catch (error) {}
    };
    return <></>;
};

export default DeleteUserProfilePage;
