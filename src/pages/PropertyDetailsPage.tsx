import { useState, useMemo } from 'react';
import Tabs from '../components/Tabs';
import SeverityBadge from '../components/SeverityBadge';
import type { Issue } from '../types/issue';
import type { Page } from '@/types/ui';
import { getActivePropertyId } from '@/lib/storage/localStorage';
import { mockProperties } from '@/lib/mocks/homeMocks';
import { mockPropertyIssues } from '@/lib/mocks/issueMocks';

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

export default function PropertyDetailsPage({ onOpenIssue }: PropertyDetailsPageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Get active property from storage
  const activePropertyId = getActivePropertyId();

  const property = useMemo(() => {
    if (!activePropertyId) return null;
    return mockProperties.find(p => p.id === activePropertyId) || null;
  }, [activePropertyId]);

  const allIssues = mockPropertyIssues;

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
