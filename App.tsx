
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, Variants } from 'framer-motion';
import { 
  Dumbbell, 
  Flame, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Sparkles,
  Menu,
  X,
  Instagram,
  Twitter,
  Facebook,
  Trophy,
  Activity,
  Zap,
  Star
} from 'lucide-react';
import { generateWorkoutPlan } from './services/geminiService';
import { NavItem, Feature, PricingPlan, WorkoutPlan } from './types';

// Animation Variants
// Added Variants type and 'as const' to fix strict typing for ease property
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" as const 
    } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Components
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Home', href: '#' },
    { label: 'Performance', href: '#classes' },
    { label: 'Elite Team', href: '#trainers' },
    { label: 'AI Coach', href: '#ai-coach' },
    { label: 'Plans', href: '#membership' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#" 
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-cyan-500 p-1.5 rounded-lg group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all">
            <Dumbbell className="text-zinc-950 w-6 h-6" />
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">NeoFit</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 items-center">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors">
              {item.label}
            </a>
          ))}
          <button className="bg-white text-zinc-950 px-7 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-cyan-400 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]">
            Join the movement
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-zinc-100 p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[90] bg-zinc-950 p-10 flex flex-col gap-8 md:hidden pt-32"
          >
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="text-4xl font-black uppercase italic tracking-tighter hover:text-cyan-500">
                {item.label}
              </a>
            ))}
            <button className="bg-cyan-500 text-zinc-950 w-full py-5 rounded-2xl font-black text-xl uppercase tracking-widest mt-auto">Join Now</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-zinc-950">
      <motion.div style={{ y: y1 }} className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />
      <motion.div style={{ y: y2 }} className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
              <Zap className="w-4 h-4" />
              <span>Engineered for performance</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-7xl md:text-[120px] font-black leading-[0.85] tracking-tighter mb-8 uppercase italic">
              Unleash <br />
              <span className="text-cyan-500 text-glow">The Machine</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-zinc-400 text-xl md:text-2xl max-w-xl mb-12 leading-relaxed font-light">
              NEO-FIT is not just a gym. It's an ecosystem of elite strength, biological optimization, and advanced AI-driven methodology.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-6">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-zinc-950 px-10 py-5 rounded-2xl font-black text-xl uppercase tracking-tighter flex items-center gap-3 group transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(6,182,212,0.3)]">
                Start Training <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button className="border-2 border-white/10 hover:bg-white/5 px-10 py-5 rounded-2xl font-black text-xl uppercase tracking-tighter transition-all">
                The Program
              </button>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <img 
              src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?auto=format&fit=crop&q=80&w=1200" 
              alt="Elite Training" 
              className="w-full grayscale hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
          </div>
          
          {/* Floating Data Cards */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 bg-zinc-900/90 border border-white/10 p-6 rounded-3xl backdrop-blur-2xl z-20 shadow-2xl"
          >
            <Activity className="text-cyan-400 mb-2" />
            <p className="text-3xl font-black">182<span className="text-sm font-bold text-zinc-500 ml-1">BPM</span></p>
            <p className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Peak Performance</p>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 bg-zinc-900/90 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl z-20 shadow-2xl"
          >
            <div className="flex gap-4 items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center text-zinc-950">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs uppercase font-black text-zinc-500 tracking-widest">Global Rank</p>
                <p className="text-xl font-black">TOP 1%</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const Classes = () => {
  const classes = [
    { title: 'Cyber Strength', type: 'Weightlifting', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=600', color: 'cyan' },
    { title: 'Neural Flow', type: 'Yoga & Mobility', img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600', color: 'purple' },
    { title: 'Strike Lab', type: 'Combat Sports', img: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=600', color: 'red' },
    { title: 'Hi-Volt HIIT', type: 'Conditioning', img: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&q=80&w=600', color: 'orange' },
  ];

  return (
    <section id="classes" className="py-32 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-cyan-500 font-black uppercase tracking-[0.3em] text-xs mb-4 block">The Performance Lab</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Elite Disciplines</h2>
          </div>
          <p className="text-zinc-500 max-w-md text-lg leading-relaxed">
            From raw power to surgical precision, choose the path that aligns with your biological blueprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {classes.map((c, i) => (
            <motion.div 
              key={c.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group h-[500px] rounded-[2rem] overflow-hidden border border-white/10"
            >
              <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <p className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-2">{c.type}</p>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-6 leading-none">{c.title}</h3>
                <motion.button 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] border-b border-white/20 pb-1"
                >
                  Explore Class <ArrowRight className="w-3 h-3" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Trainers = () => {
  const coaches = [
    { name: 'Marcus Vane', role: 'Head of Strength', img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600' },
    { name: 'Elena Kross', role: 'Bio-Hacker / Yoga', img: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=600' },
    { name: 'Jax Thorne', role: 'Combat Director', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' },
  ];

  return (
    <section id="trainers" className="py-32 bg-zinc-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">Elite Command</h2>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto">Our coaches are practitioners of high-performance science, dedicated to pushing your limits beyond the imaginable.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {coaches.map((coach, i) => (
            <motion.div 
              key={coach.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="group"
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 border border-white/5">
                <img src={coach.img} alt={coach.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="text-2xl font-black uppercase italic tracking-tighter">{coach.name}</h4>
              <p className="text-cyan-500 font-bold uppercase tracking-widest text-xs mt-1">{coach.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AICoach = () => {
  const [goal, setGoal] = useState('');
  const [level, setLevel] = useState('Intermediate');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);

  const handleGenerate = async () => {
    if (!goal) return;
    setLoading(true);
    const result = await generateWorkoutPlan(goal, level);
    setPlan(result);
    setLoading(false);
  };

  return (
    <section id="ai-coach" className="py-32 bg-zinc-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-20" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-cyan-400 font-black tracking-[0.3em] text-xs mb-6 px-4 py-2 bg-cyan-500/5 rounded-full border border-cyan-500/20">
            <Cpu className="w-4 h-4" />
            <span>NEURAL NETWORK INTEGRATION</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 italic tracking-tighter">AI Strategist</h2>
          <p className="text-zinc-500 text-xl leading-relaxed">
            Why settle for generic? Let NEO-GEN calculate your optimal training volume, intensity, and recovery cycles in real-time.
          </p>
        </motion.div>

        <div className="bg-zinc-900/30 border border-white/5 rounded-[3rem] p-10 md:p-16 backdrop-blur-3xl shadow-2xl">
          <div className="grid md:grid-cols-2 gap-10 mb-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Current Directive</label>
              <input 
                type="text" 
                placeholder="Target: Full Body Hypertrophy" 
                className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-500 transition-all text-white placeholder:text-zinc-700"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Experience Signature</label>
              <select 
                className="w-full bg-zinc-950 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:border-cyan-500 transition-all appearance-none text-white"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Elite Athlete</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !goal}
            className={`w-full py-6 rounded-2xl font-black text-2xl uppercase tracking-widest transition-all flex items-center justify-center gap-4 ${loading ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-[0_20px_60px_rgba(6,182,212,0.3)] hover:scale-[1.02]'}`}
          >
            {loading ? (
              <span className="flex items-center gap-4">
                <div className="w-6 h-6 border-4 border-zinc-400 border-t-transparent rounded-full animate-spin" />
                Optimizing Sequence...
              </span>
            ) : (
              <>
                <Sparkles className="w-7 h-7" />
                Initialize Blueprint
              </>
            )}
          </button>

          <AnimatePresence>
            {plan && (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-16 space-y-8"
              >
                <div className="flex items-center gap-6 mb-8 border-b border-white/5 pb-8">
                  <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center border border-cyan-500/20">
                    <CheckCircle2 className="text-cyan-400 w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">Blueprint Ready</h3>
                    <p className="text-cyan-500 font-bold uppercase text-[10px] tracking-widest">Protocol: {plan.goal}</p>
                  </div>
                </div>
                
                <div className="grid gap-6">
                  {plan.exercises.map((ex, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-zinc-950 border border-white/5 rounded-3xl hover:border-cyan-500/30 transition-all"
                    >
                      <div className="mb-4 md:mb-0">
                        <p className="font-black text-2xl uppercase italic tracking-tighter mb-1">{ex.name}</p>
                        <p className="text-zinc-500 text-xs tracking-wide">{ex.note}</p>
                      </div>
                      <div className="flex gap-4">
                        <div className="bg-zinc-900 px-5 py-3 rounded-xl border border-white/5 min-w-[100px] text-center">
                          <p className="text-[10px] font-black uppercase text-zinc-500 mb-1">Sets</p>
                          <p className="text-xl font-black text-cyan-400">{ex.sets}</p>
                        </div>
                        <div className="bg-zinc-900 px-5 py-3 rounded-xl border border-white/5 min-w-[100px] text-center">
                          <p className="text-[10px] font-black uppercase text-zinc-500 mb-1">Reps</p>
                          <p className="text-xl font-black text-cyan-400">{ex.reps}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans: PricingPlan[] = [
    { name: 'Active', price: '$59', features: ['Full Gym Access', 'Standard Locker', '1 Guest Pass/Mo', 'App Tracking'] },
    { name: 'Enhanced', price: '$99', features: ['Bio-Hacking Suite', 'AI Coach Premium', 'Sauna & Cold Plunge', 'Nutrition OS', 'Priority Booking'], recommended: true },
    { name: 'Supreme', price: '$189', features: ['Elite Personal Trainer', 'Private Suite', 'Massage Therapy', 'DNA Analysis', 'Supplement Concierge'] },
  ];

  return (
    <section id="membership" className="py-32 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-6">Access Tiers</h2>
          <p className="text-zinc-500 text-lg">Invest in your biological evolution.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {plans.map((p) => (
            <motion.div 
              key={p.name}
              whileHover={{ scale: 1.02 }}
              className={`relative p-12 rounded-[3rem] border transition-all duration-500 ${p.recommended ? 'border-cyan-500 bg-zinc-900 shadow-[0_30px_100px_rgba(6,182,212,0.1)]' : 'border-white/5 bg-zinc-900/30'}`}
            >
              {p.recommended && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-cyan-500 text-zinc-950 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                  Optimal Choice
                </div>
              )}
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">{p.name}</h3>
              <div className="flex items-end gap-2 mb-10">
                <span className="text-6xl font-black">{p.price}</span>
                <span className="text-zinc-500 mb-2 font-bold">/MO</span>
              </div>
              <ul className="space-y-6 mb-12">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-4 text-sm font-bold text-zinc-300">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-5 rounded-2xl font-black text-lg uppercase tracking-widest transition-all ${p.recommended ? 'bg-cyan-500 text-zinc-950 hover:bg-cyan-400' : 'border border-white/10 hover:bg-white/5'}`}>
                Acquire Membership
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const feedback = [
    { name: 'David Chen', text: "The AI strategist changed my entire approach. I've gained 5kg of muscle while dropping body fat.", rating: 5 },
    { name: 'Sarah Miller', text: "Best gym environment in the city. The Strike Lab classes are high-intensity and incredibly technical.", rating: 5 },
  ];

  return (
    <section className="py-32 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">The Success <br />Registry</h2>
            <div className="flex gap-2 mb-12">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-6 h-6 fill-cyan-500 text-cyan-500" />)}
              <span className="ml-4 font-black text-xl italic tracking-tighter">4.9/5 RATING</span>
            </div>
            <p className="text-zinc-500 text-xl leading-relaxed max-w-lg mb-12">
              Real results from people who decided to stop settling for average. Join our high-performance community.
            </p>
          </div>
          <div className="space-y-8">
            {feedback.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="p-10 bg-zinc-900/40 rounded-[2.5rem] border border-white/5"
              >
                <p className="text-xl text-zinc-300 italic font-light mb-8 leading-relaxed">"{f.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-full border border-white/10 overflow-hidden">
                    <img src={`https://picsum.photos/seed/${f.name}/100/100`} alt={f.name} />
                  </div>
                  <p className="font-black uppercase italic tracking-tighter text-cyan-500">{f.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20 mb-32">
          <div className="lg:col-span-5">
            <a href="#" className="flex items-center gap-3 mb-10 group">
              <div className="bg-cyan-500 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <Dumbbell className="text-zinc-950 w-8 h-8" />
              </div>
              <span className="text-4xl font-black tracking-tighter uppercase italic text-white">NeoFit</span>
            </a>
            <p className="text-zinc-500 text-xl mb-12 max-w-md leading-relaxed">
              Synthesizing peak biology with advanced engineering. The final destination for high-performance evolution.
            </p>
            <div className="flex gap-6">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  href="#" 
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="p-4 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-cyan-500 hover:text-zinc-950 transition-all shadow-xl"
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-white/40">Navigation</h4>
              <ul className="space-y-5 text-sm font-black uppercase italic tracking-tighter">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Performance Lab</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Elite Team</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">AI OS</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Memberships</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-white/40">Legal</h4>
              <ul className="space-y-5 text-sm font-black uppercase italic tracking-tighter">
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Protocal</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-cyan-400 transition-colors">Security</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-white/40">Location</h4>
              <p className="text-zinc-500 font-bold mb-4">NEO-FIT HQ <br />88 Evolution Blvd, <br />Future District, 90210</p>
            </div>
          </div>
        </div>
        
        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-600 font-black text-[10px] uppercase tracking-widest">
          <p>© {new Date().getFullYear()} NEO-FIT DYNAMICS INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <span className="text-cyan-500">ENGINEERED BY GEMINI-3</span>
            <span>POWERED BY FRAME-MOTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-cyan-500 selection:text-zinc-950 bg-zinc-950 text-white">
      <Navbar />
      <main>
        <Hero />
        
        {/* Dynamic Stats Section */}
        <section className="py-20 bg-zinc-900/50 relative">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { val: '24/7', label: 'Availability' },
              { val: '15+', label: 'Global Hubs' },
              { val: '50k+', label: 'Athletes' },
              { val: '99.8%', label: 'Uptime' }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-center"
              >
                <p className="text-5xl md:text-7xl font-black italic tracking-tighter mb-2 leading-none text-white">{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <Classes />
        <Trainers />
        <AICoach />
        <Testimonials />
        <Pricing />
        
        {/* High Intensity Final CTA */}
        <section className="py-32 relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=2000" 
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-20"
            alt="CTA BG"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-transparent opacity-80" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              <motion.h2 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-6xl md:text-[140px] font-black uppercase italic tracking-tighter text-zinc-950 leading-[0.85] mb-12"
              >
                Zero <br />Excuses.
              </motion.h2>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <p className="text-zinc-950 font-black text-2xl max-w-sm uppercase italic tracking-tighter leading-tight">
                  The architecture for your future self is ready. All you need is the will to enter.
                </p>
                <motion.button 
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-zinc-950 text-white px-12 py-6 rounded-[2rem] font-black text-2xl uppercase tracking-widest shadow-2xl flex items-center gap-4"
                >
                  Join Elite <ArrowRight className="w-8 h-8" />
                </motion.button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default App;
