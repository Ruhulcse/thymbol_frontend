import Loading from '@/components/Loading';
import DataGrid from '@/components/shared/dataGrid/DataGrid';
import Switch from '@/components/ui/Switch';
import { getAllUsers } from '@/store/api/users/usersSlice';
import fetchWrapper from '@/util/fetchWrapper';
import { swalError } from '@/util/helpers';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const AdminUserDataTable = () => {
    const [userToggleLoading, setUserToggleLoading] = useState(false);
    const dispatch = useDispatch();
    const { users, loading: loadingUsers } = useSelector(
        (state) => state.users
    );
    const { user_id } = useSelector((state) => state.auth);
    const COLUMNS = [
        {
            Header: 'index',
            accessor: 'index',
            Cell: (row) => {
                return <span>{parseInt(row?.cell?.row?.id) + 1}</span>;
            },
        },
        {
            Header: 'First Name',
            accessor: 'firstName',
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: 'Last Name',
            accessor: 'lastName',
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },

        {
            Header: 'Email',
            accessor: 'email',
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: 'Enable/Disable',
            accessor: 'action',
            Cell: (row) => {
                console.log(row?.cell?.row?.original);
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
    ];

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

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => users ?? [], [users]);

    if (loadingUsers) return <Loading />;

    return <DataGrid columns={columns} data={data} />;
};

export default AdminUserDataTable;
