'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

interface DataListProps<T> {
  items: T[];
  onEdit: (item: T) => void;
  onDelete: (id: number) => void;
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
  gridCols?: string;
}

export function DataList<T extends { id?: number }>({
  items,
  onEdit,
  onDelete,
  renderItem,
  emptyMessage = 'No items found',
  gridCols = 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}: DataListProps<T>) {
  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols} gap-3 md:gap-4`}>
      {items.map((item) => (
        <div
          key={item.id}
          className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 md:p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-700"
        >
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0">{renderItem(item)}</div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(item)}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1"
                title="Edit"
              >
                <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
              </button>
              <button
                onClick={() => item.id && onDelete(item.id)}
                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1"
                title="Delete"
              >
                <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

