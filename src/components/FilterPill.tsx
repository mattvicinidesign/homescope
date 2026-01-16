import '../styles.css';

export interface FilterPillProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function FilterPill({ label, isSelected, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`filter-pill ${isSelected ? 'filter-pill--selected' : 'filter-pill--unselected'}`}
    >
      <span className="filter-pill__text">{label}</span>
    </button>
  );
}
