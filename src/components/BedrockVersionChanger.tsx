import React, { useState } from 'react';
import { Save } from 'lucide-react';

export function BedrockVersionChanger() {
  const [version, setVersion] = useState('1.20.70.01');
  const versions = ['1.20.70.01', '1.20.62.02', '1.20.51.01', '1.20.41.02', '1.19.83.01'];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Bedrock Version Changer</h2>
        <p className="text-neutral-400 text-sm">Change your Bedrock Dedicated Server version. Back up your worlds first.</p>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300">Target Version</label>
          <select 
            value={version} 
            onChange={e => setVersion(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            {versions.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-medium flex items-center justify-center space-x-2 transition-colors">
          <Save className="w-4 h-4" />
          <span>Install Bedrock Version</span>
        </button>
      </div>
    </div>
  );
}
