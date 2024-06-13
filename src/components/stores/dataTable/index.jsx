import { useMemo } from 'react';
// import { advancedTable } from '../../../constant/table-data';
import DataGrid from '@/components/shared/dataGrid/DataGrid';
import { useGetStoresQuery } from '@/store/api/stores/storesApiSlice';
import { useSelector } from 'react-redux';
import Loading from '@/components/Loading';

// const actions = [
//     {
//         name: 'view',
//         icon: 'heroicons-outline:eye',
//     },
//     {
//         name: 'edit',
//         icon: 'heroicons:pencil-square',
//     },
//     {
//         name: 'delete',
//         icon: 'heroicons-outline:trash',
//     },
// ];

const StoreDataTable = () => {
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
                return <span>{row?.cell?.value} </span>;
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
    ];

    const { user_id } = useSelector((state) => state.auth);

    const { data: stores, isLoading: loadingStores } =
        useGetStoresQuery(user_id);

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => stores ?? [], [user_id, stores]);

    if (loadingStores) return <Loading />;

    return (
        <>
            <DataGrid columns={columns} data={data} />
        </>
    );
};

export default StoreDataTable;
