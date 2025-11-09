import { create } from 'zustand';
import type { Agent, AgentConfig } from '../../worker/types';
interface StudioState {
  agents: Agent[];
  isLoading: boolean;
  isSheetOpen: boolean;
  selectedAgentId: string | null;
  fetchAgents: () => Promise<void>;
  updateAgentConfig: (agentId: string, config: AgentConfig) => Promise<void>;
  openSheet: (agentId: string) => void;
  closeSheet: () => void;
  getAgentById: (agentId: string | null) => Agent | null;
}
export const useStudioStore = create<StudioState>((set, get) => ({
  agents: [],
  isLoading: true,
  isSheetOpen: false,
  selectedAgentId: null,
  fetchAgents: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/agents');
      if (!response.ok) throw new Error('Failed to fetch agents');
      const { data } = await response.json();
      set({ agents: data, isLoading: false });
    } catch (error) {
      console.error('Error fetching agents:', error);
      set({ isLoading: false });
    }
  },
  updateAgentConfig: async (agentId: string, config: AgentConfig) => {
    try {
      const response = await fetch(`/api/agents/${agentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!response.ok) throw new Error('Failed to update agent');
      const { data: updatedAgent } = await response.json();
      set((state) => ({
        agents: state.agents.map((agent) =>
          agent.id === agentId ? updatedAgent : agent
        ),
      }));
    } catch (error) {
      console.error(`Error updating agent ${agentId}:`, error);
      // Optionally, handle UI feedback for the error
    }
  },
  openSheet: (agentId: string) => {
    set({ isSheetOpen: true, selectedAgentId: agentId });
  },
  closeSheet: () => set({ isSheetOpen: false, selectedAgentId: null }),
  getAgentById: (agentId: string | null) => {
    if (!agentId) return null;
    return get().agents.find((a) => a.id === agentId) || null;
  },
}));