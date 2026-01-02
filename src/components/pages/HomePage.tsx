// HPI 1.6-V
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Code, Palette, Video, FileText, Terminal, Cpu, Globe, Zap, ChevronRight, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { Services, PortfolioProjects } from '@/entities';
import { Image } from '@/components/ui/image';

// --- Utility Components for Motion & Layout ---

// Mandatory Intersection Observer Component for Scroll Reveals
type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Add a small delay via style if needed, or just let CSS handle it
        setTimeout(() => {
            element.classList.add('is-visible');
        }, delay);
        observer.unobserve(element);
      }
    }, { threshold: 0.15 });

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 [&.is-visible]:opacity-100 [&.is-visible]:translate-y-0 ${className || ''}`}>{children}</div>;
};

// Marquee Component for "Living" Motion
const Marquee: React.FC<{ text: string; reverse?: boolean }> = ({ text, reverse = false }) => {
  return (
    <div className="relative flex overflow-hidden py-4 bg-neon-purple/5 border-y border-neon-purple/10">
      <div className={`animate-marquee whitespace-nowrap flex gap-8 ${reverse ? 'animate-marquee-reverse' : ''}`}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-heading font-bold text-neon-purple/20 uppercase tracking-tighter">
            {text} <span className="mx-4 text-foreground/10">•</span>
          </span>
        ))}
      </div>
      <div className={`absolute top-0 animate-marquee2 whitespace-nowrap flex gap-8 ${reverse ? 'animate-marquee-reverse' : ''}`}>
        {[...Array(4)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-heading font-bold text-neon-purple/20 uppercase tracking-tighter">
            {text} <span className="mx-4 text-foreground/10">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

// Custom Cursor Follower for Hero
const HeroSpotlight = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.15),
              transparent 80%
            )
          `,
        }}
      />
    </div>
  );
};

