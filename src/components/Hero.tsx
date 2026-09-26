'use client';
import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import { STATS, TICKER, WORDS } from '@/lib/content';
import { smooth, useMagnet, useReducedMotion, useScrollFrame } from '@/lib/motion';

const FRAG = `precision highp float;uniform vec2 u_res;uniform float u_t;uniform vec2 u_m;
float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=.5;}return v;}
void main(){vec2 uv=gl_FragCoord.xy/u_res;vec2 p=uv*vec2(u_res.x/u_res.y,1.)*1.6;float t=u_t*.07;
vec2 q=vec2(fbm(p+t),fbm(p+vec2(5.2,1.3)-t));
vec2 mo=(u_m-uv)*vec2(u_res.x/u_res.y,1.);float md=exp(-dot(mo,mo)*9.);
vec2 r=vec2(fbm(p+3.5*q+vec2(1.7,9.2)+.15*t+md*.6),fbm(p+3.5*q+vec2(8.3,2.8)+.126*t));
float f=fbm(p+3.5*r);
vec3 deep=vec3(0.,.09,.25),navy=vec3(0.,.255,.537),blue=vec3(.28,.47,1.),red=vec3(.878,.125,.11);
vec3 col=mix(deep,navy,clamp(f*f*3.2,0.,1.));
col=mix(col,blue,clamp(length(q),0.,1.)*.32);
col=mix(col,red,smoothstep(.52,.92,f)*.85);
col+=red*.35*md;
col*=.85+.3*smoothstep(0.,1.,uv.y);
gl_FragColor=vec4(col,1.);}`;

/** Full-bleed WebGL noise field that drifts toward the cursor. Returns a stop function. */
function startFluid(c: HTMLCanvasElement, target: { current: number[] }, visible: { current: boolean }) {
  const gl = c.getContext('webgl', { antialias: false, alpha: false }); if (!gl) return () => {};
  const sh = (t: number, s: string) => { const o = gl.createShader(t)!; gl.shaderSource(o, s); gl.compileShader(o); return o; };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog); gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uRes = gl.getUniformLocation(prog, 'u_res'), uT = gl.getUniformLocation(prog, 'u_t'), uM = gl.getUniformLocation(prog, 'u_m');
  const resize = () => { c.width = Math.max(1, Math.floor(c.clientWidth * 0.5)); c.height = Math.max(1, Math.floor(c.clientHeight * 0.5)); gl.viewport(0, 0, c.width, c.height); gl.uniform2f(uRes, c.width, c.height); };
  resize(); addEventListener('resize', resize);
  const m = [0.6, 0.5]; const start = performance.now(); let raf = 0;
  const loop = (now: number) => {
    raf = requestAnimationFrame(loop); if (!visible.current) return;
    m[0] += (target.current[0] - m[0]) * 0.06; m[1] += (target.current[1] - m[1]) * 0.06;
    gl.uniform1f(uT, (now - start) / 1000); gl.uniform2f(uM, m[0], m[1]); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  raf = requestAnimationFrame(loop);
  return () => { cancelAnimationFrame(raf); removeEventListener('resize', resize); };
}

function useCycle(n: number, ms: number, rm: boolean) {
  const [i, set] = useState(0);
  useEffect(() => { if (rm) return; const t = setInterval(() => set((v) => (v + 1) % n), ms); return () => clearInterval(t); }, [n, ms, rm]);
  return i;
}

export default function Hero() {
  const rm = useReducedMotion();
  const magnet = useMagnet(rm);
  const section = useRef<HTMLElement>(null), content = useRef<HTMLDivElement>(null), fluid = useRef<HTMLCanvasElement>(null);
  const card = useRef<HTMLDivElement>(null), floatA = useRef<HTMLDivElement>(null), floatB = useRef<HTMLDivElement>(null);
  const target = useRef([0.6, 0.5]), visible = useRef(true);
  useEffect(() => { if (rm || !fluid.current) return; return startFluid(fluid.current, target, visible); }, [rm]);
  const word = useCycle(WORDS.length, 2600, rm), tick = useCycle(TICKER.length, 3600, rm);

  const [counts, setCounts] = useState(STATS.map(() => 0));
  useEffect(() => {
    const t0 = performance.now(), ease = (t: number) => 1 - Math.pow(1 - t, 3); let raf = 0;
    const step = (now: number) => { const p = Math.min(1, (now - t0) / 1800); setCounts(STATS.map((s) => s.value * ease(p))); if (p < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step); return () => cancelAnimationFrame(raf);
  }, []);

  useScrollFrame(useCallback(() => {
    const s = section.current, ct = content.current; if (!s || !ct) return;
    const r = s.getBoundingClientRect(); const p = smooth(0, 1, -r.top / (r.height * 0.75));
    ct.style.opacity = String(1 - p); ct.style.transform = `translateY(${-p * 80}px) scale(${1 - p * 0.06})`;
    if (fluid.current) fluid.current.style.transform = `scale(${1 + p * 0.18})`;
    visible.current = r.bottom > 0;
  }, []));

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (rm) return; const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; target.current = [x, 1 - y];
    const mx = x - 0.5, my = y - 0.5;
    if (card.current) card.current.style.transform = `perspective(1200px) rotateY(${mx * -6}deg) rotateX(${my * 6}deg)`;
    if (floatA.current) floatA.current.style.transform = `translateY(${my * -14}px)`;
    if (floatB.current) floatB.current.style.transform = `translateY(${my * 18}px)`;
  };

  return (
    <section id="top" ref={section} className="hero" onMouseMove={onMove}>
      <canvas ref={fluid} className="hero__fluid" aria-hidden />
      <div className="hero__shade" />
      <div ref={content} className="wrap hero__content">
        <div>
          <div className="hero__badge"><span className="hero__new">NEW</span>Now in London · Wembley–Harrow Corridor</div>
          <h1 className="hero__title">
            The world&apos;s largest IT education network, now training{' '}
            <span className="hero__word"><span key={word}>{WORDS[word]}</span></span>
          </h1>
          <p className="hero__lead">Industry-aligned technical and professional programmes from a network spanning 23+ countries, 800+ centres and 4.3 million alumni. Two decades of proven skilling, now in the United Kingdom.</p>
          <div className="hero__cta">
            <a href="#courses" className="btn btn--primary btn--lg" {...magnet}>Explore courses</a>
            <a href="#journey" className="btn btn--ghost"><span className="btn__play" aria-hidden>▶</span>See how it works</a>
          </div>
          <dl className="hero__stats">
            {STATS.map((s, i) => (
              <div key={s.label}><dd className="stat__v">{s.format(counts[i])}</dd><dt className="stat__l">{s.label}</dt></div>
            ))}
          </dl>
        </div>

        <div ref={card} className="hero__visual">
          <div className="hero__card">
            <Image src="/students.png" alt="Students learning at G-TEC" fill sizes="(max-width: 900px) 100vw, 560px" priority />
            <div className="hero__card-shade" />
            <div className="hero__card-text">
              <div className="hero__live">Live now</div>
              <div className="hero__ticker"><span key={tick}>{TICKER[tick]}</span></div>
            </div>
          </div>
          <div ref={floatA} className="hero__float hero__float--a">
            <span className="dot"><span className="dot__pulse" /></span>
            <span><strong>Verified certificates</strong><br /><span className="muted">Recognised across 23+ countries</span></span>
          </div>
          <div ref={floatB} className="hero__float hero__float--b">
            <div className="hero__float-num">4.3M+</div>
            <div className="hero__float-label">alumni worldwide</div>
          </div>
        </div>
      </div>
    </section>
  );
}
