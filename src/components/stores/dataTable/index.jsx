import { useMemo } from 'react';
// import { advancedTable } from '../../../constant/table-data';
import Loading from '@/components/Loading';
import DataGrid from '@/components/shared/dataGrid/DataGrid';
import Tooltip from '@/components/ui/Tooltip';
import {
    useDeleteStoreMutation,
    useGetStoresQuery,
} from '@/store/api/stores/storesApiSlice';
import { swalConfirm, swalError, swalSuccess } from '@/util/helpers';
import { Icon } from '@iconify/react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const StoreDataTable = () => {
    const [deleteStore, { isLoading, isError, error, isSuccess, success }] =
        useDeleteStoreMutation();
    const COLUMNS = [
        {
            Header: 'index',
            accessor: 'index',
            Cell: (row) => {
                return <span>{parseInt(row?.cell?.row?.id) + 1}</span>;
            },
        },
        {
            Header: 'Store Name',
            accessor: 'store_name',
            Cell: (row) => {
                return (
                    <span className="text-customBlue">
                        <Link
                            to={`/store/${row?.cell?.row?.original._id}`}
                            target="_blank"
                        >
                            {row?.cell?.value}{' '}
                        </Link>
                    </span>
                );
            },
        },
        {
            Header: 'category',
            accessor: 'category_name',
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },

        {
            Header: 'store address',
            accessor: 'store_address',
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: 'action',
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
                                    handleDeleteStore({
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

    const handleDeleteStore = ({ id }) => {
        swalConfirm('Are you sure you want to delete this store?').then(
            async (result) => {
                if (result.isConfirmed) {
                    const { data } = await deleteStore({ id });

                    swalSuccess(data?.message, 'Success!');
                }
            }
        );
    };

    const { user_id } = useSelector((state) => state.auth);

    const { data: stores, isLoading: loadingStores } =
        useGetStoresQuery(user_id);

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => stores ?? [], [user_id, stores]);

    if (loadingStores) return <Loading />;

    if (isError) return swalError(error?.data?.message);

    return (
        <>
            <DataGrid columns={columns} data={data} />
        </>
    );
};

export default StoreDataTable;
