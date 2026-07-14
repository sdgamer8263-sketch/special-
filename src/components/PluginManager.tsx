import React, { useState } from 'react';
import { Search, Download, Trash2, CheckCircle } from 'lucide-react';

interface Plugin {
  id: string;
  name: string;
  description: string;
  author: string;
  downloads: string;
  installed: boolean;
}

const DUMMY_PLUGINS: Plugin[] = [
  { id: '1', name: 'EssentialsX', description: 'The essential plugin for Spigot servers.', author: 'EssentialsX Team', downloads: '5M+', installed: true },
  { id: '2', name: 'WorldEdit', description: 'In-game voxel map editor.', author: 'sk89q', downloads: '4M+', installed: false },
  { id: '3', name: 'Vault', description: 'Permissions, Chat, & Economy API.', author: 'Kainzo', downloads: '6M+', installed: true },
  { id: '4', name: 'LuckPerms', description: 'Advanced permissions plugin.', author: 'Luck', downloads: '3M+', installed: false },
  { id: '5', name: 'ClearLag', description: 'Reduce lag on your server.', author: 'bob7l', downloads: '2M+', installed: false },
];

export function PluginManager() {
  const [plugins, setPlugins] = useState(DUMMY_PLUGINS);
  const [search, setSearch] = useState('');

  const toggleInstall = (id: string) => {
    setPlugins(plugins.map(p => {
      if (p.id === id) return { ...p, installed: !p.installed };
      return p;
    }));
  };

  const filtered = plugins.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Plugin Manager</h2>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input 
            type="text" 
            placeholder="Search plugins..." 
            className="pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-md text-sm text-white focus:outline-none focus:border-indigo-500 w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {filtered.map(plugin => (
          <div key={plugin.id} className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex items-center justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-white font-medium">{plugin.name}</h3>
                {plugin.installed && <CheckCircle className="w-4 h-4 text-emerald-500" />}
              </div>
              <p className="text-sm text-neutral-400 mt-1">{plugin.description}</p>
              <div className="flex items-center space-x-4 mt-2 text-xs text-neutral-500">
                <span>By {plugin.author}</span>
                <span>•</span>
                <span>{plugin.downloads} downloads</span>
              </div>
            </div>
            
            <button
              onClick={() => toggleInstall(plugin.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                plugin.installed 
                  ? 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 border border-rose-500/20' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              {plugin.installed ? (
                <>
                  <Trash2 className="w-4 h-4" />
                  <span>Uninstall</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Install</span>
                </>
              )}
            </button>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-10 text-neutral-500">No plugins found.</div>
        )}
      </div>
    </div>
  );
}