export default function HomePage() {
  // --- Data Fidelity Protocol ---
  // 1. Identify & Canonize Data Sources
  const [services, setServices] = useState<Services[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<PortfolioProjects[]>([]);
  
  // 2. Preserve Original Logic
  useEffect(() => {
    const fetchData = async () => {
      const { items: servicesData } = await BaseCrudService.getAll<Services>('services');
      const { items: projectsData } = await BaseCrudService.getAll<PortfolioProjects>('portfolioprojects');
      
      setServices(servicesData.slice(0, 4));
      setFeaturedProjects(projectsData.slice(0, 3));
    };

    fetchData();
  }, []);

  const serviceIcons = [Code, Palette, Video, FileText];
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-neon-purple selection:text-white overflow-x-clip">
      {/* Global Styles for Custom Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .animate-marquee2 { animation: marquee2 25s linear infinite; }
        .animate-marquee-reverse { animation-direction: reverse; }
        
        .clip-path-slant {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
        }
        .clip-path-slant-reverse {
          clip-path: polygon(0 15%, 100% 0, 100% 100%, 0 100%);
        }
        
        .text-stroke {
          -webkit-text-stroke: 1px rgba(168, 85, 247, 0.3);
          color: transparent;
        }
      `}</style>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-neon-purple origin-left z-50"
        style={{ scaleX }}
      />

      <Header />

      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-[95vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/106e78_a6735067740f4f10a846317bd9712165~mv2.png?originWidth=576&originHeight=576')] opacity-[0.03] bg-repeat bg-[length:50px_50px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-neon-purple/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
        
        <div className="container relative z-10 px-6 max-w-[120rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col justify-center">
            <AnimatedElement>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/5 backdrop-blur-sm mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-purple"></span>
                </span>
                <span className="font-paragraph text-xs md:text-sm tracking-widest uppercase text-neon-purple">System Online • v2.0.4</span>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-8">
                <span className="block text-foreground">CODE</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-purple-400 to-white">JINX_</span>
              </h1>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <p className="font-paragraph text-lg md:text-xl text-foreground/60 max-w-2xl leading-relaxed mb-10 border-l-2 border-neon-purple/50 pl-6">
                We don't just build websites; we architect digital ecosystems. 
                Innovate your presence. Simplify your workflow. Excel in your industry.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="flex flex-wrap gap-4">
                <Link to="/services">
                  <Button className="h-14 px-8 bg-neon-purple hover:bg-neon-purple/90 text-white rounded-none border border-neon-purple font-paragraph tracking-wide text-lg group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-2">
                      Initialize Project <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link to="/student-tools">
                  <Button variant="outline" className="h-14 px-8 border-foreground/20 hover:border-neon-purple text-foreground hover:text-neon-purple hover:bg-neon-purple/5 rounded-none font-paragraph tracking-wide text-lg transition-all">
                    <Terminal className="w-5 h-5 mr-2" />
                    Student Tools
                  </Button>
                </Link>
              </div>
            </AnimatedElement>
          </div>

          {/* Hero Visual - Abstract 3D Representation */}
          <div className="lg:col-span-4 relative hidden lg:block h-[600px]">
             <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="absolute inset-0"
             >
                <div className="relative w-full h-full">
                  <div className="absolute top-10 right-10 w-64 h-80 border border-neon-purple/30 bg-background/80 backdrop-blur-md z-20 p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="h-2 w-1/3 bg-neon-purple/50 rounded-full" />
                      <div className="h-2 w-full bg-foreground/10 rounded-full" />
                      <div className="h-2 w-3/4 bg-foreground/10 rounded-full" />
                    </div>
                    <div className="font-paragraph text-xs text-neon-purple">
                      &gt; Compiling assets...<br/>
                      &gt; Optimization: 100%
                    </div>
                  </div>
                  
                  <div className="absolute bottom-20 left-0 w-72 h-64 bg-neon-purple mix-blend-multiply opacity-80 z-10" />
                  <div className="absolute top-20 right-20 w-64 h-64 border-2 border-foreground/10 z-0" />
                  
                  <Image 
                    src="https://static.wixstatic.com/media/106e78_49c4c5c2cb6e4541b959368733d4f747~mv2.png?originWidth=576&originHeight=576"
                    alt="Abstract digital art representing code structure"
                    width={600}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                  />
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* --- MARQUEE SECTION --- */}
      <section className="py-12 bg-background relative z-20 -mt-12 rotate-1 origin-left scale-105">
        <Marquee text="Web Development • UI/UX Design • Content Strategy • AI Integration" />
      </section>

      {/* --- MANIFESTO / ABOUT TEASER (Sticky Layout) --- */}
      <section className="relative w-full py-32 bg-background">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Sticky Title */}
            <div className="lg:col-span-4 relative">
              <div className="lg:sticky lg:top-32">
                <AnimatedElement>
                  <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-none">
                    THE <br/>
                    <span className="text-neon-stroke text-transparent bg-clip-text bg-gradient-to-b from-neon-purple to-transparent opacity-50">CODEJINX</span> <br/>
                    METHOD
                  </h2>
                  <div className="h-1 w-24 bg-neon-purple mb-8" />
                  <p className="font-paragraph text-foreground/60 text-sm uppercase tracking-widest">
                    Redefining Digital Standards
                  </p>
                </AnimatedElement>
              </div>
            </div>

            {/* Scrolling Content */}
            <div className="lg:col-span-8 space-y-24">
              <AnimatedElement>
                <div className="group">
                  <h3 className="font-heading text-3xl text-foreground mb-4 flex items-center gap-4">
                    <span className="text-neon-purple font-paragraph text-sm border border-neon-purple/30 px-2 py-1 rounded">01</span>
                    Precision Engineering
                  </h3>
                  <p className="font-paragraph text-lg text-foreground/70 leading-relaxed pl-12 border-l border-foreground/10 group-hover:border-neon-purple transition-colors duration-300">
                    We don't rely on templates. Every line of code is written with purpose, ensuring your digital infrastructure is robust, scalable, and lightning-fast. We treat web development as a precise science.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={100}>
                <div className="group">
                  <h3 className="font-heading text-3xl text-foreground mb-4 flex items-center gap-4">
                    <span className="text-neon-purple font-paragraph text-sm border border-neon-purple/30 px-2 py-1 rounded">02</span>
                    Creative Alchemy
                  </h3>
                  <p className="font-paragraph text-lg text-foreground/70 leading-relaxed pl-12 border-l border-foreground/10 group-hover:border-neon-purple transition-colors duration-300">
                    Technology without soul is just machinery. We infuse art into functionality, creating interfaces that are not only usable but emotionally resonant. Design is our language of connection.
                  </p>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <div className="group">
                  <h3 className="font-heading text-3xl text-foreground mb-4 flex items-center gap-4">
                    <span className="text-neon-purple font-paragraph text-sm border border-neon-purple/30 px-2 py-1 rounded">03</span>
                    Student Empowerment
                  </h3>
                  <p className="font-paragraph text-lg text-foreground/70 leading-relaxed pl-12 border-l border-foreground/10 group-hover:border-neon-purple transition-colors duration-300">
                    Knowledge should be accessible. Our suite of student tools simplifies complex academic challenges, bridging the gap between confusion and mastery with AI-driven assistance.
                  </p>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID (Asymmetrical) --- */}
      <section className="relative w-full py-32 bg-primary clip-path-slant">
        <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/106e78_318cd38442384fdb91ff1cf6f7213f3a~mv2.png?originWidth=768&originHeight=768')] opacity-[0.05] mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <AnimatedElement>
              <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground">
                OUR <span className="text-neon-purple">SERVICES</span>
              </h2>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <Link to="/services" className="hidden md:flex items-center gap-2 text-neon-purple hover:text-white transition-colors font-paragraph uppercase tracking-widest text-sm">
                View Full Catalog <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
            {services.map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              // Create an asymmetrical layout pattern
              const colSpan = index === 0 || index === 3 ? 'lg:col-span-7' : 'lg:col-span-5';
              
              return (
                <div key={service._id} className={`${colSpan} group`}>
                  <AnimatedElement delay={index * 100}>
                    <Link to={`/services/${service._id}`} className="block h-full">
                      <div className="relative h-full bg-background border border-foreground/5 p-8 md:p-12 hover:border-neon-purple/50 transition-all duration-500 overflow-hidden group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative z-10 flex flex-col h-full justify-between">
                          <div className="mb-8">
                            <div className="w-14 h-14 bg-neon-purple/10 rounded-lg flex items-center justify-center mb-6 text-neon-purple group-hover:scale-110 transition-transform duration-300">
                              <Icon size={28} />
                            </div>
                            <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-neon-purple transition-colors">
                              {service.serviceName}
                            </h3>
                            <p className="font-paragraph text-foreground/60 leading-relaxed">
                              {service.shortDescription}
                            </p>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-foreground/10 pt-6 mt-auto">
                            <span className="font-paragraph text-xs text-foreground/40 uppercase tracking-widest">Explore Service</span>
                            <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:bg-neon-purple group-hover:border-neon-purple group-hover:text-white transition-all">
                              <ChevronRight size={14} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedElement>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 md:hidden text-center">
            <Link to="/services">
              <Button variant="outline" className="w-full border-neon-purple text-neon-purple">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- STUDENT TOOL FEATURE (Dark UI Mockup) --- */}
      <section className="w-full py-32 bg-background overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedElement>
              <div className="relative">
                <div className="absolute -inset-4 bg-neon-purple/20 blur-3xl rounded-full opacity-50" />
                <div className="relative bg-[#0A0F1E] border border-foreground/10 rounded-xl overflow-hidden shadow-2xl">
                  {/* Mock Browser Header */}
                  <div className="bg-[#1E293B] px-4 py-3 flex items-center gap-2 border-b border-foreground/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="ml-4 px-3 py-1 bg-black/20 rounded text-[10px] font-paragraph text-foreground/40 w-full max-w-[200px]">
                      codejinx.com/tools/simplifier
                    </div>
                  </div>
                  
                  {/* Mock Tool Interface */}
                  <div className="p-8 space-y-6">
                    <div className="space-y-2">
                      <div className="h-4 w-24 bg-neon-purple/20 rounded animate-pulse" />
                      <div className="h-12 w-full bg-background border border-foreground/10 rounded flex items-center px-4 text-foreground/40 font-paragraph text-sm">
                        Paste your complex text here...
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-24 bg-background border border-neon-purple/30 rounded p-4 flex flex-col justify-between">
                        <div className="w-8 h-8 bg-neon-purple/10 rounded flex items-center justify-center text-neon-purple"><Zap size={16}/></div>
                        <div className="h-2 w-12 bg-foreground/20 rounded" />
                      </div>
                      <div className="h-24 bg-background border border-foreground/5 rounded opacity-50" />
                      <div className="h-24 bg-background border border-foreground/5 rounded opacity-50" />
                    </div>
                    <div className="h-10 w-full bg-neon-purple rounded flex items-center justify-center text-white font-paragraph text-sm">
                      Simplify Text
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            <div className="space-y-8">
              <AnimatedElement delay={100}>
                <div className="inline-block px-3 py-1 border border-neon-purple text-neon-purple text-xs font-paragraph uppercase tracking-widest rounded-full mb-4">
                  Beta Access Live
                </div>
                <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Master Complexity with <span className="text-neon-purple">AI Precision</span>
                </h2>
              </AnimatedElement>
              
              <AnimatedElement delay={200}>
                <p className="font-paragraph text-lg text-foreground/70 leading-relaxed">
                  The Codejinx Study Simplifier isn't just a summarizer. It's an intelligent engine that breaks down dense academic papers, technical documentation, and complex theses into digestible, actionable insights.
                </p>
              </AnimatedElement>

              <AnimatedElement delay={300}>
                <ul className="space-y-4 font-paragraph text-sm text-foreground/80">
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-neon-purple rounded-full" />
                    Instant terminology breakdown
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-neon-purple rounded-full" />
                    Difficulty level adjustment
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-neon-purple rounded-full" />
                    Export to flashcards
                  </li>
                </ul>
              </AnimatedElement>

              <AnimatedElement delay={400}>
                <Link to="/student-tools">
                  <Button className="mt-4 bg-white text-background hover:bg-gray-200 font-paragraph px-8 py-6 rounded-none text-base">
                    Try It For Free
                  </Button>
                </Link>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* --- PORTFOLIO SHOWCASE (Full Bleed Cards) --- */}
      <section className="w-full py-32 bg-primary relative">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12 mb-16 flex flex-col md:flex-row justify-between items-end">
          <AnimatedElement>
            <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground">
              SELECTED <br/><span className="text-transparent text-stroke">WORKS</span>
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={100}>
            <p className="font-paragraph text-foreground/60 max-w-md text-right mt-6 md:mt-0">
              A curation of digital products, brand identities, and technical solutions.
            </p>
          </AnimatedElement>
        </div>

        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="space-y-24">
            {featuredProjects.map((project, index) => (
              <AnimatedElement key={project._id} delay={index * 100}>
                <Link to={`/portfolio/${project._id}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Image Side */}
                    <div className={`lg:col-span-8 relative overflow-hidden rounded-lg ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                      <div className="aspect-[16/9] overflow-hidden bg-background/50">
                        {project.thumbnailImage ? (
                          <Image
                            src={project.thumbnailImage}
                            alt={project.projectName || 'Project Preview'}
                            width={1200}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-foreground/5">
                            <Image 
                                src="https://static.wixstatic.com/media/106e78_c30976ff23d94574976b3351c01ef482~mv2.png?originWidth=1152&originHeight=640"
                                alt="Placeholder"
                                width={800}
                                className="w-full h-full object-cover opacity-20"
                            />
                          </div>
                        )}
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-neon-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className={`lg:col-span-4 ${index % 2 === 1 ? 'lg:order-1 lg:text-right' : ''}`}>
                      <div className={`flex flex-col ${index % 2 === 1 ? 'items-end' : 'items-start'}`}>
                        <span className="font-paragraph text-xs text-neon-purple mb-4 uppercase tracking-widest border border-neon-purple/30 px-3 py-1 rounded-full">
                          {project.discipline || 'Development'}
                        </span>
                        <h3 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 group-hover:text-neon-purple transition-colors">
                          {project.projectName}
                        </h3>
                        <p className="font-paragraph text-foreground/60 mb-8 line-clamp-3">
                          {project.projectDescription}
                        </p>
                        <div className="flex items-center gap-2 text-foreground font-paragraph text-sm uppercase tracking-wider group-hover:gap-4 transition-all">
                          View Case Study <ArrowRight size={16} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedElement>
            ))}
          </div>
          
          <div className="mt-24 text-center">
            <Link to="/portfolio">
              <Button className="bg-transparent border border-foreground/20 text-foreground hover:bg-foreground hover:text-background px-10 py-6 rounded-none font-paragraph text-lg transition-all">
                Explore All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US (New Section for Narrative) --- */}
      <section className="w-full py-32 bg-background border-t border-foreground/5">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <AnimatedElement>
              <div className="p-8 border border-foreground/5 bg-primary/30 hover:bg-primary/50 transition-colors">
                <Cpu className="w-10 h-10 text-neon-purple mb-6" />
                <h3 className="font-heading text-2xl text-foreground mb-4">Future-Proof Tech</h3>
                <p className="font-paragraph text-foreground/60 text-sm">
                  We build on modern stacks that scale. No legacy code, no bloat. Just pure performance.
                </p>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={100}>
              <div className="p-8 border border-foreground/5 bg-primary/30 hover:bg-primary/50 transition-colors">
                <Globe className="w-10 h-10 text-neon-purple mb-6" />
                <h3 className="font-heading text-2xl text-foreground mb-4">Global Standards</h3>
                <p className="font-paragraph text-foreground/60 text-sm">
                  Our designs and code adhere to international accessibility and SEO standards.
                </p>
              </div>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <div className="p-8 border border-foreground/5 bg-primary/30 hover:bg-primary/50 transition-colors">
                <Terminal className="w-10 h-10 text-neon-purple mb-6" />
                <h3 className="font-heading text-2xl text-foreground mb-4">Developer Centric</h3>
                <p className="font-paragraph text-foreground/60 text-sm">
                  Built by developers, for the modern web. We understand the ecosystem inside out.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative w-full py-40 bg-neon-purple overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://static.wixstatic.com/media/106e78_879c376db3704ce48b521a98bc2b50ab~mv2.png?originWidth=1152&originHeight=768')] opacity-20 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <AnimatedElement>
            <h2 className="font-heading text-6xl md:text-8xl font-black text-white mb-8 leading-none">
              READY TO <br/> DISRUPT?
            </h2>
          </AnimatedElement>
          <AnimatedElement delay={100}>
            <p className="font-paragraph text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Whether you need a digital overhaul or a simple tool to ace your exams, Codejinx is your catalyst.
            </p>
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact">
                <Button className="bg-white text-neon-purple hover:bg-gray-100 px-10 py-8 text-xl font-bold font-heading rounded-none border-2 border-white">
                  Start Collaboration
                </Button>
              </Link>
              <Link to="/blog">
                <Button variant="outline" className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-10 py-8 text-xl font-bold font-heading rounded-none">
                  Read Our Insights
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}