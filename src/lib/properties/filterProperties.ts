import type { Property } from '@/types/property';

export function filterProperties(properties: Property[], searchQuery: string): Property[] {
  if (!searchQuery.trim()) return properties;
  const query = searchQuery.toLowerCase();
  return properties.filter(
    (prop) =>
      prop.address.toLowerCase().includes(query) ||
      prop.city.toLowerCase().includes(query) ||
      prop.state.toLowerCase().includes(query) ||
      prop.zipCode.includes(query)
  );
}
