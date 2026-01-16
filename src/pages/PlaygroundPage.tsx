import { useState, useEffect } from 'react';
import StatusPill from '../components/StatusPill';
import DealSummaryCard from '../components/DealSummaryCard';
import '../styles.css';

type Page = 'landing' | 'playground';

interface PlaygroundPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function PlaygroundPage({ currentPage, onNavigate }: PlaygroundPageProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(prefersDark);
  }, []);

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
        <nav className="flex gap-layout items-center">
          <button
            onClick={() => onNavigate('playground')}
            className={`font-sans text-base font-medium cursor-pointer transition-opacity hover:opacity-70 ${
              currentPage === 'playground' ? 'text-text' : 'text-muted'
            }`}
          >
            HomeScope Playground
          </button>
        </nav>
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
          <h1 className="font-sans text-2xl font-semibold text-text mb-4">HomeScope Playground</h1>
          <p className="font-sans text-base font-normal text-muted">
            A sandbox for testing and validating HomeScope UI components.
          </p>
        </section>

        {/* Tokens: Colors */}
        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Tokens: Colors</h2>
          <div className="grid grid-auto-fit-colors gap-layout">
            <ColorSwatch tokenName="--color-background" label="Background" textToken="--color-text" />
            <ColorSwatch tokenName="--color-surface" label="Surface" textToken="--color-text" />
            <ColorSwatch tokenName="--color-text" label="Text" textToken="--color-background" />
            <ColorSwatch tokenName="--color-text-muted" label="Text Muted" textToken="--color-background" />
            <ColorSwatch tokenName="--color-primary" label="Primary" textToken="--color-background" />
            <ColorSwatch tokenName="--color-border" label="Border" textToken="--color-text" />
            <ColorSwatch tokenName="--color-status-ready" label="Status: Ready" textToken="--color-surface" />
            <ColorSwatch tokenName="--color-status-verified" label="Status: Verified" textToken="--color-surface" />
            <ColorSwatch tokenName="--color-status-pending" label="Status: Pending" textToken="--color-surface" />
            <ColorSwatch tokenName="--color-button-primary-bg" label="Button Primary BG" textToken="--color-surface" />
          </div>
        </section>

        {/* Tokens: Typography */}
        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Tokens: Typography</h2>
          <div className="flex flex-col gap-layout">
            <div>
              <p className="font-sans text-2xl font-semibold text-text mb-2">Heading 2XL (text-2xl, font-semibold)</p>
              <p className="font-sans text-xl font-semibold text-text mb-2">Heading XL (text-xl, font-semibold)</p>
              <p className="font-sans text-lg font-normal text-text mb-2">Body Large (text-lg, font-normal)</p>
              <p className="font-sans text-base font-normal text-text mb-2">Body Base (text-base, font-normal)</p>
              <p className="font-sans text-sm font-medium text-muted">Body Small (text-sm, font-medium, muted)</p>
            </div>
            <div className="border border-border rounded-md px-container-x py-container-y">
              <p className="font-sans text-base font-normal text-text">
                Font Family: <code className="bg-surface px-2 py-1 rounded-sm text-sm">var(--font-family)</code>
              </p>
              <p className="font-sans text-base font-normal text-text mt-2">
                Font Weights: Normal (400), Medium (500), Semibold (600)
              </p>
            </div>
          </div>
        </section>

        {/* Tokens: Spacing + Radius */}
        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Tokens: Spacing + Radius</h2>
          <div className="flex flex-col gap-layout">
            <div>
              <h3 className="font-sans text-base font-semibold text-text mb-2">Spacing Scale</h3>
              <div className="flex flex-col gap-2">
                {[
                  { token: '--space-2', value: '8px' },
                  { token: '--space-3', value: '12px' },
                  { token: '--space-4', value: '16px' },
                  { token: '--space-6', value: '24px' },
                  { token: '--space-12', value: '48px' },
                ].map(({ token, value }) => (
                  <div key={token} className="flex items-center gap-layout">
                    <div
                      className="bg-primary rounded-sm"
                      style={{ width: `var(${token})`, height: `var(${token})` }}
                    />
                    <span className="font-sans text-sm font-medium text-text">{token}</span>
                    <span className="font-sans text-sm font-normal text-muted">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-sans text-base font-semibold text-text mb-2">Border Radius</h3>
              <div className="flex gap-layout items-center">
                {[
                  { token: '--radius-sm', value: '8px', class: 'rounded-sm' },
                  { token: '--radius-md', value: '12px', class: 'rounded-md' },
                  { token: '--radius-pill', value: '13.091px', class: 'rounded-pill' },
                ].map(({ token, value, class: radiusClass }) => (
                  <div key={token} className="flex flex-col items-center gap-2">
                    <div
                      className={`bg-primary ${radiusClass}`}
                      style={{ width: 'var(--space-6)', height: 'var(--space-6)' }}
                    />
                    <span className="font-sans text-xs font-medium text-text text-center">{token}</span>
                    <span className="font-sans text-xs font-normal text-muted">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Layout Primitives */}
        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Layout Primitives</h2>
          <div className="flex flex-col gap-layout">
            <div className="border border-border rounded-md px-container-x py-container-y">
              <p className="font-sans text-base font-semibold text-text mb-2">Container Example</p>
              <p className="font-sans text-sm font-normal text-muted mb-4">
                This section uses <code className="bg-surface px-2 py-1 rounded-sm">max-w-container</code> and{' '}
                <code className="bg-surface px-2 py-1 rounded-sm">px-container-x</code> for consistent page width and
                horizontal padding.
              </p>
              <div className="bg-surface border border-border rounded-md p-4">
                <p className="font-sans text-sm font-normal text-text">
                  Max width: <code>var(--container-max-width)</code> (1200px)
                </p>
                <p className="font-sans text-sm font-normal text-text mt-2">
                  Padding X: <code>var(--container-padding-x)</code>
                </p>
              </div>
            </div>
            <div className="border border-border rounded-md px-container-x py-section-lg">
              <p className="font-sans text-base font-semibold text-text mb-2">Section Padding Example</p>
              <p className="font-sans text-sm font-normal text-muted mb-4">
                This section uses <code className="bg-surface px-2 py-1 rounded-sm">py-section-lg</code> for large
                vertical section spacing.
              </p>
            </div>
            <div>
              <p className="font-sans text-base font-semibold text-text mb-2">Layout Gap Example</p>
              <div className="grid grid-auto-fit-small gap-layout">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-surface border border-border rounded-md px-container-x py-container-y text-center">
                    <p className="font-sans text-sm font-normal text-text">Card {i}</p>
                  </div>
                ))}
              </div>
              <p className="font-sans text-sm font-normal text-muted mt-2">
                Grid uses <code className="bg-surface px-2 py-1 rounded-sm">gap-layout</code> for consistent spacing.
              </p>
            </div>
          </div>
        </section>

        {/* Components */}
        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Components</h2>
          <div className="flex flex-col gap-12">
            <div>
              <h3 className="font-sans text-lg font-semibold text-text mb-4">StatusPill</h3>
              <div className="flex flex-wrap gap-layout">
                <StatusPill status="Ready" />
                <StatusPill status="Verified" />
                <StatusPill status="Pending" />
              </div>
            </div>
            <div>
              <h3 className="font-sans text-lg font-semibold text-text mb-4">DealSummaryCard</h3>
              <div className="grid grid-auto-fit-cards gap-layout">
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
                  companyName="Enterprise Co"
                  series="Series C - Enterprise"
                  statuses={['Verified']}
                />
                <DealSummaryCard
                  companyName="Startup XYZ"
                  series="Pre-Seed - AI"
                  statuses={['Ready', 'Pending']}
                />
                <DealSummaryCard
                  companyName="Growth Ventures"
                  series="Series A - E-commerce"
                  statuses={['Verified', 'Ready', 'Pending', 'Verified']}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

interface ColorSwatchProps {
  tokenName: string;
  label: string;
  textToken: string;
}

function ColorSwatch({ tokenName, label, textToken }: ColorSwatchProps) {
  return (
    <div className="border border-border rounded-md overflow-hidden">
      <div
        className="px-container-x py-container-y"
        style={{ backgroundColor: `var(${tokenName})`, color: `var(${textToken})` }}
      >
        <p className="font-sans text-sm font-semibold mb-1">{label}</p>
        <code className="font-sans text-xs font-normal opacity-80">{tokenName}</code>
      </div>
    </div>
  );
}
