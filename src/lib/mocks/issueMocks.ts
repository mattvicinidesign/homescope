import type { Issue } from '@/types/issue';

/**
 * Mock issues for Inspection Summary page
 * These are the full detailed issues shown in the summary view
 */
export const mockInspectionIssues: Readonly<Issue[]> = Object.freeze([
  {
    id: '1',
    title: 'Electrical Panel Hazards',
    severity: 'Safety',
    description: 'Exposed wiring and outdated circuit breakers present fire and shock risks. Immediate professional evaluation recommended.',
    details: {
      whatThisMeans: 'The electrical panel contains exposed wiring and outdated circuit breakers that may not provide adequate protection against electrical overloads or short circuits.',
      whyItMatters: [
        'Exposed wiring increases the risk of electrical shock and fire hazards',
        'Outdated breakers may fail to trip during electrical faults, leading to potential fires',
        'This poses immediate safety risks to occupants and the property'
      ],
      recommendation: 'Contact a licensed electrician immediately for a comprehensive evaluation and necessary repairs. Do not attempt to use the panel until it has been inspected and deemed safe.',
      location: 'Basement / Electrical panel'
    }
  },
  {
    id: '2',
    title: 'Carbon Monoxide Detector Missing',
    severity: 'Safety',
    description: 'No carbon monoxide detectors found in the home. Installation required for safety compliance.',
    details: {
      whatThisMeans: 'The home does not have carbon monoxide detectors installed, which are required for safety and may be required by local building codes.',
      whyItMatters: [
        'Carbon monoxide is a colorless, odorless gas that can be fatal',
        'Gas appliances, furnaces, and fireplaces can produce carbon monoxide',
        'Without detectors, occupants may not be aware of dangerous levels'
      ],
      recommendation: 'Install carbon monoxide detectors on each level of the home, especially near bedrooms and gas-burning appliances. Test them monthly and replace batteries as needed.',
      location: 'Throughout home'
    }
  },
  {
    id: '3',
    title: 'Roof Shingle Damage',
    severity: 'Repair',
    description: 'Multiple missing and damaged shingles observed. Repairs needed to prevent water intrusion and further deterioration.',
    details: {
      whatThisMeans: 'Several roof shingles are missing or damaged, which compromises the roof\'s ability to protect the home from water damage.',
      whyItMatters: [
        'Water can penetrate through damaged areas, causing leaks and interior damage',
        'Unrepaired damage can lead to more extensive and costly repairs over time',
        'Moisture can promote mold growth and structural deterioration'
      ],
      recommendation: 'Have a qualified roofer inspect the entire roof and repair or replace damaged shingles. Consider a full roof inspection to identify any underlying issues.',
      location: 'Roof'
    }
  },
  {
    id: '4',
    title: 'Minor Foundation Cracks',
    severity: 'Monitor',
    description: 'Small hairline cracks in foundation walls. No immediate action required, but should be monitored for expansion.',
    details: {
      whatThisMeans: 'Small hairline cracks have been observed in the foundation walls. These are common and may be due to normal settling or minor shrinkage.',
      whyItMatters: [
        'Cracks can allow moisture to enter the foundation',
        'If cracks expand, they may indicate more serious structural issues',
        'Early monitoring helps catch problems before they become costly'
      ],
      recommendation: 'Monitor the cracks over time. If they widen, lengthen, or show signs of water intrusion, consult a structural engineer or foundation specialist.',
      location: 'Foundation walls'
    }
  },
  {
    id: '5',
    title: 'Aging Water Heater',
    severity: 'Monitor',
    description: 'Water heater is approaching typical end-of-life. Monitor for signs of failure and plan for replacement within 2-3 years.',
    details: {
      whatThisMeans: 'The water heater is 8-10 years old and approaching the typical lifespan for residential water heaters, which is generally 10-15 years.',
      whyItMatters: [
        'Older water heaters are more prone to failure and leaks',
        'Replacement before failure allows for planned installation and avoids emergency situations',
        'Newer models are more energy-efficient and can reduce utility costs'
      ],
      recommendation: 'Plan for replacement within the next 2-3 years. Consider energy-efficient models and schedule installation before the unit fails completely.',
      location: 'Basement / Utility area'
    }
  },
  {
    id: '6',
    title: 'HVAC System Age',
    severity: 'Info',
    description: 'Central air conditioning system is 8 years old and functioning normally. Regular maintenance recommended.',
    details: {
      whatThisMeans: 'The HVAC system is in good working condition but is at an age where regular maintenance becomes increasingly important to ensure continued reliable operation.',
      whyItMatters: [
        'Regular maintenance extends the life of the system and improves efficiency',
        'Well-maintained systems operate more reliably and cost less to run',
        'Early detection of issues prevents costly emergency repairs'
      ],
      recommendation: 'Schedule annual maintenance with a qualified HVAC technician. Change filters regularly and keep the system clean to ensure optimal performance.',
      location: 'HVAC system'
    }
  },
]);

/**
 * Mock issues for Property Details page
 * These are simplified issues for the property-specific view
 */
export const mockPropertyIssues: Readonly<Issue[]> = Object.freeze([
  {
    id: '1',
    title: 'Electrical Panel Hazards',
    severity: 'Safety',
    description: 'Exposed wiring and outdated circuit breakers present fire and shock risks. Immediate professional evaluation recommended.',
    details: {
      whatThisMeans: 'The electrical panel contains exposed wiring and outdated circuit breakers.',
      whyItMatters: [
        'Exposed wiring increases the risk of electrical shock and fire hazards',
        'Outdated breakers may fail to trip during electrical faults',
      ],
      recommendation: 'Contact a licensed electrician immediately for evaluation.',
      location: 'Basement / Electrical panel'
    }
  },
  {
    id: '2',
    title: 'Roof Shingle Damage',
    severity: 'Repair',
    description: 'Multiple shingles are missing or damaged, which could lead to water infiltration.',
    details: {
      whatThisMeans: 'The roof has visible damage that may allow water to enter the home.',
      whyItMatters: [
        'Water infiltration can cause interior damage',
        'May lead to mold growth and structural issues',
      ],
      recommendation: 'Have a roofing contractor inspect and repair damaged areas.',
      location: 'Roof'
    }
  },
  {
    id: '3',
    title: 'HVAC System Age',
    severity: 'Monitor',
    description: 'The heating and cooling system is approaching the end of its expected lifespan.',
    details: {
      whatThisMeans: 'The HVAC system is older and may require replacement soon.',
      whyItMatters: [
        'Older systems are less efficient and more prone to breakdowns',
        'Replacement costs can be significant',
      ],
      recommendation: 'Plan for potential replacement within the next few years.',
      location: 'Basement / Utility room'
    }
  },
]);
