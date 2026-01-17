import { useState, useMemo } from 'react';
import type { Property } from '@/types/property';
import { filterProperties } from '@/lib/properties/filterProperties';

interface PropertiesRailProps {
  properties: Property[];
  activePropertyId: string | null;
  onSelectProperty: (propertyId: string) => void;
}

export default function PropertiesRail({ properties, activePropertyId, onSelectProperty }: PropertiesRailProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProperties = useMemo(
    () => filterProperties(properties, searchQuery),
    [properties, searchQuery]
  );

  const isActive = (propertyId: string) => activePropertyId === propertyId;

  return (
    <div className="flex flex-col h-full w-[var(--properties-rail-width)] bg-surface border-r border-border">
      <div className="flex flex-col gap-2 p-container-y border-b border-border">
        <h2 className="text-base font-semibold text-text m-0">Properties</h2>
        <input
          type="text"
          placeholder="Search properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-sm font-normal text-text bg-surface border border-border rounded-md px-3 py-2 placeholder:text-muted focus:outline-none focus:border-primary"
        />
      </div>
      <div className="flex flex-col overflow-y-auto">
        {filteredProperties.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-sm text-muted m-0">
              {searchQuery ? 'No properties found' : 'No properties'}
            </p>
          </div>
        ) : (
          filteredProperties.map((property) => (
            <button
              key={property.id}
              onClick={() => onSelectProperty(property.id)}
              className={`w-full text-left cursor-pointer transition-all duration-200 border-b border-border last:border-b-0 ${
                isActive(property.id)
                  ? 'bg-primary border-primary [&_p]:text-surface'
                  : 'bg-background hover:border-primary hover:bg-surface'
              }`}
            >
              <div className="flex flex-col gap-2 p-3">
                <div className="flex flex-col mb-2">
                  <p className="text-sm font-semibold text-text m-0">{property.address}</p>
                  <p className="text-xs text-muted m-0">
                    {property.city}, {property.state} {property.zipCode}
                  </p>
                </div>
                {property.inspectionCount !== undefined && (
                  <p className="text-xs text-muted m-0">
                    {property.inspectionCount} inspection{property.inspectionCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
