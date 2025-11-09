import { useEffect } from "react";
import { motion } from "framer-motion";
import { AgentCard } from "@/components/AgentCard";
import { AgentConfigSheet } from "@/components/AgentConfigSheet";
import { useStudioStore } from "@/stores/useStudioStore";
import { Skeleton } from "@/components/ui/skeleton";
import * as LucideIcons from "lucide-react";
type IconName = keyof typeof LucideIcons;
export function PluginFactoryPage() {
  const openSheet = useStudioStore((state) => state.openSheet);
  const agents = useStudioStore((state) => state.agents);
  const isLoading = useStudioStore((state) => state.isLoading);
  const fetchAgents = useStudioStore((state) => state.fetchAgents);
  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);
  const handleCardClick = (agentId: string) => {
    openSheet(agentId);
  };
  const getIconComponent = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as IconName];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : <LucideIcons.Bot className="h-6 w-6" />;
  };
  return (
    <>
      <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold font-display tracking-tight">
            Plugin Factory
          </h2>
          <p className="text-muted-foreground">
            Configure and manage your autonomous ITIL agents.
          </p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-[280px] rounded-lg" />
              ))
            : agents.map((agent, index) => (
                <AgentCard
                  key={agent.id}
                  id={agent.id}
                  name={agent.name}
                  description={agent.description}
                  stats={agent.stats}
                  tags={agent.tags}
                  active={agent.active}
                  icon={LucideIcons[agent.icon as IconName] || LucideIcons.Bot}
                  index={index}
                  onClick={handleCardClick}
                />
              ))}
        </div>
      </div>
      <AgentConfigSheet />
    </>
  );
}