import React, { useState } from 'react';
import { Search, Download, Trash2, CheckCircle } from 'lucide-react';

export function BedrockAddonInstaller() {
  const [addons, setAddons] = useState([
    { id: '1', name: 'More Ores', description: 'Adds new ores and tools.', author: 'BedrockModder', installed: false },
    { id: '2', name: 'OneBlock', description: 'Start on a single block.', author: 'MapMaker', installed: true },
    { id: '3', name: 'Furniture Addon', description: 'Decorate your house.', author: 'BuilderX', installed: false },
  ]);
  const [search, setSearch] = useState('');

  const toggleInstall = (id: string) => {
    setAddons(addons.map(a => a.id === id ? { ...a, installed: !a.installed } : a));
  };

  const filtered = addons.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Bedrock Addon Installer</h2>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search addons..." 
            className="pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-md text-sm text-white focus:outline-none focus:border-indigo-500 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {filtered.map(addon => (
          <div key={addon.id} className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex items-center justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-white font-medium">{addon.name}</h3>
                {addon.installed && <CheckCircle className="w-4 h-4 text-emerald-500" />}
              </div>
              <p className="text-sm text-neutral-400 mt-1">{addon.description}</p>
              <div className="text-xs text-neutral-500 mt-2">By {addon.author}</div>
            </div>
            <button
              onClick={() => toggleInstall(addon.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                addon.installed ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-indigo-600 text-white'
              }`}
            >
              {addon.installed ? <><Trash2 className="w-4 h-4" /><span>Uninstall</span></> : <><Download className="w-4 h-4" /><span>Install</span></>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
