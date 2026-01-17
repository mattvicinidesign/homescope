// UI component types
export type StatusPillStatus = 'Ready' | 'Verified' | 'Pending';
export type SeverityType = 'Safety' | 'Repair' | 'Monitor' | 'Info';
export type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

export interface SelectOption {
  value: string;
  label: string;
}

export interface Tab {
  id: string;
  label: string;
}

export type Column<T> = {
  id: string;
  label: string;
  render: (row: T) => React.ReactNode;
};
