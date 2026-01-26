'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: IconDefinition;
  actionButton?: React.ReactNode;
}

export function PageHeader({ title, description, icon, actionButton }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 md:mb-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          {icon && <FontAwesomeIcon icon={icon} className="text-purple-600" />}
          {title}
        </h1>
        {description && (
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>
      {actionButton && <div className="flex-shrink-0">{actionButton}</div>}
    </div>
  );
}

