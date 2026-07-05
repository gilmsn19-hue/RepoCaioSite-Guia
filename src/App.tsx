/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Instagram, Youtube, ChevronDown, ChevronUp, ThumbsUp } from "lucide-react";
import React, { useEffect, useState } from "react";

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

// Avatar styling helpers
const getAvatarColor = (name: string) => {
  const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const colors = [
    'bg-indigo-100 text-indigo-700 border-indigo-200',
    'bg-emerald-100 text-emerald-700 border-emerald-200',
    'bg-rose-100 text-rose-700 border-rose-200',
    'bg-amber-100 text-amber-700 border-amber-200',
    'bg-sky-100 text-sky-700 border-sky-200',
    'bg-teal-100 text-teal-700 border-teal-200',
    'bg-purple-100 text-purple-700 border-purple-200',
    'bg-pink-100 text-pink-700 border-pink-200',
    'bg-violet-100 text-violet-700 border-violet-200',
  ];
  return colors[hash % colors.length];
};

const getInitials = (name: string) => {
  const clean = name.replace(/[^a-zA-Z]/g, '');
  if (clean.length === 0) return '?';
  if (clean.length === 1) return clean.toUpperCase();
  return (clean[0] + clean[1]).toUpperCase();
};

interface Reply {
  id: string;
  username: string;
  time: string;
  text: string;
  liked?: boolean;
}

interface Comment {
  id: number;
  username: string;
  time: string;
  text: string;
  likes: number;
  liked?: boolean;
  replies: Reply[];
  avatarUrl?: string;
}

