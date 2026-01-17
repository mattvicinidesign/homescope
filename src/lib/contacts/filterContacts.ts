import type { Contact } from '@/types/contact';

export type ContactSort = 'recent' | 'name' | 'property';

interface FilterParams {
  searchTerm: string;
  property: string;
  role: string;
  dateRange: string;
  sortBy: ContactSort;
}

export function filterContacts(
  contacts: ReadonlyArray<Contact>,
  params: FilterParams
): Contact[] {
  const { searchTerm, property, role, dateRange, sortBy } = params;

  const filtered = contacts.filter(contact => {
    if (
      searchTerm &&
      !contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    if (property !== 'all' && contact.property !== property) {
      return false;
    }

    if (role !== 'all' && contact.role !== role) {
      return false;
    }

    if (dateRange !== 'all') {
      const contactDate = new Date(contact.date);
      const daysDiff =
        (Date.now() - contactDate.getTime()) / (1000 * 60 * 60 * 24);

      if (dateRange === '7' && daysDiff > 7) return false;
      if (dateRange === '30' && daysDiff > 30) return false;
    }

    return true;
  });

  return [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'property':
        return a.property.localeCompare(b.property);
      case 'recent':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });
}
