import React, { useState, useEffect, useRef } from 'react';

// =============================================
// CONSTANTS
// =============================================

const WA_LINK = 'https://wa.me/5511930413221';

const NAV_LINKS = [
  { href: '#problema', label: 'O Problema' },
  { href: '#solucao', label: 'A Solução' },
  { href: '#prova', label: 'Resultados' },
] as const;

const STATS = [
  { value: 95, suffix: '%', label: 'das interações comerciais no Brasil são via WhatsApp', detail: 'Dominância de Mercado 2025' },
  { value: 80, suffix: '%', label: 'das conversas são resolvidas por IA sem ajuda humana', detail: 'Zero Intervenção Humana' },
  { value: 6, suffix: 'x', decimal: true, label: 'maior conversão que Chatbots tradicionais', detail: 'Acima dos Bots Tradicionais' },
] as const;

const PAIN_CARDS = [
  { num: '01', icon: 'fa-comment-slash', title: 'Conversas que não avançam', desc: 'O lead pergunta, o bot responde, a conversa morre. Falta direção. Falta técnica. Falta fechamento.' },
  { num: '02', icon: 'fa-arrows-rotate', title: 'Processo que depende de pessoas', desc: 'Cada troca no time é um recomeço. O padrão some. A qualidade oscila. As vendas sofrem.' },
  { num: '03', icon: 'fa-chart-line', title: 'Investimento sem retorno', desc: 'Tráfego pago, leads chegando, agenda vazia. O funil tem furo. A pergunta é: onde?' },
] as const;

const PROCESS_STEPS = [
  { num: '01', icon: 'fa-comments', title: 'Fale com a Luana', desc: 'Clique no botão e converse com nossa assistente. Ela vai coletar algumas informações sobre seu negócio.', detail: 'Leva menos de 3 minutos' },
  { num: '02', icon: 'fa-user-secret', title: 'Cliente Oculto', desc: 'Simulamos um lead real entrando em contato com sua clínica. Você não saberá quando — assim vemos a verdade.', detail: 'Sem aviso prévio' },
  { num: '03', icon: 'fa-chart-bar', title: 'Diagnóstico na Mão', desc: 'Em até 72h você recebe um relatório com os pontos críticos e uma call de 30 min para destravá-los.', detail: 'Em até 72 horas' },
] as const;

const FOR_WHOM_YES = [
  'Tem pelo menos 2 pessoas no atendimento ou vendas',
  'Recebe 20+ leads por dia no WhatsApp',
  'Sente que as conversas não viram agendamento como deveriam',
  'Quer um processo que funcione independente de quem opera',
  'Está cansado de depender da "boa vontade" do time para fechar',
] as const;

const FOR_WHOM_NO = [
  'Ainda está começando e tem poucos leads',
  'Não tem equipe para atender as reuniões geradas',
  'Não quer integrar CRM ou agenda',
  'Acredita que só trocar de ferramenta resolve',
  'Prefere continuar no improviso',
] as const;

const FOUNDERS = [
  {
    name: 'Amália Saraiva',
    role: 'Diretora Comercial',
    img: 'https://i.postimg.cc/zB30VtFx/Retratos-Profissionais-Amalia-Saraiva-(16)-(1).jpg',
    bio: 'Especialista em Copywriting e funis de conversão para WhatsApp. Desde 2022 é responsável por criar processos de vendas conversacionais para empresas do nicho da saúde, turismo aéreo e viário e educacional (pós-graduações). Responsável por transformar a linguagem das IAs em conversas humanizadas que vendem.',
  },
  {
    name: 'Elnathan Nicolas',
    role: 'Diretor de Automações',
    img: 'https://i.postimg.cc/SQgm0JnR/freepik-retrato-de-um-homem-adulto-em-estdio-fotogrfico-ve-9083-(1).png',
    bio: 'Estrategista que arquiteta o fluxo de cada conversa. Define as regras, os gatilhos e as ações que a IA executa para conduzir o lead do primeiro "oi" até o agendamento confirmado. Atuou em campanhas de vendas no nicho educacional (escolas), mercado digital de infoprodutos e automações para empresas de serviço.',
  },
] as const;

