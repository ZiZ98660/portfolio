'use client';

import { Modal } from './Modal';
import { FormInput } from './FormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface FormField {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  options?: { value: string; label: string }[];
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fields: FormField[];
  formData: Record<string, any>;
  onFormDataChange: (name: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

export function FormModal({
  isOpen,
  onClose,
  title,
  fields,
  formData,
  onFormDataChange,
  onSubmit,
  isSubmitting = false,
  submitLabel = 'Save',
}: FormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={onSubmit} className="space-y-3 md:space-y-4">
        {fields.map((field) => (
          <FormInput
            key={field.name}
            label={field.label}
            type={field.type || 'text'}
            value={formData[field.name] ?? ''}
            onChange={(value) => onFormDataChange(field.name, value)}
            placeholder={field.placeholder}
            required={field.required}
            min={field.min}
            options={field.options}
          />
        ))}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
          <button
            type="submit"
            className="font-button flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                Saving...
              </>
            ) : (
              submitLabel
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-all text-sm md:text-base"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

