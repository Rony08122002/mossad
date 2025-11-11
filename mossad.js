import React, { useState, useEffect } from 'react';
import { Camera, Shield, Key, AlertTriangle, MapPin, Phone, Users, Lock, Unlock, Bell, Radio, Crosshair, Satellite, Activity, Eye, Globe } from 'lucide-react';

const MossadApp = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [alerts, setAlerts] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [securityLevel, setSecurityLevel] = useState('TOP SECRET');
  
  const [agents, setAgents] = useState([
    { id: 1, code: 'ALPHA-7', name: 'סוכן אלפא', status: 'active', location: { x: 45, y: 35, city: 'תל אביב' }, mission: 'מעקב' },
    { id: 2, code: 'BRAVO-3', name: 'סוכן בראבו', status: 'active', location: { x: 72, y: 52, city: 'ברלין' }, mission: 'איסוף מודיעין' },
    { id: 3, code: 'CHARLIE-9', name: 'סוכן צ׳רלי', status: 'standby', location: { x: 25, y: 60, city: 'פריז' }, mission: 'המתנה' },
    { id: 4, code: 'DELTA-5', name: 'סוכן דלתא', status: 'active', location: { x: 88, y: 28, city: 'מוסקבה' }, mission: 'חדירה' },
    { id: 5, code: 'ECHO-2', name: 'סוכן אקו', status: 'offline', location: { x: 15, y: 45, city: 'לונדון' }, mission: 'לא פעיל' },
    { id: 6, code: 'FOXTROT-8', name: 'סוכן פוקסטרוט', status: 'active', location: { x: 60, y: 70, city: 'קהיר' }, mission: 'מעקב מטרה' }
  ]);

  const [satellites, setSatellites] = useState([
    { id: 1, name: 'OFEK-19', status: 'operational', coverage: 'MENA' },
    { id: 2, name: 'EROS-C', status: 'operational', coverage: 'Europe' },
    { id: 3, name: 'TecSAR', status: 'operational', coverage: 'Global' }
  ]);

  const [threats, setThreats] = useState([
    { id: 1, level: 'critical', location: 'דמשק', type: 'איום כימי' },
    { id: 2, level: 'high', location: 'טהרן', type: 'פעילות גרעינית' },
    { id: 3, level: 'medium', location: 'ביירות', type: 'הברחת נשק' }
  ]);

  const [cameras, setCameras] = useState([
    { id: 1, location: 'דמשק - מתקן צבאי', status: 'locked', hacked: false, feed: 'encrypted' },
    { id: 2, location: 'טהרן - מפעל העשרה', status: 'locked', hacked: false, feed: 'encrypted' },
    { id: 3, location: 'ביירות - נמל', status: 'locked', hacked: false, feed: 'encrypted' },
    { id: 4, location: 'מוסקבה - שגרירות', status: 'locked', hacked: false, feed: 'encrypted' },
    { id: 5, location: 'קהיר - מטה צבאי', status: 'active', hacked: false, feed: 'live' },
    { id: 6, location: 'ברלין - בסיס חיל אוויר', status: 'locked', hacked: false, feed: 'encrypted' }
  ]);

  const [hackingCamera, setHackingCamera] = useState(null);
  const [hackProgress, setHackProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.95) {
        const randomAgent = agents[Math.floor(Math.random() * agents.length)];
        addAlert(`[${randomAgent.code}] שידור מוצפן מ${randomAgent.location.city}`);
      }
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (hackingCamera !== null && hackProgress < 100) {
      const timer = setTimeout(() => {
        setHackProgress(prev => Math.min(prev + Math.random() * 15, 100));
      }, 300);
      return () => clearTimeout(timer);
    } else if (hackProgress >= 100 && hackingCamera !== null) {
      setCameras(cameras.map(cam => 
        cam.id === hackingCamera 
          ? { ...cam, hacked: true, status: 'active', feed: 'live' }
          : cam
      ));
      addAlert(`פריצה הושלמה: ${cameras.find(c => c.id === hackingCamera)?.location}`, 'success');
      setHackingCamera(null);
      setHackProgress(0);
    }
  }, [hackProgress, hackingCamera]);

  const startHack = (cameraId) => {
    const camera = cameras.find(c => c.id === cameraId);
    if (camera.status === 'locked' && !camera.hacked) {
      setHackingCamera(cameraId);
      setHackProgress(0);
      addAlert(`מתחיל פריצה: ${camera.location}`, 'warning');
    }
  };

  const addAlert = (message, level = 'info') => {
    const newAlert = {
      id: Date.now(),
      message,
      time: new Date().toLocaleTimeString('he-IL'),
      level
    };
    setAlerts(prev => [newAlert, ...prev].slice(0, 10));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-400';
      case 'standby': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getThreatColor = (level) => {
    switch(level) {
      case 'critical': return 'bg-red-900 border-red-500';
      case 'high': return 'bg-orange-900 border-orange-500';
      case 'medium': return 'bg-yellow-900 border-yellow-500';
      default: return 'bg-gray-900 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono" dir="rtl">
      {/* Top Secret Header */}
      <div className="bg-gradient-to-r from-black via-red-950 to-black border-b-2 border-red-900 p-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-10 h-10 text-red-500 animate-pulse" />
                <div className="absolute inset-0 bg-red-500 blur-xl opacity-20"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-red-500 tracking-wider">המוסד למודיעין ולתפקידים מיוחדים</h1>
                <p className="text-xs text-red-400">SYSTEM STATUS: OPERATIONAL | CLEARANCE LEVEL: {securityLevel}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-red-500 font-bold text-sm mb-1">█ CLASSIFIED █</div>
              <div className="text-xs text-red-400">{new Date().toLocaleString('he-IL')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Alerts Ticker */}
      {alerts.length > 0 && (
        <div className="bg-red-950/30 border-b border-red-900 p-2 overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs">
            <Bell className="w-4 h-4 text-red-500 animate-pulse" />
            <span className="text-red-400 font-bold">LIVE:</span>
            <span className="text-green-400">{alerts[0]?.message}</span>
            <span className="text-gray-500 mr-auto">[{alerts[0]?.time}]</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="bg-black border-b border-green-900/30">
        <div className="max-w-7xl mx-auto flex overflow-x-auto">
          {[
            { id: 'map', icon: Globe, label: 'מפת עולם' },
            { id: 'agents', icon: Users, label: 'סוכנים' },
            { id: 'cameras', icon: Camera, label: 'מצלמות' },
            { id: 'satellites', icon: Satellite, label: 'לוויינים' },
            { id: 'threats', icon: AlertTriangle, label: 'איומים' },
            { id: 'comms', icon: Radio, label: 'תקשורת' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-500 bg-red-950/20'
                  : 'border-transparent text-green-700 hover:bg-green-950/10 hover:text-green-500'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-bold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4">
        {/* World Map View */}
        {activeTab === 'map' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
                <Globe className="w-6 h-6" />
                מפת פריסת כוחות עולמית
              </h2>
              <div className="flex gap-2 text-xs">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>פעיל</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-yellow-500 rounded-full"></div>המתנה</div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div>לא מקוון</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-950 to-black rounded-lg border-2 border-green-900/30 p-4 relative" style={{ height: '600px' }}>
              {/* Grid overlay */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 255, 0, .1) 25%, rgba(0, 255, 0, .1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .1) 75%, rgba(0, 255, 0, .1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0, 255, 0, .1) 25%, rgba(0, 255, 0, .1) 26%, transparent 27%, transparent 74%, rgba(0, 255, 0, .1) 75%, rgba(0, 255, 0, .1) 76%, transparent 77%, transparent)',
                backgroundSize: '50px 50px'
              }}></div>
              
              {/* World Map Representation */}
              <div className="absolute inset-4 border border-green-900/50 rounded">
                {agents.map(agent => (
                  <div
                    key={agent.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                    style={{ left: `${agent.location.x}%`, top: `${agent.location.y}%` }}
                    onClick={() => {
                      setSelectedAgent(agent);
                      addAlert(`גישה למידע ${agent.code}`);
                    }}
                  >
                    {/* Ping effect */}
                    {agent.status === 'active' && (
                      <div className="absolute inset-0 animate-ping">
                        <div className="w-8 h-8 border-2 border-green-500 rounded-full"></div>
                      </div>
                    )}
                    
                    {/* Agent marker */}
                    <div className={`relative z-10 ${agent.status === 'active' ? 'bg-green-900' : agent.status === 'standby' ? 'bg-yellow-900' : 'bg-red-900'} rounded-full p-2 border-2 ${agent.status === 'active' ? 'border-green-500' : agent.status === 'standby' ? 'border-yellow-500' : 'border-red-500'} shadow-lg transition-transform group-hover:scale-125`}>
                      <Crosshair className="w-4 h-4" />
                    </div>
                    
                    {/* Info tooltip */}
                    <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-black border border-green-500 rounded px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-xl">
                      <div className="text-xs font-bold text-red-500">{agent.code}</div>
                      <div className="text-xs text-green-400">{agent.location.city}</div>
                      <div className="text-xs text-gray-400">{agent.mission}</div>
                    </div>
                  </div>
                ))}
                
                {/* Satellite coverage lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                  {agents.filter(a => a.status === 'active').map((agent, i) => (
                    <line
                      key={i}
                      x1="50%"
                      y1="50%"
                      x2={`${agent.location.x}%`}
                      y2={`${agent.location.y}%`}
                      stroke="#00ff00"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                    />
                  ))}
                </svg>
              </div>
            </div>

            {/* Selected Agent Details */}
            {selectedAgent && (
              <div className="bg-gradient-to-r from-black via-green-950/20 to-black border-2 border-green-500 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-red-500 mb-2">קובץ סוכן: {selectedAgent.code}</h3>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-gray-500">שם:</span> <span className="text-green-400">{selectedAgent.name}</span></div>
                      <div><span className="text-gray-500">מיקום:</span> <span className="text-green-400">{selectedAgent.location.city}</span></div>
                      <div><span className="text-gray-500">משימה:</span> <span className="text-green-400">{selectedAgent.mission}</span></div>
                      <div><span className="text-gray-500">סטטוס:</span> <span className={getStatusColor(selectedAgent.status)}>{selectedAgent.status === 'active' ? 'פעיל' : selectedAgent.status === 'standby' ? 'המתנה' : 'לא מקוון'}</span></div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedAgent(null)}
                    className="text-red-500 hover:text-red-400 text-sm border border-red-500 px-3 py-1 rounded"
                  >
                    סגור
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Cameras View - NEW */}
        {activeTab === 'cameras' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
              <Camera className="w-6 h-6" />
              מערכת חדירה למצלמות
            </h2>
            
            {hackingCamera !== null && (
              <div className="bg-gradient-to-r from-red-950 via-black to-red-950 border-2 border-red-500 rounded-lg p-4 animate-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="w-6 h-6 text-red-500 animate-spin" />
                  <span className="text-red-400 font-bold">פריצה בתהליך...</span>
                </div>
                <div className="bg-black rounded-full h-4 overflow-hidden border border-red-500">
                  <div 
                    className="bg-gradient-to-r from-red-600 to-red-400 h-full transition-all duration-300"
                    style={{ width: `${hackProgress}%` }}
                  ></div>
                </div>
                <div className="text-center text-green-400 mt-2 font-mono text-sm">
                  {hackProgress.toFixed(0)}% - מפענח הצפנה...
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {cameras.map(camera => (
                <div key={camera.id} className={`bg-gradient-to-br from-black via-gray-950 to-black border-2 rounded-lg overflow-hidden ${camera.hacked ? 'border-green-500' : camera.status === 'locked' ? 'border-red-500/50' : 'border-yellow-500/50'}`}>
                  {/* Camera Feed */}
                  <div className="aspect-video bg-black relative overflow-hidden">
                    {camera.hacked || camera.feed === 'live' ? (
                      <>
                        {/* Live Feed Simulation */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                          <div className="absolute inset-0 opacity-20" style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.1) 2px, rgba(0,255,0,0.1) 4px)',
                            animation: 'scan 3s linear infinite'
                          }}></div>
                          <div className="flex items-center justify-center h-full">
                            <Camera className="w-16 h-16 text-green-500 opacity-50" />
                          </div>
                        </div>
                        {/* Live Indicator */}
                        <div className="absolute top-3 right-3 bg-green-600 text-white px-3 py-1 rounded text-xs font-bold flex items-center gap-1 animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          LIVE
                        </div>
                        {/* Timestamp */}
                        <div className="absolute bottom-3 left-3 bg-black/80 text-green-400 px-2 py-1 rounded text-xs font-mono">
                          {new Date().toLocaleTimeString('he-IL')}
                        </div>
                        {/* Crosshair */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <Crosshair className="w-12 h-12 text-red-500 opacity-30" />
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Locked/Encrypted */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-950 to-black flex items-center justify-center">
                          <div className="text-center">
                            <Lock className="w-16 h-16 mx-auto mb-3 text-red-500" />
                            <div className="text-red-400 font-bold">מוצפן</div>
                            <div className="text-xs text-gray-500 mt-1">נדרשת פריצה</div>
                          </div>
                        </div>
                        {/* Static Noise Effect */}
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' /%3E%3C/svg%3E")',
                          animation: 'noise 0.2s infinite'
                        }}></div>
                      </>
                    )}
                  </div>

                  {/* Camera Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-green-400 mb-1">{camera.location}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            camera.hacked 
                              ? 'bg-green-900 text-green-400'
                              : camera.status === 'locked'
                              ? 'bg-red-900 text-red-400'
                              : 'bg-yellow-900 text-yellow-400'
                          }`}>
                            {camera.hacked ? '✓ נפרץ' : camera.status === 'locked' ? '🔒 נעול' : '● פעיל'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {camera.status === 'locked' && !camera.hacked && (
                        <button
                          onClick={() => startHack(camera.id)}
                          disabled={hackingCamera !== null}
                          className={`flex-1 font-bold py-2 px-4 rounded transition-all ${
                            hackingCamera !== null
                              ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                              : 'bg-red-900 hover:bg-red-800 border border-red-500 text-red-400'
                          }`}
                        >
                          <Activity className="w-4 h-4 inline mr-2" />
                          פרוץ מצלמה
                        </button>
                      )}
                      {(camera.hacked || camera.feed === 'live') && (
                        <>
                          <button
                            onClick={() => addAlert(`הקלטה החלה: ${camera.location}`)}
                            className="flex-1 bg-green-900 hover:bg-green-800 border border-green-500 text-green-400 font-bold py-2 px-4 rounded"
                          >
                            הקלט
                          </button>
                          <button
                            onClick={() => addAlert(`צילום מסך נשמר: ${camera.location}`)}
                            className="bg-blue-900 hover:bg-blue-800 border border-blue-500 text-blue-400 font-bold py-2 px-4 rounded"
                          >
                            📸
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hacking Tools Panel */}
            <div className="bg-gradient-to-r from-black via-gray-950 to-black border-2 border-red-500 rounded-lg p-4">
              <h3 className="font-bold text-red-500 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                כלי פריצה זמינים
              </h3>
              <div className="grid grid-cols-3 gap-3 text-center text-xs">
                <div className="bg-black border border-green-500/30 rounded p-2">
                  <div className="text-green-400 font-bold mb-1">Brute Force</div>
                  <div className="text-gray-500">זמין</div>
                </div>
                <div className="bg-black border border-green-500/30 rounded p-2">
                  <div className="text-green-400 font-bold mb-1">SQL Injection</div>
                  <div className="text-gray-500">זמין</div>
                </div>
                <div className="bg-black border border-green-500/30 rounded p-2">
                  <div className="text-green-400 font-bold mb-1">Zero-Day</div>
                  <div className="text-gray-500">זמין</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Agents View */}
        {activeTab === 'agents' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
              <Users className="w-6 h-6" />
              רשימת סוכנים פעילים
            </h2>
            <div className="grid gap-3">
              {agents.map(agent => (
                <div key={agent.id} className="bg-gradient-to-r from-black via-gray-950 to-black border border-green-900/30 rounded-lg p-4 hover:border-green-500/50 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`${agent.status === 'active' ? 'bg-green-900 border-green-500' : agent.status === 'standby' ? 'bg-yellow-900 border-yellow-500' : 'bg-red-900 border-red-500'} rounded-full p-3 border-2`}>
                        <Eye className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-red-500">{agent.code}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${getStatusColor(agent.status)}`}>
                            {agent.status === 'active' ? '● פעיל' : agent.status === 'standby' ? '● המתנה' : '● לא מקוון'}
                          </span>
                        </div>
                        <p className="text-sm text-green-400">{agent.location.city}</p>
                        <p className="text-xs text-gray-500">{agent.mission}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => addAlert(`[${agent.code}] פקודה נשלחה`)}
                        className="bg-green-900 hover:bg-green-800 border border-green-500 text-green-400 px-4 py-2 rounded text-sm font-bold"
                      >
                        שלח פקודה
                      </button>
                      <button 
                        onClick={() => addAlert(`[${agent.code}] מיקום עודכן`)}
                        className="bg-red-900 hover:bg-red-800 border border-red-500 text-red-400 px-4 py-2 rounded text-sm font-bold"
                      >
                        עדכן מיקום
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Satellites View */}
        {activeTab === 'satellites' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
              <Satellite className="w-6 h-6" />
              מערך לוויינים
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {satellites.map(sat => (
                <div key={sat.id} className="bg-gradient-to-br from-black via-blue-950 to-black border-2 border-blue-500/50 rounded-lg p-4">
                  <Satellite className="w-12 h-12 text-blue-400 mb-3 mx-auto" />
                  <h3 className="text-center font-bold text-blue-400 mb-2">{sat.name}</h3>
                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-500">סטטוס:</span>
                      <span className="text-green-400">● {sat.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">כיסוי:</span>
                      <span className="text-green-400">{sat.coverage}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => addAlert(`לוויין ${sat.name} - בקשת תצלום`)}
                    className="w-full mt-3 bg-blue-900 hover:bg-blue-800 border border-blue-500 text-blue-400 py-2 rounded text-sm font-bold"
                  >
                    בקש תצלום
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Threats View */}
        {activeTab === 'threats' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              מפת איומים
            </h2>
            <div className="grid gap-3">
              {threats.map(threat => (
                <div key={threat.id} className={`${getThreatColor(threat.level)} border-2 rounded-lg p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-8 h-8 text-red-500 animate-pulse" />
                      <div>
                        <div className="font-bold text-red-400 text-lg">{threat.type}</div>
                        <div className="text-sm text-green-400">{threat.location}</div>
                        <div className="text-xs text-gray-500 mt-1">רמת איום: {threat.level.toUpperCase()}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => addAlert(`איום ב${threat.location} - מנותח`)}
                      className="bg-red-900 hover:bg-red-800 border border-red-500 text-red-400 px-4 py-2 rounded text-sm font-bold"
                    >
                      נתח איום
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Communications View */}
        {activeTab === 'comms' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-red-500 flex items-center gap-2">
              <Radio className="w-6 h-6" />
              תקשורת מוצפנת
            </h2>
            
            <div className="bg-gradient-to-br from-black via-gray-950 to-black border-2 border-green-500 rounded-lg p-4">
              <h3 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                <Activity className="w-5 h-5" />
                יומן שידורים
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {alerts.length > 0 ? (
                  alerts.map(alert => (
                    <div key={alert.id} className="bg-black/50 border border-green-900/30 p-3 rounded font-mono text-xs">
                      <div className="flex justify-between items-start">
                        <span className="text-green-400">{alert.message}</span>
                        <span className="text-gray-600 text-xs">[{alert.time}]</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-600 text-center py-8">אין שידורים פעילים</div>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button 
                onClick={() => addAlert('שידור חירום נשלח לכל הסוכנים', 'critical')}
                className="bg-red-900 hover:bg-red-800 border-2 border-red-500 text-red-400 p-6 rounded-lg font-bold text-lg"
              >
                <Bell className="w-8 h-8 mx-auto mb-2" />
                שידור חירום
              </button>
              <button 
                onClick={() => addAlert('מוד שקט - כל התקשורת מוצפנת')}
                className="bg-gray-900 hover:bg-gray-800 border-2 border-gray-500 text-gray-400 p-6 rounded-lg font-bold text-lg"
              >
                <Lock className="w-8 h-8 mx-auto mb-2" />
                מוד שקט
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 border-t border-green-900/30 bg-black p-4">
        <div className="max-w-7xl mx-auto text-center text-xs text-gray-600">
          <div className="mb-2">█████ CLASSIFIED - LEVEL 5 CLEARANCE REQUIRED █████</div>
          <div>כל הזכויות שמורות © המוסד למודיעין ולתפקידים מיוחדים | AUTHORIZED PERSONNEL ONLY</div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -5%); }
          20% { transform: translate(-10%, 5%); }
          30% { transform: translate(5%, -10%); }
          40% { transform: translate(-5%, 15%); }
          50% { transform: translate(-10%, 5%); }
          60% { transform: translate(15%, 0); }
          70% { transform: translate(0, 10%); }
          80% { transform: translate(-15%, 0); }
          90% { transform: translate(10%, 5%); }
        }
      `}</style>
    </div>
  );
};

export default MossadApp;
