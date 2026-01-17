import { STORAGE_KEYS, type StorageKey } from './storageKeys';

/**
 * Type-safe localStorage helpers with error handling
 */

/**
 * Get a string value from localStorage
 */
export function getStorageItem(key: StorageKey): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Failed to get localStorage item "${key}":`, error);
    return null;
  }
}

/**
 * Set a string value in localStorage
 */
export function setStorageItem(key: StorageKey, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Failed to set localStorage item "${key}":`, error);
  }
}

/**
 * Remove an item from localStorage
 */
export function removeStorageItem(key: StorageKey): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove localStorage item "${key}":`, error);
  }
}

/**
 * Get and parse a JSON value from localStorage
 */
export function getStorageJson<T>(key: StorageKey): T | null {
  const item = getStorageItem(key);
  if (!item) return null;

  try {
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Failed to parse JSON from localStorage item "${key}":`, error);
    return null;
  }
}

/**
 * Stringify and set a JSON value in localStorage
 */
export function setStorageJson<T>(key: StorageKey, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    setStorageItem(key, serialized);
  } catch (error) {
    console.error(`Failed to serialize JSON for localStorage item "${key}":`, error);
  }
}

/**
 * Domain-specific helpers
 */

export function getTheme(): 'light' | 'dark' | null {
  const theme = getStorageItem(STORAGE_KEYS.theme);
  return theme === 'light' || theme === 'dark' ? theme : null;
}

export function setTheme(theme: 'light' | 'dark'): void {
  setStorageItem(STORAGE_KEYS.theme, theme);
}

export function getActivePropertyId(): string | null {
  return getStorageItem(STORAGE_KEYS.activePropertyId);
}

export function setActivePropertyId(propertyId: string): void {
  setStorageItem(STORAGE_KEYS.activePropertyId, propertyId);
}

export function getSelectedIssue<T>(): T | null {
  return getStorageJson<T>(STORAGE_KEYS.selectedIssue);
}

export function setSelectedIssue<T>(issue: T): void {
  setStorageJson(STORAGE_KEYS.selectedIssue, issue);
}

export function getInspectionProcessed(): boolean {
  return getStorageItem(STORAGE_KEYS.inspectionProcessed) === 'true';
}

export function setInspectionProcessed(processed: boolean): void {
  setStorageItem(STORAGE_KEYS.inspectionProcessed, processed ? 'true' : 'false');
}
