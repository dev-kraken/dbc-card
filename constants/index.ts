import {
  ChevronLeft,
  FilePieChart,
  LayoutDashboard,
  SquareChevronLeft, SquareMenu,
  TabletSmartphone,
  VenetianMask,
} from "lucide-react";

export const homeSidebarLinks = [
  {
    label: "Dashboard",
    route: "/dashboard",
    icon: LayoutDashboard,
    menu: "home",
  },
  {
    label: "Cards",
    route: "/dashboard/cards",
    icon: TabletSmartphone,
    menu: "home",
  },
  {
    label: "Leads",
    route: "/dashboard/leads",
    icon: FilePieChart,
    menu: "home",
  },
  {
    label: "Back to Cards",
    route: "/dashboard/cards",
    icon: SquareChevronLeft,
    menu: "card",
  },
  {
    label: "Select Style",
    route: "/dashboard/cards/[cardId]/select-style",
    icon: FilePieChart,
    menu: "card",
  },
  {
    label: "Profile",
    route: "/dashboard/cards/[cardId]/profile",
    icon: VenetianMask,
    menu: "card",
  },
  {
    label: "Social Media",
    route: "/dashboard/cards/[cardId]/social-media",
    icon: SquareMenu,
    menu: "card",
  },
];
