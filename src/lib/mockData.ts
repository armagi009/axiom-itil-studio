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
export interface AgentCardData {
  id: string;
  icon: string; // Changed from React.ElementType to string
  name: string;
  description: string;
  stats: { label: string; value: string }[];
  tags: string[];
  active: boolean;
  config: {
    persona: string;
    trigger: string;
    decisionBoundary: string;
    playbook: string;
  };
}
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
export const agentCards: AgentCardData[] = [
  {
    id: "incident",
    icon: "Zap",
    name: "Incident Triage Goblin",
    description: "Automates incident prioritization and assignment based on impact and urgency.",
    stats: [
      { label: "Incidents Processed", value: "12,408" },
      { label: "Avg. Triage Time", value: "5.2s" },
    ],
    tags: ["Incident Management", "Triage", "Real-time"],
    active: true,
    config: {
      persona: "A hyper-focused goblin that instantly categorizes and prioritizes new incidents. It lives for the thrill of sorting chaos into order.",
      trigger: "A new incident JSON payload is received from the monitoring system.",
      decisionBoundary: "IF impact='high' AND urgency='high', SET priority='P1'. IF impact='low' AND workaround_exists=true, SET priority='P4' and auto-close.",
      playbook: "1. Ingest incident data.\n2. Analyze keywords for impact/urgency.\n3. Cross-reference with CMDB for affected services.\n4. Assign priority level.\n5. Route to the on-call engineer for the affected service via Slack.",
    },
  },
  {
    id: "problem",
    icon: "Cpu",
    name: "Problem Hunter",
    description: "Proactively identifies root causes from recurring incidents and trends.",
    stats: [
      { label: "Problems Identified", value: "89" },
      { label: "Avg. Detection Time", value: "48h" },
    ],
    tags: ["Problem Management", "RCA", "Analytics"],
    active: true,
    config: {
      persona: "A patient, data-driven detective that sifts through incident logs to find the underlying 'why'.",
      trigger: "Daily 08:00 UTC analysis of the previous day's incident dump.",
      decisionBoundary: "IF 5+ incidents with the same CI occur within 7 days, CREATE new Problem record. IF MTTR delta > 15% vs last week, FLAG for root cause analysis.",
      playbook: "1. Scan incident records for patterns (CI, category, user).\n2. Cluster similar incidents.\n3. Analyze logs and metrics associated with clusters.\n4. Formulate a root cause hypothesis.\n5. Create a Problem ticket with findings and assign to the relevant team.",
    },
  },
  {
    id: "change",
    icon: "GitMerge",
    name: "Change Advisory Bot",
    description: "Automates the approval process for low-risk, standard changes.",
    stats: [
      { label: "Changes Managed", value: "1,204" },
      { label: "Approval Rate", value: "99.2%" },
    ],
    tags: ["Change Enablement", "Automation", "CI/CD"],
    active: true,
    config: {
      persona: "An efficient, risk-averse bureaucrat that ensures all standard changes are logged and approved without human intervention.",
      trigger: "A new change request is submitted with type='Standard'.",
      decisionBoundary: "IF change_type='Standard' AND risk='Low' AND ci_health='OK', THEN auto-approve. ELSE, route to human CAB.",
      playbook: "1. Validate change request against pre-approved templates.\n2. Check CI health and maintenance windows.\n3. Log the change in the system.\n4. Post-implementation, verify success via monitoring tools.\n5. Close change record.",
    },
  },
  {
    id: "service-request",
    icon: "Database",
    name: "Service Request Automator",
    description: "Fulfills common service requests like password resets and software access.",
    stats: [
      { label: "Requests Fulfilled", value: "25,192" },
      { label: "Avg. Fulfillment", value: "31s" },
    ],
    tags: ["Service Request", "Self-Service", "Efficiency"],
    active: false,
    config: {
      persona: "A helpful concierge that provides instant access to common services and resources.",
      trigger: "User submits a service request through the self-service portal.",
      decisionBoundary: "IF request_type IN ['Password Reset', 'Software Access', 'New DL'], THEN automate. ELSE, create a manual task for the service desk.",
      playbook: "1. Authenticate user via SSO.\n2. Identify requested service.\n3. Execute corresponding script (e.g., AD password reset, add user to group).\n4. Confirm success with the user.\n5. Close request.",
    },
  },
  {
    id: "knowledge",
    icon: "BookOpen",
    name: "Knowledge Vulture",
    description: "Creates and suggests knowledge base articles from resolved incidents.",
    stats: [
      { label: "Articles Created", value: "452" },
      { label: "Ticket Deflection", value: "18%" },
    ],
    tags: ["Knowledge Management", "Self-Help", "Content"],
    active: true,
    config: {
      persona: "A librarian that turns resolved tickets into helpful knowledge for everyone.",
      trigger: "An incident is moved to 'Resolved' state.",
      decisionBoundary: "IF resolution_notes.length > 200 chars AND NOT is_duplicate, THEN draft KB article. IF 3+ users view the article and don't create a ticket, MARK as effective.",
      playbook: "1. Extract problem description and resolution steps from the ticket.\n2. Sanitize any sensitive information.\n3. Format into a standard KB template.\n4. Tag with relevant keywords.\n5. Publish as a draft for review by the knowledge manager.",
    },
  },
  {
    id: "sla",
    icon: "Clock",
    name: "SLA Sentinel",
    description: "Monitors SLA timers and automatically escalates tickets at risk of breaching.",
    stats: [
      { label: "Breaches Prevented", value: "312" },
      { label: "Escalations", value: "789" },
    ],
    tags: ["SLA Management", "Monitoring", "Compliance"],
    active: false,
    config: {
      persona: "A vigilant watchdog that never lets an SLA be forgotten.",
      trigger: "Continuous monitoring of all active incident and request timers.",
      decisionBoundary: "IF time_to_breach < 60 mins, NOTIFY assigned tech. IF time_to_breach < 15 mins, ESCALATE to team lead. IF breached, LOG breach reason and notify management.",
      playbook: "1. Check ticket queue every 5 minutes.\n2. Compare 'updated_at' against SLA policy for the ticket's priority.\n3. Identify tickets nearing breach.\n4. Send automated notifications via Slack and email.\n5. Update ticket with escalation history.",
    },
  },
];
// New data for Contributor Hub
export const contributorStats = [
  { label: "Tickets Labeled", value: "482", change: "+52 this week" },
  { label: "Accuracy", value: "97.3%", change: "+0.2%" },
  { label: "Rank", value: "#12", change: "Top 10%" },
  { label: "Badges Earned", value: "3", change: "New: 'Triage Pro'" },
];
export const ticketQueue = [
  {
    id: "INC0012345",
    title: "Cannot access shared network drive",
    description: "User 'j.doe' reports receiving an 'Access Denied' error when trying to open the 'Marketing' shared drive. They had access yesterday. No recent changes to their permissions are noted in AD.",
    tags: ["Network", "Permissions", "File Server"],
  },
  {
    id: "INC0012346",
    title: "VPN connection is dropping frequently",
    description: "Multiple users on the 'Sales' team have reported that their VPN connection disconnects every 15-20 minutes. This started after the firewall update last night.",
    tags: ["VPN", "Connectivity", "Firewall"],
  },
  {
    id: "INC0012348",
    title: "Request to install Adobe Photoshop",
    description: "User 's.smith' from the design team is requesting a license and installation for Adobe Photoshop on their new workstation.",
    tags: ["Software", "Request", "Licensing"],
  },
  {
    id: "INC0012349",
    title: "Printer on 3rd floor not responding",
    description: "The main printer 'PRN-3-EAST' is offline. Multiple users cannot print. It is not responding to pings.",
    tags: ["Hardware", "Printer", "Network"],
  },
];
export const leaderboardData = [
  { rank: 1, user: "Alex R.", points: 12540, avatar: "AR" },
  { rank: 2, user: "Samantha B.", points: 11980, avatar: "SB" },
  { rank: 3, user: "Kenji T.", points: 11200, avatar: "KT" },
  { rank: 4, user: "Maria G.", points: 10560, avatar: "MG" },
  { rank: 5, user: "You", points: 9870, avatar: "YOU" },
];