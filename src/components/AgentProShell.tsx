import type { ReactNode } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';
import type { Page } from '@/types/ui';

interface AgentProShellProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
  children: ReactNode;
}

export default function AgentProShell({ currentPage, onNavigate, isDark, onThemeChange, children }: AgentProShellProps) {
  return (
    <div className="flex h-screen">
      <SideNav currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden bg-background">
        <TopNav onNavigate={onNavigate} isDark={isDark} onThemeChange={onThemeChange} />
        {children}
      </div>
    </div>
  );
}
