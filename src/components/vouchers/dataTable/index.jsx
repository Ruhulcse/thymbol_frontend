import { useMemo } from 'react';
// import { advancedTable } from '../../../constant/table-data';
import Loading from '@/components/Loading';
import DataGrid from '@/components/shared/dataGrid/DataGrid';
import { useGetVouchersQuery } from '@/store/api/vouchers/vouchersApiSlice';
import { calenderDate } from '@/util/helpers';

const COLUMNS = [
    {
        Header: 'index',
        accessor: 'index',
        Cell: (row) => {
            return <span>{parseInt(row?.cell?.row?.id) + 1}</span>;
        },
    },
    {
        Header: 'Discount %',
        accessor: 'discount',
        Cell: (row) => {
            return <span>{row?.cell?.value} %</span>;
        },
    },
    {
        Header: 'Offer End Date',
        accessor: 'endDate',
        Cell: (row) => {
            return <span>{calenderDate(row?.cell?.value)}</span>;
        },
    },

    {
        Header: 'Voucher Code',
        accessor: 'voucherCode',
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },
    {
        Header: 'Store Name',
        accessor: 'storeName',
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },
];

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

const VoucherDataTable = () => {
    const { data: vouchers, isLoading: loadingVouchers } = useGetVouchersQuery();
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => vouchers ?? [], [vouchers]);

    if (loadingVouchers) return <Loading />;

    return <DataGrid columns={columns} data={data} />;
};

export default VoucherDataTable;
