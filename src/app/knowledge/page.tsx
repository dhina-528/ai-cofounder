import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { KnowledgeCenter } from "@/components/knowledge/KnowledgeCenter";

export const metadata = {
  title: "AI-Clone & Org Knowledge – 4-Layer Foundation",
  description:
    "Configure company identity, brand voice, and founder decision principles that guide all autonomous co-founder agents.",
};

export default function KnowledgePage() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Navbar />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <DashboardSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 overflow-y-auto max-w-full">
          <KnowledgeCenter />
        </main>
      </div>

      <Footer />
    </div>
  );
}
