import FullScreenOverlay from './FullScreenOverlay';
import SeverityBadge from './SeverityBadge';
import type { Issue } from '../types/issue';

interface IssueDetailOverlayProps {
  issue: Issue | null;
  onClose: () => void;
}

export default function IssueDetailOverlay({ issue, onClose }: IssueDetailOverlayProps) {
  if (!issue) return null;

  return (
    <FullScreenOverlay issue={issue} onClose={onClose}>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border z-[1]">
          <div className="max-w-container mx-auto py-container-y px-container-x flex items-center justify-between gap-4">
            <h1 id="overlay-title" className="text-2xl font-semibold text-text m-0 flex-1">
              {issue.title}
            </h1>
            <button
              onClick={onClose}
              className="text-2xl font-normal text-text bg-transparent border-0 cursor-pointer p-2 leading-none transition-opacity duration-200 flex-shrink-0 hover:opacity-70 focus:outline-2 focus:outline-primary focus:outline-offset-2 focus:rounded-sm"
              aria-label="Close issue details"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-container mx-auto w-full py-section-lg px-container-x flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="self-start">
              <SeverityBadge severity={issue.severity} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-text m-0">Description</h2>
            <p className="text-base font-normal text-text leading-[1.5] m-0">{issue.description}</p>
          </div>

          {issue.details && (
            <>
              <div className="flex flex-col gap-4">
                <h2 className="text-lg font-semibold text-text m-0">What this means</h2>
                <p className="text-base font-normal text-text leading-[1.5] m-0">{issue.details.whatThisMeans}</p>
              </div>

              {issue.details.whyItMatters && issue.details.whyItMatters.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold text-text m-0">Why it matters</h2>
                  <ul className="text-base font-normal text-text m-0 pl-6 flex flex-col gap-2">
                    {issue.details.whyItMatters.map((item) => (
                      <li key={`why-it-matters-${item}`} className="leading-[1.5]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {issue.details.recommendation && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold text-text m-0">Recommended next step</h2>
                  <p className="text-base font-normal text-text leading-[1.5] m-0">{issue.details.recommendation}</p>
                </div>
              )}

              {issue.details.location && (
                <div className="flex flex-col gap-4">
                  <h2 className="text-lg font-semibold text-text m-0">Where this was found</h2>
                  <p className="text-base font-normal text-text leading-[1.5] m-0">{issue.details.location}</p>
                </div>
              )}
            </>
          )}

          {/* Placeholder sections for future fields */}
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-text m-0">Photos</h2>
            <div className="bg-surface border border-border rounded-md p-6 text-center">
              <p className="text-base font-normal text-muted m-0">Photos will be displayed here</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-text m-0">Notes</h2>
            <div className="bg-surface border border-border rounded-md p-6 text-center">
              <p className="text-base font-normal text-muted m-0">Additional notes and observations</p>
            </div>
          </div>
        </div>
      </div>
    </FullScreenOverlay>
  );
}
