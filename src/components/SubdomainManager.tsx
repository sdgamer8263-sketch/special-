import React, { useState } from 'react';
import { Globe, Plus, Trash2 } from 'lucide-react';

export function SubdomainManager() {
  const [subdomains, setSubdomains] = useState([
    { id: '1', name: 'play.skhost.com', target: '192.168.1.100:25565', proxied: true }
  ]);
  const [newSubdomain, setNewSubdomain] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubdomain) return;
    setSubdomains([...subdomains, { id: Date.now().toString(), name: `${newSubdomain}.skhost.com`, target: '192.168.1.100:25565', proxied: true }]);
    setNewSubdomain('');
  };

  const removeSubdomain = (id: string) => {
    setSubdomains(subdomains.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Subdomain Manager (Cloudflare)</h2>
        <p className="text-neutral-400 text-sm">Manage free subdomains for your server for easier connection.</p>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-5">
        <form onSubmit={handleAdd} className="flex items-end space-x-4">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium text-neutral-300">Create New Subdomain</label>
            <div className="flex items-center">
              <input 
                type="text" 
                placeholder="myserver"
                value={newSubdomain}
                onChange={e => setNewSubdomain(e.target.value)}
                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-l-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
              />
              <div className="bg-neutral-800 border border-l-0 border-neutral-800 px-4 py-2 rounded-r-md text-neutral-400 font-medium">
                .skhost.com
              </div>
            </div>
          </div>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-medium flex items-center space-x-2 h-[42px]">
            <Plus className="w-4 h-4" />
            <span>Create</span>
          </button>
        </form>
      </div>

      <div className="space-y-3">
        <h3 className="font-semibold text-white">Active Subdomains</h3>
        {subdomains.map(sub => (
          <div key={sub.id} className="bg-neutral-950 border border-neutral-800 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-indigo-400" />
              <div>
                <div className="text-white font-medium">{sub.name}</div>
                <div className="text-sm text-neutral-500">Points to {sub.target}</div>
              </div>
            </div>
            <button 
              onClick={() => removeSubdomain(sub.id)}
              className="text-neutral-400 hover:text-rose-500 transition-colors p-2"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
