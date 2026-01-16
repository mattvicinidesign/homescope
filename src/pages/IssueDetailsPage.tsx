import { useState, useEffect } from 'react';
import SeverityBadge from '../components/SeverityBadge';
import type { Issue } from '../types/issue';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface IssueDetailsPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function IssueDetailsPage({ currentPage, onNavigate }: IssueDetailsPageProps) {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);

  useEffect(() => {
    // Load selected issue from localStorage
    const savedIssue = localStorage.getItem('selectedIssue');
    if (savedIssue) {
      try {
        setSelectedIssue(JSON.parse(savedIssue));
      } catch (e) {
        console.error('Failed to parse selected issue', e);
      }
    }
  }, []);

  const handleBackToSummary = () => {
    onNavigate('summary');
  };

  if (!selectedIssue) {
    return (
      <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col items-center justify-center min-h-[60vh]">
          <section className="flex flex-col items-center text-center max-w-lg">
            <h1 className="font-sans text-2xl font-semibold text-text mb-4">No issue selected</h1>
            <p className="font-sans text-base font-normal text-muted mb-6">
              Please select an issue from the Inspection Summary to view details.
            </p>
            <button
              onClick={handleBackToSummary}
              className="font-sans text-base font-medium px-6 py-3 bg-button-primary-bg text-surface border-0 rounded-md cursor-pointer transition-opacity hover:opacity-90"
            >
              Back to Summary
            </button>
          </section>
      </main>
    );
  }

  return (
    <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col gap-12">
        <section>
          <button
            onClick={handleBackToSummary}
            className="font-sans text-base font-medium text-muted cursor-pointer transition-opacity hover:opacity-70 mb-6 inline-flex items-center gap-2"
          >
            ← Back to Summary
          </button>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="font-sans text-2xl font-semibold text-text">{selectedIssue.title}</h1>
            <SeverityBadge severity={selectedIssue.severity} />
          </div>
          <p className="font-sans text-base font-normal text-muted">{selectedIssue.description}</p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">What this means</h2>
          <p className="font-sans text-base font-normal text-text">{selectedIssue.details.whatThisMeans}</p>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Why it matters</h2>
          <ul className="flex flex-col gap-3">
            {selectedIssue.details.whyItMatters.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="font-sans text-base text-primary mt-1">•</span>
                <span className="font-sans text-base font-normal text-text">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Recommended next step</h2>
          <p className="font-sans text-base font-normal text-text">{selectedIssue.details.recommendation}</p>
        </section>

        {selectedIssue.details.location && (
          <section>
            <h2 className="font-sans text-xl font-semibold text-text mb-4">Where this was found</h2>
            <p className="font-sans text-base font-normal text-text">{selectedIssue.details.location}</p>
          </section>
        )}

        <section className="border-t border-border pt-6">
          <p className="font-sans text-sm font-normal text-muted">
            <strong>Note:</strong> This is not professional advice. Consult with qualified inspectors and contractors for specific guidance on your property.
          </p>
        </section>
    </main>
  );
}
