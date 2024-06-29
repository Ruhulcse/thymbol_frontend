
import { useMemo } from 'react';
// import { advancedTable } from '../../../constant/table-data';
// import Loading from '@/components/Loading';
import DataGrid from '@/components/shared/dataGrid/DataGrid';
// import { useGetVouchersQuery } from '@/store/api/vouchers/vouchersApiSlice';
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
        Header: 'title',
        accessor: 'title',
        Cell: (row) => {
            return <span>{row?.cell?.value} %</span>;
        },
    },
    {
        Header: 'Message',
        accessor: 'message',
        Cell: (row) => {
            return <span>{(row?.cell?.value)}</span>;
        },
    },

    {
        Header: 'Creation Date & Time',
        accessor: 'createAt',
        Cell: (row) => {
            return <span>{calenderDate(row?.cell?.value)}</span>;
        },
    },
   
];


const PushNotificationDataTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    // const data = useMemo(() => vouchers ?? [], [vouchers]);

    // if (loadingVouchers) return <Loading />;

    return <DataGrid columns={columns} data={[]} />;
};

export default PushNotificationDataTable;
