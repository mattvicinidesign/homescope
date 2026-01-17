import type { Column } from '@/types/ui';

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
      <div className="border border-border rounded-md py-section-lg text-center bg-surface">
        <p className="text-base font-normal text-muted m-0 mb-4">
          {emptyMessage || 'No data available'}
        </p>
        {emptyActionLabel && onEmptyAction && (
          <button
            onClick={onEmptyAction}
            className="text-base font-medium text-surface bg-button-primary-bg border-0 rounded-md py-3 px-6 cursor-pointer transition-opacity duration-200 hover:opacity-90"
          >
            {emptyActionLabel}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="border border-border rounded-md overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-surface border-b border-border">
            <tr>
              {columns.map((column) => (
                <th key={column.id} className="text-sm font-semibold text-text text-left py-container-y px-container-x">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-background">
            {data.map((row) => (
              <tr
                key={row.id}
                className={`border-b border-border transition-colors duration-200 last:border-b-0 hover:bg-surface ${onRowClick ? 'cursor-pointer' : ''}`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={column.id} className="text-base font-normal text-text py-container-y px-container-x">
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
