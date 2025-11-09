import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useStudioStore } from "@/stores/useStudioStore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
const agentConfigSchema = z.object({
  persona: z.string().min(10, "Persona description is too short."),
  trigger: z.string().min(10, "Trigger event description is too short."),
  decisionBoundary: z.string().min(10, "Decision boundary description is too short."),
  playbook: z.string().min(20, "Playbook is too short."),
});
type AgentConfigFormValues = z.infer<typeof agentConfigSchema>;
export function AgentConfigSheet() {
  const isSheetOpen = useStudioStore((s) => s.isSheetOpen);
  const selectedAgent = useStudioStore((s) => s.selectedAgent);
  const closeSheet = useStudioStore((s) => s.closeSheet);
  const form = useForm<AgentConfigFormValues>({
    resolver: zodResolver(agentConfigSchema),
    defaultValues: selectedAgent?.config,
  });
  useEffect(() => {
    if (selectedAgent) {
      form.reset(selectedAgent.config);
    }
  }, [selectedAgent, form]);
  const onSubmit = (data: AgentConfigFormValues) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your backend
    closeSheet();
  };
  if (!selectedAgent) return null;
  return (
    <Sheet open={isSheetOpen} onOpenChange={(open) => !open && closeSheet()}>
      <SheetContent className="w-full sm:max-w-2xl flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl">{selectedAgent.name} Configuration</SheetTitle>
          <SheetDescription>
            Fine-tune the agent's behavior to match your operational needs.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow flex flex-col">
            <div className="flex-grow overflow-y-auto pr-6 -mr-6 pl-1 -ml-1">
              <Tabs defaultValue="persona" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="persona">Persona</TabsTrigger>
                  <TabsTrigger value="logic">Logic</TabsTrigger>
                  <TabsTrigger value="playbook">Playbook</TabsTrigger>
                  <TabsTrigger value="human">Human Nudge</TabsTrigger>
                </TabsList>
                <TabsContent value="persona" className="py-4">
                  <FormField
                    control={form.control}
                    name="persona"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent Persona</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., A meticulous goblin focused on P1 incidents..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Define the agent's personality and core function.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="logic" className="space-y-4 py-4">
                  <FormField
                    control={form.control}
                    name="trigger"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trigger Event</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., New incident JSON lands in queue" {...field} />
                        </FormControl>
                        <FormDescription>
                          The event that activates this agent.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="decisionBoundary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Decision Boundary</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Auto-close if impact=low AND workaround exists"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The rules the agent uses to make decisions.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="playbook" className="py-4">
                   <FormField
                    control={form.control}
                    name="playbook"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Playbook (SOP)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="A step-by-step standard operating procedure for the agent."
                            className="min-h-[200px] font-mono text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The Standard Operating Procedure the agent follows.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="human" className="py-4">
                    <div className="text-center text-muted-foreground p-8 border rounded-lg">
                        <p>Human Nudge configuration coming soon.</p>
                    </div>
                </TabsContent>
              </Tabs>
            </div>
            <SheetFooter className="pt-4">
              <Button type="button" variant="outline" onClick={closeSheet}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}