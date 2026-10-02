import DashboardHeader from "@/components/admin/DashboardHeader";
import StatsCards from "./StatsCards";
import RecentActivity from "./RecentActivity";
import RecentEnquiries from "@/components/admin/RecentEnquiries";
import QuickActions from "./QuickActions";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <section className="space-y-8">
      <DashboardHeader />

      <StatsCards />

      <QuickActions />

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <RecentActivity />
        <RecentEnquiries />
      </div>
    </section>
  );
}