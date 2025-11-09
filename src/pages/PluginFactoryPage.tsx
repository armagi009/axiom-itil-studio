import { useEffect } from "react";
import { motion } from "framer-motion";
import { AgentCard } from "@/components/AgentCard";
import { AgentConfigSheet } from "@/components/AgentConfigSheet";
import { useStudioStore } from "@/stores/useStudioStore";
import { Skeleton } from "@/components/ui/skeleton";
export function PluginFactoryPage() {
  const openSheet = useStudioStore((state) => state.openSheet);
  const agents = useStudioStore((state) => state.agents);
  const isLoading = useStudioStore((state) => state.isLoading);
  const fetchAgents = useStudioStore((state) => state.fetchAgents);
  useEffect(() => {
    // Fetch agents only if the list is empty
    if (agents.length === 0) {
      fetchAgents();
    }
  }, [fetchAgents, agents.length]);
  const handleCardClick = (agentId: string) => {
    openSheet(agentId);
  };
  return (
    <>
      <div className="flex-1 space-y-8">
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
          {isLoading && agents.length === 0
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
                  icon={agent.icon} // Pass icon name as a string
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