import { useMemo } from 'react';
// import { advancedTable } from '../../../constant/table-data';
// import Loading from '@/components/Loading';
import DataGrid from '@/components/shared/dataGrid/DataGrid';
// import { useGetVouchersQuery } from '@/store/api/vouchers/vouchersApiSlice';
import { useGetPushNotificationsQuery } from '@/store/api/pushNotifications/pushNotificationsApiSlice';
import { calenderDate, dateTime } from '@/util/helpers';

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
        accessor: 'description',
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },

    {
        Header: 'Creation Date & Time',
        accessor: 'createdAt',
        Cell: (row) => {
            return <span>{dateTime(row?.cell?.value)}</span>;
        },
    },
];

const PushNotificationDataTable = () => {
    const { data: pushNotifications } = useGetPushNotificationsQuery();
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => pushNotifications ?? [], [pushNotifications]);

    // if (loadingVouchers) return <Loading />;

    return <DataGrid columns={columns} data={data} />;
};

export default PushNotificationDataTable;
