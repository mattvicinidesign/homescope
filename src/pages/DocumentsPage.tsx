import { useState, useEffect } from 'react';
import '../styles.css';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface DocumentsPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function DocumentsPage({ currentPage, onNavigate }: DocumentsPageProps) {
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

  const documents = [
    { id: '1', name: 'Inspection Report - 123 Main St', address: '123 Main St, Anytown, ST', date: '2024-01-15', status: 'Processed' },
    { id: '2', name: 'Inspection Report - 456 Oak Ave', address: '456 Oak Ave, Somewhere, ST', date: '2024-01-10', status: 'Processed' },
    { id: '3', name: 'Inspection Report - 789 Pine Rd', address: '789 Pine Rd, Elsewhere, ST', date: '2024-01-05', status: 'Processing' },
  ];

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
          <h1 className="font-sans text-2xl font-semibold text-text mb-4">Documents</h1>
          <p className="font-sans text-base font-normal text-muted">
            All uploaded inspection reports.
          </p>
        </section>

        <section>
          <div className="border border-border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="px-container-x py-container-y text-left font-sans text-sm font-semibold text-text">Report name</th>
                  <th className="px-container-x py-container-y text-left font-sans text-sm font-semibold text-text">Address</th>
                  <th className="px-container-x py-container-y text-left font-sans text-sm font-semibold text-text">Date uploaded</th>
                  <th className="px-container-x py-container-y text-left font-sans text-sm font-semibold text-text">Status</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-border cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => onNavigate('summary')}
                  >
                    <td className="px-container-x py-container-y font-sans text-base font-normal text-text">{doc.name}</td>
                    <td className="px-container-x py-container-y font-sans text-base font-normal text-text">{doc.address}</td>
                    <td className="px-container-x py-container-y font-sans text-base font-normal text-text">{doc.date}</td>
                    <td className="px-container-x py-container-y font-sans text-base font-normal text-text">{doc.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
