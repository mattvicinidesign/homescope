import { ReactNode } from 'react';
import SideNav from './SideNav';
import '../styles.css';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface BuyerLiteShellProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  children: ReactNode;
}

export default function BuyerLiteShell({ currentPage, onNavigate, children }: BuyerLiteShellProps) {
  return (
    <div className="buyer-lite-shell">
      <SideNav currentPage={currentPage} onNavigate={onNavigate} />
      <div className="buyer-lite-shell__main">
        <div className="buyer-lite-placeholder">
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Buyer Lite</h2>
          <p className="font-sans text-base font-normal text-muted">
            Buyer Lite experience coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
