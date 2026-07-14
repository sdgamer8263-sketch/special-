import React, { useState } from 'react';
import { Search, Download, Trash2, CheckCircle } from 'lucide-react';

export function ModInstaller() {
  const [mods, setMods] = useState([
    { id: '1', name: 'Create', description: 'A mod offering a variety of tools and blocks for building, decoration and aesthetic automation.', author: 'simibubi', installed: false },
    { id: '2', name: 'JEI', description: 'Just Enough Items is an item and recipe viewing mod.', author: 'mezz', installed: true },
    { id: '3', name: 'Mekanism', description: 'High-tech machinery, power generation, and more.', author: 'bradyaidanc', installed: false },
  ]);
  const [search, setSearch] = useState('');

  const toggleInstall = (id: string) => {
    setMods(mods.map(m => m.id === id ? { ...m, installed: !m.installed } : m));
  };

  const filtered = mods.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Mod Installer</h2>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search mods..." 
            className="pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-md text-sm text-white focus:outline-none focus:border-indigo-500 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3">
        {filtered.map(mod => (
          <div key={mod.id} className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex items-center justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-white font-medium">{mod.name}</h3>
                {mod.installed && <CheckCircle className="w-4 h-4 text-emerald-500" />}
              </div>
              <p className="text-sm text-neutral-400 mt-1">{mod.description}</p>
              <div className="text-xs text-neutral-500 mt-2">By {mod.author}</div>
            </div>
            <button
              onClick={() => toggleInstall(mod.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                mod.installed ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-indigo-600 text-white'
              }`}
            >
              {mod.installed ? <><Trash2 className="w-4 h-4" /><span>Uninstall</span></> : <><Download className="w-4 h-4" /><span>Install</span></>}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
