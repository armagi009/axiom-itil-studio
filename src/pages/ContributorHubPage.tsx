import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, SkipForward, Trophy, Target, Award, Star } from "lucide-react";
import { contributorStats, ticketQueue, leaderboardData } from "@/lib/mockData";
import { cn } from "@/lib/utils";
export function ContributorHubPage() {
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const currentTicket = ticketQueue[currentTicketIndex];
  const [progress, setProgress] = useState(66);
  const handleAction = () => {
    // In a real app, this would submit the label
    setCurrentTicketIndex((prev) => (prev + 1) % ticketQueue.length);
    setProgress((prev) => Math.min(prev + 5, 100));
  };
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold font-display tracking-tight">
          Contributor Hub
        </h2>
        <p className="text-muted-foreground">
          Improve AI accuracy by labeling tickets. Earn badges and climb the leaderboard!
        </p>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {contributorStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                {index === 0 && <Target className="h-4 w-4 text-muted-foreground" />}
                {index === 1 && <Award className="h-4 w-4 text-muted-foreground" />}
                {index === 2 && <Trophy className="h-4 w-4 text-muted-foreground" />}
                {index === 3 && <Star className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>Ticket Labeling Queue</CardTitle>
              <CardDescription>
                Is this an 'Incident' or a 'Service Request'?
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTicket.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <h3 className="font-semibold">{currentTicket.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentTicket.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground bg-secondary p-4 rounded-md">
                    {currentTicket.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </CardContent>
            <div className="p-6 pt-0 grid grid-cols-3 gap-4">
              <Button variant="destructive" size="lg" onClick={handleAction}>
                <X className="mr-2 h-4 w-4" /> Incident
              </Button>
              <Button variant="outline" size="lg" onClick={handleAction}>
                <SkipForward className="mr-2 h-4 w-4" /> Skip
              </Button>
              <Button variant="default" size="lg" onClick={handleAction}>
                <Check className="mr-2 h-4 w-4" /> Service Request
              </Button>
            </div>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top contributors this week.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((row) => (
                    <TableRow key={row.rank} className={cn(row.user === "You" && "bg-primary/10")}>
                      <TableCell className="font-medium">{row.rank}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6 text-xs">
                            <AvatarFallback>{row.avatar}</AvatarFallback>
                          </Avatar>
                          {row.user}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{row.points.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Badge Progress</CardTitle>
            <CardDescription>You're close to unlocking the "Automation Ally" badge!</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2 text-right">{progress}% complete</p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}