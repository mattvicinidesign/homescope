import { useState, useEffect } from 'react';
import SeverityBadge from '../components/SeverityBadge';
import type { SeverityType } from '../components/SeverityBadge';
import '../styles.css';

type Page = 'landing' | 'playground' | 'summary';

interface InspectionSummaryPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

interface IssueCardProps {
  title: string;
  description: string;
  severity: SeverityType;
}

function IssueCard({ title, description, severity }: IssueCardProps) {
  return (
    <div className="issue-card">
      <div className="issue-card__badge">
        <SeverityBadge severity={severity} />
      </div>
      <h3 className="issue-card__title">{title}</h3>
      <p className="issue-card__description">{description}</p>
    </div>
  );
}

export default function InspectionSummaryPage({ currentPage, onNavigate }: InspectionSummaryPageProps) {
  const [isDark, setIsDark] = useState(false);
  // Placeholder: Set to false to show empty state, true to show inspection data
  const hasInspectionData = false;

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(prefersDark);
  }, []);

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

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleUploadClick = () => {
    // Placeholder: Future upload functionality
    console.log('Upload inspection report');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-container-x py-container-y border-b border-border flex justify-between items-center">
        <nav className="flex gap-layout items-center">
          <button
            onClick={() => onNavigate('playground')}
            className={`font-sans text-base font-medium cursor-pointer transition-opacity hover:opacity-70 ${
              currentPage === 'playground' ? 'text-text' : 'text-muted'
            }`}
          >
            HomeScope Playground
          </button>
          <span className="text-muted">|</span>
          <button
            onClick={() => onNavigate('summary')}
            className={`font-sans text-base font-medium cursor-pointer transition-opacity hover:opacity-70 ${
              currentPage === 'summary' ? 'text-text' : 'text-muted'
            }`}
          >
            Inspection Summary
          </button>
        </nav>
        <button
          className="font-sans text-xl bg-transparent border-0 cursor-pointer p-2 leading-none transition-opacity hover:opacity-70"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col gap-12">
        <section>
          <h1 className="font-sans text-2xl font-semibold text-text mb-4">Inspection Summary</h1>
          <p className="font-sans text-base font-normal text-muted">
            A structured overview of issues found during the home inspection, organized by severity.
          </p>
        </section>

        {hasInspectionData ? (
          <>
            {/* Safety Section */}
            <section>
              <h2 className="font-sans text-xl font-semibold text-text mb-4">Safety</h2>
              <div className="grid grid-auto-fit-cards gap-layout">
                <IssueCard
                  title="Electrical Panel Hazards"
                  description="Exposed wiring and outdated circuit breakers present fire and shock risks. Immediate professional evaluation recommended."
                  severity="Safety"
                />
                <IssueCard
                  title="Carbon Monoxide Detector Missing"
                  description="No carbon monoxide detectors found in the home. Installation required for safety compliance."
                  severity="Safety"
                />
              </div>
            </section>

            {/* Repair Section */}
            <section>
              <h2 className="font-sans text-xl font-semibold text-text mb-4">Repair</h2>
              <div className="grid grid-auto-fit-cards gap-layout">
                <IssueCard
                  title="Roof Shingle Damage"
                  description="Multiple missing and damaged shingles observed. Repairs needed to prevent water intrusion and further deterioration."
                  severity="Repair"
                />
              </div>
            </section>

            {/* Monitor Section */}
            <section>
              <h2 className="font-sans text-xl font-semibold text-text mb-4">Monitor</h2>
              <div className="grid grid-auto-fit-cards gap-layout">
                <IssueCard
                  title="Minor Foundation Cracks"
                  description="Small hairline cracks in foundation walls. No immediate action required, but should be monitored for expansion."
                  severity="Monitor"
                />
                <IssueCard
                  title="Aging Water Heater"
                  description="Water heater is approaching typical end-of-life. Monitor for signs of failure and plan for replacement within 2-3 years."
                  severity="Monitor"
                />
              </div>
            </section>

            {/* Info Section */}
            <section>
              <h2 className="font-sans text-xl font-semibold text-text mb-4">Info</h2>
              <div className="grid grid-auto-fit-cards gap-layout">
                <IssueCard
                  title="HVAC System Age"
                  description="Central air conditioning system is 8 years old and functioning normally. Regular maintenance recommended."
                  severity="Info"
                />
              </div>
            </section>
          </>
        ) : (
          <section className="flex flex-col items-center justify-center py-section-lg text-center max-w-lg mx-auto">
            <h2 className="font-sans text-xl font-semibold text-text mb-4">No inspection data yet</h2>
            <p className="font-sans text-base font-normal text-muted mb-6">
              Upload a home inspection report to see a structured summary of issues and severity.
            </p>
            <button
              onClick={handleUploadClick}
              className="font-sans text-base font-medium px-6 py-3 bg-button-primary-bg text-surface border-0 rounded-md cursor-pointer transition-opacity hover:opacity-90"
            >
              Upload Inspection Report
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
