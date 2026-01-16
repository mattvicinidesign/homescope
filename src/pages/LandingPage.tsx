import { useState, useEffect } from 'react';
import DealSummaryCard from '../components/DealSummaryCard';

type Page = 'landing' | 'playground';

interface LandingPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function LandingPage({ currentPage, onNavigate }: LandingPageProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-container-x py-container-y border-b border-border flex justify-between items-center">
        <nav className="flex gap-layout items-center">
          <button
            onClick={() => onNavigate('landing')}
            className={`font-sans text-base font-medium cursor-pointer transition-opacity hover:opacity-70 ${
              currentPage === 'landing' ? 'text-text' : 'text-muted'
            }`}
          >
            Landing
          </button>
          <span className="text-muted">|</span>
          <button
            onClick={() => onNavigate('playground')}
            className={`font-sans text-base font-medium cursor-pointer transition-opacity hover:opacity-70 ${
              currentPage === 'playground' ? 'text-text' : 'text-muted'
            }`}
          >
            Playground
          </button>
        </nav>
        <button
          className="font-sans text-xl bg-transparent border-0 cursor-pointer p-2 leading-none transition-opacity hover:opacity-70"
          onClick={toggleTheme}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>

      <section className="py-section-lg px-container-x text-center">
        <h2 className="font-sans text-2xl font-semibold text-text m-0 mb-4">
          Design System Components
        </h2>
        <p className="font-sans text-lg font-normal text-muted m-0">
          Explore our collection of carefully crafted components
        </p>
      </section>

      <section className="px-container-x py-container-y grid grid-auto-fit-cards gap-layout max-w-container mx-auto w-full">
        <DealSummaryCard
          companyName="Acme Corp"
          series="Series B - Healthcare"
          statuses={['Ready', 'Verified', 'Pending']}
        />
        <DealSummaryCard
          companyName="TechStart Inc"
          series="Series A - Fintech"
          statuses={['Verified', 'Ready']}
        />
        <DealSummaryCard
          companyName="Innovate Labs"
          series="Seed - SaaS"
          statuses={['Pending', 'Ready', 'Verified']}
        />
        <DealSummaryCard
          companyName="Matt Vicini"
          series="Series C - Enterprise"
          statuses={['Verified', 'Ready']}
        />
      </section>

      <section className="py-section-lg px-container-x text-center mt-auto">
        <button className="font-sans text-base font-medium px-6 py-3 bg-button-primary-bg text-surface border-0 rounded-md cursor-pointer transition-opacity hover:opacity-90">
          Get Started
        </button>
      </section>
    </div>
  );
}
