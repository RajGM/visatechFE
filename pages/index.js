import { TopNav } from "@components/TopNav";
import { SideNav } from "@components/SideNav";
import { AppointmentPanel } from "@components/AppointmentPanel";
import { StatusCard } from "@components/StatusCard";
import { FooterNav } from "@components/FooterNav";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <TopNav />

      <main className="flex flex-1 overflow-hidden">
        {/* Collapsed side icon nav */}
        <SideNav />

        {/* Left Appointment Sidebar */}
        <AppointmentPanel />

        {/* Scrollable Main Content */}
        <section className="flex-1 overflow-x-auto overflow-y-hidden py-10 px-8 bg-gray-50">
          <h2 className="text-xl font-semibold mb-8 max-w-4xl">
            Visa to study with conditional/unconditional admission to a university or with unconditional admission to a preparatory college
          </h2>

          <div className="flex gap-6">
            <StatusCard
              title="Your entry form"
              subtitle="Requirements fulfilled"
              completed={true}
              actionLabel="VIEW FORM"
            />

            <StatusCard
              title="Your application (VIDEX)"
              completedSections="6 / 6"
              actionLabel="VIEW APPLICATION"
              completed={true}
            />

            <StatusCard
              title="Your documents"
              subtitle="Uploaded"
              actionLabel="VIEW DOCUMENTS"
              completed={true}
            />

            {/* Add more <StatusCard/> components as needed */}
          </div>
        </section>
      </main>

      <FooterNav />
    </div>
  );
}