const FAQ_ITEMS = [
  {
    q: 'A análise é realmente gratuita? Qual é o "pega"?',
    a: 'É 100% gratuita, sem pegadinha. Fazemos a análise porque sabemos que, quando você enxerga onde a conversa trava, a solução fica óbvia. Se fizer sentido para ambos, apresentamos como a Pérsia pode ajudar. Se não fizer, você sai com um diagnóstico valioso de qualquer forma.',
  },
  {
    q: 'Como funciona o cliente oculto?',
    a: 'Simulamos um lead real entrando em contato com sua clínica pelo WhatsApp. Avaliamos tempo de resposta, qualidade do atendimento, capacidade de condução e follow-up. Você não saberá o momento exato — assim capturamos a realidade da sua conversa, não a versão ensaiada.',
  },
  {
    q: 'Mas eu já tenho chatbot. Por que não funciona?',
    a: 'A maioria dos chatbots foi programada para responder perguntas — não para conduzir vendas. Responder não é vender. O diferencial da Pérsia está no Copywriting Conversacional: cada mensagem é pensada para levar o lead ao próximo passo, até o agendamento.',
  },
  {
    q: 'A IA substitui minha equipe?',
    a: 'Não. A IA trabalha junto com seu time. Ela cuida das etapas repetitivas (triagem, qualificação, agendamento, follow-up), liberando sua equipe para focar no que exige presença humana: atendimento presencial e negociações complexas.',
  },
  {
    q: 'Quanto tempo leva para implementar?',
    a: 'A implantação completa acontece em até 30 dias úteis. Inclui diagnóstico, construção dos fluxos de conversa, treinamento da IA com sua linguagem e integração com CRM e agenda.',
  },
] as const;

// =============================================
// HOOKS
// =============================================

/** Observes .reveal and .line-reveal-inner elements, adds .is-visible when in viewport */
function useReveal() {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.documentElement.classList.add('reveal-ready');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05 }
      );

      document.querySelectorAll('.reveal, .line-reveal-inner').forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 80);

    return () => {
      clearTimeout(timer);
      document.documentElement.classList.remove('reveal-ready');
    };
  }, []);
}

/** Animates a number from 0 to `target` when the element enters the viewport */
function useCountUp(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  suffix: string,
  options?: { decimal?: boolean; duration?: number }
) {
  const { decimal = false, duration = 1800 } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const update = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = eased * target;
          el.textContent = (decimal ? current.toFixed(1) : Math.round(current).toString()) + suffix;
          if (progress < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, target, suffix, decimal, duration]);
}

// =============================================
// REUSABLE COMPONENTS
// =============================================

