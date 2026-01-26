'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <FontAwesomeIcon icon={faSpinner} className="text-4xl text-purple-600 animate-spin" />
    </div>
  );
}

