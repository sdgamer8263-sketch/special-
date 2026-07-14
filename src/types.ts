export interface Server {
  id: string;
  name: string;
  ip: string;
  status: 'running' | 'offline' | 'starting';
  memory: number;
  cpu: number;
  disk: number;
  activePlayers: number;
  maxPlayers: number;
  suspendDate: string | null; // ISO string
  imageUrl: string | null;
}

export type ViewState = 'dashboard' | 'admin' | 'server';
