const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'app', 'globals.css');
let css = fs.readFileSync(cssPath, 'utf8');

const markerHoriz = '/* ---- strategic ---- */';
const index = css.indexOf(markerHoriz);

if (index !== -1) {
  css = css.substring(0, index);
}

const newCss = `/* ---- strategic ---- */
.strategic-std {
  background: var(--deep);
  color: #fff;
  padding: 120px 0;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.strat-std-head {
  text-align: center;
  margin-bottom: 80px;
}
.strat-std-title {
  margin: 16px 0;
  background: linear-gradient(135deg, #fff, rgba(255,255,255,0.7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: clamp(36px, 5vw, 52px);
  letter-spacing: -0.02em;
}
.strat-std-lead {
  max-width: 600px;
  margin: 0 auto;
}

.strat-std-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  position: relative;
  z-index: 10;
}
@media (max-width: 1024px) {
  .strat-std-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .strat-std-grid { grid-template-columns: 1fr; }
}

.strat-std-card {
  position: relative;
  background: rgba(10, 20, 40, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 40px;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.4s;
  cursor: pointer;
  --x: 50%;
  --y: 50%;
}

.strat-std-card:hover {
  transform: translateY(-8px);
  border-color: rgba(72, 120, 255, 0.3);
}

.strat-std-card__spotlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    800px circle at var(--x) var(--y),
    rgba(72, 120, 255, 0.06),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.4s;
  z-index: 0;
  pointer-events: none;
}
.strat-std-card:hover .strat-std-card__spotlight {
  opacity: 1;
}

.strat-std-card__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3) 100%);
  z-index: 1;
  pointer-events: none;
}

.strat-std-card__content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 280px;
}

.strat-std-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
}

.strat-std-card__icon-box {
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(72,120,255,0.05);
  border: 1px solid rgba(72,120,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4878FF;
  transition: background 0.4s, color 0.4s;
}
.strat-std-card:hover .strat-std-card__icon-box {
  background: #4878FF;
  color: #fff;
}

.strat-std-card__num {
  font-family: var(--sora);
  font-size: 20px;
  font-weight: 700;
  color: rgba(255,255,255,0.15);
  transition: color 0.4s;
}
.strat-std-card:hover .strat-std-card__num {
  color: rgba(72,120,255,0.8);
}

.strat-std-card__bottom {
  margin-top: auto;
}

.strat-std-card__title {
  font-family: var(--sora);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #fff;
  line-height: 1.25;
}

.strat-std-card__desc {
  font-size: 15px;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
  margin-bottom: 32px;
}

.strat-std-card__action {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #4878FF;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.4s, transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.strat-std-card:hover .strat-std-card__action {
  opacity: 1;
  transform: translateY(0);
}
`;

fs.writeFileSync(cssPath, css + newCss, 'utf8');
console.log('CSS updated successfully');
