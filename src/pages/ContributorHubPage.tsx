import { motion } from "framer-motion";
import { Users } from "lucide-react";
export function ContributorHubPage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center space-y-8 p-4 md:p-8 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
      >
        <Users className="h-12 w-12 text-primary" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold font-display tracking-tight">
          Contributor Hub
        </h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Coming soon! A gamified portal for human-in-the-loop data labeling to continuously improve AI accuracy.
        </p>
      </motion.div>
    </div>
  );
}