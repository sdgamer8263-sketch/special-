import React, { useState } from 'react';
import { Download, Upload } from 'lucide-react';

export function WorldInstaller() {
  const [worlds] = useState([
    { id: '1', name: 'Vanilla Survival', type: 'Generated' },
    { id: '2', name: 'Skyblock', type: 'Custom Map' },
    { id: '3', name: 'OneBlock', type: 'Custom Map' },
    { id: '4', name: 'Earth Map 1:1000', type: 'Custom Map' },
  ]);

  return (
    <div className="flex flex-col h-full space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">World Installer</h2>
        <p className="text-neutral-400 text-sm">Install pre-made maps or upload your own world archive.</p>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-5">
        <h3 className="font-semibold text-white mb-4">Upload Custom World</h3>
        <div className="flex items-center space-x-4">
          <input 
            type="file" 
            accept=".zip,.tar.gz"
            className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 file:cursor-pointer cursor-pointer border border-neutral-800 rounded-md bg-neutral-900"
          />
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-medium flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-white">Pre-made Worlds</h3>
        {worlds.map(world => (
          <div key={world.id} className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex items-center justify-between">
            <div>
              <div className="text-white font-medium">{world.name}</div>
              <div className="text-sm text-neutral-400">{world.type}</div>
            </div>
            <button className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Install</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
