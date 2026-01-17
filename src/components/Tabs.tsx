import type { ReactNode } from 'react';
import type { Tab } from '@/types/ui';

interface TabsProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  children: ReactNode;
}

export default function Tabs({ tabs, activeTabId, onTabChange, children }: TabsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`text-base font-medium bg-transparent border-0 border-b-2 py-3 px-4 cursor-pointer transition-all duration-200 -mb-px ${
              activeTabId === tab.id
                ? 'border-primary text-text'
                : 'border-transparent text-muted hover:text-text hover:opacity-80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  );
}
