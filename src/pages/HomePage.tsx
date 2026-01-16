import { useState, useEffect, useMemo } from 'react';
import KpiTile from '../components/KpiTile';
import UserMenu from '../components/UserMenu';
import type { Property } from '../types/property';
import type { Issue } from '../types/issue';
import '../styles.css';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface HomePageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function HomePage({ currentPage, onNavigate }: HomePageProps) {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Placeholder property data - in production this would come from API
  const properties: Property[] = [
    {
      id: '1',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      inspectionCount: 2,
      lastInspectionDate: '2024-01-15',
      createdAt: '2023-12-01',
    },
    {
      id: '2',
      address: '456 Oak Ave',
      city: 'Somewhere',
      state: 'NY',
      zipCode: '67890',
      inspectionCount: 1,
      lastInspectionDate: '2024-01-10',
      createdAt: '2024-01-05',
    },
    {
      id: '3',
      address: '789 Pine Rd',
      city: 'Elsewhere',
      state: 'TX',
      zipCode: '54321',
      inspectionCount: 0,
      createdAt: '2023-11-15',
    },
  ];

  // Placeholder issue data - in production this would come from API
  const allIssues: Issue[] = [
    {
      id: '1',
      title: 'Electrical Panel Hazards',
      severity: 'Safety',
      description: 'Exposed wiring and outdated circuit breakers present fire and shock risks.',
      details: {
        whatThisMeans: 'The electrical panel contains exposed wiring.',
        whyItMatters: ['Exposed wiring increases risk'],
        recommendation: 'Contact a licensed electrician.',
        location: 'Basement / Electrical panel'
      }
    },
    {
      id: '2',
      title: 'Carbon Monoxide Detector Missing',
      severity: 'Safety',
      description: 'No carbon monoxide detectors found in the home.',
      details: {
        whatThisMeans: 'The home does not have carbon monoxide detectors.',
        whyItMatters: ['Carbon monoxide can be fatal'],
        recommendation: 'Install carbon monoxide detectors.',
        location: 'Throughout home'
      }
    },
    {
      id: '3',
      title: 'Roof Shingle Damage',
      severity: 'Repair',
      description: 'Multiple shingles are missing or damaged.',
      details: {
        whatThisMeans: 'The roof has visible damage.',
        whyItMatters: ['Water infiltration can cause damage'],
        recommendation: 'Have a roofing contractor inspect.',
        location: 'Roof'
      }
    },
    {
      id: '4',
      title: 'Minor Foundation Cracks',
      severity: 'Monitor',
      description: 'Small hairline cracks in foundation walls.',
      details: {
        whatThisMeans: 'Small cracks observed.',
        whyItMatters: ['Cracks can allow moisture'],
        recommendation: 'Monitor the cracks over time.',
        location: 'Foundation walls'
      }
    },
    {
      id: '5',
      title: 'Aging Water Heater',
      severity: 'Monitor',
      description: 'Water heater is approaching typical end-of-life.',
      details: {
        whatThisMeans: 'The water heater is old.',
        whyItMatters: ['Older heaters are more prone to failure'],
        recommendation: 'Plan for replacement.',
        location: 'Basement / Utility area'
      }
    },
    {
      id: '6',
      title: 'HVAC System Age',
      severity: 'Info',
      description: 'Central air conditioning system is 8 years old.',
      details: {
        whatThisMeans: 'The HVAC system is functioning normally.',
        whyItMatters: ['Regular maintenance extends life'],
        recommendation: 'Schedule annual maintenance.',
        location: 'HVAC system'
      }
    },
  ];

  // Calculate KPIs
  const kpis = useMemo(() => {
    const totalProperties = properties.length;
    
    const totalOpenIssues = allIssues.length;
    
    const highSeverityIssues = allIssues.filter(
      issue => issue.severity === 'Safety' || issue.severity === 'Repair'
    ).length;
    
    const avgIssuesPerProperty = totalProperties > 0
      ? (totalOpenIssues / totalProperties).toFixed(1)
      : '0.0';
    
    const propertiesWithActiveInspections = properties.filter(
      p => (p.inspectionCount !== undefined && p.inspectionCount > 0) || allIssues.some(i => i.id)
    ).length;
    
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const newPropertiesLast30Days = properties.filter(p => {
      if (!p.createdAt) return false;
      const createdAt = new Date(p.createdAt);
      return createdAt >= thirtyDaysAgo;
    }).length;

    return {
      totalProperties,
      totalOpenIssues,
      highSeverityIssues,
      avgIssuesPerProperty,
      propertiesWithActiveInspections,
      newPropertiesLast30Days,
    };
  }, [properties, allIssues]);

  const recentReports = [
    { id: '1', address: '123 Main St, Anytown, ST', date: '2024-01-15', status: 'Processed' },
    { id: '2', address: '456 Oak Ave, Somewhere, ST', date: '2024-01-10', status: 'Processed' },
    { id: '3', address: '789 Pine Rd, Elsewhere, ST', date: '2024-01-05', status: 'Processed' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-container-x py-container-y border-b border-border flex justify-between items-center">
        <div></div>
        <div className="flex items-center gap-layout">
          <UserMenu onNavigate={onNavigate} isDark={isDark} onThemeChange={setIsDark} />
        </div>
      </header>

      <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col gap-12">
        <section>
          <h1 className="font-sans text-2xl font-semibold text-text mb-4">Home</h1>
          <p className="font-sans text-base font-normal text-muted">
            Overview of all reports added to HomeScope.
          </p>
        </section>

        {/* KPI Tiles */}
        <section>
          <div className="grid grid-auto-fit-cards gap-layout">
            <KpiTile
              label="Total Properties"
              value={kpis.totalProperties}
            />
            <KpiTile
              label="Total Open Issues"
              value={kpis.totalOpenIssues}
            />
            <KpiTile
              label="High-Severity Issues"
              value={kpis.highSeverityIssues}
            />
            <KpiTile
              label="Avg Issues per Property"
              value={kpis.avgIssuesPerProperty}
            />
            <KpiTile
              label="Properties with Active Inspections"
              value={kpis.propertiesWithActiveInspections}
            />
            <KpiTile
              label="New Properties (Last 30 Days)"
              value={kpis.newPropertiesLast30Days}
            />
          </div>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Recent Reports</h2>
          <div className="flex flex-col gap-3 mb-6">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="border border-border rounded-md px-container-x py-container-y bg-surface cursor-pointer transition-opacity hover:opacity-80"
                onClick={() => onNavigate('summary')}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-sans text-base font-semibold text-text mb-1">{report.address}</p>
                    <p className="font-sans text-sm font-normal text-muted">Uploaded {report.date}</p>
                  </div>
                  <span className="font-sans text-sm font-medium text-muted">{report.status}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate('upload')}
            className="font-sans text-base font-medium px-6 py-3 bg-button-primary-bg text-surface border-0 rounded-md cursor-pointer transition-opacity hover:opacity-90"
          >
            Upload a report
          </button>
        </section>
      </main>
    </div>
  );
}
