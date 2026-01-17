import type { Property } from '@/types/property';
import type { Issue } from '@/types/issue';

export const mockProperties: Readonly<Property[]> = Object.freeze([
  {
    id: '1',
    address: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    inspectionCount: 2,
    lastInspectionDate: '2024-01-15',
    createdAt: '2023-12-01',
  },
  {
    id: '2',
    address: '456 Oak Ave',
    city: 'Somewhere',
    state: 'NY',
    zipCode: '67890',
    inspectionCount: 1,
    lastInspectionDate: '2024-01-10',
    createdAt: '2024-01-05',
  },
  {
    id: '3',
    address: '789 Pine Rd',
    city: 'Elsewhere',
    state: 'TX',
    zipCode: '54321',
    inspectionCount: 0,
    createdAt: '2023-11-15',
  },
]);

export const mockIssues: Readonly<Issue[]> = Object.freeze([
  {
    id: '1',
    title: 'Electrical Panel Hazards',
    severity: 'Safety',
    description: 'Exposed wiring and outdated breakers.',
    details: {
      whatThisMeans: 'Electrical hazards pose immediate safety risks.',
      whyItMatters: ['Fire risk', 'Electrocution hazard', 'Code violation'],
      recommendation: 'Hire licensed electrician for immediate repair.',
    },
  },
  {
    id: '2',
    title: 'Carbon Monoxide Detector Missing',
    severity: 'Safety',
    description: 'No carbon monoxide detectors present.',
    details: {
      whatThisMeans: 'Missing critical safety equipment.',
      whyItMatters: ['Life-threatening risk', 'Required by code', 'Undetectable gas'],
      recommendation: 'Install CO detectors on each level.',
    },
  },
  {
    id: '3',
    title: 'Roof Shingle Damage',
    severity: 'Repair',
    description: 'Missing or damaged shingles.',
    details: {
      whatThisMeans: 'Roof protection compromised.',
      whyItMatters: ['Water intrusion risk', 'Reduced lifespan', 'Aesthetic concern'],
      recommendation: 'Schedule roof inspection and repairs.',
    },
  },
  {
    id: '4',
    title: 'Minor Foundation Cracks',
    severity: 'Monitor',
    description: 'Hairline cracks observed.',
    details: {
      whatThisMeans: 'Minor foundation movement may be occurring.',
      whyItMatters: ['Structural stability', 'Moisture entry', 'Future repairs'],
      recommendation: 'Monitor and seal cracks.',
    },
  },
  {
    id: '5',
    title: 'Aging Water Heater',
    severity: 'Monitor',
    description: 'Approaching end-of-life.',
    details: {
      whatThisMeans: 'Water heater near expected replacement age.',
      whyItMatters: ['Efficiency loss', 'Failure risk', 'Energy costs'],
      recommendation: 'Plan for replacement in next 1-2 years.',
    },
  },
  {
    id: '6',
    title: 'HVAC System Age',
    severity: 'Info',
    description: 'System is 8 years old.',
    details: {
      whatThisMeans: 'HVAC system is in mid-life stage.',
      whyItMatters: ['Maintenance needs', 'Efficiency', 'Replacement planning'],
      recommendation: 'Continue regular maintenance.',
    },
  },
]);

export const mockRecentReports = Object.freeze([
  {
    id: '1',
    address: '123 Main St, Anytown, CA',
    date: '2024-01-15',
    status: 'Processed',
  },
  {
    id: '2',
    address: '456 Oak Ave, Somewhere, NY',
    date: '2024-01-10',
    status: 'Processed',
  },
  {
    id: '3',
    address: '789 Pine Rd, Elsewhere, TX',
    date: '2024-01-05',
    status: 'Processed',
  },
]);

export const homeMocks = {
  properties: mockProperties,
  issues: mockIssues,
  recentReports: mockRecentReports,
};
