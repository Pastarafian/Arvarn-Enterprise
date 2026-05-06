import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, FileText, CheckCircle2, Image as ImageIcon, Send, ShoppingCart, MessageSquare, PenTool, Truck, PhoneCall, Users, Terminal, Globe, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChatMessage {
  sender: 'user' | 'arvarn';
  text: string;
  image?: string;
  attachment?: { type: string; name: string };
}

interface Skill {
  id: string;
  icon: React.ReactNode;
  name: string;
  category: string;
  desc: string;
  chat: ChatMessage[];
}

const SKILLS: Skill[] = [
  {
    id: 'voice',
    icon: <PhoneCall className="w-5 h-5" />,
    name: 'Autonomous Voice',
    category: 'Pro Tier',
    desc: 'Arvarn answers missed phone calls with a natural human voice to quote and book customers.',
    chat: [
      { sender: 'user', text: 'Did I miss a call from an 077 number while I was under the sink?' },
      { sender: 'arvarn', text: 'Yes, it was John. I answered the call, quoted him £120 for the pipe repair, and booked him into your calendar for Tuesday at 9am.' }
    ]
  },
  {
    id: 'outbound',
    icon: <MessageSquare className="w-5 h-5" />,
    name: 'Outbound Sales',
    category: 'Pro Tier',
    desc: 'Arvarn proactively texts past customers to book routine servicing and collects deposits via Stripe.',
    chat: [
      { sender: 'user', text: 'Scan the CRM for any boilers due for a service next week and fill my Friday.' },
      { sender: 'arvarn', text: 'Scanning... I found 3 customers due. I have texted them offering Friday slots. Sarah accepted 2PM and paid the £30 Stripe deposit.' }
    ]
  },
  {
    id: 'dispatch',
    icon: <Users className="w-5 h-5" />,
    name: 'Inter-Team Dispatch',
    category: 'Pro Tier',
    desc: 'Act as a central dispatcher for your team. Tell Arvarn what you need, and it manages the comms.',
    chat: [
      { sender: 'user', text: 'Tell Dave to pick up 5 bags of cement on his way to the SE1 job.' },
      { sender: 'arvarn', text: 'I have WhatsApped Dave. \n\n[Update]: Dave just replied "Got it".' }
    ]
  },
  {
    id: 'synthesis',
    icon: <Terminal className="w-5 h-5" />,
    name: 'Custom Synthesis',
    category: 'Pro Tier',
    desc: 'Need a skill we don\'t have? Arvarn will autonomously write the code, test it, and install it on the fly.',
    chat: [
      { sender: 'user', text: 'I need a calculator for retaining wall bricks. Do you have one?' },
      { sender: 'arvarn', text: 'I didn\'t, but I just wrote and tested "skill_retaining_wall.py" for you! It is installed. How high is the wall you are building?' }
    ]
  },
  {
    id: 'procurement',
    icon: <ShoppingCart className="w-5 h-5" />,
    name: 'Agentic Procurement',
    category: 'Core Tier',
    desc: 'Our DOM-scraping agent logs into your wholesale trade accounts to find the cheapest materials in real-time.',
    chat: [
      { sender: 'user', text: 'Price check 10 sheets of 18mm OSB3 locally.' },
      { sender: 'arvarn', text: 'I logged into your TradePoint and Selco accounts. TradePoint is £1.20 cheaper per sheet. I have added 10 to your TradePoint basket for click & collect.' }
    ]
  },
  {
    id: 'cad',
    icon: <PenTool className="w-5 h-5" />,
    name: 'Agentic 2D CAD',
    category: 'Pro Tier',
    desc: 'Text spatial measurements to Arvarn and get mathematically perfect SVG floorplans instantly.',
    chat: [
      { sender: 'user', text: 'Room is 5m x 4m. Door on 5m south wall, 1m from left. Window in middle of north wall.' },
      { sender: 'arvarn', attachment: { type: 'pdf', name: 'Floorplan_5x4.pdf' }, text: 'Floorplan generated. I also calculated you will need 22 packs of laminate to cover the 20m².' }
    ]
  },
  {
    id: 'fleet',
    icon: <Truck className="w-5 h-5" />,
    name: 'Fleet Routing',
    category: 'Enterprise',
    desc: 'Manage multiple vans. Arvarn tracks locations and dynamically reroutes subcontractors to emergency callouts.',
    chat: [
      { sender: 'user', text: 'Emergency leak at SE1 4XX. Who is closest?' },
      { sender: 'arvarn', text: 'Dave is 2 miles away finishing a quote. I have texted him the SE1 4XX address and updated the customer that a van is 15 minutes away.' }
    ]
  },
  {
    id: 'invoice',
    icon: <FileText className="w-5 h-5" />,
    name: 'Instant Invoicing',
    category: 'Core Tier',
    desc: 'Generate professional, branded PDFs and Stripe payment links instantly via chat.',
    chat: [
      { sender: 'user', text: 'Close out the Smith job and invoice them for £4,200.' },
      { sender: 'arvarn', attachment: { type: 'pdf', name: 'Smith_Invoice_1042.pdf' }, text: 'Invoice #1042 created.\n\nHere is the payment link: pay.stripe.com/test1234' }
    ]
  },
  {
    id: 'receipt',
    icon: <ImageIcon className="w-5 h-5" />,
    name: 'Receipt OCR',
    category: 'Core Tier',
    desc: 'Snap a photo of any receipt. Arvarn reads it, logs the expense, and categorizes it for HMRC.',
    chat: [
      { sender: 'user', image: './receipt.png', text: 'Materials from Screwfix' },
      { sender: 'arvarn', text: 'Got it. I extracted £152.50 for Screwfix. I\'ve categorized it under "Materials" for the Smith Kitchen job.' }
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
            
            <div className="flex flex-col-reverse lg:flex-row gap-8 items-center lg:items-start">
              
              {/* Left Side: Skill Selector */}
              <div className="w-full lg:w-[60%] grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 pb-4">
                {SKILLS.map((skill) => (
                  <button 
                    key={skill.id}
                    onClick={() => setActiveSkill(skill)}
                    className={`w-full text-left p-3 md:p-4 rounded-xl border transition-all duration-300 ${activeSkill.id === skill.id ? 'bg-primary/10 border-primary shadow-lg shadow-primary/20 scale-105 z-10' : 'glass-panel border-border hover:border-primary/50 hover:-translate-y-1'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 md:mb-3 ${activeSkill.id === skill.id ? 'bg-primary text-bg' : 'bg-surface text-primary'}`}>
                      {skill.icon}
                    </div>
                    <div className="text-[9px] md:text-[10px] text-sub font-bold uppercase tracking-wider mb-0.5 md:mb-1">{skill.category}</div>
                    <h3 className="text-xs md:text-sm font-bold mb-1 leading-tight">{skill.name}</h3>
                    <p className="text-[10px] md:text-[11px] text-sub leading-snug line-clamp-2 md:line-clamp-3">{skill.desc}</p>
                  </button>
                ))}
              </div>

              {/* Right Side: WhatsApp Mockup */}
              <div className="w-full lg:w-2/5 max-w-md sticky top-32">
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
                        {activeSkill.chat.map((msg: ChatMessage, idx: number) => (
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

        {/* ARCHITECTURE / BENTO BOX SECTION */}
        <section id="architecture" className="py-24 px-6 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Not just another chatbot.</h2>
            <p className="text-sub max-w-2xl mx-auto text-lg">Arvarn is an autonomous, self-learning ecosystem built specifically for the trades. Here's what makes it different.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bento 1: Self-Coding Brain */}
            <div className="glass-panel p-8 rounded-3xl border border-border flex flex-col md:col-span-2 relative overflow-hidden bg-gradient-to-br from-surface to-bg">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
              <div className="flex flex-col md:flex-row gap-8 items-center z-10">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-6"><Terminal className="w-6 h-6"/></div>
                  <h3 className="text-2xl font-bold mb-3">The Self-Coding Brain</h3>
                  <p className="text-sub leading-relaxed">Unlike static AI wrappers, Arvarn is built on a DeepSeek v4 autonomous synthesis loop. If you ask Arvarn to do a calculation or task it doesn't know, it spins up a secure sandbox, writes its own Python code, tests it, and installs it to your account within 60 seconds.</p>
                </div>
                <div className="flex-1 w-full bg-[#0C1821] p-6 rounded-2xl border border-white/10 font-mono text-xs text-green-400/80 shadow-2xl">
                  <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  </div>
                  <p>{">"} Arvarn Synthesis Engine initiated...</p>
                  <p>{">"} Analyzing user request: "Calculate retaining wall bricks"</p>
                  <p>{">"} Writing skill_retaining_wall.py...</p>
                  <p className="text-primary mt-2">def calculate_bricks(height, length):</p>
                  <p className="ml-4">area = height * length</p>
                  <p className="ml-4">return area * 60 # standard metric</p>
                  <p className="mt-2">{">"} Sandbox tests passed. Installing to tenant...</p>
                  <p className="text-white mt-2 font-bold">{">"} Ready.</p>
                </div>
              </div>
            </div>

            {/* Bento 2: Hive Mind */}
            <div className="glass-panel p-8 rounded-3xl border border-border flex flex-col hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Globe className="w-6 h-6"/></div>
              <h3 className="text-2xl font-bold mb-3">The Hive Mind</h3>
              <p className="text-sub leading-relaxed">When one learns, everybody levels up. If a roofer in London asks Arvarn to build a custom slate wastage calculator, that code is anonymized and pushed to the global Hive Mind. Within 24 hours, every roofer in the country inherits that new skill automatically.</p>
            </div>

            {/* Bento 3: Invisible Apprentice (Playwright) */}
            <div className="glass-panel p-8 rounded-3xl border border-border flex flex-col hover:border-primary/30 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><ShoppingCart className="w-6 h-6"/></div>
              <h3 className="text-2xl font-bold mb-3">The Invisible Apprentice</h3>
              <p className="text-sub leading-relaxed">Arvarn doesn't just talk to APIs. It features agentic DOM-scraping. When you ask it to price check materials, it literally opens an invisible web browser, logs into your TradePoint account, checks local stock, and clicks 'Add to Basket' for you.</p>
            </div>

            {/* Bento 4: Data Isolation */}
            <div className="glass-panel p-8 rounded-3xl border border-border flex flex-col md:col-span-2 relative overflow-hidden bg-surface">
              <div className="flex flex-col md:flex-row gap-8 items-center z-10">
                <div className="flex-1">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6"><Shield className="w-6 h-6"/></div>
                  <h3 className="text-2xl font-bold mb-3">Military-Grade Fleet Isolation</h3>
                  <p className="text-sub leading-relaxed">Your data is your data. Every single Arvarn subscriber is provisioned their own dedicated, isolated Docker container. Your invoices, customer details, and CRM data are physically walled off from the rest of the network. We do not use your private data to train the Hive Mind.</p>
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

        <section id="pricing" className="py-24 px-6 max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Scale from Solo to Fleet.</h2>
          <p className="text-sub mb-16 max-w-2xl mx-auto text-lg">Every tier includes our 1% Stripe payment fee structure. No hidden costs.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Core Tier */}
            <div className="glass-panel p-8 rounded-3xl border border-border hover:border-primary/50 transition-all flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Core</h3>
              <p className="text-sub text-sm mb-6 h-10">Perfect for independent tradesmen needing basic automation.</p>
              <div className="mb-8"><span className="text-4xl font-bold">£30</span><span className="text-sub">/month</span></div>
              <ul className="space-y-4 mb-8 text-sm flex-1">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> 1 Admin Account</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Universal Skills & Trade Specifics</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Reactive AI Assistant</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Agentic Procurement</li>
              </ul>
              <Link to="/signup" className="block w-full py-3 text-center bg-surface border border-border rounded-xl font-bold hover:bg-primary hover:text-bg transition-all">Start Core Trial</Link>
            </div>

            {/* Pro Tier */}
            <div className="glass-panel p-8 rounded-3xl border-2 border-primary relative overflow-hidden shadow-lg shadow-primary/10 hover:shadow-primary/20 transition-all transform scale-105 z-10 flex flex-col bg-card/40">
              <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-bg text-xs font-bold rounded-bl-xl tracking-wider uppercase">Most Popular</div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-sub text-sm mb-6 h-10">For growing businesses wanting ultimate sales automation.</p>
              <div className="mb-8"><span className="text-4xl font-bold glow-text">£75</span><span className="text-sub">/month</span></div>
              <ul className="space-y-4 mb-8 text-sm flex-1">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Up to 3 Team Members</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Inter-Team AI Dispatch</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Proactive Outbound Sales</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Autonomous Voice Agent</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Custom Code Synthesis</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Agentic 2D CAD & Hive Mind</li>
              </ul>
              <Link to="/signup" className="block w-full py-3 text-center bg-primary text-bg rounded-xl font-bold hover:brightness-110 shadow-xl shadow-primary/30 transition-all">Setup Pro</Link>
            </div>

            {/* Enterprise Tier */}
            <div className="glass-panel p-8 rounded-3xl border border-border hover:border-primary/50 transition-all flex flex-col">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-sub text-sm mb-6 h-10">Complete fleet management and zero-touch integrations.</p>
              <div className="mb-8"><span className="text-4xl font-bold">£250</span><span className="text-sub">/month</span></div>
              <ul className="space-y-4 mb-8 text-sm flex-1">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Up to 30 Team Members</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Advanced Fleet Routing</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Subcontractor Tracking</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-primary"/> Zero-Touch API Access</li>
              </ul>
              <Link to="/signup" className="block w-full py-3 text-center bg-surface border border-border rounded-xl font-bold hover:bg-primary hover:text-bg transition-all">Contact Sales</Link>
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
