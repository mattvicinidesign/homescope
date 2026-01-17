import StatusPill from './StatusPill';
import type { StatusPillStatus } from '@/types/ui';

export interface DealSummaryCardProps {
  companyName: string;
  seriesLabel: string;
  statuses: StatusPillStatus[];
}

export default function DealSummaryCard({
  companyName,
  seriesLabel,
  statuses,
}: DealSummaryCardProps) {
  return (
    <section
      className="flex flex-col gap-2 rounded-md border border-border bg-surface px-container-x py-container-y"
      aria-label="Deal summary"
    >
      <header>
        <p className="text-base font-semibold text-text">
          {companyName}
        </p>
        <p className="text-sm text-muted">
          {seriesLabel}
        </p>
      </header>

      {statuses.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {statuses.map(status => (
            <StatusPill key={status} status={status} />
          ))}
        </div>
      )}
    </section>
  );
}
