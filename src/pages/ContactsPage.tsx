import { useState, useEffect, useMemo } from 'react';
import DataTable from '../components/DataTable';
import type { Column } from '../components/DataTable';
import Select from '../components/Select';
import type { Contact } from '../types/contact';
import '../styles.css';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface ContactsPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function ContactsPage({ currentPage, onNavigate }: ContactsPageProps) {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProperty, setSelectedProperty] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedDateRange, setSelectedDateRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'name' | 'property'>('recent');

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // Placeholder contact data
  const allContacts: Contact[] = [
    {
      id: '1',
      date: '2024-01-15',
      name: 'John Smith',
      property: '123 Main St',
      role: 'Contractor',
      status: 'Active',
      contact: 'john@example.com',
    },
    {
      id: '2',
      date: '2024-01-14',
      name: 'Sarah Johnson',
      property: '456 Oak Ave',
      role: 'Inspector',
      status: 'Active',
      contact: 'sarah@example.com',
    },
    {
      id: '3',
      date: '2024-01-13',
      name: 'Mike Davis',
      property: '123 Main St',
      role: 'Lender',
      status: 'Pending',
      contact: 'mike@example.com',
    },
    {
      id: '4',
      date: '2024-01-12',
      name: 'Emily Brown',
      property: '789 Pine Rd',
      role: 'Buyer',
      status: 'Active',
      contact: 'emily@example.com',
    },
    {
      id: '5',
      date: '2024-01-11',
      name: 'David Wilson',
      property: '456 Oak Ave',
      role: 'Attorney',
      status: 'Completed',
      contact: 'david@example.com',
    },
  ];

  // Get unique properties for filter
  const properties = useMemo(() => {
    const unique = Array.from(new Set(allContacts.map(c => c.property)));
    return unique.sort();
  }, []);

  // Filter and sort contacts
  const filteredAndSortedContacts = useMemo(() => {
    let filtered = allContacts.filter((contact) => {
      // Search filter
      if (searchTerm && !contact.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Property filter
      if (selectedProperty !== 'all' && contact.property !== selectedProperty) {
        return false;
      }

      // Role filter
      if (selectedRole !== 'all' && contact.role !== selectedRole) {
        return false;
      }

      // Date range filter
      if (selectedDateRange !== 'all') {
        const contactDate = new Date(contact.date);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - contactDate.getTime()) / (1000 * 60 * 60 * 24));

        if (selectedDateRange === '7' && daysDiff > 7) return false;
        if (selectedDateRange === '30' && daysDiff > 30) return false;
      }

      return true;
    });

    // Sort
    filtered = [...filtered].sort((a, b) => {
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

    return filtered;
  }, [allContacts, searchTerm, selectedProperty, selectedRole, selectedDateRange, sortBy]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedProperty('all');
    setSelectedRole('all');
    setSelectedDateRange('all');
    setSortBy('recent');
  };

  // Table columns
  const columns: Column<Contact>[] = [
    {
      id: 'date',
      label: 'Date',
      render: (contact) => contact.date,
    },
    {
      id: 'name',
      label: 'Name',
      render: (contact) => contact.name,
    },
    {
      id: 'property',
      label: 'Property',
      render: (contact) => contact.property,
    },
    {
      id: 'role',
      label: 'Role',
      render: (contact) => contact.role,
    },
    {
      id: 'status',
      label: 'Status',
      render: (contact) => contact.status,
    },
    {
      id: 'contact',
      label: 'Contact',
      render: (contact) => contact.contact || '—',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-container-x py-container-y border-b border-border flex justify-between items-center">
        <div></div>
        <button
          className="font-sans text-xl bg-transparent border-0 cursor-pointer p-2 leading-none transition-opacity hover:opacity-70"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col gap-6">
        <section>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="font-sans text-2xl font-semibold text-text mb-4">Contacts</h1>
              <p className="font-sans text-base font-normal text-muted">
                Contractors and collaborators invited to the app.
              </p>
            </div>
            <button
              className="font-sans text-base font-medium px-6 py-3 bg-button-primary-bg text-surface border-0 rounded-md cursor-pointer transition-opacity hover:opacity-90"
            >
              Add Contact
            </button>
          </div>
        </section>

        {/* Filters */}
        <section className="flex flex-col gap-layout">
          <div className="flex flex-wrap gap-layout items-center">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="contacts-filter__search"
            />
            <Select
              label="Property"
              value={selectedProperty}
              onChange={setSelectedProperty}
              options={[
                { value: 'all', label: 'All Properties' },
                ...properties.map(p => ({ value: p, label: p })),
              ]}
            />
            <Select
              label="Role"
              value={selectedRole}
              onChange={setSelectedRole}
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
              value={selectedDateRange}
              onChange={setSelectedDateRange}
              options={[
                { value: 'all', label: 'All Time' },
                { value: '7', label: 'Last 7 Days' },
                { value: '30', label: 'Last 30 Days' },
              ]}
            />
            <Select
              label="Sort by"
              value={sortBy}
              onChange={(value) => setSortBy(value as 'recent' | 'name' | 'property')}
              options={[
                { value: 'recent', label: 'Most Recent First' },
                { value: 'name', label: 'Name (A–Z)' },
                { value: 'property', label: 'Property (A–Z)' },
              ]}
            />
            {(searchTerm || selectedProperty !== 'all' || selectedRole !== 'all' || selectedDateRange !== 'all') && (
              <button
                onClick={handleResetFilters}
                className="font-sans text-sm font-medium text-text cursor-pointer transition-opacity hover:opacity-70"
              >
                Reset Filters
              </button>
            )}
          </div>
        </section>

        {/* Table */}
        <section>
          <DataTable
            columns={columns}
            data={filteredAndSortedContacts}
            emptyMessage={
              searchTerm || selectedProperty !== 'all' || selectedRole !== 'all' || selectedDateRange !== 'all'
                ? 'No contacts match your filters.'
                : 'No contacts yet.'
            }
            emptyActionLabel={
              searchTerm || selectedProperty !== 'all' || selectedRole !== 'all' || selectedDateRange !== 'all'
                ? 'Reset Filters'
                : 'Add Contact'
            }
            onEmptyAction={
              searchTerm || selectedProperty !== 'all' || selectedRole !== 'all' || selectedDateRange !== 'all'
                ? handleResetFilters
                : () => {}
            }
          />
        </section>
      </main>
    </div>
  );
}
