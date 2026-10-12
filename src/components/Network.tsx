'use client';
import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { COUNTRIES, NETWORK_TILES } from '@/lib/content';
import { useReducedMotion } from '@/lib/motion';

const IDLE = 'Drag to rotate · tap a country';

export default function Network() {
  const host = useRef<HTMLDivElement>(null);
  const hover = useRef('');
  const [label, setLabel] = useState(IDLE);
  const rm = useReducedMotion();

  useEffect(() => {
    const el = host.current; if (!el) return;
    let dead = false, cleanup = () => {};
    (async () => {
      const THREE = await import('three'); if (dead) return;
      const W = el.clientWidth || 480;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(2, devicePixelRatio)); renderer.setSize(W, W);
      Object.assign(renderer.domElement.style, { position: 'absolute', inset: '0', width: '100%', height: '100%' });
      el.appendChild(renderer.domElement);
      const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(38, 1, 0.1, 100); cam.position.z = 3.1;
      const g = new THREE.Group(); scene.add(g); g.rotation.x = 0.35;
      // Background stars (fixed, outside the globe group)
      const S = 1200, sp = new Float32Array(S * 3);
      for (let i = 0; i < S; i++) { const v = new THREE.Vector3().randomDirection().multiplyScalar(20 + Math.random() * 20); sp.set([v.x, v.y, v.z], i * 3); }
      const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
      scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.7 })));
      // Earth: day map, city lights on the night side, specular oceans
      const tl = new THREE.TextureLoader(), tex = (f: string) => { const t = tl.load(`/textures/${f}`); t.anisotropy = 8; return t; };
      const day = tex('earth_atmos_2048.jpg'); day.colorSpace = THREE.SRGBColorSpace;
      const night = tex('earth_lights_2048.png'); night.colorSpace = THREE.SRGBColorSpace;
      const sun = new THREE.Vector3(-1, 0.35, 0.9).normalize();
      const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 96), new THREE.ShaderMaterial({
        uniforms: { day: { value: day }, night: { value: night }, spec: { value: tex('earth_specular_2048.jpg') }, sun: { value: sun } },
        vertexShader: `varying vec2 vUv; varying vec3 vN; varying vec3 vV;
          void main(){ vUv=uv; vN=normalize(mat3(modelMatrix)*normal); vec4 w=modelMatrix*vec4(position,1.); vV=normalize(cameraPosition-w.xyz); gl_Position=projectionMatrix*viewMatrix*w; }`,
        fragmentShader: `uniform sampler2D day, night, spec; uniform vec3 sun; varying vec2 vUv; varying vec3 vN; varying vec3 vV;
          void main(){
            float l=dot(vN,sun), mixv=smoothstep(-0.15,0.25,l);
            vec3 d=texture2D(day,vUv).rgb*(0.35+1.1*max(l,0.)), n=texture2D(night,vUv).rgb*vec3(1.,.8,.55)*1.6;
            float s=texture2D(spec,vUv).r*pow(max(dot(reflect(-sun,vN),vV),0.),40.)*0.35;
            vec3 c=mix(n+d*0.08,d+s,mixv);
            float rim=pow(1.-max(dot(vN,vV),0.),3.); c+=vec3(.3,.55,1.)*rim*0.55*(0.3+mixv);
            gl_FragColor=vec4(c,1.);
            #include <colorspace_fragment>
          }`,
      }));
      g.add(earth);
      const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.012, 64, 64), new THREE.MeshLambertMaterial({ map: tex('earth_clouds_1024.png'), transparent: true, opacity: 0.8, depthWrite: false }));
      g.add(clouds);
      scene.add(new THREE.DirectionalLight(0xffffff, 2.2).translateOnAxis(sun, 5), new THREE.AmbientLight(0x6688cc, 0.15));
      // Atmosphere halo (back faces, additive fresnel)
      scene.add(new THREE.Mesh(new THREE.SphereGeometry(1.14, 64, 64), new THREE.ShaderMaterial({
        side: THREE.BackSide, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
        vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vN=normalize(normalMatrix*normal); vec4 mv=modelViewMatrix*vec4(position,1.); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }`,
        fragmentShader: `varying vec3 vN; varying vec3 vV; void main(){ float i=pow(clamp(0.72+dot(vN,vV),0.,1.),4.); gl_FragColor=vec4(.35,.62,1.,1.)*i*1.4; }`,
      })));
      const toVec = (lat: number, lon: number, r = 1.02) => { const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180; return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th)); };
      type Marker = { m: InstanceType<typeof THREE.Mesh>; line?: InstanceType<typeof THREE.Line>; ry: number; rx: number };
      const markers: Record<string, Marker> = {}; let ukRing: InstanceType<typeof THREE.Mesh> | undefined;
      const mGeo = new THREE.SphereGeometry(0.02, 12, 12);
      for (const [name, lat, lon] of COUNTRIES) {
        const isUK = name === 'United Kingdom';
        const m = new THREE.Mesh(isUK ? new THREE.SphereGeometry(0.035, 16, 16) : mGeo, new THREE.MeshBasicMaterial({ color: isUK ? 0xff7a59 : 0xe0201c }));
        m.position.copy(toVec(lat, lon)); g.add(m);
        let line: InstanceType<typeof THREE.Line> | undefined;
        if (isUK) {
          ukRing = new THREE.Mesh(new THREE.RingGeometry(0.05, 0.06, 32), new THREE.MeshBasicMaterial({ color: 0xff7a59, transparent: true, opacity: 0.8, side: THREE.DoubleSide }));
          ukRing.position.copy(toVec(lat, lon, 1.025)); ukRing.lookAt(new THREE.Vector3(0, 0, 0)); g.add(ukRing);
        } else {
          const curve = new THREE.QuadraticBezierCurve3(toVec(54, -2), toVec((54 + lat) / 2, (-2 + lon) / 2, 1.35), toVec(lat, lon));
          line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)), new THREE.LineBasicMaterial({ color: 0xffb08a, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })); g.add(line);
        }
        const th = (lon + 180) * Math.PI / 180;
        markers[name] = { m, line, ry: -Math.atan2(-Math.cos(th), Math.sin(th)), rx: lat * Math.PI / 180 * 0.6 };
      }
      g.rotation.y = markers['United Kingdom'].ry - 0.9; // open on Europe/Africa, drifting towards Asia
      let drag = false, lx = 0, ly = 0, vel = 0;
      const down = (e: PointerEvent) => { drag = true; lx = e.clientX; ly = e.clientY; el.style.cursor = 'grabbing'; hover.current = ''; };
      const up = () => { drag = false; el.style.cursor = 'grab'; };
      const move = (e: PointerEvent) => { if (!drag) return; const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; g.rotation.y += dx * 0.006; g.rotation.x = Math.max(-1, Math.min(1, g.rotation.x + dy * 0.004)); vel = dx * 0.006; };
      el.addEventListener('pointerdown', down); addEventListener('pointerup', up); el.addEventListener('pointermove', move);
      const ro = new ResizeObserver(() => { const w = el.clientWidth; renderer.setSize(w, w); }); ro.observe(el);
      let raf = 0;
      const loop = () => {
        raf = requestAnimationFrame(loop);
        const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
        const tgt = hover.current ? markers[hover.current] : undefined;
        if (tgt && !drag) { let d = tgt.ry - g.rotation.y; d = Math.atan2(Math.sin(d), Math.cos(d)); g.rotation.y += d * 0.08; g.rotation.x += (tgt.rx - g.rotation.x) * 0.08; }
        else if (!drag && !rm) { g.rotation.y += 0.0022 + vel; vel *= 0.94; }
        for (const k in markers) { const mk = markers[k], hot = k === hover.current; mk.m.scale.setScalar(hot ? 2.2 : 1); if (mk.line) (mk.line.material as InstanceType<typeof THREE.LineBasicMaterial>).opacity = hot ? 1 : 0.35; }
        clouds.rotation.y += rm ? 0 : 0.0004;
        if (ukRing) ukRing.scale.setScalar(1 + 0.25 * Math.sin(performance.now() / 400));
        renderer.render(scene, cam);
      };
      loop();
      cleanup = () => { cancelAnimationFrame(raf); ro.disconnect(); el.removeEventListener('pointerdown', down); removeEventListener('pointerup', up); el.removeEventListener('pointermove', move); renderer.dispose(); renderer.domElement.remove(); };
    })();
    return () => { dead = true; cleanup(); };
  }, [rm]);

  return (
    <section id="network" className="network">
      <div className="wrap network__grid">
        <div>
          <Reveal>
            <div className="kicker kicker--coral">Global network</div>
            <h2 className="h2">One certificate. Recognised on four continents.</h2>
            <p className="lead lead--light">Every G-TEC certificate goes on one global register, so an employer anywhere can check it online. Tap or hover over a country to find it on the globe.</p>
          </Reveal>
          <ul className="countries" onMouseLeave={() => { hover.current = ''; setLabel(IDLE); }}>
            {COUNTRIES.map(([n]) => (
              <li key={n} onMouseEnter={() => { hover.current = n; setLabel(`London → ${n}`); }}>{n}</li>
            ))}
          </ul>
          <div className="network__tiles">
            {NETWORK_TILES.map(([v, t]) => <div key={t}><div className="tile__num">{v}</div><div className="tile__label">{t}</div></div>)}
          </div>
        </div>
        <div ref={host} className="globe" aria-label="Interactive globe of G-TEC countries" role="img">
          <div className="globe__glow" />
          <div className="globe__label" aria-live="polite">{label}</div>
        </div>
      </div>
    </section>
  );
}
