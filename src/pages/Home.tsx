import { motion } from 'framer-motion';
import { ArrowUpRight, Activity, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-bg">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-float pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
      
      <nav className="h-20 flex items-center justify-between px-6 md:px-10 relative z-50 glass-panel rounded-b-2xl mx-4 mt-0 border-t-0 sticky top-0">
        <div className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg">
            <span className="text-white text-sm">A</span>
          </div>
          <span className="glow-text">Arvarn</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-sub">
          <button onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-text transition-colors">Features</button>
          <button onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-text transition-colors">Pricing</button>
          <button className="hover:text-text transition-colors">Security</button>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-sm font-medium text-text bg-surface border border-border rounded-lg hover:border-primary/50 transition-all">Sign In</Link>
          <Link to="/onboarding" className="px-5 py-2 text-sm font-bold text-bg bg-primary rounded-lg shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:bg-accent hover:-translate-y-0.5 transition-all hidden md:block">Start Free Trial</Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col relative z-10">
        <section className="pt-24 pb-32 px-6 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.15)]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available 24/7 on WhatsApp
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Stop Running Your Business <br className="hidden md:block"/>
              <span className="glow-text">From Memory.</span>
            </h1>
            <p className="text-lg md:text-xl text-sub mb-10 max-w-2xl mx-auto leading-relaxed">
              Arvarn is an AI site agent that handles the business side of your trade so you can focus on the tools. Send a WhatsApp message. Arvarn does the rest.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/onboarding" className="px-8 py-4 bg-text text-bg font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1">
                Start 1-Month Free Trial <ArrowUpRight className="w-5 h-5" />
              </Link>
              <button onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 bg-surface border border-border text-text font-bold rounded-xl hover:border-primary/50 transition-all flex items-center justify-center gap-2">
                See How It Works
              </button>
            </div>
          </motion.div>
        </section>

        <section id="features" className="py-24 bg-surface/30 border-y border-border px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need, <span className="text-primary">In One Chat.</span></h2>
              <p className="text-sub max-w-2xl mx-auto">No apps to download. No dashboards to learn. Just text or send voice notes to your AI partner.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-6"><Activity className="w-6 h-6"/></div>
                <h3 className="text-xl font-bold mb-3">Job Management</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">"Start job: Smith kitchen." Arvarn opens the job, creates a timeline, and logs all future expenses against it automatically.</p>
              </div>
              <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center mb-6"><FileText className="w-6 h-6"/></div>
                <h3 className="text-xl font-bold mb-3">Instant Invoicing</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">"Close Smith job, invoice £4,200." Arvarn generates a branded PDF instantly, complete with a Stripe payment link.</p>
              </div>
              <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center mb-6"><CheckCircle2 className="w-6 h-6"/></div>
                <h3 className="text-xl font-bold mb-3">HMRC Tax AI</h3>
                <p className="text-sub text-sm leading-relaxed mb-4">"Can I claim my fuel today?" Get cited, plain-English answers based on current HMRC guidance. Snap a receipt, and Arvarn categorises it.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-24 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Honest Pricing</h2>
          <p className="text-sub mb-16">Choose the plan that fits your operation. A standard 0.5% payment fee applies to Stripe invoices.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="glass-panel p-8 rounded-3xl border border-border">
              <h3 className="text-2xl font-bold mb-2">Solo</h3>
              <p className="text-sub text-sm mb-6">Perfect for independent tradesmen.</p>
              <div className="mb-8"><span className="text-4xl font-bold">£25</span><span className="text-sub">/month</span></div>
              <ul className="space-y-4 mb-8 text-sm">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> All Core Features</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Unlimited Jobs & Invoices</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> 24/7 AI WhatsApp Access</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Receipt Scanning</li>
              </ul>
              <Link to="/onboarding" className="block w-full py-3 text-center bg-surface border border-border rounded-xl font-bold hover:bg-surface/80 transition-all">Start Free Trial</Link>
            </div>

            <div className="glass-panel p-8 rounded-3xl border-2 border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-bg text-xs font-bold rounded-bl-xl">POPULAR FOR TEAMS</div>
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-sub text-sm mb-6">For growing fleets and agencies.</p>
              <div className="mb-8"><span className="text-4xl font-bold glow-text">£199</span><span className="text-sub">/month</span></div>
              <ul className="space-y-4 mb-8 text-sm">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Up to 16 Team Members</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Full Web Admin Dashboard</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Inter-Agent Communications</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Timesheets & Expense Watchdog</li>
              </ul>
              <Link to="/onboarding" className="block w-full py-3 text-center bg-primary text-bg rounded-xl font-bold hover:brightness-110 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">Setup Enterprise</Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-border py-12 px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center"><span className="text-white text-[10px] font-bold">A</span></div>
            <span className="font-bold tracking-tight">Arvarn</span>
          </div>
          <p className="text-sm text-faint mb-4">UK-Built Data Protection. Your financial data is never used to train external models.</p>
          <div className="flex justify-center gap-6 text-sm text-sub">
            <a href="#" className="hover:text-text transition-colors">Privacy</a>
            <a href="#" className="hover:text-text transition-colors">Terms</a>
            <a href="#" className="hover:text-text transition-colors">Contact</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
