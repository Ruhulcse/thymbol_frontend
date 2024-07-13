import { useMemo } from 'react';
// import { advancedTable } from '../../../constant/table-data';
// import Loading from '@/components/Loading';
import DataGrid from '@/components/shared/dataGrid/DataGrid';
// import { useGetVouchersQuery } from '@/store/api/vouchers/vouchersApiSlice';
import Tooltip from '@/components/ui/Tooltip';
import {
    useDeletePushNotifiationMutation,
    useGetPushNotificationsQuery,
} from '@/store/api/pushNotifications/pushNotificationsApiSlice';
import { dateTime, swalConfirm, swalSuccess } from '@/util/helpers';
import Loading from '@/components/Loading';
import { Icon } from '@iconify/react';

const PushNotificationDataTable = () => {
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
                                    handleDeletePushNotification({
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

    const [
        deletePushNotifiation,
        { isLoading: loadingPushNotifications, isError, error },
    ] = useDeletePushNotifiationMutation();

    const { data: pushNotifications, isLoading } = useGetPushNotificationsQuery();
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => pushNotifications ?? [], [pushNotifications]);

    const handleDeletePushNotification = ({ id }) => {
        swalConfirm('Are you sure you want to delete this Push Notification?').then(
            async (result) => {
                if (result.isConfirmed) {
                    const { data } = await deletePushNotifiation({ id });

                    swalSuccess(data?.message, 'Success!');
                }
            }
        );
    };

    if (isLoading) return <Loading />;

    return <DataGrid columns={columns} data={data} />;
};

export default PushNotificationDataTable;
