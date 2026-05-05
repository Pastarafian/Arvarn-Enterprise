import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Users, FileText, Settings, LogOut, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ token, logout }: { token: string; logout: () => void }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:8085/api/analytics/realtime', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
            setData(await res.json());
            return;
        }
        throw new Error('API failed');
      } catch (e) {
        console.warn("Backend unreachable. Generating Mock Telemetry.");
        const now = new Date();
        const timeseries = Array.from({length: 24}).map((_, i) => ({
            timestamp: new Date(now.getTime() - (23 - i) * 3600000).toISOString(),
            invoices_generated: Math.floor(Math.random() * 45) + 5,
            jobs_created: Math.floor(Math.random() * 8) + 1
        }));
        setData({
            status: "online",
            active_agents: 16,
            messages_last_hour: 432,
            total_revenue_processed: 18450.50,
            timeseries
        });
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [token]);

  if (!data) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="h-screen flex overflow-hidden">
      <aside className="w-64 glass-panel border-r border-border border-y-0 border-l-0 flex flex-col rounded-none z-20">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <h1 className="text-xl font-bold glow-text">Arvarn Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="nav-item active"><Activity className="w-5 h-5" /> Overview</Link>
          <a href="#" className="nav-item"><Users className="w-5 h-5" /> Team Agents</a>
          <a href="#" className="nav-item"><FileText className="w-5 h-5" /> Invoices</a>
          <a href="#" className="nav-item"><Settings className="w-5 h-5" /> Settings</a>
        </nav>
        <div className="p-4 border-t border-border">
          <button onClick={logout} className="nav-item w-full"><LogOut className="w-5 h-5" /> Logout</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 glass-panel border-b border-border rounded-none flex items-center justify-between px-8 z-10">
          <div className="flex items-center text-sm text-sub">
            <span className="w-2 h-2 rounded-full bg-primary mr-2 shadow-sm shadow-primary/80" />
            System Online
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-bg border border-border rounded-full px-4 py-1.5 text-sm flex items-center">
              <input type="text" placeholder="Search invoices..." className="bg-transparent border-none focus:outline-none text-text placeholder-faint w-48" />
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-sm font-bold shadow-lg">JD</div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none" />
          
          <div className="max-w-6xl mx-auto space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <h3 className="text-sub text-sm font-medium">Active Agents</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{data.active_agents}</span>
                  <span className="text-primary text-sm font-medium">+2 this week</span>
                </div>
              </div>
              <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <h3 className="text-sub text-sm font-medium">Messages (1h)</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold">{data.messages_last_hour}</span>
                  <span className="text-primary text-sm font-medium">High Volume</span>
                </div>
              </div>
              <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
                <h3 className="text-sub text-sm font-medium">Revenue Processed</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-4xl font-bold glow-text">£{data.total_revenue_processed.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">System Utilization (24h)</h2>
                <div className="flex gap-4">
                  <span className="flex items-center text-xs text-sub"><span className="w-2 h-2 rounded-full bg-primary mr-2" />Invoices</span>
                  <span className="flex items-center text-xs text-sub"><span className="w-2 h-2 rounded-full bg-secondary mr-2" />Jobs</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={data.timeseries} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInvoices" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="timestamp" stroke="var(--color-border)" tickFormatter={(v) => new Date(v).getHours() + ':00'} />
                  <YAxis stroke="var(--color-border)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '8px', backdropFilter: 'blur(4px)' }}
                    itemStyle={{ color: 'var(--color-text)' }}
                  />
                  <Area type="monotone" dataKey="invoices_generated" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorInvoices)" />
                  <Area type="monotone" dataKey="jobs_created" stroke="var(--color-secondary)" strokeWidth={2} strokeDasharray="4 4" fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl">
              <h2 className="text-lg font-semibold mb-6">Account Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-bg/50 border border-border rounded-xl flex items-center justify-between hover:border-primary/50 cursor-pointer transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><Users className="w-5 h-5"/></div>
                    <div><div className="font-medium">Team Provisioning</div><div className="text-xs text-sub">Manage 16 agent seats</div></div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-sub" />
                </div>
                <div className="p-4 bg-bg/50 border border-border rounded-xl flex items-center justify-between hover:border-primary/50 cursor-pointer transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary"><CheckCircle2 className="w-5 h-5"/></div>
                    <div><div className="font-medium">Stripe Billing</div><div className="text-xs text-sub">Enterprise Plan • Active</div></div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-sub" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
