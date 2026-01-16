import { useState, useEffect } from 'react';
import '../styles.css';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface SettingsPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function SettingsPage({ currentPage, onNavigate }: SettingsPageProps) {
  // Initialize theme from localStorage or default to dark, read immediately (not in useEffect)
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; // Default to dark mode
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-container-x py-container-y border-b border-border flex justify-between items-center">
        <div></div>
        <button
          className="font-sans text-xl bg-transparent border-0 cursor-pointer p-2 leading-none transition-opacity hover:opacity-70"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col gap-12">
        <section>
          <h1 className="font-sans text-2xl font-semibold text-text mb-4">Settings</h1>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Appearance</h2>
          <div className="border border-border rounded-md px-container-x py-container-y bg-surface">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-sans text-base font-semibold text-text mb-1">Theme</p>
                <p className="font-sans text-sm font-normal text-muted">Choose between dark and light mode</p>
              </div>
              <button
                onClick={toggleTheme}
                className="font-sans text-base font-medium px-4 py-2 bg-button-primary-bg text-surface border-0 rounded-md cursor-pointer transition-opacity hover:opacity-90"
              >
                {isDark ? 'Switch to Light' : 'Switch to Dark'}
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Notifications</h2>
          <div className="border border-border rounded-md px-container-x py-container-y bg-surface">
            <p className="font-sans text-base font-normal text-muted">
              Notification preferences will be available here.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Account</h2>
          <div className="border border-border rounded-md px-container-x py-container-y bg-surface">
            <p className="font-sans text-base font-normal text-muted">
              Account settings will be available here.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
