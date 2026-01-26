'use client';

interface FormInputProps {
  label: string;
  type?: string;
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  options?: { value: string; label: string }[];
}

export function FormInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  min,
  options,
}: FormInputProps) {
  const inputClasses =
    'w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent';

  return (
    <div>
      <label className="font-body block text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
        {label}
      </label>
      {type === 'select' || options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClasses + ' text-sm md:text-base'}
          required={required}
        >
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(type === 'number' ? parseInt(e.target.value) || 0 : e.target.value)}
          className={inputClasses + ' text-sm md:text-base'}
          placeholder={placeholder}
          required={required}
          min={min}
        />
      )}
    </div>
  );
}

