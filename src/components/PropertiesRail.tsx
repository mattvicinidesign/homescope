import { useState, useMemo } from 'react';
import '../styles.css';

export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  inspectionCount?: number;
  lastInspectionDate?: string;
}

interface PropertiesRailProps {
  properties: Property[];
  activePropertyId: string | null;
  onSelectProperty: (propertyId: string) => void;
}

export default function PropertiesRail({ properties, activePropertyId, onSelectProperty }: PropertiesRailProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = useMemo(() => {
    if (!searchQuery.trim()) return properties;
    const query = searchQuery.toLowerCase();
    return properties.filter(
      (prop) =>
        prop.address.toLowerCase().includes(query) ||
        prop.city.toLowerCase().includes(query) ||
        prop.state.toLowerCase().includes(query) ||
        prop.zipCode.includes(query)
    );
  }, [properties, searchQuery]);

  return (
    <div className="properties-rail">
      <div className="properties-rail__header">
        <h2 className="properties-rail__title">Properties</h2>
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="properties-rail__search"
        />
      </div>
      <div className="properties-rail__list">
        {filteredProperties.length === 0 ? (
          <div className="properties-rail__empty">
            <p className="font-sans text-sm font-normal text-muted">
              {searchQuery ? 'No properties found' : 'No properties'}
            </p>
          </div>
        ) : (
          filteredProperties.map((property) => (
            <button
              key={property.id}
              onClick={() => onSelectProperty(property.id)}
              className={`property-card ${
                activePropertyId === property.id ? 'property-card--active' : ''
              }`}
            >
              <div className="property-card__address">
                <p className="font-sans text-sm font-semibold text-text">{property.address}</p>
                <p className="font-sans text-xs font-normal text-muted">
                  {property.city}, {property.state} {property.zipCode}
                </p>
              </div>
              {property.inspectionCount !== undefined && (
                <p className="font-sans text-xs font-normal text-muted">
                  {property.inspectionCount} inspection{property.inspectionCount !== 1 ? 's' : ''}
                </p>
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}
