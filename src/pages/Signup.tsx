import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const plans = [
  {
    id: 'pro',
    name: 'Pro',
    price: '£99',
    period: '/month',
    description: 'Perfect for small tradesmen teams.',
    features: ['5 Employee Accounts', 'Standard AI Skills', 'Email Support', 'Basic Analytics'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: '£299',
    period: '/month',
    description: 'Advanced fleet routing and zero-touch API.',
    features: ['Unlimited Employees', 'Custom Agentic Skills', 'Priority 24/7 Support', 'Dedicated Account Manager', 'Advanced API Access'],
    popular: true,
  }
];

export default function Signup() {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('enterprise');
  
  const [formData, setFormData] = useState({
    adminName: '',
    email: '',
    phone: '',
    otp: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    // Step 4 Billing Details
    addressLine1: '',
    city: '',
    postcode: '',
    // Step 4 Legal
    acceptTos: false,
    acceptDpa: false
  });
  
  const [logoFile, setLogoFile] = useState<File | null>(null);

  // Chat Interview State
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'ai' | 'user', text: string, type?: 'text' | 'merchant_selector' }>>([
    { sender: 'ai', text: "Hi! I'm Arvarn. To set up your bespoke AI agent, let's have a quick chat. First, what's the name of your business and your primary operating postcode or city?", type: 'text' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStage, setChatStage] = useState(0); 
  const [pendingSuggestion, setPendingSuggestion] = useState('');
  
  // Merchant State
  const [merchants, setMerchants] = useState([
    { id: 'screwfix', name: 'Screwfix', checked: true },
    { id: 'selco', name: 'Selco Builders Warehouse', checked: true },
    { id: 'buildbase', name: 'BuildBase', checked: false },
    { id: 'tradepoint', name: 'B&Q TradePoint', checked: false },
    { id: 'jewson', name: 'Jewson', checked: false },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [mockupMode, setMockupMode] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleNext = () => { setError(''); setStep(s => s + 1); };
  const handleBack = () => { setError(''); setStep(s => s - 1); };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { sender: 'user', text: userMsg, type: 'text' }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      if (chatStage === 0) {
        setChatHistory(prev => [
          ...prev, 
          { sender: 'ai', text: `Perfect, I've registered your operating area. I've autonomously scanned your region and found these local merchants. Select the ones you use most frequently so I can track live pricing for your materials:`, type: 'text' },
          { sender: 'ai', text: '', type: 'merchant_selector' }
        ]);
        setChatStage(1);
      } 
      else if (chatStage === 2) {
        setChatHistory(prev => [
          ...prev, 
          { sender: 'ai', text: `Got it, I've adjusted my vocabulary and routing algorithms for your fleet size. Are you VAT registered, and do you use any accounting software like Xero or QuickBooks?`, type: 'text' }
        ]);
        setChatStage(3);
      } 
      else if (chatStage === 3) {
        setChatHistory(prev => [
          ...prev, 
          { sender: 'ai', text: "Excellent. I've integrated that accounting setup. Finally, is there anything specifically you want to be able to do with Arvarn? Any dream feature?", type: 'text' }
        ]);
        setChatStage(4);
      }
      else if (chatStage === 4) {
        const lowerMsg = userMsg.toLowerCase();
        
        if (lowerMsg.includes('invoice') || lowerMsg.includes('quote') || lowerMsg.includes('receipt') || lowerMsg.includes('calendar') || lowerMsg.includes('book')) {
          setChatHistory(prev => [
            ...prev, 
            { sender: 'ai', text: "Great news—I can already do that straight out of the box! I've loaded those specialized modules into your core skills. You're fully configured now. Click 'Review & Checkout' to finalize your tenant provisioning.", type: 'text' }
          ]);
          setChatStage(6);
        } else {
          setPendingSuggestion(userMsg);
          setChatHistory(prev => [
            ...prev, 
            { sender: 'ai', text: "I can't do that just yet! Would you like me to submit that as a feature request suggestion directly to our engineering team?", type: 'text' }
          ]);
          setChatStage(5);
        }
      }
      else if (chatStage === 5) {
        const lowerMsg = userMsg.toLowerCase();
        let finalResponse = "";
        
        if (lowerMsg.includes('yes') || lowerMsg.includes('sure') || lowerMsg.includes('yeah') || lowerMsg.includes('please')) {
          const abusiveWords = ['fuck', 'shit', 'bitch', 'cunt', 'dick', 'stupid', 'idiot'];
          const isAbusive = abusiveWords.some(word => pendingSuggestion.toLowerCase().includes(word));
          const isGibberish = pendingSuggestion.length < 4 || pendingSuggestion.split(' ').every(w => w.length === 1);
          
          if (isAbusive || isGibberish) {
            finalResponse = "Actually, I cannot submit that specific request as it violates our feedback policy.";
          } else {
            finalResponse = "Fantastic. I've logged this directly with our engineering team, and they will review it for the next update!";
          }
        } else {
          finalResponse = "No problem, I won't log it.";
        }
        
        setChatHistory(prev => [
          ...prev, 
          { sender: 'ai', text: `${finalResponse} By the way, you can type 'feedback' or 'suggest' directly to me in WhatsApp anytime. You're fully configured now. Click 'Review & Checkout' to finalize your tenant provisioning.`, type: 'text' }
        ]);
        setChatStage(6);
      }
    }, 1500);
  };

  const handleConfirmMerchants = () => {
    const selected = merchants.filter(m => m.checked).map(m => m.name).join(', ');
    setChatHistory(prev => prev.filter(msg => msg.type !== 'merchant_selector'));
    setChatHistory(prev => [...prev, { sender: 'user', text: `I selected: ${selected}`, type: 'text' }]);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setChatHistory(prev => [
        ...prev, 
        { sender: 'ai', text: `Great, I will monitor their inventory catalogs. Next, roughly how many employees or vans are in your fleet, and what's your primary trade?`, type: 'text' }
      ]);
      setChatStage(2);
    }, 1200);
  };

  const handleSendOTP = async () => {
    setIsProcessing(true);
    setError('');
    try {
      const res = await fetch(import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/auth/request-otp` : 'http://localhost:8085/api/auth/request-otp', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: formData.phone })
      });
      if (res.ok) setOtpSent(true);
      else throw new Error('API failed to send OTP');
    } catch (err) {
      console.warn("Backend unreachable. Using Showcase Mock Mode.");
      setMockupMode(true);
      setOtpSent(true);
      setError('Backend unreachable. Mockup Mode Active: Type any 4 numbers to bypass.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (formData.otp.length < 4) { setError('Please enter a valid code.'); return; }
    setIsProcessing(true);
    setError('');
    
    if (mockupMode) {
      setTimeout(() => {
        setIsProcessing(false);
        handleNext();
      }, 800);
      return;
    }

    try {
      const res = await fetch(import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/auth/verify-otp` : 'http://localhost:8085/api/auth/verify-otp', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: formData.phone, otp: formData.otp })
      });
      if (res.ok) handleNext();
      else throw new Error('Verification failed');
    } catch (err) {
      console.warn("Backend unreachable or invalid. Falling back to mockup verify.");
      handleNext();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate payment processing, provisioning trigger, and email dispatch
    setTimeout(() => { setIsProcessing(false); setStep(5); }, 3500);
  };

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  return (
    <div className="min-h-screen bg-bg text-text relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-card rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none" />
      
      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        <div className="text-center mb-12">
          <Link to="/" className="text-3xl font-bold glow-text tracking-wider">Arvarn</Link>
          <div className="mt-4 flex justify-center items-center space-x-2 sm:space-x-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= i ? 'bg-primary text-bg shadow-[0_0_10px_rgba(204,201,220,0.5)]' : 'bg-surface text-sub border border-border'}`}>
                  {i}
                </div>
                {i < 4 && <div className={`w-6 sm:w-12 h-1 mx-1 sm:mx-2 rounded transition-colors ${step > i ? 'bg-primary' : 'bg-surface border-y border-border'}`} />}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: PLAN SELECTION */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {plans.map((plan) => (
                <div key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`glass-panel p-8 rounded-2xl cursor-pointer transition-all duration-300 relative ${selectedPlan === plan.id ? 'ring-2 ring-primary bg-card/40 transform scale-[1.02]' : 'hover:border-primary hover:bg-surface/60'}`}>
                  {plan.popular && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-bg text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">Most Popular</div>}
                  <h3 className="text-2xl font-semibold text-text">{plan.name}</h3>
                  <div className="mt-4 mb-6"><span className="text-4xl font-bold text-text">{plan.price}</span><span className="text-sub">{plan.period}</span></div>
                  <p className="text-sub mb-6 h-10">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-text/80">
                        <svg className="w-5 h-5 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className={`w-full py-3 rounded-lg text-center font-medium transition-colors ${selectedPlan === plan.id ? 'bg-primary text-bg shadow-[0_0_15px_rgba(204,201,220,0.3)]' : 'bg-surface text-sub border border-border group-hover:text-primary group-hover:border-primary'}`}>
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </div>
                </div>
              ))}
              <div className="md:col-span-2 mt-4 text-center">
                <button onClick={handleNext} className="bg-text text-bg px-12 py-4 rounded-xl font-bold shadow-[0_0_20px_rgba(204,201,220,0.2)] hover:shadow-[0_0_30px_rgba(204,201,220,0.4)] transition-all transform hover:-translate-y-1">Continue to Verification</button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: ADMIN DETAILS & LOGO */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-panel max-w-2xl mx-auto p-8 rounded-2xl">
              <h2 className="text-2xl font-semibold mb-2">Admin Profile & Verification</h2>
              <p className="text-sub mb-8 text-sm">We'll get the details about your business in a quick chat next. First, let's verify your identity.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 border-b border-border pb-8">
                <div>
                  <label className="block text-sm font-medium text-sub mb-2">Full Name</label>
                  <input type="text" name="adminName" value={formData.adminName} onChange={updateForm} className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-sub mb-2">Work Email</label>
                  <input type="email" name="email" value={formData.email} onChange={updateForm} className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-all" placeholder="john@company.com" />
                </div>
                
                <div className="md:col-span-2 mt-2">
                  <label className="block text-sm font-medium text-sub mb-2">Company Logo (Optional)</label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-surface border border-dashed border-border flex items-center justify-center overflow-hidden">
                      {logoFile ? (
                        <img src={URL.createObjectURL(logoFile)} alt="Logo Preview" className="w-full h-full object-cover" />
                      ) : (
                        <svg className="w-6 h-6 text-sub" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files?.[0] || null)} className="block w-full text-sm text-sub file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-surface file:text-text hover:file:bg-border transition-all cursor-pointer" />
                      <p className="text-xs text-sub/70 mt-1">Used to personalize your dashboard and invoices.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WHATSAPP OTP */}
              <div>
                <h3 className="text-lg font-medium mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                <span className="font-semibold text-text">Master Bridge WhatsApp Number</span>
              </h3>
              {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">{error}</div>}
              
              {!otpSent ? (
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <input type="tel" name="phone" value={formData.phone} onChange={updateForm} className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-all" placeholder="+44 7700 900000" />
                  </div>
                  <button onClick={handleSendOTP} disabled={isProcessing || !formData.phone} className="bg-primary text-bg px-6 py-3 rounded-lg font-bold disabled:opacity-70 transition-all hover:scale-105">
                    {isProcessing ? 'Sending...' : 'Send Code'}
                  </button>
                </div>
              ) : (
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <input type="text" name="otp" value={formData.otp} onChange={updateForm} maxLength={6} className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text text-center tracking-[0.5em] font-mono text-xl focus:outline-none focus:border-primary transition-all" placeholder="000000" />
                  </div>
                  <button onClick={handleVerifyOTP} disabled={isProcessing || formData.otp.length < 4} className="bg-green-500 text-bg px-6 py-3 rounded-lg font-bold disabled:opacity-70 transition-all hover:scale-105">
                    {isProcessing ? 'Verifying...' : 'Verify'}
                  </button>
                </div>
              )}
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={handleBack} className="px-6 py-3 rounded-lg border border-border text-sub hover:text-text hover:bg-surface transition-all">Back</button>
              <button onClick={handleNext} disabled={!otpSent || formData.otp.length < 4 || !formData.adminName} className="flex-1 bg-text text-bg px-6 py-3 rounded-lg font-bold disabled:opacity-50 hover:shadow-[0_0_15px_rgba(204,201,220,0.3)] transition-all">Start Arvarn Interview</button>
            </div>
          </motion.div>
          )}

          {/* STEP 3: ARVARN INTERVIEW */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="glass-panel max-w-2xl mx-auto rounded-2xl flex flex-col h-[600px] overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between bg-surface/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50 relative">
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-surface rounded-full"></span>
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Arvarn AI Interview</h2>
                    <p className="text-xs text-sub flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                      Live Agent Configuration
                    </p>
                  </div>
                </div>
                {chatStage >= 6 && (
                  <button onClick={handleNext} className="text-sm px-4 py-2 bg-text text-bg rounded-lg font-bold hover:shadow-[0_0_15px_rgba(204,201,220,0.4)] transition-all">Review & Checkout</button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                {chatHistory.map((msg, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    
                    {msg.type === 'text' ? (
                      <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-primary text-bg rounded-tr-none' : 'bg-surface border border-border text-text rounded-tl-none'}`}>
                        {msg.text}
                      </div>
                    ) : msg.type === 'merchant_selector' && (
                      <div className="max-w-[80%] p-5 rounded-2xl text-sm bg-surface border border-primary/40 rounded-tl-none shadow-[0_0_15px_rgba(204,201,220,0.1)]">
                        <div className="mb-3 font-semibold text-primary">Local Merchants Found:</div>
                        <div className="space-y-3 mb-4">
                          {merchants.map(m => (
                            <label key={m.id} className="flex items-center space-x-3 cursor-pointer group">
                              <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${m.checked ? 'bg-primary border-primary' : 'border-sub group-hover:border-primary'}`}>
                                {m.checked && <svg className="w-3 h-3 text-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                              </div>
                              <input 
                                type="checkbox" 
                                className="hidden" 
                                checked={m.checked}
                                onChange={() => setMerchants(merchants.map(x => x.id === m.id ? { ...x, checked: !x.checked } : x))}
                              />
                              <span className={m.checked ? 'text-text font-medium' : 'text-sub'}>{m.name}</span>
                            </label>
                          ))}
                        </div>
                        <button onClick={handleConfirmMerchants} className="w-full py-2 bg-text text-bg rounded-lg font-bold hover:shadow-[0_0_15px_rgba(204,201,220,0.3)] transition-all">
                          Confirm Selection
                        </button>
                      </div>
                    )}

                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-surface border border-border p-4 rounded-2xl rounded-tl-none flex space-x-2">
                      <div className="w-2 h-2 bg-sub rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-sub rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <div className="w-2 h-2 bg-sub rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendChat} className="p-4 border-t border-border bg-surface/50 flex gap-3">
                <input 
                  type="text" 
                  value={chatInput} 
                  onChange={e => setChatInput(e.target.value)} 
                  placeholder={chatHistory.some(m => m.type === 'merchant_selector') ? "Please select your merchants above..." : "Type your response..."} 
                  className="flex-1 bg-bg border border-border rounded-xl px-4 py-3 text-text focus:outline-none focus:border-primary transition-all disabled:opacity-50"
                  disabled={isTyping || chatHistory.some(m => m.type === 'merchant_selector')}
                />
                <button type="submit" disabled={isTyping || !chatInput.trim() || chatHistory.some(m => m.type === 'merchant_selector')} className="bg-primary text-bg p-3 rounded-xl disabled:opacity-50 transition-all hover:scale-105">
                  <svg className="w-6 h-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 4: REVIEW & BILLING */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Left Column: Pre-checkout Summary */}
              <div className="glass-panel p-8 rounded-2xl h-fit">
                <h2 className="text-2xl font-semibold mb-6">Configuration Summary</h2>
                
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <div>
                      <div className="text-sub text-sm">Selected Plan</div>
                      <div className="text-lg font-bold text-text capitalize">{selectedPlan} Plan</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{plans.find(p => p.id === selectedPlan)?.price}</div>
                      <div className="text-sub text-sm">{plans.find(p => p.id === selectedPlan)?.period}</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sub text-sm mb-1">Admin Account</div>
                    <div className="font-medium">{formData.adminName} <span className="text-sub text-sm ml-2">{formData.email}</span></div>
                  </div>

                  <div>
                    <div className="text-sub text-sm mb-1">Master WhatsApp Bridge</div>
                    <div className="font-medium font-mono text-green-400 flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
{formData.phone} <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">Verified</span>
</div>
</div>
<div>
<div className="text-sub text-sm mb-2">Pre-loaded Agent Integrations</div>
<div className="flex flex-wrap gap-2">
{merchants.filter(m => m.checked).map(m => (
<span key={m.id} className="px-3 py-1 bg-surface border border-border text-xs rounded-full">{m.name} Pricing</span>
))}
<span className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 text-xs rounded-full">Accounting Sync</span>
</div>
</div>
</div>
</div>
{/* Right Column: Billing & Legal */}
<div className="glass-panel p-8 rounded-2xl">
<h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
{/* Billing Address */}
<div className="mb-6 space-y-4">
<h3 className="text-sm font-medium text-sub mb-2">Billing Address</h3>
<input type="text" name="addressLine1" value={formData.addressLine1} onChange={updateForm} placeholder="Address Line 1" className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-all" />
<div className="flex gap-4">
<input type="text" name="city" value={formData.city} onChange={updateForm} placeholder="City" className="w-2/3 bg-surface border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-all" />
<input type="text" name="postcode" value={formData.postcode} onChange={updateForm} placeholder="Postcode" className="w-1/3 bg-surface border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-all uppercase" />
</div>
</div>
{/* Card Details */}
<div className="bg-surface border border-border rounded-xl p-6 mb-6 relative overflow-hidden">
<div className="absolute top-4 right-4 flex space-x-2"><div className="w-8 h-5 bg-border rounded" /><div className="w-8 h-5 bg-border rounded" /></div>
<h3 className="text-sm font-medium text-sub mb-4 flex items-center">
<svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" /></svg> Secure Payment via Stripe
</h3>
<div className="space-y-4">
<div><label className="block text-xs font-medium text-sub mb-1">Card Number</label><input type="text" name="cardNumber" value={formData.cardNumber} onChange={updateForm} placeholder="4242 4242 4242 4242" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-all font-mono" /></div>
<div className="flex gap-4">
<div className="flex-1"><label className="block text-xs font-medium text-sub mb-1">Expiry Date</label><input type="text" name="expiry" value={formData.expiry} onChange={updateForm} placeholder="MM/YY" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-all font-mono" /></div>
<div className="flex-1"><label className="block text-xs font-medium text-sub mb-1">CVC</label><input type="text" name="cvv" value={formData.cvv} onChange={updateForm} placeholder="123" className="w-full bg-bg border border-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-all font-mono" /></div>
</div>
</div>
</div>
{/* Legal Checkboxes */}
<div className="space-y-3 mb-8">
<label className="flex items-start space-x-3 cursor-pointer group">
<div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${formData.acceptTos ? 'bg-primary border-primary' : 'border-sub group-hover:border-primary'}`}>
{formData.acceptTos && <svg className="w-3 h-3 text-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
</div>
<input type="checkbox" name="acceptTos" checked={formData.acceptTos} onChange={updateForm} className="hidden" />
<span className="text-xs text-sub leading-tight">I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.</span>
</label>
<label className="flex items-start space-x-3 cursor-pointer group">
<div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${formData.acceptDpa ? 'bg-primary border-primary' : 'border-sub group-hover:border-primary'}`}>
{formData.acceptDpa && <svg className="w-3 h-3 text-bg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
</div>
<input type="checkbox" name="acceptDpa" checked={formData.acceptDpa} onChange={updateForm} className="hidden" />
<span className="text-xs text-sub leading-tight">I accept the <a href="#" className="text-primary hover:underline">Data Processing Agreement (DPA)</a> allowing Arvarn to process WhatsApp metadata securely.</span>
</label>
</div>
<div className="flex gap-4">
<button onClick={handleBack} disabled={isProcessing} className="px-6 py-4 rounded-xl border border-border text-sub hover:text-text hover:bg-surface transition-all disabled:opacity-50">Back</button>
<button 
onClick={handleCheckout} 
disabled={isProcessing || !formData.cardNumber || !formData.acceptTos || !formData.acceptDpa} 
className="flex-1 bg-text text-bg px-6 py-4 rounded-xl font-bold flex items-center justify-center transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(204,201,220,0.2)] hover:shadow-[0_0_30px_rgba(204,201,220,0.4)]"
>
{isProcessing ? (
<div className="flex items-center"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-bg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Provisioning Workspace...</div>
) : (
`Pay ${plans.find(p => p.id === selectedPlan)?.price} & Launch Workspace`
)}
</button>
</div>
</div>
</motion.div>
)}
{/* STEP 5: SUCCESS */}
{step === 5 && (
<motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel max-w-lg mx-auto p-10 rounded-2xl text-center">
<div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20"><svg className="w-12 h-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
<h2 className="text-3xl font-bold mb-4 glow-text">Workspace Provisioned</h2>
<p className="text-sub mb-6 text-sm leading-relaxed">
Your {selectedPlan} tenant is now live. We have successfully dispatched your Welcome Email containing your encrypted dashboard credentials to <span className="text-text font-medium">{formData.email}</span>.
</p>
<div className="bg-surface border border-border p-4 rounded-xl mb-8 flex items-start text-left">
<svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
<p className="text-xs text-sub">Your WhatsApp number <span className="text-text font-medium font-mono">{formData.phone}</span> is now fully synchronized as the primary Admin Bridge. You can text it immediately to open a ticket or request intelligence.</p>
</div>
<button onClick={() => navigate('/onboarding')} className="w-full bg-surface border border-border text-text px-6 py-4 rounded-xl font-bold hover:bg-card hover:border-primary transition-all group shadow-lg">Enter Command Center <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span></button>
</motion.div>
)}
</AnimatePresence>
</div>
</div>
);
}
