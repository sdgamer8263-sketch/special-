import React, { useState } from 'react';
import { Globe, Plus, Trash2, Settings, Save, Server, ShieldCheck, Key, Hash } from 'lucide-react';

export function SubdomainManager() {
  const [activeTab, setActiveTab] = useState<'manage' | 'config'>('manage');
  const [subdomains, setSubdomains] = useState([
    { id: '1', name: 'play.skhost.com', target: '192.168.1.100:25565', proxied: true }
  ]);
  const [newSubdomain, setNewSubdomain] = useState('');
  
  // Cloudflare Config State
  const [domain, setDomain] = useState('skhost.com');
  const [apiKey, setApiKey] = useState('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  const [zoneId, setZoneId] = useState('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  const [email, setEmail] = useState('admin@skhost.com');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubdomain) return;
    setSubdomains([...subdomains, { id: Date.now().toString(), name: `${newSubdomain}.${domain}`, target: '192.168.1.100:25565', proxied: true }]);
    setNewSubdomain('');
  };

  const removeSubdomain = (id: string) => {
    setSubdomains(subdomains.filter(s => s.id !== id));
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Subdomain Manager</h2>
          <p className="text-neutral-400 text-sm">Manage free subdomains for your server for easier connection.</p>
        </div>
        
        <div className="flex space-x-2 bg-neutral-900 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'manage' 
                ? 'bg-neutral-800 text-white' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Manage
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
              activeTab === 'config' 
                ? 'bg-neutral-800 text-white' 
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Config</span>
          </button>
        </div>
      </div>

      {activeTab === 'manage' && (
        <>
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
                    .{domain}
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
            
            {subdomains.length === 0 && (
              <div className="text-center py-8 text-neutral-500 bg-neutral-950/50 rounded-lg border border-neutral-800/50">
                No active subdomains found. Create one above!
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'config' && (
        <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-white">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h3 className="text-lg font-bold">Cloudflare API Configuration</h3>
            </div>
          </div>
          
          <p className="text-neutral-400 text-sm border-b border-neutral-800 pb-4">
            Configure your Cloudflare API credentials here to allow the extension to create DNS records automatically. This should only be accessible by panel administrators.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Base Domain Name</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input 
                  type="text" 
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Cloudflare Email (if using Global API Key)</label>
              <input 
                type="text" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-md py-2 px-4 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Cloudflare API Key / Token</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input 
                  type="password" 
                  value={apiKey}
                  onChange={e => setApiKey(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Cloudflare Zone ID</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input 
                  type="text" 
                  value={zoneId}
                  onChange={e => setZoneId(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md py-2 pl-10 pr-4 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mt-2">
              <input type="checkbox" id="proxied" defaultChecked className="rounded border-neutral-700 bg-neutral-900 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-neutral-950" />
              <label htmlFor="proxied" className="text-sm text-neutral-300">Proxy DNS records through Cloudflare by default</label>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-medium flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
