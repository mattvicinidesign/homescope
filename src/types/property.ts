export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  inspectionCount?: number;
  lastInspectionDate?: string;
  createdAt?: string; // ISO date string for "New Properties" calculation
}
