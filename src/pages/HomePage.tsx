import { useMemo } from 'react';
import KpiTile from '@/components/KpiTile';
import { homeMocks } from '@/lib/mocks/homeMocks';
import { calculateHomeKpis } from '@/lib/kpis/calculateHomeKpis';
import type { Page } from '@/types/ui';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const { properties, issues, recentReports } = homeMocks;

  const kpis = useMemo(
    () => calculateHomeKpis(properties, issues),
    [properties, issues]
  );

  if (properties.length === 0) {
    return (
      <main className="max-w-container mx-auto px-container-x py-section-lg">
        <h1 className="text-2xl font-semibold text-text mb-2">Home</h1>
        <p className="text-muted mb-6">No properties yet.</p>
        <button
          onClick={() => onNavigate('upload')}
          className="px-6 py-3 bg-button-primary-bg text-surface rounded-md hover:opacity-90"
        >
          Upload your first report
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col gap-12">
      <section>
        <h1 className="text-2xl font-semibold text-text mb-2">Home</h1>
        <p className="text-muted">
          Overview of all reports added to HomeScope.
        </p>
      </section>

      <section className="grid grid-auto-fit-cards gap-layout">
        <KpiTile label="Total Properties" value={kpis.totalProperties} />
        <KpiTile label="Total Open Issues" value={kpis.totalOpenIssues} />
        <KpiTile label="High-Severity Issues" value={kpis.highSeverityIssues} />
        <KpiTile label="Avg Issues per Property" value={kpis.avgIssuesPerProperty} />
        <KpiTile
          label="Properties with Active Inspections"
          value={kpis.propertiesWithActiveInspections}
        />
        <KpiTile
          label="New Properties (Last 30 Days)"
          value={kpis.newPropertiesLast30Days}
        />
      </section>

      <section>
        <h2 className="text-xl font-semibold text-text mb-4">
          Recent Reports
        </h2>

        <ul className="flex flex-col gap-3 mb-6">
          {recentReports.map(report => (
            <li key={report.id}>
              <button
                type="button"
                onClick={() => onNavigate('summary')}
                className="w-full text-left border border-border rounded-md px-container-x py-container-y bg-surface hover:opacity-80 transition-opacity"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-text mb-1">
                      {report.address}
                    </p>
                    <p className="text-sm text-muted">
                      Uploaded {report.date}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-muted">
                    {report.status}
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onNavigate('upload')}
          className="px-6 py-3 bg-button-primary-bg text-surface rounded-md hover:opacity-90"
        >
          Upload a report
        </button>
      </section>
    </main>
  );
}
