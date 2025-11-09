import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AxiomSidebar } from "@/components/AxiomSidebar";
import { useTheme } from "@/hooks/use-theme";
export function HomePage() {
  const { isDark } = useTheme();
  useEffect(() => {
    // Force dark theme for this application
    if (!isDark) {
      document.documentElement.classList.add('dark');
    }
    return () => {
      // Clean up if needed, though for this app we might always want dark
    }
  }, [isDark]);
  return (
    <div className="dark bg-background text-foreground min-h-screen">
      <SidebarProvider>
        <AxiomSidebar />
        <SidebarInset>
          <div className="absolute left-4 top-4 z-20 md:hidden">
            <SidebarTrigger />
          </div>
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="py-8 md:py-10 lg:py-12">
                <Outlet />
              </div>
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}