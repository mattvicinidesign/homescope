import { useState, useEffect } from 'react';
import '../styles.css';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface ProcessingInspectionPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function ProcessingInspectionPage({ currentPage, onNavigate }: ProcessingInspectionPageProps) {
  // Initialize theme from localStorage or default to dark, read immediately (not in useEffect)
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true; // Default to dark mode
  });
  const [currentStep, setCurrentStep] = useState(0);

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

  useEffect(() => {
    // Simulate processing steps
    const step1 = setTimeout(() => setCurrentStep(1), 500);
    const step2 = setTimeout(() => setCurrentStep(2), 1500);
    const step3 = setTimeout(() => setCurrentStep(3), 2500);
    
    // After all steps, navigate to summary and mark as processed
    const complete = setTimeout(() => {
      // Mark that inspection data is available
      localStorage.setItem('inspectionProcessed', 'true');
      onNavigate('summary');
    }, 3000);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(complete);
    };
  }, [onNavigate]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const steps = [
    { id: 1, label: 'Reading the report' },
    { id: 2, label: 'Identifying issues' },
    { id: 3, label: 'Assigning severity' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-container-x py-container-y border-b border-border flex justify-end items-center">
        <button
          className="font-sans text-xl bg-transparent border-0 cursor-pointer p-2 leading-none transition-opacity hover:opacity-70"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col items-center justify-center min-h-[60vh]">
        <section className="flex flex-col items-center text-center max-w-lg">
          <h1 className="font-sans text-2xl font-semibold text-text mb-4">Analyzing your inspection…</h1>
          <p className="font-sans text-base font-normal text-muted mb-8">
            This usually takes less than a minute.
          </p>

          <div className="w-full max-w-md mb-6">
            <ul className="flex flex-col gap-4 text-left">
              {steps.map((step) => (
                <li
                  key={step.id}
                  className={`flex items-center gap-3 font-sans text-base ${
                    currentStep >= step.id ? 'text-text' : 'text-muted'
                  }`}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center font-sans text-sm font-medium"
                    style={{
                      borderColor: currentStep >= step.id ? 'var(--color-primary)' : 'var(--color-border)',
                      backgroundColor: currentStep >= step.id ? 'var(--color-primary)' : 'transparent',
                      color: currentStep >= step.id ? 'var(--color-surface)' : 'var(--color-text-muted)',
                    }}
                  >
                    {currentStep >= step.id ? '✓' : step.id}
                  </span>
                  <span>{step.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="font-sans text-sm font-normal text-muted">
            You can review the summary as soon as it's ready.
          </p>
        </section>
      </main>
    </div>
  );
}
