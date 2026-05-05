import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Activity, FileText, CheckCircle2, Image as ImageIcon, MapPin, FileSpreadsheet, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const SKILLS = [
  {
    id: 'receipt',
    icon: <ImageIcon className="w-5 h-5" />,
    name: 'Receipt OCR',
    category: 'Finance',
    desc: 'Snap a photo of any receipt. Arvarn reads it, logs the expense, and categorizes it for HMRC.',
    chat: [
      { sender: 'user', image: './receipt.png', text: 'Materials from Screwfix' },
      { sender: 'arvarn', text: 'Got it. I extracted £152.50 for Screwfix. I\'ve categorized it under "Materials" for the Smith Kitchen job.' }
    ]
  },
  {
    id: 'invoice',
    icon: <FileText className="w-5 h-5" />,
    name: 'Instant Invoicing',
    category: 'Billing',
    desc: 'Generate professional, branded PDFs and Stripe payment links instantly via chat.',
    chat: [
      { sender: 'user', text: 'Close out the Smith job and invoice them for £4,200.' },
      { sender: 'arvarn', attachment: { type: 'pdf', name: 'Smith_Invoice_1042.pdf' }, text: 'Invoice #1042 created.\n\nHere is the payment link: pay.stripe.com/test1234' }
    ]
  },
  {
    id: 'tax',
    icon: <CheckCircle2 className="w-5 h-5" />,
    name: 'HMRC Tax AI',
    category: 'Compliance',
    desc: 'Ask complex tax questions and get verified answers based on current HMRC guidelines.',
    chat: [
      { sender: 'user', text: 'Can I claim my lunch today? I am 15 miles from the office.' },
      { sender: 'arvarn', text: 'According to HMRC rules, you can claim "subsistence" because you are outside your normal working pattern and travelling for business. Keep the receipt!' }
    ]
  },
  {
    id: 'mileage',
    icon: <MapPin className="w-5 h-5" />,
    name: 'Mileage Tracker',
    category: 'Finance',
    desc: 'Log trips by texting miles or dropping location pins to automatically calculate 45p/mile deductions.',
    chat: [
      { sender: 'user', text: 'Just drove 45 miles to the new site in London.' },
      { sender: 'arvarn', text: 'Logged 45 miles. At the HMRC 45p rate, that\'s £20.25 added to your tax deductions for this year.' }
    ]
  },
  {
    id: 'leave',
    icon: <Activity className="w-5 h-5" />,
    name: 'Team Leave',
    category: 'Enterprise',
    desc: 'Employees request leave via WhatsApp. Admins approve via the dashboard.',
    chat: [
      { sender: 'user', text: 'I need to take next Friday off for a family event.' },
      { sender: 'arvarn', text: 'Leave request logged for next Friday. I have sent a notification to your admin for approval. I will update you once it is approved.' }
    ]
  },
  {
    id: 'export',
    icon: <FileSpreadsheet className="w-5 h-5" />,
    name: 'Sync to Sheets',
    category: 'Data',
    desc: 'Never manually type data again. Arvarn syncs your entire financial history directly into Google Sheets.',
    chat: [
      { sender: 'user', text: 'Export my Q3 expenses.' },
      { sender: 'arvarn', text: 'Export complete. I have synced 142 expenses to your Google Sheet: "2026_Q3_Expenses".' }
    ]
  }
];

