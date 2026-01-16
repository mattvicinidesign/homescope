import { ReactNode } from 'react';
import '../styles.css';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  children: ReactNode;
}

export default function Tabs({ tabs, activeTabId, onTabChange, children }: TabsProps) {
  return (
    <div className="tabs">
      <div className="tabs__list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`tabs__tab ${
              activeTabId === tab.id ? 'tabs__tab--active' : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs__content">
        {children}
      </div>
    </div>
  );
}
