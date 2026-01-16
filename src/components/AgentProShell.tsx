import type { ReactNode } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';
import '../styles.css';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface AgentProShellProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
  children: ReactNode;
}

export default function AgentProShell({ currentPage, onNavigate, isDark, onThemeChange, children }: AgentProShellProps) {
  return (
    <div className="agent-pro-shell">
      <SideNav currentPage={currentPage} onNavigate={onNavigate} />
      <div className="agent-pro-shell__main">
        <TopNav onNavigate={onNavigate} isDark={isDark} onThemeChange={onThemeChange} />
        {children}
      </div>
    </div>
  );
}
