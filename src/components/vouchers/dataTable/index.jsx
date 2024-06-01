import React, { useState, useMemo } from 'react';
// import { advancedTable } from '../../../constant/table-data';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Dropdown from '@/components/ui/Dropdown';
import { Menu } from '@headlessui/react';
import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from 'react-table';

const COLUMNS = [
    {
        Header: 'index',
        accessor: 'index',
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
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
        accessor: 'offer_end_date',
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },
   
    {
        Header: 'Voucher Code',
        accessor: 'voucher_code',
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },
    {
        Header: 'Store Name',
        accessor: 'store_name',
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },
];


const advancedTable = [
    {
        index: 1,
        discount: 10,
        offer_end_date: '2022-01-01',
        voucher_code: 'code-1',
        store_name: 'store-1',
    },
    {
        index: 2,
        discount: 20,
        offer_end_date: '2022-01-01',
        voucher_code: 'code-2',
        store_name: 'store-2',
    },
    {
        index: 3,
        discount: 30,
        offer_end_date: '2022-01-01',
        voucher_code: 'code-3',
        store_name: 'store-3',
    },
    {
        index: 4,
        discount: 40,
        offer_end_date: '2022-01-01',
        voucher_code: 'code-4',
        store_name: 'store-4',
    },
    {
        index: 5,
        discount: 50,
        offer_end_date: '2022-01-01',
        voucher_code: 'code-5',
        store_name: 'store-5',
    },
    {
        index: 6,
        discount: 60,
        offer_end_date: '2022-01-01',
        voucher_code: 'code-6',
        store_name: 'store-6',
    },
    {
        index: 7,
        discount: 70,
        offer_end_date: '2022-01-01',
        voucher_code: 'code-7',
        store_name: 'store-7',
    },
]

const actions = [
    {
        name: 'view',
        icon: 'heroicons-outline:eye',
    },
    {
        name: 'edit',
        icon: 'heroicons:pencil-square',
    },
    {
        name: 'delete',
        icon: 'heroicons-outline:trash',
    },
];

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input
                    type="checkbox"
                    ref={resolvedRef}
                    {...rest}
                    className="table-checkbox"
                />
            </>
        );
    }
);

const VoucherDataTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => advancedTable, []);

    const tableInstance = useTable(
        {
            columns,
            data,
        },

        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,

        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                // {
                //     id: 'selection',
                //     Header: ({ getToggleAllRowsSelectedProps }) => (
                //         <div>
                //             <IndeterminateCheckbox
                //                 {...getToggleAllRowsSelectedProps()}
                //             />
                //         </div>
                //     ),
                //     Cell: ({ row }) => (
                //         <div>
                //             <IndeterminateCheckbox
                //                 {...row.getToggleRowSelectedProps()}
                //             />
                //         </div>
                //     ),
                // },
                ...columns,
            ]);
        }
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        setGlobalFilter,
        prepareRow,
    } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;
    return (
        <>
            <div noborder className='bg-transparent mx-5'>
                {/* <div className="md:flex justify-between items-center mb-6">
                    <h4 className="card-title">Advanced Table</h4>
                    <div>
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                    </div>
                </div> */}
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table
                                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                                {...getTableProps}
                            >
                                <thead className=" border-t border-slate-100 dark:border-slate-800">
                                    {headerGroups.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers.map(
                                                (column) => (
                                                    <th
                                                        {...column.getHeaderProps(
                                                            column.getSortByToggleProps()
                                                        )}
                                                        scope="col"
                                                        className=" table-th"
                                                    >
                                                        {column.render(
                                                            'Header'
                                                        )}
                                                        <span>
                                                            {column.isSorted
                                                                ? column.isSortedDesc
                                                                    ? ' 🔽'
                                                                    : ' 🔼'
                                                                : ''}
                                                        </span>
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                                    {...getTableBodyProps}
                                >
                                    {page.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr {...row.getRowProps()}>
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td
                                                            {...cell.getCellProps()}
                                                            className="table-td"
                                                        >
                                                            {cell.render(
                                                                'Cell'
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <span className=" flex space-x-2  rtl:space-x-reverse items-center">
                            <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                                Go
                            </span>
                            <span>
                                <input
                                    type="number"
                                    className=" form-control py-2"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const pageNumber = e.target.value
                                            ? Number(e.target.value) - 1
                                            : 0;
                                        gotoPage(pageNumber);
                                    }}
                                    style={{ width: '50px' }}
                                />
                            </span>
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Page{' '}
                            <span>
                                {pageIndex + 1} of {pageOptions.length}
                            </span>
                        </span>
                    </div>
                    <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${
                                    !canPreviousPage
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <Icon icon="heroicons-outline:chevron-left" />
                            </button>
                        </li>
                        {pageOptions.map((page, pageIdx) => (
                            <li key={pageIdx}>
                                <button
                                    href="#"
                                    aria-current="page"
                                    className={` ${
                                        pageIdx === pageIndex
                                            ? 'bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium '
                                            : 'bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  '
                                    }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                    onClick={() => gotoPage(pageIdx)}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${
                                    !canNextPage
                                        ? 'opacity-50 cursor-not-allowed'
                                        : ''
                                }`}
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                <Icon icon="heroicons-outline:chevron-right" />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default VoucherDataTable;