const Button: React.FC<{
  variant?: 'primary' | 'outline';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  glowPulse?: boolean;
}> = ({ variant = 'primary', className = '', children, onClick, href, glowPulse = false }) => {
  const base = 'relative px-8 py-4 rounded-full font-bold transition-all duration-500 text-center uppercase text-xs tracking-[0.2em] group overflow-hidden';
  const styles = {
    primary: `bg-accent text-deep hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(245,184,0,0.2)] hover:shadow-[0_0_50px_rgba(245,184,0,0.4)] ${glowPulse ? 'animate-glow-pulse' : ''}`,
    outline: 'border border-accent/40 text-accent hover:bg-accent/5 hover:border-accent/70 hover:scale-105 active:scale-95',
  };
  const cls = `${base} ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      )}
    </>
  );

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>;
  return <button className={cls} onClick={onClick}>{inner}</button>;
};

const SectionTag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="h-px w-8 bg-accent/40" />
    <span className="font-mono text-[10px] tracking-[0.4em] text-accent uppercase">{children}</span>
    <div className="h-px w-8 bg-accent/40" />
  </div>
);

const SectionHeadline: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h2 className={`text-4xl md:text-6xl font-serif mb-8 leading-[1.15] text-white ${className}`}>
    {children}
  </h2>
);

const LogoImage: React.FC<{ className?: string }> = ({ className = 'h-12' }) => (
  <img
    src="https://i.postimg.cc/Nj4cxS7L/Vector.png"
    alt="Pérsia Consultoria Digital"
    className={`${className} object-contain hover:opacity-80 transition-opacity`}
  />
);

/** Standard card used across ProcessSection and ForWhomSection */
const TechCard: React.FC<{
  watermark: string;
  badge: string;
  icon: string;
  iconAccent?: boolean;
  title: string;
  titleMuted?: boolean;
  children: React.ReactNode;
  revealDir?: 'up' | 'left' | 'right';
  revealDelay?: number;
}> = ({ watermark, badge, icon, iconAccent = true, title, titleMuted = false, children, revealDir = 'up', revealDelay = 2 }) => (
  <div className={`reveal reveal-${revealDir} reveal-delay-${revealDelay} group relative tech-card rounded-[2rem] border border-white/5 ${iconAccent ? 'hover:border-accent/20' : 'hover:border-white/10'} transition-all duration-500 overflow-hidden h-full flex flex-col`}>
    <div className={`absolute top-0 right-0 font-mono font-black text-[7rem] leading-none select-none translate-x-4 -translate-y-2 transition-colors duration-500 ${iconAccent ? 'text-white/[0.025] group-hover:text-white/[0.05]' : 'text-white/[0.02] group-hover:text-white/[0.04]'}`}>
      {watermark}
    </div>
    <div className={`h-px w-full bg-gradient-to-r from-transparent to-transparent transition-all duration-700 ${iconAccent ? 'via-accent/0 group-hover:via-accent/30' : 'via-white/0 group-hover:via-white/8'}`} />
    <div className="p-10 flex flex-col flex-1 relative z-10">
      <div className="flex items-start justify-between mb-8">
        <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 ${iconAccent ? 'bg-accent/10 border-accent/15 text-accent group-hover:bg-accent group-hover:text-deep group-hover:border-accent' : 'bg-white/5 border-white/8 text-white/30'}`}>
          <i className={`fa-solid ${icon} text-xl`} />
        </div>
        <span className={`font-mono text-[10px] uppercase tracking-[0.3em] pt-1 ${iconAccent ? 'text-accent/50' : 'text-white/20'}`}>{badge}</span>
      </div>
      <h4 className={`font-serif text-2xl mb-4 leading-tight ${titleMuted ? 'text-white/40' : 'text-white'}`}>{title}</h4>
      {children}
    </div>
  </div>
);

