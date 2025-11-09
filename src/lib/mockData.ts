import {
  Cpu,
  AlertTriangle,
  GitMerge,
  Database,
  Clock,
  Zap,
  ShieldCheck,
  BookOpen,
} from "lucide-react";
export const kpiData = [
  {
    title: "Hours Saved",
    value: "1,204",
    change: "+12.5%",
    changeType: "increase",
    description: "Autonomous actions this month",
  },
  {
    title: "Mean Time To Resolution",
    value: "2.1h",
    change: "-8.2%",
    changeType: "decrease",
    description: "Average incident resolution time",
  },
  {
    title: "Automation ROI",
    value: "$102,340",
    change: "+21.3%",
    changeType: "increase",
    description: "Calculated savings YTD",
  },
  {
    title: "Agent Accuracy",
    value: "98.7%",
    change: "+0.5%",
    changeType: "increase",
    description: "Successful autonomous resolutions",
  },
];
export const activityData = [
  {
    agent: "Pri-1 Triage Goblin",
    action: "Auto-prioritized INC0012345 as P1",
    timestamp: "2m ago",
    icon: AlertTriangle,
    color: "text-red-400",
  },
  {
    agent: "Knowledge Vulture",
    action: "Published new KB article from INC0012321",
    timestamp: "15m ago",
    icon: BookOpen,
    color: "text-blue-400",
  },
  {
    agent: "Change Advisory Bot",
    action: "Bundled 5 low-risk changes for auto-approval",
    timestamp: "45m ago",
    icon: GitMerge,
    color: "text-purple-400",
  },
  {
    agent: "Problem Hunter",
    action: "Identified root cause for recurring server outage",
    timestamp: "1h ago",
    icon: Cpu,
    color: "text-green-400",
  },
  {
    agent: "Self-Help Deflector",
    action: "Ticket deflected via new KB article",
    timestamp: "2h ago",
    icon: ShieldCheck,
    color: "text-yellow-400",
  },
];
export const savingsChartData = [
  { name: "Jan", savings: 4000 },
  { name: "Feb", savings: 3000 },
  { name: "Mar", savings: 5000 },
  { name: "Apr", savings: 4500 },
  { name: "May", savings: 6000 },
  { name: "Jun", savings: 5500 },
];
export const agentPerformanceData = [
    { name: 'Triage Goblin', value: 400 },
    { name: 'Knowledge Vulture', value: 300 },
    { name: 'Change Bot', value: 300 },
    { name: 'Problem Hunter', value: 200 },
];
export const agentCards = [
  {
    id: "incident",
    icon: Zap,
    name: "Incident Triage Goblin",
    description: "Automates incident prioritization and assignment based on impact and urgency.",
    stats: [
      { label: "Incidents Processed", value: "12,408" },
      { label: "Avg. Triage Time", value: "5.2s" },
    ],
    tags: ["Incident Management", "Triage", "Real-time"],
    active: true,
  },
  {
    id: "problem",
    icon: Cpu,
    name: "Problem Hunter",
    description: "Proactively identifies root causes from recurring incidents and trends.",
    stats: [
      { label: "Problems Identified", value: "89" },
      { label: "Avg. Detection Time", value: "48h" },
    ],
    tags: ["Problem Management", "RCA", "Analytics"],
    active: true,
  },
  {
    id: "change",
    icon: GitMerge,
    name: "Change Advisory Bot",
    description: "Automates the approval process for low-risk, standard changes.",
    stats: [
      { label: "Changes Managed", value: "1,204" },
      { label: "Approval Rate", value: "99.2%" },
    ],
    tags: ["Change Enablement", "Automation", "CI/CD"],
    active: true,
  },
  {
    id: "service-request",
    icon: Database,
    name: "Service Request Automator",
    description: "Fulfills common service requests like password resets and software access.",
    stats: [
      { label: "Requests Fulfilled", value: "25,192" },
      { label: "Avg. Fulfillment", value: "31s" },
    ],
    tags: ["Service Request", "Self-Service", "Efficiency"],
    active: false,
  },
  {
    id: "knowledge",
    icon: BookOpen,
    name: "Knowledge Vulture",
    description: "Creates and suggests knowledge base articles from resolved incidents.",
    stats: [
      { label: "Articles Created", value: "452" },
      { label: "Ticket Deflection", value: "18%" },
    ],
    tags: ["Knowledge Management", "Self-Help", "Content"],
    active: true,
  },
  {
    id: "sla",
    icon: Clock,
    name: "SLA Sentinel",
    description: "Monitors SLA timers and automatically escalates tickets at risk of breaching.",
    stats: [
      { label: "Breaches Prevented", value: "312" },
      { label: "Escalations", value: "789" },
    ],
    tags: ["SLA Management", "Monitoring", "Compliance"],
    active: false,
  },
];