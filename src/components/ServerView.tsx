import { ArrowLeft, Box, CalendarPlus, Settings, Terminal, Users, Play, Square, RotateCw, Clock, Globe, SplitSquareHorizontal, ShieldAlert, Cpu } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Server } from '../types';
import { PluginManager } from './PluginManager';
import { PlayerManager } from './PlayerManager';
import { BedrockAddonInstaller } from './BedrockAddonInstaller';
import { ModInstaller } from './ModInstaller';
import { WorldInstaller } from './WorldInstaller';
import { VersionChanger } from './VersionChanger';
import { BedrockVersionChanger } from './BedrockVersionChanger';
import { SubdomainManager } from './SubdomainManager';
import { ServerSplitter } from './ServerSplitter';
import { ServerPropertiesManager } from './ServerPropertiesManager';

interface ServerViewProps {
  server: Server;
  onBack: () => void;
  onExtendExpiry: (id: string, days: number) => void;
}

type TabType = 'console' | 'files' | 'plugin-manager' | 'player-manager' | 'bedrock-addons' | 'mod-installer' | 'world-installer' | 'version-changer' | 'bedrock-version' | 'subdomain' | 'server-splitter' | 'server-properties' | 'settings';


export function ServerView({ server, onBack, onExtendExpiry }: ServerViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>('console');
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
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (days > 0) setTimeLeft(`${days}d ${hours}h remaining`);
      else setTimeLeft(`${hours}h ${minutes}m ${seconds}s remaining`);
    }, 1000);

    return () => clearInterval(interval);
  }, [server.suspendDate]);

  const handleExtend = () => {
    onExtendExpiry(server.id, 30); // Extend by 30 days
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center text-sm text-neutral-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </button>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700">
              {server.imageUrl ? (
                <img src={server.imageUrl} alt={server.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-xl text-neutral-500">
                  {server.name.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center space-x-3">
                <span>{server.name}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                  server.status === 'running' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {server.status}
                </span>
              </h1>
              <p className="text-neutral-400 font-mono text-sm mt-1">{server.ip}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded transition-colors" title="Start">
            <Play className="w-5 h-5 fill-current" />
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white p-2 rounded transition-colors" title="Restart">
            <RotateCw className="w-5 h-5" />
          </button>
          <button className="bg-red-600 hover:bg-red-500 text-white p-2 rounded transition-colors" title="Stop">
            <Square className="w-5 h-5 fill-current" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
        
        {/* Navigation Sidebar (No 3-dot menu for extensions) */}
        <div className="w-full md:w-64 shrink-0 flex flex-col gap-2 overflow-y-auto pr-2 pb-10">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 mt-2 px-3">Management</div>
          
          <button 
            onClick={() => setActiveTab('console')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'console' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <Terminal className="w-5 h-5" />
            <span className="font-medium">Console</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('files')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'files' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <Box className="w-5 h-5" />
            <span className="font-medium">File Manager</span>
          </button>

          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 mt-6 px-3">SK Host Extensions</div>
          
          <button 
            onClick={() => setActiveTab('plugin-manager')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'plugin-manager' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <Box className="w-5 h-5" />
            <span className="font-medium">Plugin Manager</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('mod-installer')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'mod-installer' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <Box className="w-5 h-5 text-amber-400" />
            <span className="font-medium">Mod Installer</span>
          </button>

          <button 
            onClick={() => setActiveTab('world-installer')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'world-installer' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <Globe className="w-5 h-5 text-emerald-400" />
            <span className="font-medium">World Installer</span>
          </button>

          <button 
            onClick={() => setActiveTab('version-changer')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'version-changer' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <RotateCw className="w-5 h-5 text-blue-400" />
            <span className="font-medium">Version Changer</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('player-manager')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'player-manager' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <Users className="w-5 h-5" />
            <span className="font-medium">Player Manager</span>
          </button>

          <button 
            onClick={() => setActiveTab('bedrock-addons')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'bedrock-addons' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <Box className="w-5 h-5 text-green-400" />
            <span className="font-medium">Bedrock Addons</span>
          </button>

          <button 
            onClick={() => setActiveTab('bedrock-version')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'bedrock-version' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <RotateCw className="w-5 h-5 text-green-400" />
            <span className="font-medium">Bedrock Version</span>
          </button>

          <button 
            onClick={() => setActiveTab('subdomain')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'subdomain' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <Globe className="w-5 h-5 text-purple-400" />
            <span className="font-medium">Subdomain Manager</span>
          </button>

          <button 
            onClick={() => setActiveTab('server-splitter')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'server-splitter' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <SplitSquareHorizontal className="w-5 h-5 text-rose-400" />
            <span className="font-medium">Server Splitter</span>
          </button>

          <button 
            onClick={() => setActiveTab('server-properties')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'server-properties' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <Settings className="w-5 h-5 text-orange-400" />
            <span className="font-medium">Server Properties</span>
          </button>

          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2 mt-6 px-3">Configuration</div>

          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-md transition-colors ${activeTab === 'settings' ? 'bg-indigo-600/10 text-indigo-400' : 'text-neutral-300 hover:bg-neutral-800'}`}
          >
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>

        </div>

        {/* Content Area */}
        <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden flex flex-col relative">
          
          {/* Top Info Bar specifically for Expiry info */}
          <div className="bg-neutral-950/50 border-b border-neutral-800 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-rose-400" />
              <div>
                <div className="text-sm text-neutral-400">Server Auto-Suspend</div>
                <div className="font-medium text-white flex items-center space-x-2">
                  <span>{server.suspendDate ? new Date(server.suspendDate).toLocaleString() : 'Never'}</span>
                  {server.suspendDate && (
                    <>
                      <span className="text-neutral-600">•</span>
                      <span className="text-rose-400">{timeLeft}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            {activeTab === 'console' && (
              <div className="h-full flex flex-col gap-4">
                <div className="bg-neutral-950 rounded border border-neutral-800 p-4 flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    <span className="text-white font-medium">Console is live</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4 text-indigo-400" />
                    <span className="text-neutral-300"><span className="font-bold text-white">{server.activePlayers}</span> / {server.maxPlayers} Players Online</span>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col bg-neutral-950 rounded border border-neutral-800 p-4 font-mono text-sm overflow-hidden">
                  <div className="flex-1 text-neutral-300 space-y-1 overflow-y-auto">
                    <div>[SK Host] Server starting...</div>
                    <div>[SK Host] Loading libraries, please wait...</div>
                    <div>[SK Host] Done (2.124s)! For help, type "help"</div>
                    {server.activePlayers > 0 && (
                      <div className="text-emerald-400">[SK Host] {server.activePlayers} players have joined the game.</div>
                    )}
                  </div>
                  <div className="mt-4 flex items-center space-x-2 pt-2 border-t border-neutral-800">
                    <span className="text-indigo-500">~ $</span>
                    <input type="text" className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0" placeholder="Type a command..." />
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'plugin-manager' && <PluginManager />}
            {activeTab === 'player-manager' && <PlayerManager />}
            {activeTab === 'bedrock-addons' && <BedrockAddonInstaller />}
            {activeTab === 'mod-installer' && <ModInstaller />}
            {activeTab === 'world-installer' && <WorldInstaller />}
            {activeTab === 'version-changer' && <VersionChanger />}
            {activeTab === 'bedrock-version' && <BedrockVersionChanger />}
            {activeTab === 'subdomain' && <SubdomainManager />}
            {activeTab === 'server-splitter' && <ServerSplitter server={server} />}
            {activeTab === 'server-properties' && <ServerPropertiesManager />}
            
            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-2xl">
                <h2 className="text-xl font-bold text-white mb-4">Server Settings</h2>
                
                <div className="bg-neutral-950 border border-neutral-800 rounded p-5 space-y-4">
                  <h3 className="font-semibold text-white">Nest / Egg Image Settings</h3>
                  <p className="text-sm text-neutral-400 mb-4">SK Host now supports direct image uploads for egg images instead of relying strictly on URLs.</p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input 
                        type="file" 
                        accept="image/*"
                        className="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700 file:cursor-pointer cursor-pointer border border-neutral-800 rounded-md bg-neutral-900"
                      />
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded text-sm font-medium transition-colors text-white">
                      Save Egg Image
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
