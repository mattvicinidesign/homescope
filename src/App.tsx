import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import PlaygroundPage from './pages/PlaygroundPage';
import InspectionSummaryPage from './pages/InspectionSummaryPage';

type Page = 'landing' | 'playground' | 'summary';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  if (currentPage === 'playground') {
    return <PlaygroundPage currentPage={currentPage} onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'summary') {
    return <InspectionSummaryPage currentPage={currentPage} onNavigate={setCurrentPage} />;
  }

  return <LandingPage currentPage={currentPage} onNavigate={setCurrentPage} />;
}

export default App;
