/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AdminPanel } from './components/AdminPanel';
import { Dashboard } from './components/Dashboard';
import { Layout } from './components/Layout';
import { ServerView } from './components/ServerView';
import { initialServers } from './data';
import { Server, ViewState } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [servers, setServers] = useState<Server[]>(initialServers);
  const [selectedServerId, setSelectedServerId] = useState<string | null>(null);

  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    if (view !== 'server') {
      setSelectedServerId(null);
    }
  };

  const handleSelectServer = (id: string) => {
    setSelectedServerId(id);
    setCurrentView('server');
  };

  const handleUpdateImage = (id: string, newImageUrl: string) => {
    setServers(servers.map(s => s.id === id ? { ...s, imageUrl: newImageUrl } : s));
  };

  const handleCreateServer = (newServerData: Omit<Server, 'id' | 'status' | 'activePlayers'>) => {
    const newServer: Server = {
      ...newServerData,
      id: `srv-${Date.now()}`,
      status: 'starting',
      activePlayers: 0,
    };
    setServers([...servers, newServer]);
    setCurrentView('dashboard');
  };

  const handleExtendExpiry = (id: string, days: number) => {
    setServers(servers.map(s => {
      if (s.id !== id) return s;
      
      const currentSuspend = s.suspendDate ? new Date(s.suspendDate) : new Date();
      const newSuspend = new Date(currentSuspend.getTime() + days * 24 * 60 * 60 * 1000);
      
      return { ...s, suspendDate: newSuspend.toISOString() };
    }));
  };

  const selectedServer = servers.find(s => s.id === selectedServerId);

  return (
    <Layout currentView={currentView} onNavigate={handleNavigate}>
      {currentView === 'dashboard' && (
        <Dashboard 
          servers={servers} 
          onSelectServer={handleSelectServer} 
          onUpdateImage={handleUpdateImage}
        />
      )}
      {currentView === 'admin' && (
        <AdminPanel onCreateServer={handleCreateServer} />
      )}
      {currentView === 'server' && selectedServer && (
        <ServerView 
          server={selectedServer} 
          onBack={() => handleNavigate('dashboard')}
          onExtendExpiry={handleExtendExpiry}
        />
      )}
    </Layout>
  );
}