export default function Homepage() {
  const [activeSkill, setActiveSkill] = useState(SKILLS[0]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-bg">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-float pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
      
      <nav className="h-20 flex items-center justify-between px-6 md:px-10 relative z-50 glass-panel rounded-b-2xl mx-4 mt-0 border-t-0 sticky top-0">
        <div className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg">
            <span className="text-bg font-bold text-sm">A</span>
          </div>
          <span className="glow-text">Arvarn</span>
        </div>
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm font-medium text-sub">
          <button onClick={() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-text transition-colors">Features</button>
          <button onClick={() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'})} className="hover:text-text transition-colors">Pricing</button>
          <button className="hover:text-text transition-colors">Security</button>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-sm font-medium text-text bg-surface border border-border rounded-lg hover:border-primary/50 transition-all">Sign In</Link>
          <Link to="/onboarding" className="px-5 py-2 text-sm font-bold text-bg bg-primary rounded-lg shadow-lg shadow-primary/40 hover:bg-accent hover:-translate-y-0.5 transition-all hidden md:block">Start Free Trial</Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col relative z-10">
        <section className="pt-20 pb-20 px-6 text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 backdrop-blur-md shadow-xl shadow-primary/15">
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
              <Link to="/signup" className="px-8 py-4 bg-text text-bg font-bold rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1">
                Start 1-Month Free Trial <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* INTERACTIVE SHOWCASE SECTION */}
        <section id="features" className="py-20 bg-surface/30 border-y border-border px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">38+ Skills. <span className="text-primary">Zero Dashboards.</span></h2>
              <p className="text-sub max-w-2xl mx-auto text-lg">Click a skill below to see how Arvarn handles it directly through chat.</p>
            </div>
            
            <div className="flex flex-col-reverse lg:flex-row gap-12 items-center lg:items-start">
              
              {/* Left Side: Skill Selector */}
              <div className="w-full lg:w-1/2 flex lg:grid lg:grid-cols-2 gap-4 overflow-x-auto snap-x snap-mandatory lg:overflow-visible pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {SKILLS.map((skill) => (
                  <button 
                    key={skill.id}
                    onClick={() => setActiveSkill(skill)}
                    className={`min-w-[260px] lg:min-w-0 snap-center text-left p-5 md:p-6 rounded-2xl border transition-all duration-300 ${activeSkill.id === skill.id ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20 scale-100 lg:scale-105' : 'glass-panel border-border hover:border-primary/50 hover:-translate-y-1'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${activeSkill.id === skill.id ? 'bg-primary text-bg' : 'bg-surface text-primary'}`}>
                      {skill.icon}
                    </div>
                    <div className="text-xs text-sub font-bold uppercase tracking-wider mb-1">{skill.category}</div>
                    <h3 className="text-lg font-bold mb-2">{skill.name}</h3>
                    <p className="text-sm text-sub leading-relaxed">{skill.desc}</p>
                  </button>
                ))}
              </div>

              {/* Right Side: WhatsApp Mockup */}
              <div className="w-full lg:w-1/2 max-w-md sticky top-32">
                <div className="glass-panel rounded-3xl overflow-hidden flex flex-col h-[550px] border-border shadow-2xl relative">
                  {/* WhatsApp Header */}
                  <div className="bg-surface/90 backdrop-blur-md px-6 py-4 flex items-center gap-4 border-b border-border z-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-lg">
                      <span className="text-bg font-bold">A</span>
                    </div>
                    <div>
                      <div className="font-bold">Arvarn AI</div>
                      <div className="text-xs text-primary flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        online
                      </div>
                    </div>
                  </div>
                  
                  {/* Chat Area */}
                  <div className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto" style={{backgroundImage: 'radial-gradient(circle at center, rgba(204,201,220,0.02) 0%, transparent 100%)'}}>
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={activeSkill.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-6 w-full"
                      >
                        {activeSkill.chat.map((msg: any, idx: number) => (
                          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} w-full`}>
                            <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-md whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-primary text-bg rounded-br-sm font-medium' : 'glass-panel border border-border rounded-bl-sm text-text'}`}>
                              {msg.image && (
                                <div className="mb-3 rounded-xl overflow-hidden border border-white/20 shadow-sm">
                                  <img src={msg.image} alt="Attachment" className="w-full h-auto object-cover max-h-48" />
                                </div>
                              )}
                              {msg.attachment && msg.attachment.type === 'pdf' && (
                                <div className="mb-3 p-3 bg-bg/50 rounded-xl flex items-center gap-3 border border-white/10 shadow-sm">
                                  <div className="p-2 bg-white/10 rounded-lg"><FileText className="w-5 h-5 text-red-400" /></div>
                                  <span className="font-bold text-xs truncate">{msg.attachment.name}</span>
                                </div>
                              )}
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  
                  {/* Input Area */}
                  <div className="p-4 bg-surface/80 backdrop-blur-md border-t border-border flex items-center gap-3">
                    <div className="flex-1 bg-bg/50 border border-border rounded-full px-5 py-3 text-sub text-sm flex items-center shadow-inner">Message...</div>
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-bg shadow-lg hover:scale-105 transition-transform cursor-pointer">
                      <Send className="w-5 h-5 ml-1" />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
        {/* DEPLOYMENT & ADMIN SECTION */}
        <section id="deployment" className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Zero-Friction Deployment.</h2>
            <p className="text-sub max-w-2xl mx-auto text-lg">We handle the infrastructure. You get a dedicated WhatsApp number. It's really that simple.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-10 rounded-3xl border border-border">
              <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center mb-8"><ArrowUpRight className="w-7 h-7"/></div>
              <h3 className="text-2xl font-bold mb-4">Your Own Number</h3>
              <p className="text-sub leading-relaxed text-lg">Arvarn connects directly to the official Meta WhatsApp Business API. Your team gets a dedicated, professional number to interact with—no app downloads, no logins, and zero training required.</p>
            </div>
            
            <div className="glass-panel p-10 rounded-3xl border border-border bg-gradient-to-br from-surface to-surface/50">
              <div className="w-14 h-14 rounded-2xl bg-secondary/20 text-secondary flex items-center justify-center mb-8"><CheckCircle2 className="w-7 h-7"/></div>
              <h3 className="text-2xl font-bold mb-4">WhatsApp-First Admin</h3>
              <p className="text-sub leading-relaxed mb-8 text-lg">Manage your fleet's access without a dashboard. When a new sub-contractor texts your AI, you get a ping on your own phone to whitelist them.</p>
              
              <div className="p-5 rounded-2xl bg-bg border border-border shadow-inner text-sm space-y-4 font-medium">
                <div className="flex justify-start">
                  <div className="bg-surface border border-border px-4 py-3 rounded-2xl rounded-bl-sm max-w-[95%] shadow-sm">
                    <span className="font-bold text-primary block text-xs mb-1.5 tracking-wider uppercase">Arvarn Admin Alert</span>
                    New user +44 7700 900123 is requesting access.<br/><br/>Reply <span className="text-primary font-mono bg-primary/10 px-1 py-0.5 rounded">approve +447700900123 John</span> to grant access.
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary text-bg px-4 py-3 rounded-2xl rounded-br-sm shadow-md">
                    approve +447700900123 John Smith
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-24 px-6 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Honest Pricing</h2>
          <p className="text-sub mb-16">Choose the plan that fits your operation. A standard 0.5% payment fee applies to Stripe invoices.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <div className="glass-panel p-8 rounded-3xl border border-border hover:border-primary/50 transition-colors">
              <h3 className="text-2xl font-bold mb-2">Solo</h3>
              <p className="text-sub text-sm mb-6">Perfect for independent tradesmen.</p>
              <div className="mb-8"><span className="text-4xl font-bold">£25</span><span className="text-sub">/month</span></div>
              <ul className="space-y-4 mb-8 text-sm">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> All 38+ AI Skills</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Unlimited Jobs & Invoices</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> 24/7 AI WhatsApp Access</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Receipt Scanning & OCR</li>
              </ul>
              <Link to="/onboarding" className="block w-full py-3 text-center bg-surface border border-border rounded-xl font-bold hover:bg-primary hover:text-bg transition-all">Start Free Trial</Link>
            </div>

            <div className="glass-panel p-8 rounded-3xl border-2 border-primary relative overflow-hidden shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-shadow">
              <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-bg text-xs font-bold rounded-bl-xl tracking-wider">POPULAR FOR TEAMS</div>
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-sub text-sm mb-6">For growing fleets and agencies.</p>
              <div className="mb-8"><span className="text-4xl font-bold glow-text">£199</span><span className="text-sub">/month</span></div>
              <ul className="space-y-4 mb-8 text-sm">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Up to 16 Team Members</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Full Web Admin Dashboard</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Inter-Agent Communications</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Timesheets & Expense Watchdog</li>
              </ul>
              <Link to="/onboarding" className="block w-full py-3 text-center bg-primary text-bg rounded-xl font-bold hover:brightness-110 shadow-xl shadow-primary/30 transition-all">Setup Enterprise</Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-border py-12 px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center"><span className="text-bg text-[10px] font-bold">A</span></div>
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
