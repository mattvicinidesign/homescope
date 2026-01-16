import { ReactNode } from 'react';
import '../styles.css';

export type Column<T> = {
  id: string;
  label: string;
  render: (row: T) => ReactNode;
};

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
}

export default function DataTable<T extends { id: string }>({
  columns,
  data,
  onRowClick,
  emptyMessage,
  emptyActionLabel,
  onEmptyAction,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="data-table-empty">
        <p className="data-table-empty__message">{emptyMessage || 'No data available'}</p>
        {emptyActionLabel && onEmptyAction && (
          <button
            onClick={onEmptyAction}
            className="data-table-empty__action"
          >
            {emptyActionLabel}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="data-table">
      <div className="data-table__container">
        <table className="data-table__table">
          <thead className="data-table__thead">
            <tr>
              {columns.map((column) => (
                <th key={column.id} className="data-table__th">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="data-table__tbody">
            {data.map((row) => (
              <tr
                key={row.id}
                className={`data-table__tr ${onRowClick ? 'data-table__tr--clickable' : ''}`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={column.id} className="data-table__td">
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
