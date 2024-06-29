import Icon from '@/components/ui/Icon';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import {
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useSortBy,
    useTable,
} from 'react-table';
import GlobalFilter from './GlobalFilter';

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={resolvedRef}
            {...rest}
            className="table-checkbox"
        />
    );
});

const DataGrid = ({ columns, data, isSearchable }) => {
    const memoizedColumns = useMemo(() => columns, [columns]);
    const memoizedData = useMemo(() => data, [data]);

    const tableInstance = useTable(
        {
            columns: memoizedColumns,
            data: memoizedData,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [...columns]);
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
            {isSearchable && (
                <div className="md:flex justify-start mb-6">
                    <div>
                        <GlobalFilter
                            filter={globalFilter}
                            setFilter={setGlobalFilter}
                        />
                    </div>
                </div>
            )}
            <div className="bg-transparent mx-5">
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table
                                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                                {...getTableProps()}
                            >
                                <thead className="border-t border-slate-100 dark:border-slate-800">
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
                                                        className="table-th"
                                                    >
                                                        <div className="flex items-center">
                                                            {column.render(
                                                                'Header'
                                                            )}
                                                            <div>
                                                                {column.isSorted ? (
                                                                    column.isSortedDesc ? (
                                                                        <div
                                                                            className={
                                                                                'ms-2'
                                                                            }
                                                                        >
                                                                            <Icon icon="heroicons:arrow-down" />
                                                                        </div>
                                                                    ) : (
                                                                        <div
                                                                            className={
                                                                                'ms-2'
                                                                            }
                                                                        >
                                                                            <Icon icon="heroicons:arrow-up" />
                                                                        </div>
                                                                    )
                                                                ) : (
                                                                    ''
                                                                )}
                                                            </div>
                                                        </div>
                                                    </th>
                                                )
                                            )}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                                    {...getTableBodyProps()}
                                >
                                    {page.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr
                                                {...row.getRowProps()}
                                                style={{
                                                    borderCollapse: 'collapse',
                                                    borderBottom:
                                                        '10px solid #F1F5F9',
                                                }}
                                            >
                                                {row.cells.map((cell) => (
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="table-td"
                                                        style={{
                                                            paddingTop:
                                                                '0.75rem',
                                                            paddingBottom:
                                                                '0.75rem',
                                                        }}
                                                    >
                                                        {cell.render('Cell')}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="flex space-x-2 rtl:space-x-reverse items-center">
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Go
                        </span>
                        <span>
                            <input
                                type="number"
                                className="form-control py-2"
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
                        Page {pageIndex + 1} of {pageOptions.length}
                    </span>
                </div>
                <ul className="flex items-center space-x-3 rtl:space-x-reverse">
                    <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                        <button
                            className={`${
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
                                className={`${
                                    pageIdx === pageIndex
                                        ? 'bg-slate-900 dark:bg-slate-600 dark:text-slate-200 text-white font-medium'
                                        : 'bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900 font-normal'
                                } text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                onClick={() => gotoPage(pageIdx)}
                            >
                                {page + 1}
                            </button>
                        </li>
                    ))}

                    <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                        <button
                            className={`${
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
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="form-control py-2 flex items-end"
                    >
                        {[10, 20, 50, 100].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                </ul>
            </div>
        </>
    );
};

export default DataGrid;
