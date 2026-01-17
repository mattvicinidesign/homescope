import type { StatusPillStatus } from '@/types/ui';

export interface StatusPillProps {
  status?: StatusPillStatus;
}

const statusColorMap: Record<StatusPillStatus, string> = {
  Ready: 'bg-status-ready',
  Verified: 'bg-status-verified',
  Pending: 'bg-status-pending',
};

export default function StatusPill({ status = 'Ready' }: StatusPillProps) {
  return (
    <div className={`flex items-center overflow-hidden rounded-pill py-pill-py px-pill-px ${statusColorMap[status]}`}>
      <p className="text-sm font-medium text-surface m-0 whitespace-nowrap">{status}</p>
    </div>
  );
}
