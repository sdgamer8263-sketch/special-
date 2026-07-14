import { LayoutDashboard, ServerIcon, ShieldAlert } from 'lucide-react';
import React from 'react';
import { ViewState } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans">
      <nav className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <div 
                className="flex items-center cursor-pointer group"
                onClick={() => onNavigate('dashboard')}
              >
                <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-lg group-hover:bg-indigo-500 transition-colors">
                  SK
                </div>
                <span className="ml-3 text-xl font-semibold tracking-tight text-white">SK Host</span>
              </div>
              <div className="hidden md:flex space-x-1">
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                    currentView === 'dashboard' || currentView === 'server'
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={() => onNavigate('admin')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                    currentView === 'admin'
                      ? 'bg-neutral-800 text-white'
                      : 'text-neutral-400 hover:bg-neutral-800/50 hover:text-white'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Admin Panel</span>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-neutral-400">sdgamer8263-sketch</div>
              <div className="w-8 h-8 bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-700">
                <span className="text-sm font-medium text-white">SD</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
