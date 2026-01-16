import '../styles.css';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface SideNavProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function SideNav({ currentPage, onNavigate }: SideNavProps) {
  const mainNavItems = [
    { id: 'home' as Page, label: 'Home' },
    { id: 'properties' as Page, label: 'Properties' },
    { id: 'contacts' as Page, label: 'Contacts' },
    { id: 'settings' as Page, label: 'Settings' },
  ];

  return (
    <nav className="side-nav">
      <div className="side-nav__header">
        <h1 className="side-nav__title">HomeScope</h1>
      </div>
      
      <div className="side-nav__main">
        {mainNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`side-nav__item ${
              currentPage === item.id ? 'side-nav__item--active' : ''
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="side-nav__divider"></div>

      <div className="side-nav__internal">
        <p className="side-nav__section-label">Internal</p>
        <button
          onClick={() => onNavigate('playground')}
          className={`side-nav__item ${
            currentPage === 'playground' ? 'side-nav__item--active' : ''
          }`}
        >
          Playground
        </button>
      </div>
    </nav>
  );
}
