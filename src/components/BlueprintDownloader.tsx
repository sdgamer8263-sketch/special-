import React from 'react';
import { Download, Terminal, CheckCircle, AlertTriangle } from 'lucide-react';

export function BlueprintDownloader() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">SK Host Blueprint Extension & Fixes</h1>
        <p className="text-neutral-400">Download the generated Blueprint files and the script to fix the 503 error on your Pterodactyl panel.</p>
      </div>

      {/* 503 Error Fix Section */}
      <div className="bg-rose-950/30 border border-rose-900/50 rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-3 text-rose-400 font-bold text-lg">
          <AlertTriangle className="w-6 h-6" />
          <h2>How to Fix the 503 Panel Error & Webpack Build Fail</h2>
        </div>
        <p className="text-neutral-300 text-sm">
          The 503 error happens because the <code className="bg-neutral-900 px-1 rounded text-rose-300">yarn build:production</code> step failed due to a Node.js OpenSSL error, which left your panel stuck in maintenance mode.
        </p>
        
        <div className="bg-neutral-950 border border-neutral-800 rounded p-4 font-mono text-sm text-neutral-300 space-y-2">
          <div className="text-neutral-500"># Run these commands exactly as shown on your VPS (SSH):</div>
          <div><span className="text-indigo-400">cd</span> /var/www/pterodactyl</div>
          <div className="text-neutral-500"># 1. Take panel out of maintenance mode (Fixes 503 immediately)</div>
          <div>php artisan up</div>
          <div className="text-neutral-500"># 2. Fix the Node.js OpenSSL Error</div>
          <div><span className="text-indigo-400">export</span> NODE_OPTIONS=--openssl-legacy-provider</div>
          <div className="text-neutral-500"># 3. Rebuild the panel</div>
          <div>yarn build:production</div>
          <div className="text-neutral-500"># 4. Clear cache and fix permissions</div>
          <div>php artisan optimize:clear</div>
          <div>chown -R www-data:www-data /var/www/pterodactyl/*</div>
        </div>

        <div className="flex justify-end pt-2">
          <a 
            href="/extension/fix-503.sh" 
            download="fix-503.sh"
            className="flex items-center space-x-2 bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download 503 Fix Script</span>
          </a>
        </div>
      </div>

      {/* Blueprint Extension Download Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center space-x-3 text-white font-bold text-lg">
          <CheckCircle className="w-6 h-6 text-emerald-500" />
          <h2>SK Host Rebranded Blueprint Extension</h2>
        </div>
        <p className="text-neutral-400 text-sm">
          We have completely removed all references to <strong>Nebula</strong>, <strong>Emma</strong>, and <strong>prpl.wtf</strong>. The extensions (Plugin Manager, Player Manager, etc.) have been integrated into this clean SK Host build.
        </p>
        
        <div className="bg-neutral-950 border border-neutral-800 rounded p-4 font-mono text-sm text-neutral-300 space-y-2">
          <div className="text-neutral-500"># To install the SK Host Blueprint:</div>
          <div><span className="text-indigo-400">cd</span> /var/www/pterodactyl</div>
          <div>blueprint install skhost</div>
          <div className="text-neutral-500"># Remember to apply the NODE_OPTIONS fix before building!</div>
        </div>

        <div className="flex justify-end pt-2">
          <a 
            href="/extension/blueprint.yml" 
            download="blueprint.yml"
            className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download SK Host blueprint.yml</span>
          </a>
        </div>
      </div>
    </div>
  );
}
