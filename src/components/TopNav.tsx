import UserMenu from './UserMenu';
import '../styles.css';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface TopNavProps {
  onNavigate: (page: Page) => void;
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
}

export default function TopNav({ onNavigate, isDark, onThemeChange }: TopNavProps) {
  return (
    <header className="top-nav">
      <div className="top-nav__brand">
        <h1 className="top-nav__title">HomeScope</h1>
      </div>
      <div className="top-nav__actions">
        <UserMenu onNavigate={onNavigate} isDark={isDark} onThemeChange={onThemeChange} />
      </div>
    </header>
  );
}
