import type { SeverityType } from './ui';

export interface Issue {
  id: string;
  title: string;
  severity: SeverityType;
  description: string;
  details: {
    whatThisMeans: string;
    whyItMatters: string[];
    recommendation: string;
    location?: string;
  };
}
