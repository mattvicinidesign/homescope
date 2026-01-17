import { useState, useMemo } from 'react';
import SeverityBadge from '../components/SeverityBadge';
import FilterPill from '../components/FilterPill';
import Select from '../components/Select';
import type { Issue } from '../types/issue';
import type { SeverityType, Page } from '@/types/ui';
import { getInspectionProcessed, setSelectedIssue } from '@/lib/storage/localStorage';
import { mockInspectionIssues } from '@/lib/mocks/issueMocks';
import { filterIssuesBySeverity } from '@/lib/issues/filterIssues';
import { sortIssues, type IssueSortOption } from '@/lib/issues/sortIssues';

interface InspectionSummaryPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

interface IssueCardProps {
  issue: Issue;
  onClick: () => void;
}

function IssueCard({ issue, onClick }: IssueCardProps) {
  return (
    <div 
      className="issue-card cursor-pointer transition-opacity hover:opacity-80"
      onClick={onClick}
    >
      <div className="issue-card__badge">
        <SeverityBadge severity={issue.severity} />
      </div>
      <h3 className="issue-card__title">{issue.title}</h3>
      <p className="issue-card__description">{issue.description}</p>
    </div>
  );
}

export default function InspectionSummaryPage({ onNavigate }: InspectionSummaryPageProps) {
  // Check if inspection has been processed (set by ProcessingInspectionPage)
  const hasInspectionData = getInspectionProcessed();
  // Filter state
  const [selectedFilter, setSelectedFilter] = useState<SeverityType | 'All'>('All');
  // Sort state
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical' | 'severity'>('recent');

  const handleUploadClick = () => {
    onNavigate('upload');
  };

  const handleIssueClick = (issue: Issue) => {
    // Store selected issue in storage
    setSelectedIssue(issue);
    onNavigate('issueDetails');
  };

  // Filter and sort issues
  const filteredAndSortedIssues = useMemo(() => {
    const filtered = filterIssuesBySeverity(mockInspectionIssues, selectedFilter);
    return sortIssues(filtered, sortBy);
  }, [selectedFilter, sortBy]);

  const severityTypes: (SeverityType | 'All')[] = ['All', 'Safety', 'Repair', 'Monitor', 'Info'];

  return (
    <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col gap-12">
        <section>
          <h1 className="font-sans text-2xl font-semibold text-text mb-4">Inspection Summary</h1>
          <p className="font-sans text-base font-normal text-muted">
            A structured overview of issues found during the home inspection.
          </p>
        </section>

        {hasInspectionData ? (
          <>
            {/* Filter and Sort Controls */}
            <section className="flex flex-col gap-layout">
              <div className="flex flex-wrap gap-layout items-center">
                <span className="font-sans text-base font-medium text-text">Filter by type:</span>
                {severityTypes.map((type) => (
                  <FilterPill
                    key={type}
                    label={type}
                    isSelected={selectedFilter === type}
                    onClick={() => setSelectedFilter(type)}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-layout items-center">
                <Select
                  label="Sort by"
                  value={sortBy}
                  onChange={(value) => setSortBy(value as IssueSortOption)}
                  options={[
                    { value: 'recent', label: 'Recently added' },
                    { value: 'alphabetical', label: 'Alphabetical (A–Z)' },
                    { value: 'severity', label: 'Severity (high → low)' },
                  ]}
                />
              </div>
            </section>

            {/* Issues List */}
            <section>
              <div className="flex flex-col gap-layout">
                {filteredAndSortedIssues.map((issue) => (
                  <IssueCard
                    key={issue.id}
                    issue={issue}
                    onClick={() => handleIssueClick(issue)}
                  />
                ))}
                {filteredAndSortedIssues.length === 0 && (
                  <div className="border border-border rounded-md px-container-x py-container-y bg-surface text-center">
                    <p className="font-sans text-base font-normal text-muted">
                      No issues found with the selected filter.
                    </p>
                  </div>
                )}
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
  );
}
