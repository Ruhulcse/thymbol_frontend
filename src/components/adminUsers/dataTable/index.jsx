import Loading from '@/components/Loading';
import DataGrid from '@/components/shared/dataGrid/DataGrid';
import Switch from '@/components/ui/Switch';
import Tooltip from '@/components/ui/Tooltip';
import { deleteUser, getAllUsers } from '@/store/api/users/usersSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { swalConfirm, swalError, swalSuccess } from '@/util/helpers';
import { Icon } from '@iconify/react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

const AdminUserDataTable = () => {
    const { t } = useTranslation();
    const [userToggleLoading, setUserToggleLoading] = useState(false);
    const dispatch = useDispatch();
    const { users, loading: loadingUsers } = useSelector(
        (state) => state.users
    );
    const { user_id } = useSelector((state) => state.auth);
    const COLUMNS = [
        {
            Header: t('INDEX'),
            accessor: 'index',
            Cell: (row) => {
                return <span>{parseInt(row?.cell?.row?.id) + 1}</span>;
            },
        },
        {
            Header: t('FIRST NAME'),
            accessor: 'firstName',
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: t('LAST NAME'),
            accessor: 'lastName',
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },

        {
            Header: t('EMAIL'),
            accessor: 'email',
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: t('ENABLE/DISABLE'),
            accessor: 'enable_or_disable',
            Cell: (row) => {
                const isEnable =
                    row?.cell?.row?.original?.userStatus === 'Active'
                        ? true
                        : false;
                return (
                    <Switch
                        value={isEnable}
                        activeClass={
                            isEnable ? 'bg-success-500' : 'bg-black-500'
                        }
                        onChange={() =>
                            toggleUserRole({
                                id: row?.cell?.row?.original?._id,
                                status: row?.cell?.row?.original?.userStatus,
                            })
                        }
                        disabled={userToggleLoading}
                    />
                );
            },
        },
        {
            Header: t('ACTION'),
            accessor: 'action',
            Cell: (row) => {
                return (
                    <div className="flex space-x-3 rtl:space-x-reverse">
                        {/* <Tooltip content="View" placement="top" arrow animation="shift-away">
                    <button className="action-btn" type="button">
                      <Icon icon="heroicons:eye" />
                    </button>
                  </Tooltip>
                  <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                    <button className="action-btn" type="button">
                      <Icon icon="heroicons:pencil-square" />
                    </button>
                  </Tooltip> */}
                        <Tooltip
                            content="Delete"
                            placement="top"
                            arrow
                            animation="shift-away"
                            theme="danger"
                        >
                            <button
                                className="action-btn"
                                type="button"
                                onClick={() =>
                                    handleDeleteUser({
                                        id: row?.cell?.row?.original._id,
                                    })
                                }
                            >
                                <Icon icon="heroicons:trash" />
                            </button>
                        </Tooltip>
                    </div>
                );
            },
        },
    ];

    const handleDeleteUser = ({ id }) => {
        console.log('🚀  ~ id:', id);
        swalConfirm('Are you sure you want to delete this user?').then(
            async (result) => {
                if (result.isConfirmed) {
                    dispatch(deleteUser({ id }))
                        .unwrap()
                        .then(() => {
                            swalSuccess('User deleted successfully');
                            dispatch(getAllUsers({ user_id }));
                        });
                }
            }
        );
    };

    const toggleUserRole = async ({ id, status }) => {
        const payload = {
            userStatus: status === 'Active' ? 'Deactivated' : 'Active',
        };
        try {
            setUserToggleLoading(true);
            const response = await fetchWrapper.put(`user/${id}`, payload);
            dispatch(getAllUsers({ user_id }));
            toast.success('User role updated successfully');
        } catch (error) {
            swalError(error);
        } finally {
            setUserToggleLoading(false);
        }
    };

    useEffect(() => {
        dispatch(getAllUsers({ user_id }));
    }, [dispatch]);

    const columns = useMemo(() => COLUMNS, [t]);
    const data = useMemo(() => users ?? [], [users]);

    if (loadingUsers) return <Loading />;

    return <DataGrid columns={columns} data={data} />;
};

export default AdminUserDataTable;
