import { useState, useMemo } from 'react';
import Tabs from '../components/Tabs';
import SeverityBadge from '../components/SeverityBadge';
import type { Property } from '../types/property';
import type { Issue } from '../types/issue';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface PropertyDetailsPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onOpenIssue?: (issue: Issue) => void;
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

export default function PropertyDetailsPage({ currentPage, onNavigate, onOpenIssue }: PropertyDetailsPageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Get active property from localStorage
  const activePropertyId = localStorage.getItem('activePropertyId');
  
  // Placeholder property data - in production this would come from API
  const allProperties: Property[] = [
    {
      id: '1',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      inspectionCount: 2,
      lastInspectionDate: '2024-01-15',
    },
    {
      id: '2',
      address: '456 Oak Ave',
      city: 'Somewhere',
      state: 'NY',
      zipCode: '67890',
      inspectionCount: 1,
      lastInspectionDate: '2024-01-10',
    },
    {
      id: '3',
      address: '789 Pine Rd',
      city: 'Elsewhere',
      state: 'TX',
      zipCode: '54321',
      inspectionCount: 0,
    },
  ];

  const property = useMemo(() => {
    if (!activePropertyId) return null;
    return allProperties.find(p => p.id === activePropertyId) || null;
  }, [activePropertyId]);

  // Placeholder issue data - in production this would come from API
  const allIssues: Issue[] = [
    {
      id: '1',
      title: 'Electrical Panel Hazards',
      severity: 'Safety',
      description: 'Exposed wiring and outdated circuit breakers present fire and shock risks. Immediate professional evaluation recommended.',
      details: {
        whatThisMeans: 'The electrical panel contains exposed wiring and outdated circuit breakers.',
        whyItMatters: [
          'Exposed wiring increases the risk of electrical shock and fire hazards',
          'Outdated breakers may fail to trip during electrical faults',
        ],
        recommendation: 'Contact a licensed electrician immediately for evaluation.',
        location: 'Basement / Electrical panel'
      }
    },
    {
      id: '2',
      title: 'Roof Shingle Damage',
      severity: 'Repair',
      description: 'Multiple shingles are missing or damaged, which could lead to water infiltration.',
      details: {
        whatThisMeans: 'The roof has visible damage that may allow water to enter the home.',
        whyItMatters: [
          'Water infiltration can cause interior damage',
          'May lead to mold growth and structural issues',
        ],
        recommendation: 'Have a roofing contractor inspect and repair damaged areas.',
        location: 'Roof'
      }
    },
    {
      id: '3',
      title: 'HVAC System Age',
      severity: 'Monitor',
      description: 'The heating and cooling system is approaching the end of its expected lifespan.',
      details: {
        whatThisMeans: 'The HVAC system is older and may require replacement soon.',
        whyItMatters: [
          'Older systems are less efficient and more prone to breakdowns',
          'Replacement costs can be significant',
        ],
        recommendation: 'Plan for potential replacement within the next few years.',
        location: 'Basement / Utility room'
      }
    },
  ];

  const handleIssueClick = (issue: Issue) => {
    if (onOpenIssue) {
      onOpenIssue(issue);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'documents', label: 'Documents' },
    { id: 'issues', label: 'Inspection details (Issues)' },
    { id: 'timeline', label: 'Timeline' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="property-details-tab-content">
            <div className="property-details-section">
              <h3 className="property-details-section__title">Property Summary</h3>
              <div className="property-details-section__content">
                {property ? (
                  <div className="flex flex-col gap-layout">
                    <div>
                      <p className="font-sans text-sm font-medium text-muted mb-2">Address</p>
                      <p className="font-sans text-base font-normal text-text">
                        {property.address}, {property.city}, {property.state} {property.zipCode}
                      </p>
                    </div>
                    {property.inspectionCount !== undefined && (
                      <div>
                        <p className="font-sans text-sm font-medium text-muted mb-2">Inspections</p>
                        <p className="font-sans text-base font-normal text-text">
                          {property.inspectionCount} inspection{property.inspectionCount !== 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                    {property.lastInspectionDate && (
                      <div>
                        <p className="font-sans text-sm font-medium text-muted mb-2">Last Inspection</p>
                        <p className="font-sans text-base font-normal text-text">
                          {property.lastInspectionDate}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="font-sans text-base font-normal text-muted">No property selected</p>
                )}
              </div>
            </div>
          </div>
        );

      case 'documents':
        return (
          <div className="property-details-tab-content">
            <div className="property-details-section">
              <h3 className="property-details-section__title">Property Documents</h3>
              <div className="property-details-section__content">
                <div className="border border-border rounded-md px-container-x py-container-y bg-surface text-center">
                  <p className="font-sans text-base font-normal text-muted">
                    No documents uploaded yet for this property.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'issues':
        return (
          <div className="property-details-tab-content">
            <div className="property-details-section">
              <h3 className="property-details-section__title">Inspection Issues</h3>
              <div className="property-details-section__content">
                {allIssues.length > 0 ? (
                  <div className="flex flex-col gap-layout">
                    {allIssues.map((issue) => (
                      <IssueCard
                        key={issue.id}
                        issue={issue}
                        onClick={() => handleIssueClick(issue)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="border border-border rounded-md px-container-x py-container-y bg-surface text-center">
                    <p className="font-sans text-base font-normal text-muted">
                      No issues found for this property.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="property-details-tab-content">
            <div className="property-details-section">
              <h3 className="property-details-section__title">Timeline</h3>
              <div className="property-details-section__content">
                <div className="border border-border rounded-md px-container-x py-container-y bg-surface text-center">
                  <p className="font-sans text-base font-normal text-muted">
                    Timeline coming soon.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!property) {
    return (
      <main className="max-w-container mx-auto w-full px-container-x py-section-lg">
        <div className="border border-border rounded-md px-container-x py-container-y bg-surface text-center">
          <p className="font-sans text-base font-normal text-muted">
            No property selected. Please select a property from the Properties page.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col gap-6">
        {/* Property Header */}
        <section className="property-details-header">
          <div className="property-details-header__primary">
            <h1 className="property-details-header__title">{property.address}</h1>
            {property.inspectionCount !== undefined && property.inspectionCount > 0 && (
              <span className="property-details-header__badge">
                {property.inspectionCount} inspection{property.inspectionCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <p className="property-details-header__secondary">
            {property.city}, {property.state} {property.zipCode}
          </p>
        </section>

        {/* Tabs */}
        <Tabs tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
          {renderTabContent()}
        </Tabs>
    </main>
  );
}
