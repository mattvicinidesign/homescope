import '../styles.css';

export type StatusPillStatus = 'Ready' | 'Verified' | 'Pending';

export interface StatusPillProps {
  status?: StatusPillStatus;
}

export default function StatusPill({ status = 'Ready' }: StatusPillProps) {
  return (
    <div className={`status-pill status-pill--${status.toLowerCase()}`}>
      <p className="status-pill__text">{status}</p>
    </div>
  );
}
