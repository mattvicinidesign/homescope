import { useEffect, useRef, ReactNode } from 'react';
import type { Issue } from '../types/issue';
import '../styles.css';

interface FullScreenOverlayProps {
  issue: Issue | null;
  onClose: () => void;
  children: ReactNode;
}

export default function FullScreenOverlay({ issue, onClose, children }: FullScreenOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Handle ESC key to close
  useEffect(() => {
    if (!issue) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [issue, onClose]);

  // Focus trap
  useEffect(() => {
    if (!issue || !contentRef.current) return;

    const focusableElements = contentRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    firstElement?.focus();
    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [issue]);

  // Prevent body scroll when overlay is open
  useEffect(() => {
    if (issue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [issue]);

  if (!issue) return null;

  return (
    <div
      ref={overlayRef}
      className="full-screen-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="overlay-title"
    >
      <div className="full-screen-overlay__content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
