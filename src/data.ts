import { Server } from './types';

export const initialServers: Server[] = [
  {
    id: 'srv-1',
    name: 'Survival SMP',
    ip: '192.168.1.100:25565',
    status: 'running',
    memory: 4096,
    cpu: 100,
    disk: 10240,
    activePlayers: 12,
    maxPlayers: 50,
    suspendDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    imageUrl: 'https://images.unsplash.com/photo-1607513746994-51f730a43854?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 'srv-2',
    name: 'Bedrock Factions',
    ip: '192.168.1.101:19132',
    status: 'offline',
    memory: 2048,
    cpu: 50,
    disk: 5120,
    activePlayers: 0,
    maxPlayers: 20,
    suspendDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    imageUrl: null, // default
  }
];
