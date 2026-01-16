type Page = 'landing' | 'playground' | 'summary' | 'upload' | 'processing' | 'issueDetails' | 'home' | 'properties' | 'propertyDetails' | 'contacts' | 'settings';

interface SettingsPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function SettingsPage({ currentPage, onNavigate }: SettingsPageProps) {
  return (
    <main className="max-w-container mx-auto w-full px-container-x py-section-lg flex flex-col gap-12">
        <section>
          <h1 className="font-sans text-2xl font-semibold text-text mb-4">Settings</h1>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Appearance</h2>
          <div className="border border-border rounded-md px-container-x py-container-y bg-surface">
            <p className="font-sans text-base font-normal text-muted">
              Theme preferences can be changed via the User Menu in the top navigation.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Notifications</h2>
          <div className="border border-border rounded-md px-container-x py-container-y bg-surface">
            <p className="font-sans text-base font-normal text-muted">
              Notification preferences will be available here.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-sans text-xl font-semibold text-text mb-4">Account</h2>
          <div className="border border-border rounded-md px-container-x py-container-y bg-surface">
            <p className="font-sans text-base font-normal text-muted">
              Account settings will be available here.
            </p>
          </div>
        </section>
    </main>
  );
}
