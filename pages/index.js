'use client';
import { useContext } from "react";
import { UserContext } from "@lib/context"; // assumes you have exported UserContext
import { TopNav } from "@components/TopNav";
import { SideNav } from "@components/SideNav";
import { AppointmentPanel } from "@components/AppointmentPanel";
import { StatusCard } from "@components/StatusCard";
import { FooterNav } from "@components/FooterNav";
import  SignInLanding  from "@components/SignInLanding";

export default function Home() {
  const { user } = useContext(UserContext);

  if (!user) {
    // ── Public sign‑in splash ────────────────────────────────────────────────
    return <SignInLanding />;
  }

  // ── Authenticated dashboard (original UI) ─────────────────────────────────
  return (
    <div className="flex flex-col h-screen">
      <TopNav />
      <main className="flex flex-1 overflow-hidden">
        <SideNav />
        <AppointmentPanel />
        <section className="flex-1 overflow-x-auto overflow-y-hidden py-10 px-8 bg-gray-50">
          <h2 className="text-xl font-semibold mb-8 max-w-4xl">
            Visa to study with conditional/unconditional admission to a university or with unconditional admission to a preparatory college
          </h2>
          <div className="flex gap-6">
            <StatusCard title="Your entry form" subtitle="Requirements fulfilled" completed actionLabel="VIEW FORM" />
            <StatusCard title="Your application (VIDEX)" completedSections="6 / 6" completed actionLabel="VIEW APPLICATION" />
            <StatusCard title="Your documents" subtitle="Uploaded" completed actionLabel="VIEW DOCUMENTS" />
          </div>
        </section>
      </main>
      <FooterNav />
    </div>
  );
}
