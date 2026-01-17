import { useState, useEffect, useRef } from 'react';
import { currentUser } from '../config/user';
import type { Page } from '@/types/ui';

interface UserMenuProps {
  onNavigate: (page: Page) => void;
  isDark: boolean;
  onThemeChange: (isDark: boolean) => void;
}

export default function UserMenu({ onNavigate, isDark, onThemeChange }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const appearanceRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        appearanceRef.current &&
        !appearanceRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsAppearanceOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isAppearanceOpen) {
          setIsAppearanceOpen(false);
        } else if (isOpen) {
          setIsOpen(false);
          buttonRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, isAppearanceOpen]);

  const handleAccountSettings = () => {
    setIsOpen(false);
    setIsAppearanceOpen(false);
    onNavigate('settings');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsAppearanceOpen(false);
    }
  };

  const toggleAppearance = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAppearanceOpen(!isAppearanceOpen);
  };

  const handleThemeSelect = (theme: 'light' | 'dark') => {
    onThemeChange(theme === 'dark');
    setIsAppearanceOpen(false);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="text-xl bg-transparent border-0 cursor-pointer p-2 leading-none transition-opacity duration-200 flex items-center justify-center hover:opacity-70 focus:outline-2 focus:outline-primary focus:outline-offset-2 focus:rounded-sm"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="flex items-center justify-center w-8 h-8 bg-surface border border-border rounded-full text-lg">
          👤
        </span>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-[calc(100%+0.5rem)] right-0 bg-surface border border-border rounded-md min-w-[200px] z-[1000] flex flex-col overflow-visible"
          role="menu"
        >
          <div className="p-4 flex flex-col gap-2">
            <p className="text-base font-semibold text-text m-0">{currentUser.email}</p>
            <p className="text-sm font-normal text-muted m-0">{currentUser.role}</p>
          </div>
          <div className="h-px bg-border m-0"></div>
          <div className="relative">
            <button
              onClick={toggleAppearance}
              className="text-base font-medium text-text bg-transparent border-0 py-3 px-4 text-left cursor-pointer transition-colors duration-200 flex justify-between items-center w-full hover:bg-background focus:outline-2 focus:outline-primary focus:outline-offset-[-2px]"
              role="menuitem"
              aria-expanded={isAppearanceOpen}
            >
              Appearance
              <span className="text-sm text-muted ml-2">◀</span>
            </button>
            {isAppearanceOpen && (
              <div
                ref={appearanceRef}
                className="absolute right-full top-0 mr-2 bg-surface border border-border rounded-md min-w-[120px] z-[1001] flex flex-col overflow-hidden"
                role="menu"
              >
                <button
                  onClick={() => handleThemeSelect('light')}
                  className={`text-base font-medium bg-transparent border-0 py-3 px-4 text-left cursor-pointer transition-colors duration-200 flex justify-between items-center w-full hover:bg-background focus:outline-2 focus:outline-primary focus:-outline-offset-2 ${
                    !isDark ? 'bg-background text-primary' : 'text-text'
                  }`}
                  role="menuitemradio"
                  aria-checked={!isDark}
                >
                  Light
                  {!isDark && <span className="text-base text-primary ml-2">✓</span>}
                </button>
                <button
                  onClick={() => handleThemeSelect('dark')}
                  className={`text-base font-medium bg-transparent border-0 py-3 px-4 text-left cursor-pointer transition-colors duration-200 flex justify-between items-center w-full hover:bg-background focus:outline-2 focus:outline-primary focus:-outline-offset-2 ${
                    isDark ? 'bg-background text-primary' : 'text-text'
                  }`}
                  role="menuitemradio"
                  aria-checked={isDark}
                >
                  Dark
                  {isDark && <span className="text-base text-primary ml-2">✓</span>}
                </button>
              </div>
            )}
          </div>
          <button
            onClick={handleAccountSettings}
            className="text-base font-medium text-text bg-transparent border-0 py-3 px-4 text-left cursor-pointer transition-colors duration-200 hover:bg-background focus:outline-2 focus:outline-primary focus:outline-offset-[-2px]"
            role="menuitem"
          >
            Account settings
          </button>
        </div>
      )}
    </div>
  );
}
