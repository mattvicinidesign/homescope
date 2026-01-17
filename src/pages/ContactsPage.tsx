import { useMemo, useState } from 'react';
import DataTable from '@/components/DataTable';
import type { Column } from '@/types/ui';
import Select from '@/components/Select';
import type { Contact } from '@/types/contact';
import { mockContacts } from '@/lib/mocks/contactMocks';
import { filterContacts, type ContactSort } from '@/lib/contacts/filterContacts';

interface ContactsPageProps {
  onNavigate: (page: 'contacts') => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ContactsPage(_props: ContactsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [property, setProperty] = useState('all');
  const [role, setRole] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState<ContactSort>('recent');

  const properties = useMemo(
    () => Array.from(new Set(mockContacts.map(c => c.property))).sort(),
    []
  );

  const contacts = useMemo(
    () =>
      filterContacts(mockContacts, {
        searchTerm,
        property,
        role,
        dateRange,
        sortBy,
      }),
    [searchTerm, property, role, dateRange, sortBy]
  );

  const resetFilters = () => {
    setSearchTerm('');
    setProperty('all');
    setRole('all');
    setDateRange('all');
    setSortBy('recent');
  };

  const columns: Column<Contact>[] = useMemo(
    () => [
      { id: 'date', label: 'Date', render: c => c.date },
      { id: 'name', label: 'Name', render: c => c.name },
      { id: 'property', label: 'Property', render: c => c.property },
      { id: 'role', label: 'Role', render: c => c.role },
      { id: 'status', label: 'Status', render: c => c.status },
      { id: 'contact', label: 'Contact', render: c => c.contact ?? '—' },
    ],
    []
  );

  const hasActiveFilters =
    searchTerm || property !== 'all' || role !== 'all' || dateRange !== 'all';

  return (
    <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col gap-6">
      <section className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-text mb-2">Contacts</h1>
          <p className="text-muted">
            Contractors and collaborators invited to the app.
          </p>
        </div>
        <button className="px-6 py-3 bg-button-primary-bg text-surface rounded-md hover:opacity-90">
          Add Contact
        </button>
      </section>

      <section className="flex flex-wrap gap-layout items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by name..."
          className="px-4 py-2 border border-border rounded-md bg-surface text-text"
        />

        <Select
          label="Property"
          value={property}
          onChange={setProperty}
          options={[
            { value: 'all', label: 'All Properties' },
            ...properties.map(p => ({ value: p, label: p })),
          ]}
        />

        <Select
          label="Role"
          value={role}
          onChange={setRole}
          options={[
            { value: 'all', label: 'All Roles' },
            { value: 'Buyer', label: 'Buyer' },
            { value: 'Seller', label: 'Seller' },
            { value: 'Inspector', label: 'Inspector' },
            { value: 'Lender', label: 'Lender' },
            { value: 'Attorney', label: 'Attorney' },
            { value: 'Contractor', label: 'Contractor' },
          ]}
        />

        <Select
          label="Date Range"
          value={dateRange}
          onChange={setDateRange}
          options={[
            { value: 'all', label: 'All Time' },
            { value: '7', label: 'Last 7 Days' },
            { value: '30', label: 'Last 30 Days' },
          ]}
        />

        <Select
          label="Sort by"
          value={sortBy}
          onChange={(value) => setSortBy(value as ContactSort)}
          options={[
            { value: 'recent', label: 'Most Recent First' },
            { value: 'name', label: 'Name (A–Z)' },
            { value: 'property', label: 'Property (A–Z)' },
          ]}
        />

        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-sm font-medium text-text hover:opacity-70"
          >
            Reset Filters
          </button>
        )}
      </section>

      <section>
        <DataTable
          columns={columns}
          data={contacts}
          emptyMessage={
            hasActiveFilters
              ? 'No contacts match your filters.'
              : 'No contacts yet.'
          }
          emptyActionLabel={hasActiveFilters ? 'Reset Filters' : 'Add Contact'}
          onEmptyAction={hasActiveFilters ? resetFilters : undefined}
        />
      </section>
    </main>
  );
}