function FacebookComments() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      username: "@Joverina",
      time: "há 7 horas",
      text: "As vezes peço desculpas por pedir mt desculpa... ",
      likes: 123,
      avatarUrl: "https://i.ibb.co/Kjxx1C9j/Whats-App-Image-2026-07-04-at-23-17-56.jpg",
      replies: [
        { id: "1-1", username: "@dudaa_araujos2497", time: "há 7 horas", text: "Mt eu" },
        { id: "1-2", username: "@drocha7237", time: "há 1 hora", text: "kkkkk" },
        { id: "1-3", username: "@luizaborba5212", time: "há 5 horas", text: "Nossa! Siiim!" },
        { id: "1-4", username: "@loreba0_olorebinha", time: "há 5 horas", text: "eu aí a" },
        { id: "1-5", username: "@moidixmoitie", time: "há 3 horas", text: "Mt eu mano" },
        { id: "1-6", username: "@LeandroOliveira122.1", time: "há 3 horas", text: "Estou assim também" },
        { id: "1-7", username: "@moonannaluly", time: "há 3 horas", text: "eu aí" },
        { id: "1-8", username: "@XORY1XO", time: "há 2 horas", text: "Eu também mano" },
        { id: "1-9", username: "@cletciacarla3771", time: "há 2 horas", text: "Eu tbm" },
        { id: "1-10", username: "@RebecaDaSilvaSousa-f5q", time: "há 2 horas", text: "Eu tbm" },
        { id: "1-11", username: "@GuilhermeAugustoOliveiraDosSan", time: "há 1 horas", text: "eu tmb! nao aguento mais me sentir assim" },
        { id: "1-12", username: "@eldanzerryta2282", time: "há 1 horas", text: "Desculpa, mas eu também sou assim :(" }
      ]
    },
    {
      id: 2,
      username: "@ofertaevy",
      time: "há 7 horas",
      text: "Me sinto exatamente assim, meu medo de magoar os outros, é enorme, chega ser assustador e sim e exatamente isso, pedir desculpa pelo sol, pela chuva, é assustador e me desespera",
      likes: 82,
      avatarUrl: "https://i.ibb.co/HLRJpjsp/Whats-App-Image-2026-07-04-at-23-18-23.jpg",
      replies: [
        { id: "2-1", username: "@brendadefatima7848", time: "há 7 horas", text: "Estou na mesma" },
        { id: "2-2", username: "@zi3785", time: "há 2 horas", text: "Se eu achar que magoei sofro tanto que chegar a doer. Isso acontece também quando tenho que dizer não. Sinto dor física" },
        { id: "2-3", username: "@moidixmoitie", time: "há 3 horas", text: "Somos duas" },
        { id: "2-4", username: "@anailzabarretomoura1751", time: "há 3 horas", text: "Conheci um homem! Não me fez nada,mais vive me pedindo desculpas! Eu não aguento" },
        { id: "2-5", username: "@anailzabarretomoura1751", time: "há 3 horas", text: "Eu só peço desculpas se errei!" }
      ]
    },
    {
      id: 3,
      username: "@erikacosta4114",
      time: "há 6 horas",
      text: "Eu me sinto culpada por tudo, peço desculpa até quando estou certa. E sinto tudo que ele falou.",
      likes: 43,
      avatarUrl: "https://i.ibb.co/yBN0MYSY/Whats-App-Image-2026-07-04-at-23-17-32.jpg",
      replies: [
        { id: "3-1", username: "@Josué444-z8t", time: "há 4 horas", text: "Eu também" },
        { id: "3-2", username: "@camilablesser367", time: "há 5 horas", text: "Sou eu KKKKKKK" },
        { id: "3-3", username: "@moidixmoitie", time: "há 3 horas", text: "Eu ai" }
      ]
    },
    {
      id: 4,
      username: "@thiagooliveira3727",
      time: "há 7 horas",
      text: "Eu pedia desculpas,por se sentir culpado ou porque alguém me fazia me sentir culpado pelo que não fiz,tipo me desculpe se te magoei,isso vira uma doença e faz que o culpado seja a gente",
      likes: 39,
      avatarUrl: "https://i.ibb.co/0y1D8pxL/Whats-App-Image-2026-07-04-at-23-17-01.jpg",
      replies: []
    },
    {
      id: 5,
      username: "@marianacosta.ps",
      time: "há 3 horas",
      text: "Eu nunca tinha pensado que eu não peço desculpa só quando erro… eu peço desculpa quando vou pedir qualquer coisa, quando discordo, quando demoro pra responder. A parte de “ser fácil pra não ser deixada de lado” me quebrou muito. Parecia que ele tava falando da minha vida.",
      likes: 47,
      avatarUrl: "https://i.ibb.co/qLL2gVm7/Whats-App-Image-2026-07-04-at-23-18-45.jpg",
      replies: [
        { id: "5-1", username: "@laurabrito_", time: "há 2 horas", text: "Nossa, sim. Essa parte pegou em mim também." },
        { id: "5-2", username: "@anaclaramendes", time: "há 1 hora", text: "Eu até voltei o vídeo nessa parte kkk doeu mas fez sentido" },
        { id: "5-3", username: "@renatap_", time: "há 1 hora", text: "“ser fácil pra não ser deixada de lado” é exatamente isso" },
        { id: "5-4", username: "@bia.souza", time: "há 32 minutos", text: "eu chorei nessa parte, sem brincadeira" }
      ]
    },
    {
      id: 6,
      username: "@felipe.araujo",
      time: "há 5 horas",
      text: "Comprei o guia achando que ia ser só mais um material falando de autoestima, mas foi diferente. O que mais me pegou foi entender que esse hábito de pedir desculpa por tudo não é “frescura”, é um reflexo antigo. Nunca ninguém tinha explicado desse jeito.",
      likes: 36,
      avatarUrl: "https://i.ibb.co/qMGRfFXC/Whats-App-Image-2026-07-04-at-23-16-45.jpg",
      replies: [
        { id: "6-1", username: "@paulohenrique.r", time: "há 4 horas", text: "Também achei isso. Não ficou naquele papo genérico de “se ame mais”." },
        { id: "6-2", username: "@juliana.martins", time: "há 3 horas", text: "simmm, parece simples mas muda muito quando você entende de onde vem" }
      ]
    },
    {
      id: 7,
      username: "@camilarocha",
      time: "há 6 horas",
      text: "Eu sou a pessoa que fala “desculpa incomodar” antes de qualquer coisa. Até quando a pessoa me deve uma resposta, eu peço desculpa por cobrar. Ver isso explicado no vídeo deu um aperto, porque eu percebi que faço isso pra não parecer difícil, chata ou intensa demais.",
      likes: 58,
      avatarUrl: "https://i.ibb.co/hRQQ4dVc/Whats-App-Image-2026-07-04-at-23-16-11.jpg",
      replies: [
        { id: "7-1", username: "@brunasantos", time: "há 5 horas", text: "eu também sou exatamente assim" },
        { id: "7-2", username: "@leticiamoraes", time: "há 4 horas", text: "“pra não parecer intensa demais” nossa…" },
        { id: "7-3", username: "@carol.f", time: "há 3 horas", text: "eu achava que era só educação minha" },
        { id: "7-4", username: "@rafael_lima", time: "há 2 horas", text: "também faço isso, principalmente no trabalho" },
        { id: "7-5", username: "@taisoliveira", time: "há 1 hora", text: "é muito automático, né? quando vê já pediu desculpa" },
        { id: "7-6", username: "@marinaalves", time: "há 40 minutos", text: "me identifiquei demais" }
      ]
    },
    {
      id: 8,
      username: "@vitor.machado",
      time: "há 8 horas",
      text: "A parte mais forte pra mim foi quando ele falou que a gente cresce, mas o reflexo continua agindo como se ainda precisasse se proteger. Eu sempre achei que era falta de atitude minha. Agora entendi que tem uma origem, e isso já tira um peso enorme.",
      likes: 41,
      avatarUrl: "https://i.ibb.co/dw1D1MY5/Whats-App-Image-2026-07-04-at-23-16-22.jpg",
      replies: [
        { id: "8-1", username: "@danielaprado", time: "há 7 horas", text: "essa parte também me marcou muito" },
        { id: "8-2", username: "@luiz_fernando", time: "há 6 horas", text: "exato. não é passar pano, é entender o padrão" },
        { id: "8-3", username: "@aline.castro", time: "há 5 horas", text: "senti a mesma coisa. deu até um alívio entender assim" }
      ]
    }
  ]);

  // Track expanded replies by comment ID
  const [expandedReplies, setExpandedReplies] = useState<Record<number, boolean>>({});

  const toggleReplies = (commentId: number) => {
    setExpandedReplies(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  const handleLikeComment = (commentId: number) => {
    setComments(prev =>
      prev.map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            likes: c.liked ? c.likes - 1 : c.likes + 1,
            liked: !c.liked
          };
        }
        return c;
      })
    );
  };

  const handleLikeReply = (commentId: number, replyId: string) => {
    setComments(prev =>
      prev.map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            replies: c.replies.map(r => {
              if (r.id === replyId) {
                return {
                  ...r,
                  liked: !r.liked
                };
              }
              return r;
            })
          };
        }
        return c;
      })
    );
  };

  return (
    <div className="w-full max-w-[700px] mx-auto bg-white p-3 sm:p-6 md:p-8 rounded-none border border-[#e9ebee] shadow-[0_4px_12px_rgba(0,0,0,0.05)] mt-12 mb-16 relative z-10 text-left font-sans box-border overflow-hidden">
      {/* Header matching image exactly */}
      <div className="text-[#90949c] text-[13px] font-semibold border-b border-[#e9ebee] pb-3 mb-5">
        Mostrando 8 de 37 comentários
      </div>

      <div className="space-y-6">
        {comments.map((comment) => {
          const initials = getInitials(comment.username);
          const avatarColor = getAvatarColor(comment.username);
          const isExpanded = !!expandedReplies[comment.id];

          return (
            <div key={comment.id} className="border-b border-[#f0f2f5] pb-5 last:border-b-0 last:pb-0">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                {comment.avatarUrl ? (
                  <img
                    src={comment.avatarUrl}
                    alt={comment.username}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-[#e9ebee] shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs border ${avatarColor} shrink-0 shadow-sm`}>
                    {initials}
                  </div>
                )}

                {/* Comment Content Area */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col">
                    <span className="text-[#3b5998] font-bold text-[13px] md:text-sm hover:underline cursor-pointer block break-all">
                      {comment.username}
                    </span>
                    <p className="text-[#1c1e21] text-[13px] md:text-sm mt-0.5 leading-relaxed font-normal break-words">
                      {comment.text}
                    </p>
                  </div>

                  {/* Metadata Row */}
                  <div className="text-[#90949c] text-xs mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-medium">
                    <span>{comment.time}</span>
                    <span>·</span>
                    
                    {/* Thumbs up indicator with interactivity */}
                    <button 
                      onClick={() => handleLikeComment(comment.id)}
                      className={`flex items-center gap-1 ${comment.liked ? "text-[#3b5998] font-bold" : "hover:text-[#3b5998]"}`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{comment.likes}</span>
                    </button>
                    
                    <span>·</span>
                    <button 
                      onClick={() => handleLikeComment(comment.id)}
                      className={`hover:underline ${comment.liked ? "text-[#3b5998] font-bold" : ""}`}
                    >
                      {comment.liked ? "Curtido" : "Curtir"}
                    </button>
                    <span>·</span>
                    <button className="hover:underline">Responder</button>
                  </div>

                  {/* Replies Toggle */}
                  {comment.replies.length > 0 && (
                    <button
                      onClick={() => toggleReplies(comment.id)}
                      className="mt-3 text-[#3b5998] hover:underline text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          <span>Ocultar respostas</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          <span>{comment.replies.length} respostas</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Nested Replies */}
                  {comment.replies.length > 0 && isExpanded && (
                    <div className="mt-4 pl-2 sm:pl-6 border-l border-[#f0f2f5] space-y-4">
                      {comment.replies.map((reply) => {
                        const rInitials = getInitials(reply.username);
                        const rAvatarColor = getAvatarColor(reply.username);

                        return (
                          <div key={reply.id} className="flex items-start gap-2 sm:gap-2.5">
                            {/* Smaller Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[10px] border ${rAvatarColor} shrink-0`}>
                              {rInitials}
                            </div>

                            {/* Reply Body */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col">
                                <span className="text-[#3b5998] font-bold text-[12px] md:text-xs hover:underline cursor-pointer block break-all">
                                  {reply.username}
                                </span>
                                <p className="text-[#1c1e21] text-[12px] md:text-xs mt-0.5 leading-relaxed break-words">
                                  {reply.text}
                                </p>
                              </div>

                              {/* Reply Metadata */}
                              <div className="text-[#90949c] text-[11px] mt-1.5 flex items-center gap-2 font-medium">
                                <span>{reply.time}</span>
                                <span>·</span>
                                <button 
                                  onClick={() => handleLikeReply(comment.id, reply.id)}
                                  className={`hover:underline ${reply.liked ? "text-[#3b5998] font-bold" : ""}`}
                                >
                                  {reply.liked ? "Curtido" : "Curtir"}
                                </button>
                                <span>·</span>
                                <button className="hover:underline">Responder</button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* "Fazer login" link at the bottom of the comments block */}
      <div className="mt-6 pt-4 border-t border-[#f0f2f5] text-center">
        <button className="text-[#3b5998] hover:underline text-[13px] font-semibold cursor-pointer">
          Fazer login
        </button>
      </div>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const s = document.createElement("script");
    s.src = "https://scripts.converteai.net/c5af71b1-77d0-40c1-bc2f-360898e9f8cf/players/6a47365f57a22db6a053fd77/v4/player.js";
    s.async = true;
    document.body.appendChild(s);

    return () => {
      if (s.parentNode) {
        s.parentNode.removeChild(s);
      }
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
    <div className="min-h-screen bg-primary-night selection:bg-amber-gold selection:text-primary-night overflow-x-hidden flex flex-col justify-between">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-gold/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-earth-red/5 blur-[150px] rounded-full" />
      </div>

      <div>
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
          <section className="relative min-h-[80vh] flex flex-col items-center justify-start px-6 pt-12 md:pt-20 pb-[37px] max-w-7xl mx-auto overflow-hidden">
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
              <div className="w-full relative z-10">
                <StableVTurbPlayer />
              </div>

              {/* Facebook Comments Section */}
              <FacebookComments />
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="relative z-50 py-16 px-6 bg-[#fdf7e7] border-t border-black/5 flex flex-col items-center w-full">
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
