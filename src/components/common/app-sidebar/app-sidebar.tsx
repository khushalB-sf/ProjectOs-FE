import { LogOut, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";

import { cn, getInitials } from "@/lib/utils";
import { useProject } from "@/contexts/useProject";
import { useMeetings } from "@/hooks/meetings/queries";
import { useProposal } from "@/hooks/proposal/queries";
import { useRequirements } from "@/hooks/requirements/queries";
import { LABELS } from "@/constants/labels";
import { NAV_ITEMS, type NavBadge, type NavItemConfig } from "@/constants/nav";
import { ROUTES } from "@/constants/routes";
import { toProposal } from "@/types/proposal";

import { NavBadgeChip, NavBadgeSkeleton } from "./nav-badge-chip";
import { ProjectSwitcher } from "./project-switcher";

interface AppSidebarProps {
  onLogout: () => void;
}

/**
 * AppSidebar — slate-900 rail: logo, project selector, primary nav, user footer.
 * Mirrors the prototype's <aside>.
 */
function resolveBadge(
  item: NavItemConfig,
  requirementsCount: number | undefined,
  proposalBadge: NavBadge | undefined,
  meetingsCount: number | undefined,
) {
  if (item.to === ROUTES.REQUIREMENTS && requirementsCount !== undefined) {
    return { label: String(requirementsCount), tone: "primary" as const };
  }
  if (item.to === ROUTES.PROPOSAL && proposalBadge) {
    return proposalBadge;
  }
  if (item.to === ROUTES.MEETINGS && meetingsCount !== undefined) {
    return { label: String(meetingsCount), tone: "medium" as const };
  }
  return item.badge;
}

/** Whether the nav item's live badge data is still on its first fetch. */
function isBadgeLoading(
  item: NavItemConfig,
  isRequirementsLoading: boolean,
  isProposalLoading: boolean,
  isMeetingsLoading: boolean,
) {
  if (item.to === ROUTES.REQUIREMENTS) return isRequirementsLoading;
  if (item.to === ROUTES.PROPOSAL) return isProposalLoading;
  if (item.to === ROUTES.MEETINGS) return isMeetingsLoading;
  return false;
}

/** Renders the nav item's badge slot: loading skeleton, live/static badge, or nothing. */
function NavItemBadge({
  loading,
  badge,
}: {
  loading: boolean;
  badge: NavBadge | undefined;
}) {
  if (loading) return <NavBadgeSkeleton />;
  if (badge) return <NavBadgeChip badge={badge} />;
  return null;
}

function AppSidebar({ onLogout }: AppSidebarProps) {
  const nav = LABELS.NAV;
  const { projectId } = useProject();
  const { data: requirements, isLoading: isRequirementsLoading } =
    useRequirements(projectId);
  const { data: proposalResponse, isLoading: isProposalLoading } =
    useProposal(projectId);
  const { data: meetings, isLoading: isMeetingsLoading } =
    useMeetings(projectId);
  const proposal = proposalResponse ? toProposal(proposalResponse) : undefined;
  const proposalBadge: NavBadge | undefined = proposal
    ? { label: proposal.statusLabel, tone: proposal.statusTone }
    : undefined;

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 px-4 py-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            {nav.BRAND}
          </span>
        </div>
      </div>

      <div className="border-b border-slate-800 px-3 py-3">
        <ProjectSwitcher />
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const badge = resolveBadge(
            item,
            requirements?.length,
            proposalBadge,
            meetings?.length,
          );
          const loading = isBadgeLoading(
            item,
            isRequirementsLoading,
            isProposalLoading,
            isMeetingsLoading,
          );
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white",
                )
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
              <NavItemBadge loading={loading} badge={badge} />
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 px-3 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
            {getInitials(nav.USER_NAME)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {nav.USER_NAME}
            </p>
            <p className="truncate text-xs text-slate-500">{nav.USER_ROLE}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            aria-label={nav.LOGOUT}
            className="text-slate-500 hover:text-slate-300"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export { AppSidebar };
