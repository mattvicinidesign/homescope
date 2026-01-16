export interface Contact {
  id: string;
  date: string;
  name: string;
  property: string;
  role: 'Buyer' | 'Seller' | 'Inspector' | 'Lender' | 'Attorney' | 'Contractor';
  status: 'Active' | 'Pending' | 'Completed';
  contact?: string; // Phone or email
}
