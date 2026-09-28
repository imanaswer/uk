const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'app', 'globals.css');
let css = fs.readFileSync(cssPath, 'utf8');

const marker = '/* ---- strategic ---- */';
const strategicIndex = css.indexOf(marker);

if (strategicIndex !== -1) {
  css = css.substring(0, strategicIndex);
}

const newCss = `/* ---- strategic ---- */
.strategic {
  background: var(--deep);
  color: #fff;
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.strat-bg-grid {
  position: absolute;
  inset: -50%;
  background-image: 
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  transform: perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px);
  opacity: 0.3;
  pointer-events: none;
}
.strat-title {
  background: linear-gradient(135deg, #fff, #a0c0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 60px;
  font-size: clamp(32px, 5vw, 48px);
}
.strat-grid {
  display: grid;
  grid-template-columns: 1fr 300px 1fr;
  gap: 32px;
  align-items: center;
  position: relative;
  z-index: 10;
}
@media (max-width: 1024px) {
  .strat-grid { grid-template-columns: 1fr; gap: 80px; }
}

.strat-panel {
  position: relative;
  border-radius: 20px;
  background: rgba(10, 25, 60, 0.4);
  border: 1px solid rgba(72, 120, 255, 0.15);
  padding: 24px;
  backdrop-filter: blur(12px);
  margin-bottom: 24px;
  transform-style: preserve-3d;
  will-change: transform;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
  cursor: default;
}
.strat-panel:last-child { margin-bottom: 0; }
.strat-panel__glow {
  position: absolute;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(72,120,255,0.4), transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
  filter: blur(20px);
}

.strat-panel__content {
  display: flex;
  align-items: center;
  gap: 24px;
}
.strat-panel__content--left { text-align: right; justify-content: flex-end; }
.strat-panel__content--right { text-align: left; justify-content: flex-start; }

@media (max-width: 1024px) {
  .strat-panel__content { flex-direction: column !important; text-align: center !important; justify-content: center !important; }
}

.strat-panel__text { flex: 1; transform: translateZ(20px); }
.strat-panel__title {
  font-family: var(--sora);
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #fff;
  letter-spacing: 0.02em;
}
.strat-panel__desc {
  font-size: 14px;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
  margin: 0;
}
.strat-panel__icon-box {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(72,120,255,0.1), rgba(72,120,255,0.02));
  border: 1px solid rgba(72,120,255,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4878FF;
  position: relative;
  flex: none;
  box-shadow: inset 0 0 20px rgba(72,120,255,0.1);
  transform: translateZ(30px);
}

/* Connecting Beams */
.strat-connector {
  position: absolute;
  top: 50%;
  height: 2px;
  background: rgba(72,120,255,0.1);
  width: 100px;
  pointer-events: none;
  overflow: hidden;
}
.strat-connector--left { left: 100%; transform: translateY(-50%); }
.strat-connector--right { right: 100%; transform: translateY(-50%); }
.strat-connector-beam {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, #4878FF, transparent);
  animation: beamSlide 2s linear infinite;
}
.strat-connector--right .strat-connector-beam { animation-direction: reverse; }
@media (max-width: 1024px) {
  .strat-connector { display: none; }
}

@keyframes beamSlide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(200%); }
}

/* Glowing Orb */
.strat-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.strat-orb-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
}
.strat-orb {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: float 6s ease-in-out infinite;
}
.strat-orb-core {
  position: absolute;
  inset: 25%;
  background: radial-gradient(circle, #fff 0%, #4878FF 40%, transparent 80%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 60px rgba(72,120,255,0.6);
  z-index: 2;
}
.strat-orb-icon { color: #001432; }
.strat-orb-glow {
  position: absolute;
  inset: -20%;
  background: radial-gradient(circle, rgba(72,120,255,0.3) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
  filter: blur(30px);
  animation: pulseGlow 4s infinite alternate;
}
.strat-orb-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px solid rgba(72,120,255,0.3);
  box-shadow: 0 0 20px rgba(72,120,255,0.1) inset;
  z-index: 3;
}
.strat-orb-ring--1 { border: 2px dashed rgba(72,120,255,0.5); animation: orbitX 15s linear infinite; }
.strat-orb-ring--2 { inset: 8%; border-top: 2px solid #4878FF; animation: orbitY 20s linear infinite; }
.strat-orb-ring--3 { inset: 16%; border: 1px dotted rgba(255,255,255,0.5); animation: orbitZ 25s linear infinite; }
.strat-orb-ring--4 { inset: 35%; border: 2px solid rgba(72,120,255,0.8); box-shadow: 0 0 30px #4878FF; }

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
@keyframes pulseGlow {
  0% { transform: scale(0.8); opacity: 0.5; }
  100% { transform: scale(1.2); opacity: 0.8; }
}
@keyframes orbitX { 100% { transform: rotateX(360deg) rotateY(180deg); } }
@keyframes orbitY { 100% { transform: rotateY(360deg) rotateZ(180deg); } }
@keyframes orbitZ { 100% { transform: rotateZ(360deg) rotateX(180deg); } }

/* Features Bar */
.strat-features {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  margin-top: 100px;
  padding: 32px 48px;
  background: linear-gradient(90deg, rgba(255,255,255,0.01), rgba(255,255,255,0.04), rgba(255,255,255,0.01));
  border-top: 1px solid rgba(255,255,255,0.08);
  border-bottom: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(10px);
}
.strat-feature-badge {
  display: flex;
  align-items: center;
  gap: 16px;
  color: rgba(255,255,255,0.8);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
}
.strat-feature-badge__icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(72,120,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4878FF;
  box-shadow: 0 0 15px rgba(72,120,255,0.1) inset;
}
@media (max-width: 800px) {
  .strat-features { flex-direction: column; align-items: flex-start; }
}
`;

fs.writeFileSync(cssPath, css + newCss, 'utf8');
console.log('CSS updated successfully');
