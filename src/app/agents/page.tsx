import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { AgentsHub } from "@/components/agents/AgentsHub";

export const metadata = {
  title: "Autonomous Agents – AI Co-Founder Standing Routines",
  description:
    "Deploy specialized autonomous AI co-founders with standing jobs: customer discovery, competitive triage, MVP scope reduction, and growth engines.",
};

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-full">
          <AgentsHub />
        </main>
      </div>

      <Footer />
    </div>
  );
}
