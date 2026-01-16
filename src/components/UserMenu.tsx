import { useState, useEffect, useRef } from 'react';
import { currentUser } from '../config/user';
import '../styles.css';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

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
    <div className="user-menu">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="user-menu__button"
        aria-label="User menu"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="user-menu__avatar">👤</span>
      </button>
      {isOpen && (
        <div
          ref={menuRef}
          className="user-menu__dropdown"
          role="menu"
        >
          <div className="user-menu__user-info">
            <p className="user-menu__email">{currentUser.email}</p>
            <p className="user-menu__role">{currentUser.role}</p>
          </div>
          <div className="user-menu__divider"></div>
          <div className="user-menu__item-wrapper">
            <button
              onClick={toggleAppearance}
              className="user-menu__item user-menu__item--has-submenu"
              role="menuitem"
              aria-expanded={isAppearanceOpen}
            >
              Appearance
              <span className="user-menu__submenu-indicator">◀</span>
            </button>
            {isAppearanceOpen && (
              <div
                ref={appearanceRef}
                className="user-menu__submenu"
                role="menu"
              >
                <button
                  onClick={() => handleThemeSelect('light')}
                  className={`user-menu__submenu-item ${!isDark ? 'user-menu__submenu-item--selected' : ''}`}
                  role="menuitemradio"
                  aria-checked={!isDark}
                >
                  Light
                  {!isDark && <span className="user-menu__checkmark">✓</span>}
                </button>
                <button
                  onClick={() => handleThemeSelect('dark')}
                  className={`user-menu__submenu-item ${isDark ? 'user-menu__submenu-item--selected' : ''}`}
                  role="menuitemradio"
                  aria-checked={isDark}
                >
                  Dark
                  {isDark && <span className="user-menu__checkmark">✓</span>}
                </button>
              </div>
            )}
          </div>
          <button
            onClick={handleAccountSettings}
            className="user-menu__item"
            role="menuitem"
          >
            Account settings
          </button>
        </div>
      )}
    </div>
  );
}
