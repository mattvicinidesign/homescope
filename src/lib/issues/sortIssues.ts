import type { Issue } from '@/types/issue';
import type { SeverityType } from '@/types/ui';

export type IssueSortOption = 'recent' | 'alphabetical' | 'severity';

const SEVERITY_ORDER: SeverityType[] = ['Safety', 'Repair', 'Monitor', 'Info'];

/**
 * Sort issues by the specified option
 */
export function sortIssues(
  issues: Issue[],
  sortBy: IssueSortOption
): Issue[] {
  if (sortBy === 'recent') {
    // Maintain original order (no sorting)
    return issues;
  }

  if (sortBy === 'severity') {
    return [...issues].sort((a, b) => {
      const aIndex = SEVERITY_ORDER.indexOf(a.severity);
      const bIndex = SEVERITY_ORDER.indexOf(b.severity);
      return aIndex - bIndex;
    });
  }

  if (sortBy === 'alphabetical') {
    return [...issues].sort((a, b) => a.title.localeCompare(b.title));
  }

  return issues;
}
