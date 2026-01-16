import '../styles.css';

export type SeverityType = 'Safety' | 'Repair' | 'Monitor' | 'Info';

export interface SeverityBadgeProps {
  severity: SeverityType;
}

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  return (
    <div className={`severity-badge severity-badge--${severity.toLowerCase()}`}>
      <p className="severity-badge__text">{severity}</p>
    </div>
  );
}
