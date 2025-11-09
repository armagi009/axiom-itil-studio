import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  AlertTriangle,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { motion } from "framer-motion";
import {
  kpiData,
  activityData,
  savingsChartData,
  agentPerformanceData,
} from "@/lib/mockData";
import { cn } from "@/lib/utils";
const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f97316"];
export function DashboardPage() {
  return (
    <div className="flex-1 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold font-display tracking-tight">
          Studio Dashboard
        </h2>
        <p className="text-muted-foreground">
          Real-time overview of your autonomous operations.
        </p>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span
                    className={cn(
                      "flex items-center",
                      kpi.changeType === "increase"
                        ? "text-green-500"
                        : "text-red-500"
                    )}
                  >
                    {kpi.changeType === "increase" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4" />
                    )}
                    {kpi.change}
                  </span>
                  {kpi.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Cost Savings Over Time</CardTitle>
              <CardDescription>
                Monthly automated savings from agent activity.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={savingsChartData}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorSavings)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-3"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Agent Activity</CardTitle>
              <CardDescription>
                A live feed of autonomous actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activityData.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 mr-4">
                      <activity.icon
                        className={cn("h-4 w-4", activity.color)}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.agent}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action}
                      </p>
                    </div>
                    <p className="ml-auto text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}