import {
  AlertTriangle,
  FileStack,
  FileText,
  LayoutDashboard,
  type LucideIcon,
  ScrollText,
  Users,
  Video,
} from "lucide-react";

import { ROUTES } from "@/constants/routes";

import type { StatusTone } from "@/types/common";

export interface NavBadge {
  label: string;
  tone: StatusTone | "primary";
}

export interface NavItemConfig {
  to: string;
  label: string;
  icon: LucideIcon;
  /** Page title shown in the topbar. */
  title: string;
  /** Optional count/status chip on the right of the nav item. */
  badge?: NavBadge;
}

export const NAV_ITEMS: NavItemConfig[] = [
  {
    to: ROUTES.DASHBOARD,
    label: "Dashboard",
    icon: LayoutDashboard,
    title: "Dashboard",
  },
  {
    to: ROUTES.REQUIREMENTS,
    label: "Requirements",
    icon: FileText,
    title: "Requirement Intelligence",
    badge: { label: "24", tone: "primary" },
  },
  {
    to: ROUTES.PROPOSAL,
    label: "Proposal",
    icon: FileStack,
    title: "Proposal & Estimation",
    badge: { label: "Ready", tone: "low" },
  },
  {
    to: ROUTES.PLANNER,
    label: "Planner",
    icon: ScrollText,
    title: "AI Project Planner",
  },
  {
    to: ROUTES.MEETINGS,
    label: "Meetings",
    icon: Video,
    title: "Meeting Intelligence",
    badge: { label: "2", tone: "medium" },
  },
  {
    to: ROUTES.RISK,
    label: "Risk",
    icon: AlertTriangle,
    title: "Risk Prediction",
    badge: { label: "HIGH", tone: "critical" },
  },
  {
    to: ROUTES.RESOURCES,
    label: "Resources",
    icon: Users,
    title: "Resource Allocation",
  },
];
