/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { 
  Check, 
  ArrowRight, 
  Mail, 
  User, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  Download,
  Flame,
  Star,
  Quote,
  Instagram,
  Youtube
} from "lucide-react";
import React, { useState, useEffect, useRef, ReactNode } from "react";

const CHECKOUT_URL = "https://pay.kiwify.com.br/Frs9HNl";

const Typewriter = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index));
      index++;
      if (index > text.length) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className="inline-block border-r-2 border-amber-gold pr-1 animate-pulse">
      {displayText}
    </span>
  );
};

const SectionHeading = ({ children, className = "" }: { children: ReactNode, className?: string }) => (
  <motion.h2 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className={`text-3xl md:text-5xl font-serif mb-8 text-light-glow uppercase tracking-tighter ${className}`}
  >
    {children}
  </motion.h2>
);

const BentoCard = ({ children, className = "", title, delay = 0 }: { children: ReactNode, className?: string, title?: string, delay?: number, key?: React.Key }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={`bento-card flex flex-col ${className}`}
  >
    {title && <h3 className="bento-title uppercase tracking-widest text-xs font-bold not-italic">{title}</h3>}
    <div className="flex-1">
      {children}
    </div>
  </motion.div>
);

const Button = ({ children, className = "", primary = false, href = CHECKOUT_URL }: { children: ReactNode, className?: string, primary?: boolean, href?: string }) => (
  <motion.a
    href={href}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className={`
      inline-flex items-center justify-center px-8 py-4 font-sans font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap
      ${primary 
        ? "bg-amber-gold text-primary-night shadow-[0_0_30px_rgba(240,160,7,0.3)] hover:shadow-[0_0_50px_rgba(240,160,7,0.5)]" 
        : "bg-transparent border-2 border-light-glow/20 text-light-glow hover:bg-light-glow/5 hover:border-light-glow/40"}
      ${className}
    `}
  >
    {children}
  </motion.a>
);

const FAQItem = ({ title, items, defaultOpen = false }: { title: string, items: string[], defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-primary-night/10 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left hover:opacity-80 transition-opacity"
      >
        <h3 className="text-xl md:text-2xl font-serif text-primary-night lowercase italic">{title}</h3>
        <motion.div 
          animate={{ rotate: isOpen ? 0 : 0 }}
          className="w-7 h-7 rounded-full bg-amber-gold flex items-center justify-center text-primary-night font-bold text-lg select-none"
        >
          {isOpen ? "−" : "＋"}
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.04, 0.62, 0.23, 0.98] 
            }}
            className="overflow-hidden"
          >
            <div className="pt-6 pb-2 space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-amber-gold rotate-45 mt-1.5 flex-shrink-0 border border-primary-night/5" />
                  <p className="text-primary-night/80 font-sans text-sm md:text-base leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

