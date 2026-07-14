import React, { useState } from 'react';
import { Server } from '../types';

interface AdminPanelProps {
  onCreateServer: (server: Omit<Server, 'id' | 'status' | 'activePlayers'>) => void;
}

export function AdminPanel({ onCreateServer }: AdminPanelProps) {
  const [formData, setFormData] = useState({
    name: '',
    ip: '192.168.1.100:25565', // Mock default
    memory: 4096,
    cpu: 100,
    disk: 10240,
    maxPlayers: 50,
    suspendDate: '',
    imageUrl: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateServer({
      ...formData,
      suspendDate: formData.suspendDate ? new Date(formData.suspendDate).toISOString() : null,
      imageUrl: formData.imageUrl || null
    });
    alert('Server created successfully on SK Host!');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imageUrl: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Admin Server Creation</h1>
        <p className="text-neutral-400 mt-1">Provision a new server instance. Ensure auto-suspend dates are set according to billing.</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden shadow-xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Server Name</label>
              <input 
                required
                type="text" 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Vanilla SMP"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Allocation IP:Port</label>
              <input 
                required
                type="text" 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={formData.ip}
                onChange={e => setFormData({ ...formData, ip: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-neutral-800">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Memory (MB)</label>
              <input 
                required
                type="number" 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={formData.memory}
                onChange={e => setFormData({ ...formData, memory: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">CPU Limit (%)</label>
              <input 
                required
                type="number" 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={formData.cpu}
                onChange={e => setFormData({ ...formData, cpu: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Disk Space (MB)</label>
              <input 
                required
                type="number" 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={formData.disk}
                onChange={e => setFormData({ ...formData, disk: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-800">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Max Players</label>
              <input 
                required
                type="number" 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={formData.maxPlayers}
                onChange={e => setFormData({ ...formData, maxPlayers: parseInt(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-rose-400">Auto-Suspend Expiration Date</label>
              <input 
                required
                type="datetime-local" 
                className="w-full bg-neutral-950 border border-neutral-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                value={formData.suspendDate}
                onChange={e => setFormData({ ...formData, suspendDate: e.target.value })}
              />
              <p className="text-xs text-neutral-500 mt-1">Server will automatically pause at this time.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800 space-y-4">
            <label className="text-sm font-medium text-neutral-300">Server Dashboard Banner Image (Custom Upload)</label>
            <div className="flex items-center space-x-4">
              {formData.imageUrl && (
                <div className="w-24 h-24 rounded-md overflow-hidden bg-neutral-950 border border-neutral-800">
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:cursor-pointer cursor-pointer border border-neutral-800 rounded-md bg-neutral-950"
                />
                <p className="text-xs text-neutral-500 mt-2">Replaces the default URL-based egg images with custom local uploads.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Create Server
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
