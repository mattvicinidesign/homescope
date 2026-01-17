import type { ReactNode } from 'react';
import SideNav from './SideNav';
import type { Page } from '@/types/ui';

interface BuyerLiteShellProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  children: ReactNode;
}

export default function BuyerLiteShell({ currentPage, onNavigate, children }: BuyerLiteShellProps) {
  return (
    <div className="flex h-screen">
      <SideNav currentPage={currentPage} onNavigate={onNavigate} />
      <div className="flex-1 overflow-y-auto bg-background">
        {children}
      </div>
    </div>
  );
}
