import type { SeverityType } from '@/types/ui';

export interface SeverityBadgeProps {
  severity: SeverityType;
}

const severityColorMap: Record<SeverityType, string> = {
  Safety: 'bg-status-ready',
  Repair: 'bg-status-pending',
  Monitor: 'bg-status-pending opacity-80',
  Info: 'bg-primary',
};

export default function SeverityBadge({ severity }: SeverityBadgeProps) {
  return (
    <div className={`flex items-center overflow-hidden rounded-pill py-pill-py px-pill-px ${severityColorMap[severity]}`}>
      <p className="text-sm font-medium text-surface m-0 whitespace-nowrap">{severity}</p>
    </div>
  );
}
