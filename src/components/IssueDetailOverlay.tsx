import { useMemo } from 'react';
import FullScreenOverlay from './FullScreenOverlay';
import SeverityBadge from './SeverityBadge';
import type { Issue } from '../types/issue';
import '../styles.css';

interface IssueDetailOverlayProps {
  issue: Issue | null;
  onClose: () => void;
}

export default function IssueDetailOverlay({ issue, onClose }: IssueDetailOverlayProps) {
  const issueData = useMemo(() => {
    if (!issue) return null;
    try {
      const stored = localStorage.getItem('selectedIssue');
      return stored ? JSON.parse(stored) as Issue : issue;
    } catch {
      return issue;
    }
  }, [issue]);

  if (!issueData) return null;

  return (
    <FullScreenOverlay issue={issueData} onClose={onClose}>
      <div className="issue-detail-overlay">
        {/* Header */}
        <div className="issue-detail-overlay__header">
          <div className="issue-detail-overlay__header-content">
            <h1 id="overlay-title" className="issue-detail-overlay__title">
              {issueData.title}
            </h1>
            <button
              onClick={onClose}
              className="issue-detail-overlay__close-button"
              aria-label="Close issue details"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="issue-detail-overlay__body">
          <div className="issue-detail-overlay__section">
            <div className="issue-detail-overlay__badge">
              <SeverityBadge severity={issueData.severity} />
            </div>
          </div>

          <div className="issue-detail-overlay__section">
            <h2 className="issue-detail-overlay__section-title">Description</h2>
            <p className="issue-detail-overlay__text">{issueData.description}</p>
          </div>

          {issueData.details && (
            <>
              <div className="issue-detail-overlay__section">
                <h2 className="issue-detail-overlay__section-title">What this means</h2>
                <p className="issue-detail-overlay__text">{issueData.details.whatThisMeans}</p>
              </div>

              {issueData.details.whyItMatters && issueData.details.whyItMatters.length > 0 && (
                <div className="issue-detail-overlay__section">
                  <h2 className="issue-detail-overlay__section-title">Why it matters</h2>
                  <ul className="issue-detail-overlay__list">
                    {issueData.details.whyItMatters.map((item, index) => (
                      <li key={index} className="issue-detail-overlay__list-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {issueData.details.recommendation && (
                <div className="issue-detail-overlay__section">
                  <h2 className="issue-detail-overlay__section-title">Recommended next step</h2>
                  <p className="issue-detail-overlay__text">{issueData.details.recommendation}</p>
                </div>
              )}

              {issueData.details.location && (
                <div className="issue-detail-overlay__section">
                  <h2 className="issue-detail-overlay__section-title">Where this was found</h2>
                  <p className="issue-detail-overlay__text">{issueData.details.location}</p>
                </div>
              )}
            </>
          )}

          {/* Placeholder sections for future fields */}
          <div className="issue-detail-overlay__section">
            <h2 className="issue-detail-overlay__section-title">Photos</h2>
            <div className="issue-detail-overlay__placeholder">
              <p className="issue-detail-overlay__placeholder-text">Photos will be displayed here</p>
            </div>
          </div>

          <div className="issue-detail-overlay__section">
            <h2 className="issue-detail-overlay__section-title">Notes</h2>
            <div className="issue-detail-overlay__placeholder">
              <p className="issue-detail-overlay__placeholder-text">Additional notes and observations</p>
            </div>
          </div>
        </div>
      </div>
    </FullScreenOverlay>
  );
}
