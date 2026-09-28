'use client';
import { useRef, useEffect, MouseEvent } from 'react';
import { Brain, Code2, Bot, Shield, BarChart3, Building2, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Reveal from './Reveal';

gsap.registerPlugin(ScrollTrigger);

const COURSES = [
  { id: 'ai', title: 'AI & Machine Learning', icon: Brain, num: '01', desc: 'Master deep learning, neural networks, and generative AI systems with real-world applications.' },
  { id: 'fs', title: 'Full Stack Development', icon: Code2, num: '02', desc: 'Architect end-to-end web experiences and highly scalable cloud-native applications.' },
  { id: 'ag', title: 'Agentic AI (FutureX)', icon: Bot, num: '03', desc: 'Build the next generation of autonomous AI agents and intelligent automation workflows.' },
  { id: 'cs', title: 'Cyber Security', icon: Shield, num: '04', desc: 'Advanced threat detection, ethical hacking, and enterprise-grade InfoSec strategies.' },
  { id: 'ds', title: 'Data Analytics & BI', icon: BarChart3, num: '05', desc: 'Leverage predictive analytics, big data, and business intelligence to drive decisions.' },
  { id: 'ar', title: 'AutoCAD & Revit', icon: Building2, num: '06', desc: 'Execute modern building information modelling and precision structural design.' },
];

export default function StrategicCourses() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.strat-std-card',
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.strat-std-grid',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    
    // Update the spotlight variable
    el.style.setProperty('--x', `${x}px`);
    el.style.setProperty('--y', `${y}px`);
  };

  return (
    <section id="strategic" className="strategic-std" ref={containerRef}>
      <div className="wrap">
        
        <Reveal className="strat-std-head">
          <div className="kicker kicker--coral">The Frontier</div>
          <h2 className="h2 strat-std-title">Strategic Priority Courses</h2>
          <p className="lead lead--light strat-std-lead">
            Elite programs designed to build the next decade of digital transformation leaders.
          </p>
        </Reveal>

        <div className="strat-std-grid">
          {COURSES.map((c) => (
            <div 
              key={c.id} 
              className="strat-std-card"
              onMouseMove={handleMouseMove}
            >
              {/* Mouse Spotlight */}
              <div className="strat-std-card__spotlight" />
              
              {/* Background gradient noise */}
              <div className="strat-std-card__bg" />
              
              <div className="strat-std-card__content">
                <div className="strat-std-card__top">
                  <div className="strat-std-card__icon-box">
                    <c.icon size={28} strokeWidth={1.5} />
                  </div>
                  <span className="strat-std-card__num">{c.num}</span>
                </div>
                
                <div className="strat-std-card__bottom">
                  <h3 className="strat-std-card__title">{c.title}</h3>
                  <p className="strat-std-card__desc">{c.desc}</p>
                  
                  <div className="strat-std-card__action">
                    <span>Explore Program</span>
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
