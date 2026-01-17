/**
 * Centralized storage keys for localStorage
 * Ensures consistency and prevents key collisions
 */
export const STORAGE_KEYS = {
  theme: 'theme',
  activePropertyId: 'activePropertyId',
  selectedIssue: 'selectedIssue',
  inspectionProcessed: 'inspectionProcessed',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