class StableVTurbPlayer extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className="relative mb-10 w-full max-w-[1000px] mx-auto z-10">
        {/* Cinematic Shadow/Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%] bg-amber-gold/5 blur-[100px] rounded-full pointer-events-none z-0" />
        <div className="absolute -inset-4 bg-black/40 blur-[40px] rounded-none opacity-80 pointer-events-none" />
        
        <div className="relative aspect-video rounded-none overflow-hidden border border-wood-light/30 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] bg-black">
          {React.createElement("vturb-smartplayer", {
            id: "vid-6a47365f57a22db6a053fd77",
            style: {
              display: "block",
              margin: "0 auto",
              width: "100%",
              aspectRatio: "16/9",
            }
          })}
        </div>
      </div>
    );
  }
}

export default function App() {
  const [showDelayedContent, setShowDelayedContent] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("bypass") === "true") return true;
      return localStorage.getItem("vsl_unlocked") === "true";
    }
    return false;
  });

  const [videoStarted, setVideoStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Unlocks the remaining of the site and persists the state
  const unlockContent = () => {
    setShowDelayedContent(true);
    try {
      localStorage.setItem("vsl_unlocked", "true");
    } catch (err) {
      // Ignored
    }
  };

  // Check window.smartplayer global instances (VTurb API)
  const checkVTurbState = () => {
    try {
      const sp = (window as any).smartplayer;
      if (sp && sp.instances) {
        const instances = Object.values(sp.instances) as any[];
        for (const inst of instances) {
          if (inst) {
            const currentTime = typeof inst.currentTime === 'number' ? inst.currentTime :
                                typeof inst.player?.currentTime === 'number' ? inst.player.currentTime :
                                typeof inst.video?.currentTime === 'number' ? inst.video.currentTime : null;
                                
            const isPaused = inst.paused !== undefined ? inst.paused :
                             inst.player?.paused !== undefined ? inst.player.paused :
                             inst.video?.paused !== undefined ? inst.video.paused : null;

            if (currentTime !== null) {
              return { currentTime, isPlaying: isPaused === false };
            }
          }
        }
      }
    } catch (e) {
      // Ignored
    }
    return null;
  };

  // Timer loop for standard dynamic polling and playback accumulation
  useEffect(() => {
    if (showDelayedContent) return;

    const interval = setInterval(() => {
      // 1. Check if we can read exact VTurb state
      const state = checkVTurbState();
      if (state) {
        setVideoStarted(true);
        setIsPlaying(state.isPlaying);
        setElapsedTime(prev => {
          const current = Math.floor(state.currentTime);
          return Math.max(prev, current);
        });

        if (state.currentTime >= 180) {
          unlockContent();
        }
        return;
      }

      // 2. Fall back to reproduction accumulation
      if (isPlaying) {
        setElapsedTime(prev => {
          const next = prev + 1;
          if (next >= 180) {
            unlockContent();
          }
          return next;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [showDelayedContent, isPlaying]);

  // Monitor iframe focus state independently
  useEffect(() => {
    if (showDelayedContent || videoStarted) return;

    const checkFocus = () => {
      const activeEl = document.activeElement;
      if (activeEl && (
        activeEl.tagName === 'IFRAME' || 
        activeEl.tagName.includes('VTURB') || 
        activeEl.id?.includes('6a47365f57a22db6a053fd77')
      )) {
        setVideoStarted(true);
        setIsPlaying(true);
      }
    };

    const focusInterval = setInterval(checkFocus, 1000);
    return () => clearInterval(focusInterval);
  }, [showDelayedContent, videoStarted]);

  // Handle postMessage events published by VTurb
  useEffect(() => {
    if (showDelayedContent) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const rawData = event.data;
        if (!rawData) return;

        // Direct string postMessage event patterns
        if (typeof rawData === "string") {
          const lowerStr = rawData.toLowerCase();
          if (lowerStr.includes("play") || lowerStr.includes("playing") || lowerStr.includes("vt_play")) {
            setVideoStarted(true);
            setIsPlaying(true);
            return;
          }
          if (lowerStr.includes("pause") || lowerStr.includes("paused") || lowerStr.includes("vt_pause")) {
            setIsPlaying(false);
            return;
          }
        }

        // Object postMessage event patterns
        const d = typeof rawData === "string" ? JSON.parse(rawData) : rawData;
        if (d && typeof d === "object") {
          const payloadEvent = (d.event || d.name || d.type || d.action || "").toString().toLowerCase();
          
          if (payloadEvent.includes("play") || payloadEvent.includes("playing")) {
            setVideoStarted(true);
            setIsPlaying(true);
          } else if (payloadEvent.includes("pause")) {
            setIsPlaying(false);
          } else if (payloadEvent.includes("time") || payloadEvent.includes("progress")) {
            setVideoStarted(true);
            setIsPlaying(true);
            const time = typeof d.currentTime === "number" ? d.currentTime : 
                         typeof d.time === "number" ? d.time : 
                         typeof d.seconds === "number" ? d.seconds : null;
            if (time !== null) {
              setElapsedTime(Math.max(elapsedTime, Math.floor(time)));
            }
          }
        }
      } catch (err) {
        // Ignored
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [showDelayedContent, elapsedTime]);

  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/c5af71b1-77d0-40c1-bc2f-360898e9f8cf/players/6a47365f57a22db6a053fd77/v4/player.js";
    s.async = true;
    document.body.appendChild(s);

    return () => {
      if (s.parentNode) {
        s.parentNode.removeChild(s);
      }
      // Clean up any global window properties registered by VTurb player if needed
      try {
        const globalKeys = Object.keys(window);
        globalKeys.forEach(key => {
          if (key.includes("smartplayer") || key.includes("vturb")) {
            delete (window as any)[key];
          }
        });
      } catch (err) {
        // Ignored
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-primary-night selection:bg-amber-gold selection:text-primary-night overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-gold/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-earth-red/5 blur-[150px] rounded-full" />
      </div>

      {/* Header */}
      <header className="relative z-50 py-3 px-6 md:px-12 bg-primary-night/90 backdrop-blur-md border-b border-light-glow/5">
        <div className="max-w-7xl mx-auto flex justify-center items-center text-[10px] md:text-sm tracking-[0.2em] font-sans font-bold uppercase text-oliva-vivid">
          <a href="https://instagram.com/caio.biedacha" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-amber-gold transition-colors">
             <Instagram className="w-3 h-3 md:w-4 md:h-4" />
             <span>@caio.biedacha</span>
          </a>
          <span className="mx-3 opacity-30 text-light-glow">|</span>
          <span className="text-light-glow/40">CRP 05/80199</span>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-start px-6 pt-12 md:pt-20 pb-[37px] max-w-7xl mx-auto overflow-hidden">
          {/* Cinematic Background Gradient */}
          <div className="absolute inset-0 z-0 bg-[#0a0f02] pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(240,160,7,0.12)_0%,rgba(59,74,30,0.2)_40%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,74,30,0.15)_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(240,160,7,0.05)_0%,transparent_50%)]" />
          </div>

          <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center">
            {/* Soft Glow behind copy */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <motion.h1 
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
               className="text-[34px] md:text-7xl lg:text-8xl font-serif text-light-glow leading-[1.3] md:leading-[1.4] tracking-tighter uppercase mb-6"
            >
              <span className="highlighter">Pare de pedir desculpa por ser você mesmo</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mb-10 max-w-xl"
            >
              <p className="text-sm md:text-xl text-white font-sans leading-relaxed">
                Entenda por que você sente culpa ao se posicionar e vive tentando ser aceito o tempo todo.
              </p>
            </motion.div>

            {/* Stable VSL Video Player (VTurb) - Isolated from React Updates */}
            <div 
              className="w-full relative z-10"
              onMouseDownCapture={() => {
                if (!videoStarted) {
                  setVideoStarted(true);
                  setIsPlaying(true);
                }
              }}
              onTouchStartCapture={() => {
                if (!videoStarted) {
                  setVideoStarted(true);
                  setIsPlaying(true);
                }
              }}
            >
              <StableVTurbPlayer />
            </div>



            {/* CTA Hero Button */}
            <div 
              className={`w-full flex justify-center mt-6 ${showDelayedContent ? "block" : "hidden"}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={showDelayedContent ? { 
                  opacity: 1, 
                  y: 0,
                  scale: [1, 1.02, 1]
                } : {}}
                transition={{ 
                  y: { duration: 1 },
                  opacity: { duration: 1 },
                  scale: { 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 1
                  }
                }}
                className="w-full max-w-[240px] md:max-w-[280px]"
              >
                <Button primary className="w-full py-2.5 text-xs md:text-sm tracking-[0.2em] rounded-none">
                  Quero parar agora
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Conteúdo Liberado */}
        <div 
          id="conteudo-liberado"
          className={showDelayedContent ? "block" : "hidden"}
        >
            {/* TESTIMONIALS SECTION */}
        <section className="pt-[40px] pb-[70px] relative overflow-hidden bg-[#1a1f01]">
          {/* Background Elements to match the image vibe */}
          <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
            <img 
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=2560" 
              className="w-full h-full object-cover grayscale brightness-[0.2]" 
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f01] via-transparent to-[#1a1f01]" />
          </div>

          <div className="max-w-3xl mx-auto px-6 relative z-10 text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-3">
              <div className="h-[1px] w-6 bg-amber-gold/30" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-amber-gold/50">Vozes da Mudança</span>
              <div className="h-[1px] w-6 bg-amber-gold/30" />
            </div>
            <h2 className="text-3xl md:text-5xl font-serif text-light-glow mb-4 leading-tight lowercase italic">
              O que mudou quando pararam de pedir desculpas por existir
            </h2>
            <p className="text-light-glow/40 text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
              Relatos de quem não conseguiu mais fingir que estava tudo bem do jeito que estava.
            </p>
          </div>

          <div className="max-w-2xl mx-auto px-6 space-y-4">
            {[
              {
                handle: "@ana.luiza",
                time: "há pouco",
                initial: "A",
                color: "bg-earth-red/20 text-earth-red",
                text: "Eu sinto que vivi anos <span class='text-amber-gold'>tentando não incomodar</span>. Até quando discordava, acabava concordando só para não criar clima. O guia me trouxe paz."
              },
              {
                handle: "@pedro_m",
                time: "há 2 dias",
                initial: "P",
                color: "bg-secondary-moss/20 text-secondary-moss",
                text: "Às vezes eu nem sei se escolhi esse caminho porque queria... ou porque era <span class='text-amber-gold'>o que esperavam de mim</span>. Finalmente estou encontrando minhas respostas."
              },
              {
                handle: "@carla.silva",
                time: "esta semana",
                initial: "C",
                color: "bg-oliva-vivid/20 text-oliva-vivid",
                text: "Eu tinha muito medo de decepcionar pessoas que eu amo, mesmo quando isso significava <span class='text-amber-gold'>me abandonar</span>. Não sinto mais esse peso."
              },
              {
                handle: "@marcos.viana",
                time: "há pouco",
                initial: "M",
                color: "bg-amber-gold/20 text-amber-gold",
                text: "Quando estou sozinho, parece que existe uma <span class='text-amber-gold'>versão minha mais verdadeira</span>. Perto dos outros ela desaparecia. O guia me ajudou a integrá-las."
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-20px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
                className="bg-black/30 backdrop-blur-sm border border-light-glow/5 px-5 md:px-6 py-[11px] rounded-2xl hover:border-amber-gold/20 transition-all duration-500 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px] ${testimonial.color} border border-white/5`}>
                    {testimonial.initial}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-black text-amber-gold/80 tracking-wide">{testimonial.handle}</p>
                    <p className="text-[9px] uppercase tracking-widest text-light-glow/30 font-bold">{testimonial.time}</p>
                  </div>
                </div>
                <div 
                  className="text-[14px] font-serif text-light-glow/80 leading-relaxed italic text-left"
                  dangerouslySetInnerHTML={{ __html: `"${testimonial.text}"` }}
                />
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12 text-center relative z-10 px-6">
            <Button 
              primary 
              className="w-full sm:w-auto px-12 py-5 text-sm rounded-none"
            >
              ACESSAR O GUIA
            </Button>
          </div>
        </section>

        {/* PRICING & OFFER SECTION */}
        <section id="pricing" className="pt-10 pb-[60px] bg-[#f5ece1] relative overflow-hidden">
          {/* Subtle Decorative elements for the light section */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-gold/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-earth-red/5 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="h-[1px] w-6 bg-primary-night/20" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary-night/60">Sua Oportunidade</span>
                <div className="h-[1px] w-6 bg-primary-night/20" />
              </div>
              <h2 className="text-4xl md:text-7xl font-serif text-primary-night uppercase tracking-tighter leading-none max-w-4xl mx-auto">
                Invista no seu <span className="italic">desenvolvimento</span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-16 items-start">
              {/* Left Column: Product & Price */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative mb-10 w-full"
                >
                  <div className="absolute -inset-10 bg-amber-gold/10 blur-[80px] rounded-full pointer-events-none" />
                  <img 
                    src="https://i.ibb.co/Ndqn2QDv/mockup-EBOOK-CAIO.png" 
                    alt="Guia Prático Mockup" 
                    className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative z-10"
                  />
                </motion.div>

                <div className="text-center space-y-6 w-full">
                  <div className="space-y-1">
                    <p className="text-primary-night/40 line-through text-2xl font-bold">R$ 119,90</p>
                    <p className="text-6xl md:text-8xl font-serif text-primary-night font-black italic tracking-tighter">
                      R$ 59<span className="text-amber-gold">,90</span>
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-night/40">Pagamento único • Acesso vitalício</p>
                  </div>

                  <Button primary className="w-full py-4 sm:py-6 text-sm sm:text-base shadow-xl rounded-none">
                    Garantir Meu Acesso Agora
                  </Button>


                </div>
              </div>

              {/* Right Column: FAQ / Content Expandable */}
              <div className="lg:col-span-7">
                <div className="mb-10 pb-6 border-b border-primary-night/10">
                   <h3 className="text-2xl md:text-4xl font-serif text-primary-night italic lowercase">Tudo o que você precisa saber</h3>
                </div>
                
                <div className="space-y-2">
                  <FAQItem 
                    title="Qual é o conteúdo do Ebook?"
                    items={[
                      "Como você aprendeu que existir incomodava",
                      "A voz que te diminui todo dia não é sua",
                      "Por que pedir desculpas por tudo não é fraqueza",
                      "Como separar o que é genuinamente seu do que foi imposto em você por outras pessoas",
                      "O que você esconde de todo mundo diz mais sobre quem você é do que tudo que você mostra, e como usar isso a seu favor",
                      "A pergunta que a maioria das pessoas nunca consegue responder: quem você seria se ninguém estivesse te julgando?",
                      "Os três movimentos diários para começar a existir sem se desculpar por isso",
                      "O que fazer quando a culpa voltar",
                      "O custo real de continuar se apagando"
                    ]}
                  />
                  <FAQItem 
                    title="Condições de Pagamento"
                    items={[
                      "Pagamento 100% seguro",
                      "Acesso imediato por e-mail",
                      "Compra única, sem qualquer tipo de assinatura",
                      "Acesso disponível pelo celular, tablet ou computador"
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="pt-10 pb-20 md:pt-10 md:pb-32 border-t border-light-glow/5">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-left mb-16">
              <SectionHeading className="inline-block">Quem é o autor?</SectionHeading>
              <div className="space-y-6 mt-4 max-w-2xl">
                <p className="text-sm font-sans text-light-glow/70 leading-relaxed">
                  Psicólogo clínico focado em jovens adultos que se sentem deslocados, pressionados ou sem direção clara em suas vidas.
                </p>
                <p className="text-light-glow/60 leading-relaxed text-sm md:text-base">
                  Seu trabalho ajuda pessoas que passaram muito tempo tentando se adaptar às expectativas alheias a reconhecerem seus próprios padrões emocionais e construirem autonomia verdadeira.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-10">
              {/* Image Section */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-full max-w-[260px]"
              >
                <div className="aspect-[3/4] bg-secondary-moss rounded-none overflow-hidden border border-wood-light/20 relative group">
                  <img 
                     src="https://i.ibb.co/5h7Mzs7j/caiperfil-img.jpg" 
                     alt="Caio Biedacha" 
                     className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-night via-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center p-3 bg-primary-night/40 backdrop-blur-md rounded-none border border-light-glow/10">
                    <p className="text-lg font-serif text-light-glow italic">Caio Biedacha</p>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-amber-gold mt-0.5">CRP 05/80199</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Cards Grid Section */}
              <div className="w-full max-w-2xl">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Mestrando pela UERJ",
                    "Especialista em Jovens Adultos",
                    "Foco em Identidade e Autonomia",
                    "Referência em Autenticidade"
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="flex items-center gap-2.5 p-3 rounded-none border border-light-glow/10 hover:border-amber-gold/20 transition-all duration-300"
                    >
                      <div className="w-5 h-5 rounded-none bg-amber-gold/10 flex items-center justify-center border border-amber-gold/20 flex-shrink-0">
                        <Check className="w-3 h-3 text-amber-gold" />
                      </div>
                      <span className="text-[10px] md:text-xs font-sans font-medium text-light-glow/80">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 flex justify-center w-full"
                >
                  <Button 
                    primary 
                    href={CHECKOUT_URL}
                    className="w-full sm:w-auto px-6 md:px-12 py-4 md:py-5 text-sm rounded-none"
                  >
                    Quero garantir meu guia
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        </div>
      </main>

      {/* Footer */}
      <footer className={`relative z-50 py-16 px-6 bg-[#fdf7e7] border-t border-black/5 flex flex-col items-center ${showDelayedContent ? "block" : "hidden"}`}>
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center gap-10">
          {/* Social Icons */}
          <div className="flex items-center gap-8 text-[#2d2922]">
            <a 
              href="https://www.instagram.com/caio.biedacha/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-70 transition-opacity"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://www.youtube.com/@CaioBiedacha" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:opacity-70 transition-opacity"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>

          <div className="w-full h-px bg-black/5" />

          {/* Copyright & Links */}
          <div className="text-center space-y-4">
            <p className="text-[#847e70] text-sm md:text-base font-sans font-medium">
              © 2026, Caio Biedacha
            </p>
            <div className="flex justify-center items-center gap-2 text-[#847e70] text-sm md:text-base font-sans">
              <a href="#" className="hover:underline">Política de privacidade</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
