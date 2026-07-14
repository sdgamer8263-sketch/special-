import React, { useState } from 'react';
import { Save } from 'lucide-react';

export function VersionChanger() {
  const [software, setSoftware] = useState('paper');
  const [version, setVersion] = useState('1.20.4');

  const versions = ['1.20.4', '1.20.2', '1.19.4', '1.18.2', '1.17.1', '1.16.5', '1.12.2', '1.8.8'];
  const softwareTypes = ['Paper', 'Spigot', 'Purpur', 'Vanilla', 'Forge', 'Fabric'];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Version Changer (Java Edition)</h2>
        <p className="text-neutral-400 text-sm">Change your server software and version. This will download the selected server JAR. Make sure to back up your world!</p>
      </div>

      <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300">Software Type</label>
          <select 
            value={software} 
            onChange={e => setSoftware(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            {softwareTypes.map(s => <option key={s} value={s.toLowerCase()}>{s}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-neutral-300">Version</label>
          <select 
            value={version} 
            onChange={e => setVersion(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            {versions.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-medium flex items-center justify-center space-x-2 transition-colors">
          <Save className="w-4 h-4" />
          <span>Install Version</span>
        </button>
      </div>
    </div>
  );
}
