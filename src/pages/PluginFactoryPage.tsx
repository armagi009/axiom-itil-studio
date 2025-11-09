import { motion } from "framer-motion";
import { AgentCard } from "@/components/AgentCard";
import { agentCards } from "@/lib/mockData";
export function PluginFactoryPage() {
  return (
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
        {agentCards.map((agent, index) => (
          <AgentCard key={agent.id} {...agent} index={index} />
        ))}
      </div>
    </div>
  );
}