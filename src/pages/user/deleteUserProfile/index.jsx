import DeleteLogo from '@/assets/images/auth/trash_logo.svg';
import { logOut } from '@/store/api/auth/authSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { swalConfirm } from '@/util/helpers';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
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
            localStorage.removeItem('auth');
            dispatch(logOut());
            navigate('/login');
        } catch (error) {}
    };
    return <></>;
};

export default DeleteUserProfilePage;
