import React, { useState } from 'react';
import { Search, Shield, Ban, UserMinus } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  ping: number;
  playtime: string;
  isOp: boolean;
}

const DUMMY_PLAYERS: Player[] = [
  { id: '1', name: 'Notch', ping: 45, playtime: '2h 15m', isOp: true },
  { id: '2', name: 'Jeb_', ping: 120, playtime: '1h 30m', isOp: false },
  { id: '3', name: 'sdgamer8263', ping: 15, playtime: '5h 45m', isOp: true },
  { id: '4', name: 'Steve', ping: 300, playtime: '15m', isOp: false },
];

export function PlayerManager() {
  const [players, setPlayers] = useState(DUMMY_PLAYERS);
  const [search, setSearch] = useState('');

  const toggleOp = (id: string) => {
    setPlayers(players.map(p => p.id === id ? { ...p, isOp: !p.isOp } : p));
  };

  const kickPlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  const filtered = players.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Player Manager</h2>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search players..." 
            className="pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-md text-sm text-white focus:outline-none focus:border-indigo-500 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2">
        <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
          <div className="col-span-4">Player</div>
          <div className="col-span-2">Ping</div>
          <div className="col-span-3">Playtime</div>
          <div className="col-span-3 text-right">Actions</div>
        </div>

        {filtered.map(player => (
          <div key={player.id} className="grid grid-cols-12 gap-4 px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg items-center hover:border-neutral-700 transition-colors">
            <div className="col-span-4 flex items-center space-x-3">
              <img src={`https://minotar.net/helm/${player.name}/32.png`} alt={player.name} className="w-8 h-8 rounded" />
              <div className="flex flex-col">
                <span className="text-white font-medium flex items-center space-x-1">
                  <span>{player.name}</span>
                  {player.isOp && <Shield className="w-3 h-3 text-red-500" title="Operator" />}
                </span>
              </div>
            </div>
            
            <div className="col-span-2 flex items-center">
              <span className={`text-sm ${player.ping < 100 ? 'text-emerald-400' : player.ping < 200 ? 'text-amber-400' : 'text-red-400'}`}>
                {player.ping}ms
              </span>
            </div>
            
            <div className="col-span-3 text-sm text-neutral-400">
              {player.playtime}
            </div>
            
            <div className="col-span-3 flex items-center justify-end space-x-2">
              <button
                onClick={() => toggleOp(player.id)}
                className={`p-1.5 rounded transition-colors ${player.isOp ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' : 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700'}`}
                title={player.isOp ? "De-Op" : "Op"}
              >
                <Shield className="w-4 h-4" />
              </button>
              <button
                onClick={() => kickPlayer(player.id)}
                className="p-1.5 rounded bg-neutral-800 text-neutral-400 hover:text-amber-500 hover:bg-neutral-700 transition-colors"
                title="Kick"
              >
                <UserMinus className="w-4 h-4" />
              </button>
              <button
                onClick={() => kickPlayer(player.id)}
                className="p-1.5 rounded bg-neutral-800 text-neutral-400 hover:text-rose-500 hover:bg-neutral-700 transition-colors"
                title="Ban"
              >
                <Ban className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-10 text-neutral-500">No players found online.</div>
        )}
      </div>
    </div>
  );
}
