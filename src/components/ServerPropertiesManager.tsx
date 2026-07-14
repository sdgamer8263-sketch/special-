import React, { useState } from 'react';
import { Save } from 'lucide-react';

export function ServerPropertiesManager() {
  const [properties, setProperties] = useState({
    'server-name': 'Dedicated Server',
    'motd': 'A Minecraft Server hosted on SK Host',
    'max-players': '50',
    'online-mode': 'true',
    'pvp': 'true',
    'difficulty': 'normal',
    'allow-flight': 'false',
    'view-distance': '10',
  });

  const handleChange = (key: string, value: string) => {
    setProperties({ ...properties, [key]: value });
  };

  return (
    <div className="max-w-3xl space-y-6 flex flex-col h-full">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Server Properties Manager</h2>
        <p className="text-neutral-400 text-sm">Edit your server.properties file using a clean UI.</p>
      </div>

      <div className="flex-1 overflow-y-auto bg-neutral-950 border border-neutral-800 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(properties).map(([key, value]) => (
            <div key={key} className="space-y-1.5">
              <label className="text-sm font-medium text-neutral-300">{key}</label>
              {['online-mode', 'pvp', 'allow-flight'].includes(key) ? (
                <select
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-white focus:outline-none focus:border-indigo-500"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded font-medium flex items-center space-x-2 transition-colors">
          <Save className="w-4 h-4" />
          <span>Save Properties</span>
        </button>
      </div>
    </div>
  );
}
