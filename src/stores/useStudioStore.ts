import { create } from 'zustand';
import { agentCards, AgentCardData } from '@/lib/mockData';
interface StudioState {
  isSheetOpen: boolean;
  selectedAgentId: string | null;
  selectedAgent: AgentCardData | null;
  openSheet: (agentId: string) => void;
  closeSheet: () => void;
}
export const useStudioStore = create<StudioState>((set) => ({
  isSheetOpen: false,
  selectedAgentId: null,
  selectedAgent: null,
  openSheet: (agentId: string) => {
    const agent = agentCards.find((a) => a.id === agentId) || null;
    set({ isSheetOpen: true, selectedAgentId: agentId, selectedAgent: agent });
  },
  closeSheet: () => set({ isSheetOpen: false, selectedAgentId: null, selectedAgent: null }),
}));