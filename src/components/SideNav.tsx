import type { Page } from '@/types/ui';

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

  const isActive = (pageId: Page) => currentPage === pageId;

  return (
    <nav className="w-[var(--sidenav-width)] h-screen bg-surface border-r border-border flex flex-col p-4 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-text m-0">HomeScope</h1>
      </div>
      
      <div className="flex flex-col gap-2 flex-1">
        {mainNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`text-base font-medium text-left cursor-pointer rounded-sm transition-all duration-200 py-3 px-4 ${
              isActive(item.id)
                ? 'bg-primary text-surface hover:opacity-90'
                : 'text-muted bg-transparent border-0 hover:bg-background hover:text-text'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="h-px bg-border my-4"></div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-muted uppercase tracking-[0.5px] m-0 mb-2 px-4">
          Internal
        </p>
        <button
          onClick={() => onNavigate('playground')}
          className={`text-base font-medium text-left cursor-pointer rounded-sm transition-all duration-200 py-3 px-4 ${
            isActive('playground')
              ? 'bg-primary text-surface hover:opacity-90'
              : 'text-muted bg-transparent border-0 hover:bg-background hover:text-text'
          }`}
        >
          Playground
        </button>
      </div>
    </nav>
  );
}
