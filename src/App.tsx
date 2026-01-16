import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import PlaygroundPage from './pages/PlaygroundPage';

type Page = 'landing' | 'playground';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  if (currentPage === 'playground') {
    return <PlaygroundPage currentPage={currentPage} onNavigate={setCurrentPage} />;
  }

  return <LandingPage currentPage={currentPage} onNavigate={setCurrentPage} />;
}

export default App;
