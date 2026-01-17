import DealSummaryCard from '../components/DealSummaryCard';
import type { Page } from '@/types/ui';

interface LandingPageProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function LandingPage(_: LandingPageProps) {
  return (
    <>
      <section className="py-section-lg px-container-x text-center">
        <h2 className="font-sans text-2xl font-semibold text-text m-0 mb-4">
          Design System Components
        </h2>
        <p className="font-sans text-lg font-normal text-muted m-0">
          Explore our collection of carefully crafted components
        </p>
      </section>

      <section className="px-container-x py-container-y grid grid-auto-fit-cards gap-layout max-w-container mx-auto w-full">
        <DealSummaryCard
          companyName="Acme Corp"
          seriesLabel="Series B - Healthcare"
          statuses={['Ready', 'Verified', 'Pending']}
        />
        <DealSummaryCard
          companyName="TechStart Inc"
          seriesLabel="Series A - Fintech"
          statuses={['Verified', 'Ready']}
        />
        <DealSummaryCard
          companyName="Innovate Labs"
          seriesLabel="Seed - SaaS"
          statuses={['Pending', 'Ready', 'Verified']}
        />
        <DealSummaryCard
          companyName="Matt Vicini"
          seriesLabel="Series C - Enterprise"
          statuses={['Verified', 'Ready']}
        />
      </section>

      <section className="py-section-lg px-container-x text-center mt-auto">
        <button className="font-sans text-base font-medium px-6 py-3 bg-button-primary-bg text-surface border-0 rounded-md cursor-pointer transition-opacity hover:opacity-90">
          Get Started
        </button>
      </section>
    </>
  );
}
