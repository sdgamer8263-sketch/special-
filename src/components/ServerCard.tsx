import { Clock, HardDrive, Image as ImageIcon, MemoryStick, Server as ServerIcon, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Server } from '../types';

interface ServerCardProps {
  server: Server;
  onClick: () => void;
  onImageUpdate: (id: string, newImageUrl: string) => void;
}

export function ServerCard({ server, onClick, onImageUpdate }: ServerCardProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!server.suspendDate) {
      setTimeLeft('Never');
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const suspend = new Date(server.suspendDate!).getTime();
      const distance = suspend - now;

      if (distance < 0) {
        setTimeLeft('Suspended');
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) setTimeLeft(`${days}d ${hours}h`);
      else setTimeLeft(`${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [server.suspendDate]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onImageUpdate(server.id, url);
    }
  };

  return (
    <div className="group relative bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-indigo-500/50 transition-all duration-300 flex flex-col">
      {/* Custom Image Banner */}
      <div 
        className="h-32 w-full bg-neutral-800 relative cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        {server.imageUrl ? (
          <img src={server.imageUrl} alt={server.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-neutral-500 group-hover:text-neutral-400 transition-colors">
            <ServerIcon className="w-8 h-8 mb-2 opacity-50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />
        
        {/* Quick status dot */}
        <div className="absolute top-3 right-3 flex items-center space-x-2 bg-neutral-950/80 px-2 py-1 rounded-md backdrop-blur-sm border border-neutral-800">
          <div className={`w-2 h-2 rounded-full ${server.status === 'running' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : server.status === 'starting' ? 'bg-amber-500' : 'bg-red-500'}`} />
          <span className="text-xs font-medium text-neutral-300 capitalize">{server.status}</span>
        </div>
      </div>

      {/* Image Upload Button (Hover State) */}
      <label className="absolute top-3 left-3 bg-neutral-950/80 p-2 rounded-md backdrop-blur-sm border border-neutral-800 text-neutral-400 hover:text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <ImageIcon className="w-4 h-4" />
        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
      </label>

      {/* Server Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-4" onClick={onClick} className="cursor-pointer">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-indigo-400 transition-colors">{server.name}</h3>
          <code className="text-xs text-neutral-500 font-mono bg-neutral-950 px-2 py-1 rounded border border-neutral-800">{server.ip}</code>
        </div>
        
        {/* SK Host requested additions: Active players and Auto-suspend directly below server info */}
        <div className="mt-4 grid grid-cols-2 gap-3 pt-4 border-t border-neutral-800/50">
          <div className="flex items-center space-x-2 text-neutral-400">
            <Users className="w-4 h-4 text-indigo-400" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">Players</span>
              <span className="text-sm font-medium">{server.activePlayers} <span className="text-neutral-600">/</span> {server.maxPlayers}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-neutral-400">
            <Clock className="w-4 h-4 text-rose-400" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-neutral-500">Auto-Suspend</span>
              <span className="text-sm font-medium text-neutral-300">{timeLeft}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
