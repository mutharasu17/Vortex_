'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAnalytics } from '@/hooks/useAnalytics';
import { robotService, Robot } from '@/lib/firestore';
import { Plus, Trash2, Zap, Battery, Cpu, CheckCircle2, ShoppingCart, Loader2 } from 'lucide-react';

// Simple animated counter
function Counter({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function DashboardPage() {
  const { user, logOut, loading } = useAuth();
  const { trackPageView, trackButtonClick, trackEvent } = useAnalytics();
  const router = useRouter();

  // State for robots
  const [robots, setRobots] = useState<Robot[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newRobot, setNewRobot] = useState({ name: '', model: '', status: 'active' as const, battery: 100 });

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  // Load user robots
  useEffect(() => {
    if (user) {
      trackPageView('Dashboard');
      loadRobots();
    }
  }, [user]);

  const loadRobots = async () => {
    if (!user) return;
    try {
      const data = await robotService.getUserRobots(user.uid);
      setRobots(data);
    } catch (error) {
      console.error("Error loading robots:", error);
    } finally {
      setIsPageLoading(false);
    }
  };

  const handleAddRobot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newRobot.name || !newRobot.model) return;

    setIsAdding(true);
    try {
      await robotService.addRobot(user.uid, newRobot);
      trackEvent('add_robot', { model: newRobot.model });
      setNewRobot({ name: '', model: '', status: 'active', battery: 100 });
      await loadRobots();
    } catch (error) {
      console.error("Error adding robot:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteRobot = async (id: string) => {
    if (!confirm("Are you sure you want to decommission this unit?")) return;
    try {
      await robotService.deleteRobot(id);
      trackButtonClick('delete_robot');
      await loadRobots();
    } catch (error) {
      console.error("Error deleting robot:", error);
    }
  };

  const handleLogout = async () => {
    trackButtonClick('logout');
    await logOut();
    router.push('/login');
  };

  if (loading || isPageLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  const stats = [
    { label: 'Active Robots', value: robots.length, suffix: '', icon: '🤖', color: '#6366f1' },
    { label: 'Tasks Complete', value: 4892, suffix: '', icon: '✅', color: '#8b5cf6' },
    { label: 'Fleet Health', value: 98, suffix: '%', icon: '⚡', color: '#06b6d4' },
    { label: 'Battery Avg', value: robots.length > 0 ? Math.round(robots.reduce((acc, r) => acc + r.battery, 0) / robots.length) : 0, suffix: '%', icon: '🔋', color: '#10b981' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Orbitron:wght@400;700;900&display=swap');
        
        .dash-bg {
          min-height: 100vh;
          background: radial-gradient(ellipse at 20% 20%, #0d0a2e 0%, #000 50%, #0a0a14 100%);
          color: #e2e8f0;
          font-family: 'Inter', sans-serif;
          padding: 2rem;
        }
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(99,102,241,0.15);
        }
        .dash-brand {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          background: linear-gradient(135deg, #a5b4fc, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 2px;
        }
        .dash-user {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .user-avatar {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
          box-shadow: 0 0 16px rgba(99,102,241,0.4);
        }
        .logout-btn {
          padding: 8px 18px;
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 8px;
          color: #fca5a5;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .logout-btn:hover { background: rgba(239,68,68,0.2); }

        .dash-content { 
          max-width: 1200px; 
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 2rem;
        }

        @media (max-width: 1024px) {
          .dash-content { grid-template-columns: 1fr; }
        }

        .main-section { display: flex; flex-direction: column; gap: 2.5rem; }

        .welcome-text {
          font-size: 2.2rem;
          font-weight: 800;
          margin-bottom: 0.3rem;
          background: linear-gradient(135deg, #fff, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .welcome-sub { color: rgba(148,163,184,0.6); margin-bottom: 1.5rem; }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .stat-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 20px;
          padding: 1.5rem;
          backdrop-filter: blur(10px);
        }
        .stat-number {
          font-family: 'Orbitron', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin: 8px 0 4px;
        }
        .stat-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.4); }

        /* Robot Grid */
        .robot-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .robot-card {
          background: rgba(15,15,30,0.6);
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 24px;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .robot-card:hover {
          border-color: rgba(99,102,241,0.5);
          transform: translateY(-5px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.4), 0 0 20px rgba(99,102,241,0.1);
        }
        .robot-model {
          font-[Orbitron] text-[10px] font-bold tracking-[0.2em] text-indigo-400 mb-2 uppercase;
        }
        .robot-name { font-size: 1.3rem; font-weight: 700; margin-bottom: 1rem; color: #fff; }
        .robot-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
        }
        .status-active { background: rgba(34,197,94,0.1); color: #4ade80; }
        
        .robot-stats {
          display: flex;
          justify-content: space-between;
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .robot-stat-item { display: flex; flex-direction: column; gap: 4px; }
        .r-stat-val { font-family: 'Orbitron'; font-size: 0.9rem; font-weight: 600; color: #fff; }
        .r-stat-label { font-size: 0.65rem; color: rgba(255,255,255,0.3); text-transform: uppercase; }

        .delete-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          color: rgba(255,255,255,0.2);
          transition: color 0.2s;
          cursor: pointer;
        }
        .delete-btn:hover { color: #f87171; }

        /* Add Form Card */
        .side-section { display: flex; flex-direction: column; gap: 1.5rem; }
        .add-card {
          background: linear-gradient(135deg, rgba(30,27,75,0.8), rgba(15,15,30,0.9));
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 24px;
          padding: 2rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }
        .form-title { font-[Orbitron] text-sm font-bold tracking-widest text-[#a5b4fc] mb-6 flex items-center gap-2; }
        .input-group { margin-bottom: 1.25rem; }
        .input-label { display: block; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 8px; letter-spacing: 1px; }
        .input-field {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: #fff;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .input-field:focus { border-color: #6366f1; }
        .add-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(99,102,241,0.3);
        }
        .add-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(99,102,241,0.5); }
        .add-btn:disabled { opacity: 0.6; cursor: wait; }

        /* Cart Card */
        .cart-card {
          background: rgba(15,15,30,0.4);
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 24px;
          padding: 1.5rem;
        }
        .cart-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .cart-icon { width: 36px; height: 36px; border-radius: 8px; background: rgba(99,102,241,0.1); display: flex; align-items: center; justify-content: center; }
      `}</style>

      <div className="dash-bg">
        <header className="dash-header">
          <div className="dash-brand">🤖 NEXUS</div>
          <div className="dash-user">
            <div className="user-avatar">{user.email?.[0].toUpperCase()}</div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold">{user.displayName || 'Operator'}</div>
              <div className="text-[10px] text-neutral-500 uppercase tracking-widest">Command Center</div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
          </div>
        </header>

        <div className="dash-content">
          <div className="main-section">
            <section>
              <h1 className="welcome-text">Fleet Overview</h1>
              <p className="welcome-sub">Managing {robots.length} active units across the network.</p>

              <div className="stats-grid">
                {stats.map((s, i) => (
                  <div className="stat-card" key={i}>
                    <div className="text-xl">{s.icon}</div>
                    <div className="stat-number" style={{ color: s.color }}>
                      <Counter end={s.value} suffix={s.suffix} />
                    </div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-6 font-[Orbitron] text-sm font-bold tracking-[0.3em] uppercase text-indigo-400">Deployed Units</h2>
              <div className="robot-grid">
                {robots.length > 0 ? (
                  robots.map((robot) => (
                    <div className="robot-card" key={robot.id}>
                      <Trash2 className="delete-btn h-4 w-4" onClick={() => robot.id && handleDeleteRobot(robot.id)} />
                      <div className="robot-model">{robot.model}</div>
                      <div className="robot-name">{robot.name}</div>
                      <div className="robot-status-pill status-active">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        {robot.status}
                      </div>

                      <div className="robot-stats">
                        <div className="robot-stat-item">
                          <div className="r-stat-val">#{Math.floor(Math.random() * 900) + 100}</div>
                          <div className="r-stat-label">Unit ID</div>
                        </div>
                        <div className="robot-stat-item">
                          <div className="r-stat-val">{robot.battery}%</div>
                          <div className="r-stat-label">Battery</div>
                        </div>
                        <div className="robot-stat-item">
                          <div className="r-stat-val">98%</div>
                          <div className="r-stat-label">Link</div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <Cpu className="mx-auto h-12 w-12 text-white/10 mb-4" />
                    <p className="text-white/30 font-medium">No units deployed yet. Use the command console to add your first robot.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          <aside className="side-section">
            <div className="add-card">
              <div className="form-title">
                <Plus className="h-4 w-4" /> Deployment Console (Put/Post)
              </div>
              <form onSubmit={handleAddRobot}>
                <div className="input-group">
                  <label className="input-label">Unit Designation (Name)</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. Iron Sentinel"
                    value={newRobot.name}
                    onChange={e => setNewRobot({ ...newRobot, name: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Model Series</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. MK-7 Guardian"
                    value={newRobot.model}
                    onChange={e => setNewRobot({ ...newRobot, model: e.target.value })}
                    required
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Power Level</label>
                  <input
                    type="range"
                    className="w-full h-1.5 bg-indigo-900/50 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    min="1" max="100"
                    value={newRobot.battery}
                    onChange={e => setNewRobot({ ...newRobot, battery: parseInt(e.target.value) })}
                  />
                  <div className="flex justify-between mt-2 text-[10px] text-white/40 font-bold uppercase">
                    <span>Low</span>
                    <span className="text-indigo-400">{newRobot.battery}% Critical Core</span>
                    <span>Max</span>
                  </div>
                </div>
                <button type="submit" className="add-btn" disabled={isAdding}>
                  {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                  Deploy Unit
                </button>
              </form>
            </div>

            <div className="cart-card">
              <div className="form-title">
                <ShoppingCart className="h-4 w-4" /> Deployment Cart
              </div>
              {robots.slice(0, 3).map((r, i) => (
                <div className="cart-item" key={i}>
                  <div className="cart-icon">📦</div>
                  <div className="flex-1">
                    <div className="text-xs font-bold">{r.name}</div>
                    <div className="text-[10px] text-neutral-500">{r.model}</div>
                  </div>
                  <div className="text-[10px] font-bold text-green-500">READY</div>
                </div>
              ))}
              {robots.length === 0 && (
                <div className="text-center py-4 text-[10px] text-white/20 uppercase tracking-widest">Cart is Empty</div>
              )}
              <div className="mt-4 pt-4 border-top border-white/5 flex justify-between items-center">
                <span className="text-[10px] text-white/40 uppercase font-bold">Priority Shipping</span>
                <span className="text-xs font-bold text-indigo-400">FREE</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
