import type { SelectOption } from '@/types/ui';

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  label?: string;
}

// TODO: Extract dropdown arrow to token or icon component
const dropdownArrow = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2364748b' d='M6 9L1 4h10z'/%3E%3C/svg%3E\")";

export default function Select({ value, onChange, options, label }: SelectProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-text m-0">
          {label}
        </label>
      )}
      <select
        className="font-sans text-base font-normal text-text bg-surface border border-border rounded-md py-3 px-4 cursor-pointer transition-all duration-200 hover:border-primary focus:outline-none focus:border-primary appearance-none bg-no-repeat bg-[right_0.75rem_center] pr-[calc(1rem+1.5rem)]"
        style={{ backgroundImage: dropdownArrow }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
