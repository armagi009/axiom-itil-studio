import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
type AgentCardProps = {
  icon: React.ElementType;
  name: string;
  description: string;
  stats: { label: string; value: string }[];
  tags: string[];
  active: boolean;
  index: number;
};
export function AgentCard({
  icon: Icon,
  name,
  description,
  stats,
  tags,
  active,
  index,
}: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative group"
    >
      <div
        className={cn(
          "absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-accent rounded-lg blur-sm opacity-0 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-tilt",
          "dark:opacity-0 dark:group-hover:opacity-75"
        )}
      ></div>
      <Card className="relative h-full flex flex-col bg-card/80 dark:bg-card/60 backdrop-blur-sm transition-all duration-300 group-hover:border-primary/50">
        <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="font-display text-lg font-semibold">
                {name}
              </CardTitle>
              <div className="flex flex-wrap gap-1 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <Switch checked={active} aria-label={`Activate ${name}`} />
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between">
          <p className="text-sm text-muted-foreground mb-6">{description}</p>
          <div className="flex justify-around border-t border-border pt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}