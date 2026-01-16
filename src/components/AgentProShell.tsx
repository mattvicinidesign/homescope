import { ReactNode } from 'react';
import SideNav from './SideNav';
import '../styles.css';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface AgentProShellProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  children: ReactNode;
}

export default function AgentProShell({ currentPage, onNavigate, children }: AgentProShellProps) {
  return (
    <div className="agent-pro-shell">
      <SideNav currentPage={currentPage} onNavigate={onNavigate} />
      <div className="agent-pro-shell__main">
        {children}
      </div>
    </div>
  );
}
