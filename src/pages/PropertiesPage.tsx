import type { Property } from '../types/property';

type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface PropertiesPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

interface PropertySummaryCardProps {
  property: Property;
  onClick: () => void;
}

function PropertySummaryCard({ property, onClick }: PropertySummaryCardProps) {
  return (
    <div 
      className="property-summary-card cursor-pointer transition-opacity hover:opacity-80"
      onClick={onClick}
    >
      <div className="property-summary-card__image">
        <div className="property-summary-card__image-placeholder">
          <span className="text-4xl">🏠</span>
        </div>
      </div>
      <div className="property-summary-card__content">
        <div className="property-summary-card__header">
          <h3 className="property-summary-card__address">{property.address}</h3>
          {property.inspectionCount !== undefined && property.inspectionCount > 0 && (
            <span className="property-summary-card__badge">
              {property.inspectionCount} inspection{property.inspectionCount !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <p className="property-summary-card__location">
          {property.city}, {property.state} {property.zipCode}
        </p>
        {property.lastInspectionDate && (
          <p className="property-summary-card__date">
            Last inspection: {property.lastInspectionDate}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage({ currentPage, onNavigate }: PropertiesPageProps) {

  // Placeholder property data - in production this would come from API/user context
  const properties: Property[] = [
    {
      id: '1',
      address: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      inspectionCount: 2,
      lastInspectionDate: '2024-01-15',
    },
    {
      id: '2',
      address: '456 Oak Ave',
      city: 'Somewhere',
      state: 'NY',
      zipCode: '67890',
      inspectionCount: 1,
      lastInspectionDate: '2024-01-10',
    },
    {
      id: '3',
      address: '789 Pine Rd',
      city: 'Elsewhere',
      state: 'TX',
      zipCode: '54321',
      inspectionCount: 0,
    },
  ];

  const handlePropertyClick = (propertyId: string) => {
    // Store selected property for context
    localStorage.setItem('activePropertyId', propertyId);
    // Navigate to property details
    onNavigate('propertyDetails');
  };

  return (
    <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col gap-12">
        <section>
          <h1 className="font-sans text-2xl font-semibold text-text mb-4">Properties</h1>
          <p className="font-sans text-base font-normal text-muted">
            Manage and view all your properties.
          </p>
        </section>

        {properties.length === 0 ? (
          <section className="flex flex-col items-center justify-center py-section-lg text-center max-w-lg mx-auto">
            <h2 className="font-sans text-xl font-semibold text-text mb-4">No properties yet</h2>
            <p className="font-sans text-base font-normal text-muted mb-6">
              Add your first property to get started.
            </p>
            <button
              className="font-sans text-base font-medium px-6 py-3 bg-button-primary-bg text-surface border-0 rounded-md cursor-pointer transition-opacity hover:opacity-90"
            >
              Add Property
            </button>
          </section>
        ) : (
          <section>
            <div className="flex flex-col gap-layout">
              {properties.map((property) => (
                <PropertySummaryCard
                  key={property.id}
                  property={property}
                  onClick={() => handlePropertyClick(property.id)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
  );
}
