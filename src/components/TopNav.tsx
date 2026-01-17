import UserMenu from './UserMenu';
import type { Page } from '@/types/ui';

interface TopNavProps {
  onNavigate: (page: Page) => void;
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
}

export default function TopNav({ onNavigate, isDark, onThemeChange }: TopNavProps) {
  return (
    <header className="sticky top-0 z-[100] bg-background border-b border-border flex items-center justify-between px-container-x py-container-y">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-text m-0">HomeScope</h1>
      </div>
      <div className="flex items-center">
        <UserMenu onNavigate={onNavigate} isDark={isDark} onThemeChange={onThemeChange} />
      </div>
    </header>
  );
}
