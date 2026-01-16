import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import PlaygroundPage from './pages/PlaygroundPage';
import InspectionSummaryPage from './pages/InspectionSummaryPage';
import UploadInspectionPage from './pages/UploadInspectionPage';
import ProcessingInspectionPage from './pages/ProcessingInspectionPage';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

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

  return <LandingPage currentPage={currentPage} onNavigate={setCurrentPage} />;
}

export default App;