// =============================================
// SECTIONS
// =============================================

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full h-24 z-50 transition-all duration-500 ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="absolute inset-0 bg-deep/80 backdrop-blur-xl border-b border-white/5" />
        <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between relative z-10">
          <LogoImage className="h-6 md:h-8" />
          <div className="hidden lg:flex items-center gap-10">
            <nav className="flex items-center gap-8 text-[10px] uppercase tracking-[0.2em] text-white/60">
              {NAV_LINKS.map(link => (
                <a key={link.href} href={link.href} className="hover:text-accent transition-colors duration-300">{link.label}</a>
              ))}
            </nav>
            <Button variant="primary" className="py-3 px-6" href={WA_LINK}>Análise Gratuita</Button>
          </div>
          <button
            className="lg:hidden text-accent p-2 rounded-lg hover:bg-accent/10 transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <i className="fa-solid fa-bars-staggered text-2xl" />
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 lg:hidden ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: 'rgba(11,13,18,0.7)', backdropFilter: 'blur(4px)' }}
        onClick={close}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 h-full w-72 z-[70] flex flex-col lg:hidden transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
          background: 'rgba(17,20,28,0.98)',
          borderLeft: '1px solid rgba(245,184,0,0.1)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div className="flex items-center justify-between px-8 h-24 border-b border-white/5 flex-shrink-0">
          <LogoImage className="h-5" />
          <button onClick={close} className="text-white/50 hover:text-accent transition-colors p-2 rounded-lg hover:bg-accent/10" aria-label="Fechar menu">
            <i className="fa-solid fa-xmark text-xl" />
          </button>
        </div>
        <nav className="flex flex-col px-8 py-10 gap-2 flex-1">
          {NAV_LINKS.map((link, idx) => (
            <a
              key={link.href}
              href={link.href}
              onClick={close}
              className="flex items-center gap-4 py-4 border-b border-white/5 text-white/60 hover:text-accent transition-colors duration-300 uppercase tracking-[0.2em] text-xs font-mono"
              style={{ transitionDelay: menuOpen ? `${idx * 60}ms` : '0ms' }}
            >
              <span className="text-accent/30 text-[9px]">0{idx + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="px-8 pb-10 flex-shrink-0">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-full bg-accent text-deep font-bold uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(245,184,0,0.2)]"
          >
            <i className="fa-brands fa-whatsapp text-base" />
            Análise Gratuita
          </a>
        </div>
      </div>
    </>
  );
};

const Hero: React.FC = () => (
  <section className="pt-40 pb-20 md:min-h-screen flex items-center relative overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none" />
    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/10 blur-[150px] tech-pulse pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 blur-[120px] tech-pulse pointer-events-none" style={{ animationDelay: '2s' }} />

    <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
      <div>
        <div className="reveal reveal-left">
          <SectionTag>Inteligência de Negócios</SectionTag>
        </div>
        <h1 className="text-5xl md:text-7xl font-serif text-white mb-8 leading-[1.1]">
          {['80% dos seus agendamentos', 'no WhatsApp poderiam', 'ser realizados sozinhos.'].map((line, i) => (
            <span key={i} className="line-reveal">
              <span className="line-reveal-inner" style={{ transitionDelay: `${0.15 + i * 0.2}s` }}>{line}</span>
            </span>
          ))}
        </h1>
        <p className="reveal reveal-up text-xl md:text-2xl font-light text-accent/80 mb-8 italic border-l-2 border-accent/20 pl-6" style={{ transitionDelay: '0.75s' }}>
          O problema não está no chatbot ou no time de atendimento. Está na conversa.
        </p>
        <p className="reveal reveal-up text-muted text-lg mb-12 max-w-xl leading-relaxed" style={{ transitionDelay: '0.9s' }}>
          Solicite uma análise gratuita do seu WhatsApp, descubra onde sua clínica está perdendo vendas e como uma IA com habilidades de persuasão pode mudar isso.
        </p>
        <div className="reveal reveal-up flex flex-col sm:flex-row items-center gap-6" style={{ transitionDelay: '1.05s' }}>
          <Button className="w-full sm:w-auto px-12 py-5 text-sm" glowPulse href={WA_LINK}>
            QUERO MINHA ANÁLISE GRATUITA
          </Button>
          <div className="flex items-center gap-3 text-white/40 font-mono text-[10px] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Disponível agora
          </div>
        </div>
      </div>

      <div className="reveal reveal-right" style={{ transitionDelay: '0.4s' }}>
        <div className="animate-float relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent/50 to-transparent rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 tech-card tech-card-scan shadow-2xl">
            <img
              src="https://i.postimg.cc/V5y87bNJ/video.png"
              alt="Demonstração em vídeo da Pérsia Consultoria Digital"
              className="w-full h-full object-cover brightness-50 grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-deep/20" />
            <div className="absolute top-4 left-4 p-3 glass rounded-xl border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <i className="fa-solid fa-microchip text-xs" />
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-widest text-white/40">Motor de Processamento</p>
                <p className="text-[10px] font-mono text-accent">PÉRSIA_NEURAL_V2.5<span className="animate-blink">_</span></p>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-24 h-24 bg-accent/90 rounded-full flex items-center justify-center text-deep text-3xl hover:scale-110 active:scale-95 transition-transform duration-300 shadow-2xl shadow-accent/40">
                <i className="fa-solid fa-play ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const CredibilityBar: React.FC = () => {
  const refs = [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)];

  useCountUp(refs[0], STATS[0].value, STATS[0].suffix);
  useCountUp(refs[1], STATS[1].value, STATS[1].suffix);
  useCountUp(refs[2], STATS[2].value, STATS[2].suffix, { decimal: true });

  return (
    <section className="bg-primary/40 backdrop-blur-md border-y border-white/5 py-12 relative">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-8">
          {STATS.map((stat, idx) => (
            <div key={idx} className={`reveal reveal-up reveal-delay-${idx + 1} flex flex-col items-center md:items-start text-center md:text-left`}>
              <span ref={refs[idx]} className="text-5xl md:text-6xl font-serif text-accent mb-4 glow-accent stat-counter">0</span>
              <p className="text-white font-medium uppercase tracking-widest text-[11px] mb-1">{stat.label}</p>
              <p className="text-white/30 font-mono text-[9px] uppercase tracking-[0.2em]">{stat.detail}</p>
            </div>
          ))}
        </div>
        <p className="reveal reveal-up reveal-delay-4 text-center text-white/25 font-mono text-[9px] uppercase tracking-[0.25em] mt-2">
          Fonte: Chat Commerce Report 2025 / E-commerce Brasil
        </p>
      </div>
    </section>
  );
};

