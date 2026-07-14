import React from 'react';
import { Server } from '../types';
import { ServerCard } from './ServerCard';

interface DashboardProps {
  servers: Server[];
  onSelectServer: (id: string) => void;
  onUpdateImage: (id: string, newImageUrl: string) => void;
}

export function Dashboard({ servers, onSelectServer, onUpdateImage }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Your Servers</h1>
          <p className="text-neutral-400 mt-1">Manage your active SK Host instances.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {servers.map(server => (
          <ServerCard 
            key={server.id} 
            server={server} 
            onClick={() => onSelectServer(server.id)}
            onImageUpdate={onUpdateImage}
          />
        ))}
      </div>
      
      {servers.length === 0 && (
        <div className="text-center py-20 bg-neutral-900 border border-neutral-800 rounded-lg">
          <p className="text-neutral-400">No servers found. Provision a new server from the Admin Panel.</p>
        </div>
      )}
    </div>
  );
}
