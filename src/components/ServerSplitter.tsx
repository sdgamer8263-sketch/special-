import React, { useState } from 'react';
import { SplitSquareHorizontal } from 'lucide-react';
import { Server } from '../types';

interface ServerSplitterProps {
  server: Server;
}

export function ServerSplitter({ server }: ServerSplitterProps) {
  const [splitRam, setSplitRam] = useState(server.memory / 2);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Server Splitter</h2>
        <p className="text-neutral-400 text-sm">Split your current server's resources to create a new sub-server instance.</p>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-neutral-900 border border-indigo-500/30 p-4 rounded-lg">
            <div className="text-sm text-neutral-400 mb-1">Current Server RAM</div>
            <div className="text-2xl font-bold text-indigo-400">{server.memory - splitRam} MB</div>
          </div>
          <div className="bg-neutral-900 border border-emerald-500/30 p-4 rounded-lg">
            <div className="text-sm text-neutral-400 mb-1">New Sub-Server RAM</div>
            <div className="text-2xl font-bold text-emerald-400">{splitRam} MB</div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex justify-between text-sm font-medium text-neutral-300">
            <span>Resource Allocation</span>
            <span>{splitRam} MB for new server</span>
          </label>
          <input 
            type="range" 
            min={1024} 
            max={server.memory - 1024} 
            step={512}
            value={splitRam}
            onChange={(e) => setSplitRam(parseInt(e.target.value))}
            className="w-full accent-indigo-500"
          />
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-medium flex items-center justify-center space-x-2 transition-colors">
          <SplitSquareHorizontal className="w-5 h-5" />
          <span>Split Server Now</span>
        </button>
      </div>
    </div>
  );
}
