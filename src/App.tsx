/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { tsParticles } from '@tsparticles/engine';
import { loadHyperspacePreset } from '@tsparticles/preset-hyperspace';
import { loadLinksPreset } from '@tsparticles/preset-links';

const GAMES = [
  { name: 'Moto X3M Pool', url: '/games/moto-x3m-pool.html' },
  { name: 'Moto X3M Spooky', url: '/games/moto-x3m-spooky.html' },
  { name: 'Moto X3M Winter', url: '/games/moto-x3m-winter.html' },
  { name: 'Moto X3M Classic', url: '/games/moto-x3m-classic.html' },
  { name: 'Ovo 2', url: '/games/ovo-2.html' },
  { name: 'Snow Rider 3D', url: '/games/snow-rider-3d.html' },
  { name: 'Spacebar Clicker', url: '/games/spacebar-clicker.html' },
  { name: 'Subway Surfers', url: '/games/subway-surfers.html' },
  { name: 'Super Mario 64', url: '/games/super-mario-64.html' },
  { name: 'Super Mario Bros', url: '/games/super-mario-bros.html' },
  { name: 'Temple Run 2', url: '/games/temple-run-2.html' },
  { name: 'Ultrakill', url: '/games/ultrakill.html' },
  { name: 'Buckshot Roulette', url: '/games/buckshot-roulette.html' },
  { name: 'Drive Mad', url: '/games/drive-mad.html' },
  { name: 'FNAF World', url: '/games/fnaf-world.html' },
  { name: 'FNAF 2', url: '/games/fnaf-2.html' },
  { name: 'FNAF 3', url: '/games/fnaf-3.html' },
  { name: 'FNAF 4 Halloween', url: '/games/fnaf-4-halloween.html' },
  { name: 'FNAF 4', url: '/games/fnaf-4.html' },
  { name: 'FNAF Pizzeria', url: '/games/fnaf-pizzeria.html' },
  { name: 'FNAF Sister Location', url: '/games/fnaf-sl.html' },
  { name: 'FNAF UCN', url: '/games/fnaf-ucn.html' },
  { name: 'FNAF 1', url: '/games/fnaf-1.html' },
  { name: 'Flying Gorilla', url: '/games/flying-gorilla.html' },
  { name: 'Game Dashers', url: '/games/game-dashers.html' },
  { name: 'Geometry Dash', url: '/games/geometry-dash.html' },
  { name: 'Geometry Dash SubZero', url: '/games/geometry-dash-subzero.html' },
  { name: 'Geometry Dash World', url: '/games/geometry-dash-world.html' },
  { name: 'Granny', url: '/games/granny.html' },
  { name: 'Minecraft 1.8.8', url: '/games/minecraft-1.8.8.html' },
  { name: 'Moto X3M 2', url: '/games/moto-x3m-2.html' },
  { name: 'Moto X3M 3', url: '/games/moto-x3m-3.html' },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [tab, setTab] = useState<'main' | 'ui'>('main');
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [preset, setPreset] = useState('hyperspace');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.webkitRequestFullscreen) {
        iframeRef.current.webkitRequestFullscreen();
      } else if (iframeRef.current.msRequestFullscreen) {
        iframeRef.current.msRequestFullscreen();
      }
    }
  };

  useEffect(() => {
    const initParticles = async () => {
      await loadHyperspacePreset(tsParticles);
      await loadLinksPreset(tsParticles);
      await tsParticles.load({
        id: "tsparticles",
        options: { preset },
      });
    };
    initParticles();
  }, [preset]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '009991105') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid code');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="relative flex items-center justify-center min-h-screen z-1">
        <div id="tsparticles" className="absolute inset-0 z-0" />
        <form onSubmit={handleLogin} className="relative p-10 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl shadow-2xl z-10 w-full max-w-sm">
          <h1 className="mb-6 text-3xl font-light text-white text-center">Access Required</h1>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 mb-6 bg-white/5 border border-white/20 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-white/50"
            placeholder="Enter code"
          />
          <button type="submit" className="w-full p-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors">
            Access Portal
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen z-1 text-white p-10">
      <div id="tsparticles" className="absolute inset-0 z-0" />
      <div className="relative z-10">
        <nav className="mb-10 flex gap-4">
          <button
            onClick={() => setTab('main')}
            className={`px-4 py-2 ${tab === 'main' && !selectedGame ? 'bg-blue-600' : 'bg-white/10'} rounded-lg transition-colors`}
          >
            Nexus
          </button>
          <button
            onClick={() => setTab('ui')}
            className={`px-4 py-2 ${tab === 'ui' ? 'bg-blue-600' : 'bg-white/10'} rounded-lg transition-colors`}
          >
            Change UI
          </button>
        </nav>

        {tab === 'main' && !selectedGame && (
          <div>
            <h1 className="text-5xl font-thin tracking-tighter">Nexus Private</h1>
            <div className="mt-10 border-t border-white/20 pt-6">
              <p className="text-gray-300 font-bold mb-4">Welcome. Select a game to begin.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {GAMES.map(game => (
                  <button 
                    key={game.url} 
                    onClick={() => setSelectedGame(game.url)}
                    className="p-4 bg-white/10 border border-white/20 rounded-lg hover:bg-blue-600 transition-colors text-center"
                  >
                    {game.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {selectedGame && (
          <div className="fixed inset-0 z-50 bg-black p-4 flex flex-col">
            <div className="flex gap-2 mb-4">
                <button onClick={() => setSelectedGame(null)} className="px-4 py-2 bg-red-600 rounded-lg">Close Game</button>
                <button onClick={toggleFullscreen} className="px-4 py-2 bg-blue-600 rounded-lg">Fullscreen</button>
            </div>
            <iframe ref={iframeRef} src={selectedGame} className="flex-1 w-full border-0" title="Game" allowFullScreen />
          </div>
        )}

        {tab === 'ui' && (
          <div>
            <h2 className="text-2xl font-light mb-6">Customize UI</h2>
            <button
               onClick={() => setPreset('hyperspace')}
               className={`px-6 py-3 mr-4 ${preset === 'hyperspace' ? 'bg-blue-600' : 'bg-white/10'} rounded-lg font-semibold hover:bg-blue-500 transition-colors`}
            >
              Main
            </button>
            <button
              onClick={() => setPreset('links')}
              className={`px-6 py-3 ${preset === 'links' ? 'bg-blue-600' : 'bg-white/10'} rounded-lg font-semibold hover:bg-blue-500 transition-colors`}
            >
              links
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

