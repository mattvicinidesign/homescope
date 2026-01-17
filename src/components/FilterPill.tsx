export interface FilterPillProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function FilterPill({ label, isSelected, onClick }: FilterPillProps) {
  const baseClasses = 'inline-flex items-center py-pill-py px-4 rounded-pill border cursor-pointer transition-all duration-200 text-sm font-medium whitespace-nowrap hover:opacity-80 m-0';
  const selectedClasses = 'bg-primary border-primary text-surface';
  const unselectedClasses = 'bg-surface border-border text-text';
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      {label}
    </button>
  );
}
