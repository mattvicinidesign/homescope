import { useState } from 'react';
import { appTier } from './config/tier';
import AgentProShell from './components/AgentProShell';
import BuyerLiteShell from './components/BuyerLiteShell';
import IssueDetailOverlay from './components/IssueDetailOverlay';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import ContactsPage from './pages/ContactsPage';
import SettingsPage from './pages/SettingsPage';
import PlaygroundPage from './pages/PlaygroundPage';
import InspectionSummaryPage from './pages/InspectionSummaryPage';
import UploadInspectionPage from './pages/UploadInspectionPage';
import ProcessingInspectionPage from './pages/ProcessingInspectionPage';
import IssueDetailsPage from './pages/IssueDetailsPage';
import type { Issue } from './types/issue';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);

  const renderPage = () => {
    if (currentPage === 'home') {
      return <HomePage currentPage={currentPage} onNavigate={setCurrentPage} />;
    }

    if (currentPage === 'properties') {
      return <PropertiesPage currentPage={currentPage} onNavigate={setCurrentPage} />;
    }

    if (currentPage === 'propertyDetails') {
      return (
        <PropertyDetailsPage
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onOpenIssue={(issue) => {
            localStorage.setItem('selectedIssue', JSON.stringify(issue));
            setActiveIssue(issue);
          }}
        />
      );
    }

    if (currentPage === 'contacts') {
      return <ContactsPage currentPage={currentPage} onNavigate={setCurrentPage} />;
    }

    if (currentPage === 'settings') {
      return <SettingsPage currentPage={currentPage} onNavigate={setCurrentPage} />;
    }

    if (currentPage === 'playground') {
      return <PlaygroundPage currentPage={currentPage} onNavigate={setCurrentPage} />;
    }

    if (currentPage === 'summary') {
      return <InspectionSummaryPage currentPage={currentPage} onNavigate={setCurrentPage} />;
    }

    if (currentPage === 'upload') {
      return <UploadInspectionPage currentPage={currentPage} onNavigate={setCurrentPage} />;
    }

    if (currentPage === 'processing') {
      return <ProcessingInspectionPage currentPage={currentPage} onNavigate={setCurrentPage} />;
    }

    if (currentPage === 'issueDetails') {
      return <IssueDetailsPage currentPage={currentPage} onNavigate={setCurrentPage} />;
    }

    return <HomePage currentPage={currentPage} onNavigate={setCurrentPage} />;
  };

  const handleCloseOverlay = () => {
    setActiveIssue(null);
  };

  // Route to appropriate shell based on tier
  if (appTier === 'agent_pro') {
    return (
      <>
        <AgentProShell
          currentPage={currentPage}
          onNavigate={setCurrentPage}
        >
          {renderPage()}
        </AgentProShell>
        <IssueDetailOverlay issue={activeIssue} onClose={handleCloseOverlay} />
      </>
    );
  }

  // Buyer Lite stub
  return (
    <>
      <BuyerLiteShell currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </BuyerLiteShell>
      <IssueDetailOverlay issue={activeIssue} onClose={handleCloseOverlay} />
    </>
  );
}

export default App;
