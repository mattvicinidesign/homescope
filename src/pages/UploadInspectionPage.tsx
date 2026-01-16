type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface UploadInspectionPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function UploadInspectionPage({ currentPage, onNavigate }: UploadInspectionPageProps) {

  const handleFileSelect = () => {
    // Navigate to processing page
    onNavigate('processing');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // Navigate to processing page
    onNavigate('processing');
  };

  return (
    <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col items-center justify-center min-h-[60vh]">
        <section className="flex flex-col items-center text-center max-w-lg">
          <h1 className="font-sans text-2xl font-semibold text-text mb-4">Upload Inspection Report</h1>
          <p className="font-sans text-base font-normal text-muted mb-8">
            Upload a home inspection PDF. HomeScope will analyze it and summarize key issues.
          </p>

          <div
            className="border-2 border-dashed border-border rounded-md p-12 w-full max-w-md mb-6 cursor-pointer transition-opacity hover:opacity-70 bg-surface"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleFileSelect}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="text-4xl">📄</div>
              <div className="flex flex-col items-center gap-2">
                <p className="font-sans text-base font-medium text-text">Drop PDF here</p>
                <p className="font-sans text-sm font-normal text-muted">or</p>
                <button className="font-sans text-base font-medium px-6 py-3 bg-button-primary-bg text-surface border-0 rounded-md cursor-pointer transition-opacity hover:opacity-90">
                  Choose PDF
                </button>
              </div>
            </div>
          </div>

          <p className="font-sans text-sm font-normal text-muted">
            Most reports are processed in a few moments.
          </p>
        </section>
    </main>
  );
}
