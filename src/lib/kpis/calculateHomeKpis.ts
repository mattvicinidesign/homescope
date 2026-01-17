import type { Property } from '@/types/property';
import type { Issue } from '@/types/issue';

export interface HomeKpis {
    totalProperties: number;
    totalOpenIssues: number;
    highSeverityIssues: number;
    avgIssuesPerProperty: string;
    propertiesWithActiveInspections: number;
    newPropertiesLast30Days: number;
  }
  

export function calculateHomeKpis(
  properties: ReadonlyArray<Property>,
  issues: ReadonlyArray<Issue>
): HomeKpis {
  const totalProperties = properties.length;
  const totalOpenIssues = issues.length;

  const highSeverityIssues = issues.filter(
    issue => issue.severity === 'Safety' || issue.severity === 'Repair'
  ).length;

  const avgIssuesPerProperty =
    totalProperties > 0
      ? (totalOpenIssues / totalProperties).toFixed(1)
      : '0.0';

  const propertiesWithActiveInspections = properties.filter(
    property => (property.inspectionCount ?? 0) > 0
  ).length;

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const newPropertiesLast30Days = properties.filter(property => {
    if (!property.createdAt) return false;
    return new Date(property.createdAt) >= thirtyDaysAgo;
  }).length;

  return {
    totalProperties,
    totalOpenIssues,
    highSeverityIssues,
    avgIssuesPerProperty,
    propertiesWithActiveInspections,
    newPropertiesLast30Days,
  };
}
