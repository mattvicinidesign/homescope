import type { Contact } from '@/types/contact';

export const mockContacts: Readonly<Contact[]> = Object.freeze([
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
]);
