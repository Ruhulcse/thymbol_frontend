import { useMemo } from 'react';
// import { advancedTable } from '../../../constant/table-data';
import Loading from '@/components/Loading';
import DataGrid from '@/components/shared/dataGrid/DataGrid';
import Tooltip from '@/components/ui/Tooltip';
import {
    useDeleteVoucherMutation,
    useGetVouchersQuery,
} from '@/store/api/vouchers/vouchersApiSlice';
import { calenderDate, swalConfirm, swalSuccess } from '@/util/helpers';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

const VoucherDataTable = () => {
    const {t} = useTranslation()
    const COLUMNS = [
        {
            Header: t('INDEX'),
            accessor: 'index',
            Cell: (row) => {
                return <span>{parseInt(row?.cell?.row?.id) + 1}</span>;
            },
        },
        {
            Header: t('DISCOUNT %'),
            accessor: 'discount',
            Cell: (row) => {
                return <span>{row?.cell?.value} %</span>;
            },
        },
        {
            Header: t('OFFER END DATE'),
            accessor: 'endDate',
            Cell: (row) => {
                return <span>{calenderDate(row?.cell?.value)}</span>;
            },
        },

        {
            Header: t('VOUCHER CODE'),
            accessor: 'voucherCode',
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: t('STORE NAME'),
            accessor: 'storeName',
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
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
                                    handleDeleteVoucher({
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

    const [deleteVoucher, { isLoading: loadingDeleteVoucher }] =
        useDeleteVoucherMutation();

    const { data: vouchers, isLoading: loadingVouchers } =
        useGetVouchersQuery();
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => vouchers ?? [], [vouchers]);

    const handleDeleteVoucher = ({ id }) => {
        swalConfirm('Are you sure you want to delete this Voucher?').then(
            async (result) => {
                if (result.isConfirmed) {
                    const { data } = await deleteVoucher({ id });

                    swalSuccess(data?.message, 'Success!');
                }
            }
        );
    };

    if (loadingVouchers) return <Loading />;

    return <DataGrid columns={columns} data={data} />;
};

export default VoucherDataTable;