const ProblemSection: React.FC = () => (
  <section id="problema" className="py-28 bg-deep relative overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/3 blur-[200px] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end mb-24">
        <div>
          <div className="reveal reveal-up"><SectionTag>Por que seus agendamentos não acontecem sozinhos?</SectionTag></div>
          <div className="reveal reveal-up reveal-delay-1"><SectionHeadline>A tecnologia está aí. Os leads também. Então por que as vendas não fecham?</SectionHeadline></div>
        </div>
        <div className="space-y-5 text-muted text-base leading-relaxed border-l border-white/5 pl-10">
          <p className="reveal reveal-right reveal-delay-2">
            Você pode já ter um chatbot. Pode já ter um time de atendimento. Pode já estar investindo em tráfego pago. E mesmo assim, a agenda não enche, os leads somem e o WhatsApp virou um cemitério de conversas abertas.
          </p>
          <p className="reveal reveal-right reveal-delay-3">
            O problema não é falta de tecnologia. É que a tecnologia que você usa foi feita para{' '}
            <strong className="text-white font-semibold">responder — não para vender.</strong>{' '}
            Ela reage, mas não conduz. Ela informa, mas não convence.
          </p>
        </div>
      </div>

      <div className="reveal reveal-up reveal-delay-2 mb-20">
        <div className="relative border-l-2 border-accent/40 pl-8 py-2 max-w-3xl">
          <p className="text-2xl md:text-3xl font-serif text-white/70 italic leading-relaxed">
            "Cada lead que some é uma consulta que não aconteceu, um procedimento que ficou na mesa."
          </p>
          <div className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PAIN_CARDS.map((card, idx) => (
          <div
            key={idx}
            className={`reveal reveal-up reveal-delay-${idx + 1} group relative tech-card-scan tech-card rounded-[2rem] p-10 border border-white/5 hover:border-accent/25 transition-all duration-500 overflow-hidden`}
          >
            <span className="absolute top-6 right-8 font-mono text-[3.5rem] font-bold text-white/[0.03] select-none leading-none group-hover:text-white/[0.06] transition-colors duration-500">
              {card.num}
            </span>
            <div className="w-14 h-14 rounded-2xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-deep group-hover:border-accent transition-all duration-300">
              <i className={`fa-solid ${card.icon} text-lg`} />
            </div>
            <p className="font-mono text-[9px] text-accent/40 uppercase tracking-[0.3em] mb-3">{card.num}</p>
            <h4 className="text-white font-serif text-xl mb-4 leading-snug">{card.title}</h4>
            <p className="text-muted leading-relaxed text-sm">{card.desc}</p>
            <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent/60 to-transparent group-hover:w-full transition-all duration-700" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SolutionSection: React.FC = () => (
  <section id="solucao" className="py-24 bg-primary/20 relative overflow-hidden">
    <div className="absolute inset-0 bg-grid opacity-20" />
    <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">

      <div className="order-2 lg:order-1 reveal reveal-left relative">
        <div className="absolute -inset-10 bg-accent/5 blur-[150px] rounded-full tech-pulse" />
        <div className="relative glass p-4 rounded-[3rem] border border-white/5 overflow-hidden noise-overlay">
          <img
            src="https://i.postimg.cc/xTp7TQRc/celular-persia.png"
            className="rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-1000 animate-float"
            alt="Interface de atendimento Pérsia"
          />
        </div>
      </div>

      <div className="order-1 lg:order-2">
        <div className="reveal reveal-right"><SectionTag>O que muda quando a conversa muda</SectionTag></div>
        <div className="reveal reveal-right reveal-delay-1"><SectionHeadline>IA que não só responde. IA que convence.</SectionHeadline></div>

        <div className="space-y-8 mb-10">
          <p className="reveal reveal-up reveal-delay-2 text-muted text-base leading-relaxed">
            A Pérsia constrói sistemas de atendimento comercial que transformam conversa em agendamento — com CRM integrado, IA treinada e processos que funcionam mesmo quando você não está olhando.
          </p>
          <div className="reveal reveal-up reveal-delay-3 border-l-2 border-accent/30 pl-6 py-1">
            <p className="text-white text-lg leading-snug">Nosso diferencial não está na tecnologia.</p>
            <p className="text-accent font-serif italic text-xl leading-snug mt-1">Está no que ensinamos ela a falar.</p>
          </div>
          <p className="reveal reveal-up reveal-delay-4 text-muted text-base leading-relaxed">
            Enquanto outras IAs respondem como robôs, as nossas conversam como consultores persuasivos muito bem treinados. Elas qualificam, conduzem, contornam objeções e levam o lead até o agendamento — sem script engessado, sem respostas que travam a conversa.
          </p>
          <div className="reveal reveal-up reveal-delay-5 flex items-start gap-4">
            <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <i className="fa-solid fa-pen-nib text-accent text-xs" />
            </div>
            <p className="text-muted text-base leading-relaxed">
              O segredo tem nome:{' '}
              <span className="text-white font-semibold">Copywriting Conversacional.</span>{' '}
              Técnicas de escrita persuasiva aplicadas em cada mensagem. A IA não só responde. Ela conduz a venda.
            </p>
          </div>
        </div>

        <div className="reveal reveal-up reveal-delay-6">
          <div className="relative glass rounded-[1.5rem] border border-accent/15 p-8 overflow-hidden">
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
            <i className="fa-solid fa-quote-left text-accent/20 text-3xl mb-4 block" />
            <p className="text-white/80 text-lg font-serif italic leading-relaxed mb-5">
              "A maioria das IAs foi criada para informar. As nossas foram criadas para converter."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-px h-8 bg-accent/30" />
              <div>
                <p className="text-white text-sm font-semibold">Amália Saraiva</p>
                <p className="text-accent/60 font-mono text-[9px] uppercase tracking-[0.25em]">Diretora Comercial</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ProcessSection: React.FC = () => (
  <section id="prova" className="py-28 bg-deep relative overflow-hidden">
    <div className="absolute inset-0 bg-grid opacity-10" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/3 blur-[180px] pointer-events-none" />

    <div className="max-w-5xl mx-auto px-8 relative z-10">
      <div className="text-center mb-20">
        <div className="reveal reveal-up"><SectionTag>Sua análise gratuita em 3 passos</SectionTag></div>
        <div className="reveal reveal-up reveal-delay-1"><SectionHeadline>Descubra onde está o furo. Sem custo. Sem compromisso.</SectionHeadline></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PROCESS_STEPS.map((step, idx) => (
          <div key={idx} className={`reveal reveal-up reveal-delay-${idx + 2} group relative`}>
            {idx < 2 && (
              <div className="hidden md:flex absolute top-16 -right-3 z-10 items-center justify-center w-6">
                <i className="fa-solid fa-chevron-right text-accent/20 text-xs group-hover:text-accent/40 transition-colors duration-300" />
              </div>
            )}
            <TechCard
              watermark={step.num}
              badge={step.num}
              icon={step.icon}
              title={step.title}
              revealDir="up"
              revealDelay={idx + 2}
            >
              <p className="text-muted text-sm leading-relaxed flex-1">{step.desc}</p>
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
                <span className="text-accent/60 font-mono text-[10px] uppercase tracking-[0.25em]">{step.detail}</span>
              </div>
            </TechCard>
          </div>
        ))}
      </div>

      <div className="reveal reveal-up reveal-delay-5 mt-16 flex justify-center">
        <Button className="px-14 py-5 text-sm" glowPulse href={WA_LINK}>
          QUERO MINHA ANÁLISE GRATUITA
        </Button>
      </div>
    </div>
  </section>
);

const ForWhomSection: React.FC = () => (
  <section id="para-quem" className="py-28 bg-primary/20 relative overflow-hidden">
    <div className="absolute inset-0 bg-grid opacity-10" />
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/3 blur-[180px] pointer-events-none" />

    <div className="max-w-5xl mx-auto px-8 relative z-10">
      <div className="text-center mb-20">
        <div className="reveal reveal-up"><SectionTag>Para Quem É</SectionTag></div>
        <div className="reveal reveal-up reveal-delay-1">
          <SectionHeadline>Esta análise foi feita para quem já tem volume e quer convertê-lo melhor.</SectionHeadline>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TechCard watermark="SIM" badge="Para você" icon="fa-circle-check" title="Essa análise é para você se:" revealDir="left" revealDelay={2}>
          <ul className="space-y-0 flex-1">
            {FOR_WHOM_YES.map((item, idx) => (
              <li key={idx} className={`flex items-center gap-3 py-3 text-muted text-sm leading-snug ${idx < FOR_WHOM_YES.length - 1 ? 'border-b border-white/5' : ''}`}>
                <i className="fa-solid fa-check text-accent text-[10px] flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </TechCard>

        <TechCard watermark="NÃO" badge="Não é para você" icon="fa-circle-xmark" iconAccent={false} title="Não é para você se:" titleMuted revealDir="right" revealDelay={2}>
          <ul className="space-y-0 flex-1">
            {FOR_WHOM_NO.map((item, idx) => (
              <li key={idx} className={`flex items-center gap-3 py-3 text-white/25 text-sm leading-snug line-through decoration-white/15 ${idx < FOR_WHOM_NO.length - 1 ? 'border-b border-white/5' : ''}`}>
                <i className="fa-solid fa-xmark text-white/20 text-[10px] flex-shrink-0" style={{ textDecoration: 'none' }} />
                {item}
              </li>
            ))}
          </ul>
        </TechCard>
      </div>
    </div>
  </section>
);

const Founders: React.FC = () => (
  <section className="py-20 bg-deep">
    <div className="max-w-7xl mx-auto px-8">
      <div className="mb-20">
        <div className="reveal reveal-left"><SectionTag>Liderança</SectionTag></div>
        <div className="reveal reveal-left reveal-delay-1"><SectionHeadline>A inteligência por trás do algoritmo.</SectionHeadline></div>
        <p className="reveal reveal-left reveal-delay-2 text-muted text-lg leading-relaxed max-w-2xl">
          Unimos o melhor do Copywriting comercial com a engenharia de automação mais avançada do mercado para criar sistemas que realmente funcionam.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {FOUNDERS.map((founder, idx) => (
          <div key={idx} className={`reveal reveal-up reveal-delay-${idx + 1} group tech-card rounded-[2.5rem] border border-white/5 hover:border-accent/20 transition-all duration-500 overflow-hidden`}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={founder.img}
                className="w-full h-full object-cover object-top grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                alt={founder.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/10 to-transparent" />
            </div>
            <div className="p-8">
              <h4 className="text-2xl font-serif text-white mb-1 uppercase tracking-widest">{founder.name}</h4>
              <p className="text-accent text-[10px] font-mono uppercase tracking-[0.3em] mb-6">{founder.role}</p>
              <p className="text-muted text-sm leading-relaxed">{founder.bio}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="reveal reveal-up reveal-delay-3 mt-12 flex justify-center">
        <Button variant="outline" href={WA_LINK}>Conheça nossa Metodologia</Button>
      </div>
    </div>
  </section>
);

const FAQItem: React.FC<{ question: string; answer: string; delay: number }> = ({ question, answer, delay }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`reveal reveal-up reveal-delay-${Math.min(delay, 8)} tech-card rounded-[1.5rem] border border-white/5 overflow-hidden transition-all duration-300 ${open ? 'border-accent/20' : ''}`}>
      <button
        className="w-full flex items-center justify-between px-8 py-6 text-left gap-6 group"
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
      >
        <span className="text-white font-serif text-lg leading-snug group-hover:text-accent transition-colors duration-300">{question}</span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-accent/30 flex items-center justify-center text-accent transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <i className="fa-solid fa-plus text-xs" />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ maxHeight: open ? '400px' : '0px' }}
      >
        <p className="px-8 pb-8 text-muted text-base leading-relaxed border-t border-white/5 pt-4">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => (
  <section className="py-24 bg-primary/20 border-t border-white/5 relative">
    <div className="absolute inset-0 bg-grid opacity-10" />
    <div className="max-w-4xl mx-auto px-8 relative z-10">
      <div className="text-center mb-20">
        <div className="reveal reveal-up"><SectionTag>Dúvidas Frequentes</SectionTag></div>
        <div className="reveal reveal-up reveal-delay-1"><SectionHeadline>Perguntas que você pode estar se fazendo.</SectionHeadline></div>
      </div>
      <div className="space-y-4">
        {FAQ_ITEMS.map((item, idx) => (
          <FAQItem key={idx} question={item.q} answer={item.a} delay={idx + 1} />
        ))}
      </div>
    </div>
  </section>
);

const FinalCTA: React.FC = () => (
  <section className="py-24 bg-deep relative overflow-hidden border-t border-white/5">
    <div className="absolute inset-0 bg-grid opacity-30" />
    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-accent/5 to-transparent" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[200px] tech-pulse pointer-events-none" />

    <div className="max-w-5xl mx-auto px-8 text-center relative z-10">
      <div className="reveal reveal-up"><SectionTag>Acesso Imediato</SectionTag></div>
      <div className="reveal reveal-up reveal-delay-1">
        <SectionHeadline>80% dos seus agendamentos poderiam estar acontecendo agora.</SectionHeadline>
      </div>
      <p className="reveal reveal-up reveal-delay-2 text-2xl font-light text-accent/60 mb-16 italic">
        A análise é gratuita. O diagnóstico é seu. O futuro é automatizado.
      </p>
      <div className="reveal reveal-scale reveal-delay-3 flex flex-col items-center gap-10">
        <Button className="px-16 py-7 text-lg" glowPulse href={WA_LINK}>
          QUERO MINHA ANÁLISE GRATUITA
        </Button>
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="py-16 bg-deep border-t border-white/5">
    <div className="max-w-7xl mx-auto px-8 space-y-8">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="text-center md:text-left">
          <LogoImage className="h-6 mb-6 mx-auto md:mx-0" />
          <p className="max-w-sm text-muted text-sm leading-relaxed">
            Arquitetando o futuro das vendas conversacionais para o setor de saúde e estética através de IA neural e persuasão de alto impacto.
          </p>
        </div>
        <div className="flex gap-4 md:justify-end w-full md:w-auto">
          {[
            { href: 'https://www.instagram.com/persiaconsultor.ia/', icon: 'fa-instagram' },
            { href: 'https://www.linkedin.com/in/am%C3%A1lia-saraiva-3a5851141/', icon: 'fa-linkedin-in' },
            { href: WA_LINK, icon: 'fa-whatsapp' },
          ].map(({ href, icon }) => (
            <a key={icon} href={href} target="_blank" rel="noopener noreferrer"
              className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-accent hover:text-deep transition-all border border-white/5">
              <i className={`fa-brands ${icon} text-lg`} />
            </a>
          ))}
        </div>
      </div>
      <div className="pt-6 border-t border-white/5 text-center">
        <p className="text-xs text-white/40">© 2025 Pérsia Consultoria Digital. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);

// =============================================
// APP
// =============================================

const App: React.FC = () => {
  useReveal();
  return (
    <div className="font-sans antialiased text-white selection:bg-accent selection:text-deep">
      <Header />
      <main>
        <Hero />
        <CredibilityBar />
        <ProblemSection />
        <SolutionSection />
        <ProcessSection />
        <ForWhomSection />
        <Founders />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;
