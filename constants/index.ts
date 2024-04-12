import { FilePieChart, LayoutDashboard, TabletSmartphone } from "lucide-react";

export const homeSidebarLinks = [
  {
    label: "Dashboard",
    route: "/dashboard",
    icons: LayoutDashboard,
  },
  {
    label: "Cards",
    route: "/dashboard/cards",
    icons: TabletSmartphone,
  },
  {
    label: "Leads",
    route: "/dashboard/leads",
    icons: FilePieChart,
  },
];
