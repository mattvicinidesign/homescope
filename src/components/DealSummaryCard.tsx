import '../styles.css';
import StatusPill from './StatusPill';
import type { StatusPillStatus } from './StatusPill';

export interface DealSummaryCardProps {
  companyName?: string;
  series?: string;
  statuses?: StatusPillStatus[];
}

export default function DealSummaryCard({
  companyName = 'Acme Corp',
  series = 'Series B - Healthcare',
  statuses = ['Ready', 'Verified', 'Pending'],
}: DealSummaryCardProps) {
  return (
    <div className="deal-summary-card">
      <p className="deal-summary-card__company">{companyName}</p>
      <p className="deal-summary-card__series">{series}</p>
      <div className="deal-summary-card__pills">
        {statuses.map((status, index) => (
          <StatusPill key={index} status={status} />
        ))}
      </div>
    </div>
  );
}
