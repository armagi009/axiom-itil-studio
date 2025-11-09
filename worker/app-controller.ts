import { DurableObject } from 'cloudflare:workers';
import type { SessionInfo, Agent, AgentConfig } from './types';
import type { Env } from './core-utils';
import { defaultAgents } from './mockData';
export class AppController extends DurableObject<Env> {
  private sessions = new Map<string, SessionInfo>();
  private agents: Agent[] = [];
  private loaded = false;
  private agentsInitialized = false;
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
  }
  private async ensureLoaded(): Promise<void> {
    if (!this.loaded) {
      const stored = await this.ctx.storage.get<Record<string, SessionInfo>>('sessions') || {};
      this.sessions = new Map(Object.entries(stored));
      this.loaded = true;
    }
  }
  private async persistSessions(): Promise<void> {
    await this.ctx.storage.put('sessions', Object.fromEntries(this.sessions));
  }
  private async ensureAgentsInitialized(): Promise<void> {
    if (!this.agentsInitialized) {
      const storedAgents = await this.ctx.storage.get<Agent[]>('agents');
      if (storedAgents && storedAgents.length > 0) {
        this.agents = storedAgents;
      } else {
        // Seed with default data if no agents are in storage
        this.agents = defaultAgents;
        await this.ctx.storage.put('agents', this.agents);
      }
      this.agentsInitialized = true;
    }
  }
  private async persistAgents(): Promise<void> {
    await this.ctx.storage.put('agents', this.agents);
  }
  // Session Management
  async addSession(sessionId: string, title?: string): Promise<void> {
    await this.ensureLoaded();
    const now = Date.now();
    this.sessions.set(sessionId, {
      id: sessionId,
      title: title || `Chat ${new Date(now).toLocaleDateString()}`,
      createdAt: now,
      lastActive: now
    });
    await this.persistSessions();
  }
  async removeSession(sessionId: string): Promise<boolean> {
    await this.ensureLoaded();
    const deleted = this.sessions.delete(sessionId);
    if (deleted) await this.persistSessions();
    return deleted;
  }
  async updateSessionActivity(sessionId: string): Promise<void> {
    await this.ensureLoaded();
    const session = this.sessions.get(sessionId);
    if (session) {
      session.lastActive = Date.now();
      await this.persistSessions();
    }
  }
  async updateSessionTitle(sessionId: string, title: string): Promise<boolean> {
    await this.ensureLoaded();
    const session = this.sessions.get(sessionId);
    if (session) {
      session.title = title;
      await this.persistSessions();
      return true;
    }
    return false;
  }
  async listSessions(): Promise<SessionInfo[]> {
    await this.ensureLoaded();
    return Array.from(this.sessions.values()).sort((a, b) => b.lastActive - a.lastActive);
  }
  async getSessionCount(): Promise<number> {
    await this.ensureLoaded();
    return this.sessions.size;
  }
  async getSession(sessionId: string): Promise<SessionInfo | null> {
    await this.ensureLoaded();
    return this.sessions.get(sessionId) || null;
  }
  async clearAllSessions(): Promise<number> {
    await this.ensureLoaded();
    const count = this.sessions.size;
    this.sessions.clear();
    await this.persistSessions();
    return count;
  }
  // Agent Management
  async getAgents(): Promise<Agent[]> {
    await this.ensureAgentsInitialized();
    return this.agents;
  }
  async updateAgentConfig(agentId: string, config: AgentConfig): Promise<Agent | null> {
    await this.ensureAgentsInitialized();
    const agentIndex = this.agents.findIndex(a => a.id === agentId);
    if (agentIndex !== -1) {
      this.agents[agentIndex].config = config;
      await this.persistAgents();
      return this.agents[agentIndex];
    }
    return null;
  }
}