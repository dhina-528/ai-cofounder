"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { MilestoneList } from "@/components/dashboard/MilestoneList";
import { TaskList } from "@/components/dashboard/TaskList";
import { AgentStatusWidget } from "@/components/dashboard/AgentStatusWidget";
import { useStartup } from "@/context/StartupContext";

export default function DashboardPage() {
  const { project, milestones } = useStartup();

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-full">
          <ProgressCard project={project} />
          <AgentStatusWidget />
          <MilestoneList milestones={milestones} />
          <TaskList />
        </main>
      </div>

      <Footer />
    </div>
  );
}

