import { useState, useMemo } from 'react';
import SeverityBadge from '../components/SeverityBadge';
import FilterPill from '../components/FilterPill';
import Select from '../components/Select';
import type { Issue } from '../types/issue';
import type { SeverityType } from '../components/SeverityBadge';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

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

export default function InspectionSummaryPage({ currentPage, onNavigate }: InspectionSummaryPageProps) {
  // Check if inspection has been processed (set by ProcessingInspectionPage)
  const hasInspectionData = localStorage.getItem('inspectionProcessed') === 'true';
  // Filter state
  const [selectedFilter, setSelectedFilter] = useState<SeverityType | 'All'>('All');
  // Sort state
  const [sortBy, setSortBy] = useState<'recent' | 'alphabetical' | 'severity'>('recent');

  const handleUploadClick = () => {
    onNavigate('upload');
  };

  const handleIssueClick = (issue: Issue) => {
    // Store selected issue in localStorage
    localStorage.setItem('selectedIssue', JSON.stringify(issue));
    onNavigate('issueDetails');
  };

  // Placeholder issue data
  const allIssues: Issue[] = [
    {
      id: '1',
      title: 'Electrical Panel Hazards',
      severity: 'Safety',
      description: 'Exposed wiring and outdated circuit breakers present fire and shock risks. Immediate professional evaluation recommended.',
      details: {
        whatThisMeans: 'The electrical panel contains exposed wiring and outdated circuit breakers that may not provide adequate protection against electrical overloads or short circuits.',
        whyItMatters: [
          'Exposed wiring increases the risk of electrical shock and fire hazards',
          'Outdated breakers may fail to trip during electrical faults, leading to potential fires',
          'This poses immediate safety risks to occupants and the property'
        ],
        recommendation: 'Contact a licensed electrician immediately for a comprehensive evaluation and necessary repairs. Do not attempt to use the panel until it has been inspected and deemed safe.',
        location: 'Basement / Electrical panel'
      }
    },
    {
      id: '2',
      title: 'Carbon Monoxide Detector Missing',
      severity: 'Safety',
      description: 'No carbon monoxide detectors found in the home. Installation required for safety compliance.',
      details: {
        whatThisMeans: 'The home does not have carbon monoxide detectors installed, which are required for safety and may be required by local building codes.',
        whyItMatters: [
          'Carbon monoxide is a colorless, odorless gas that can be fatal',
          'Gas appliances, furnaces, and fireplaces can produce carbon monoxide',
          'Without detectors, occupants may not be aware of dangerous levels'
        ],
        recommendation: 'Install carbon monoxide detectors on each level of the home, especially near bedrooms and gas-burning appliances. Test them monthly and replace batteries as needed.',
        location: 'Throughout home'
      }
    },
    {
      id: '3',
      title: 'Roof Shingle Damage',
      severity: 'Repair',
      description: 'Multiple missing and damaged shingles observed. Repairs needed to prevent water intrusion and further deterioration.',
      details: {
        whatThisMeans: 'Several roof shingles are missing or damaged, which compromises the roof\'s ability to protect the home from water damage.',
        whyItMatters: [
          'Water can penetrate through damaged areas, causing leaks and interior damage',
          'Unrepaired damage can lead to more extensive and costly repairs over time',
          'Moisture can promote mold growth and structural deterioration'
        ],
        recommendation: 'Have a qualified roofer inspect the entire roof and repair or replace damaged shingles. Consider a full roof inspection to identify any underlying issues.',
        location: 'Roof'
      }
    },
    {
      id: '4',
      title: 'Minor Foundation Cracks',
      severity: 'Monitor',
      description: 'Small hairline cracks in foundation walls. No immediate action required, but should be monitored for expansion.',
      details: {
        whatThisMeans: 'Small hairline cracks have been observed in the foundation walls. These are common and may be due to normal settling or minor shrinkage.',
        whyItMatters: [
          'Cracks can allow moisture to enter the foundation',
          'If cracks expand, they may indicate more serious structural issues',
          'Early monitoring helps catch problems before they become costly'
        ],
        recommendation: 'Monitor the cracks over time. If they widen, lengthen, or show signs of water intrusion, consult a structural engineer or foundation specialist.',
        location: 'Foundation walls'
      }
    },
    {
      id: '5',
      title: 'Aging Water Heater',
      severity: 'Monitor',
      description: 'Water heater is approaching typical end-of-life. Monitor for signs of failure and plan for replacement within 2-3 years.',
      details: {
        whatThisMeans: 'The water heater is 8-10 years old and approaching the typical lifespan for residential water heaters, which is generally 10-15 years.',
        whyItMatters: [
          'Older water heaters are more prone to failure and leaks',
          'Replacement before failure allows for planned installation and avoids emergency situations',
          'Newer models are more energy-efficient and can reduce utility costs'
        ],
        recommendation: 'Plan for replacement within the next 2-3 years. Consider energy-efficient models and schedule installation before the unit fails completely.',
        location: 'Basement / Utility area'
      }
    },
    {
      id: '6',
      title: 'HVAC System Age',
      severity: 'Info',
      description: 'Central air conditioning system is 8 years old and functioning normally. Regular maintenance recommended.',
      details: {
        whatThisMeans: 'The HVAC system is in good working condition but is at an age where regular maintenance becomes increasingly important to ensure continued reliable operation.',
        whyItMatters: [
          'Regular maintenance extends the life of the system and improves efficiency',
          'Well-maintained systems operate more reliably and cost less to run',
          'Early detection of issues prevents costly emergency repairs'
        ],
        recommendation: 'Schedule annual maintenance with a qualified HVAC technician. Change filters regularly and keep the system clean to ensure optimal performance.',
        location: 'HVAC system'
      }
    }
  ];

  // Filter and sort issues
  const filteredAndSortedIssues = useMemo(() => {
    let filtered = selectedFilter === 'All' 
      ? allIssues 
      : allIssues.filter(issue => issue.severity === selectedFilter);
    
    // Apply sorting
    if (sortBy === 'severity') {
      const severityOrder: SeverityType[] = ['Safety', 'Repair', 'Monitor', 'Info'];
      filtered = [...filtered].sort((a, b) => {
        const aIndex = severityOrder.indexOf(a.severity);
        const bIndex = severityOrder.indexOf(b.severity);
        return aIndex - bIndex;
      });
    } else if (sortBy === 'alphabetical') {
      filtered = [...filtered].sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
    // 'recent' maintains original order (no sorting needed)
    
    return filtered;
  }, [allIssues, selectedFilter, sortBy]);

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
                  onChange={(value) => setSortBy(value as 'recent' | 'alphabetical' | 'severity')}
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
