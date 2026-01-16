/**
 * Get the currently active property ID from the app shell context.
 * This reads from the data attribute set by AgentProShell.
 */
export function getActivePropertyId(): string | null {
  const mainContent = document.querySelector('.agent-pro-shell__main');
  if (!mainContent) return null;
  const propertyId = mainContent.getAttribute('data-active-property-id');
  return propertyId || null;
}
