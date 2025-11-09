import {
  LayoutDashboard,
  Bot,
  Banknote,
  Users,
  Settings,
  LifeBuoy,
  Atom,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
const menuItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/plugins", icon: Bot, label: "Plugin Factory" },
  { path: "/savings", icon: Banknote, label: "Savings Ledger" },
  { path: "/contributors", icon: Users, label: "Contributor Hub" },
];
const bottomMenuItems = [
  { path: "/settings", icon: Settings, label: "Settings" },
  { path: "/support", icon: LifeBuoy, label: "Support" },
];
export function AxiomSidebar(): JSX.Element {
  const location = useLocation();
  const renderMenuItem = (item: { path: string; icon: React.ElementType; label: string }) => {
    const isActive = location.pathname === item.path;
    return (
      <SidebarMenuItem key={item.path}>
        <SidebarMenuButton asChild isActive={isActive} className={cn(isActive && "shadow-glow shadow-primary/40")}>
          <Link to={item.path}>
            <item.icon className="h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };
  return (
    <Sidebar className="dark">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-accent",
            "shadow-lg shadow-primary/30"
          )}>
            <Atom className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold text-foreground">
            Axiom Studio
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-grow">
        <SidebarMenu>{menuItems.map(renderMenuItem)}</SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>{bottomMenuItems.map(renderMenuItem)}</SidebarMenu>
        <div className="px-4 pt-4 text-xs text-muted-foreground">
          Built with ❤️ at Cloudflare
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}