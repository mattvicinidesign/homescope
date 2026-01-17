import type { Page } from '@/types/ui';

interface DocumentsPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function DocumentsPage({ onNavigate }: DocumentsPageProps) {

  const documents = [
    { id: '1', name: 'Inspection Report - 123 Main St', address: '123 Main St, Anytown, ST', date: '2024-01-15', status: 'Processed' },
    { id: '2', name: 'Inspection Report - 456 Oak Ave', address: '456 Oak Ave, Somewhere, ST', date: '2024-01-10', status: 'Processed' },
    { id: '3', name: 'Inspection Report - 789 Pine Rd', address: '789 Pine Rd, Elsewhere, ST', date: '2024-01-05', status: 'Processing' },
  ];

  return (
    <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col gap-12">
        <section>
          <h1 className="font-sans text-2xl font-semibold text-text mb-4">Documents</h1>
          <p className="font-sans text-base font-normal text-muted">
            All uploaded inspection reports.
          </p>
        </section>

        <section>
          <div className="border border-border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-surface border-b border-border">
                <tr>
                  <th className="px-container-x py-container-y text-left font-sans text-sm font-semibold text-text">Report name</th>
                  <th className="px-container-x py-container-y text-left font-sans text-sm font-semibold text-text">Address</th>
                  <th className="px-container-x py-container-y text-left font-sans text-sm font-semibold text-text">Date uploaded</th>
                  <th className="px-container-x py-container-y text-left font-sans text-sm font-semibold text-text">Status</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-border cursor-pointer transition-opacity hover:opacity-80"
                    onClick={() => onNavigate('summary')}
                  >
                    <td className="px-container-x py-container-y font-sans text-base font-normal text-text">{doc.name}</td>
                    <td className="px-container-x py-container-y font-sans text-base font-normal text-text">{doc.address}</td>
                    <td className="px-container-x py-container-y font-sans text-base font-normal text-text">{doc.date}</td>
                    <td className="px-container-x py-container-y font-sans text-base font-normal text-text">{doc.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
    </main>
  );
}
