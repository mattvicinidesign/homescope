import type { Issue } from '@/types/issue';
import type { SeverityType } from '@/types/ui';

/**
 * Filter issues by severity
 */
export function filterIssuesBySeverity(
  issues: ReadonlyArray<Issue>,
  severity: SeverityType | 'All'
): Issue[] {
  if (severity === 'All') {
    return [...issues];
  }
  return issues.filter((issue) => issue.severity === severity);
}
