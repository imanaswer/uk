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
.strategic-acc {
  background: var(--deep);
  color: #fff;
  padding: 120px 0;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.acc-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 60px;
}
.acc-header .h2 { margin: 12px 0; }

.acc-container {
  display: flex;
  height: 600px;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  gap: 8px;
  padding: 0 24px;
}

.acc-item {
  position: relative;
  flex: 1;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  background: rgba(10, 25, 60, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: flex 0.7s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.4s;
  display: flex;
  align-items: center;
}

.acc-item.is-active {
  flex: 5;
  background: rgba(10, 25, 60, 0.8);
  border-color: rgba(255, 255, 255, 0.15);
}

.acc-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, rgba(0,0,0,0.4));
  z-index: 1;
}

.acc-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: var(--c-color);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  filter: blur(100px);
  opacity: 0;
  transition: opacity 0.7s;
  z-index: 0;
  pointer-events: none;
}
.acc-item.is-active .acc-glow {
  opacity: 0.15;
}

/* Vertical state */
.acc-vertical {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  z-index: 2;
  transition: opacity 0.4s, transform 0.6s;
}
.acc-item.is-active .acc-vertical {
  opacity: 0;
  transform: scale(0.9);
  pointer-events: none;
}
.acc-vertical-icon {
  color: rgba(255,255,255,0.4);
  transition: color 0.4s;
}
.acc-item:hover .acc-vertical-icon {
  color: var(--c-color);
}
.acc-vertical-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-family: var(--sora);
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.05em;
  white-space: nowrap;
  color: rgba(255,255,255,0.6);
}

/* Expanded state */
.acc-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  padding: 60px;
  gap: 60px;
  z-index: 3;
  opacity: 0;
  transform: translateX(40px);
  pointer-events: none;
  transition: opacity 0.4s, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: 0s;
}
.acc-item.is-active .acc-content {
  opacity: 1;
  transform: translateX(0);
  pointer-events: auto;
  transition-delay: 0.2s;
}

.acc-icon-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0));
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-color);
  flex: none;
  box-shadow: 0 0 40px rgba(0,0,0,0.5);
}

.acc-text-wrap {
  flex: 1;
  max-width: 500px;
}
.acc-title {
  font-family: var(--sora);
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 20px;
  color: #fff;
}
.acc-desc {
  font-size: 16px;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
  margin-bottom: 32px;
}
.acc-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--c-color);
  color: #fff;
  padding: 14px 28px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}
.acc-btn:hover {
  filter: brightness(1.2);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -10px var(--c-color);
}

/* Decorative */
.acc-deco-line {
  position: absolute;
  bottom: 0;
  left: 60px;
  right: 60px;
  height: 2px;
  background: linear-gradient(90deg, var(--c-color), transparent);
  opacity: 0.3;
}
.acc-deco-cross {
  position: absolute;
  top: 40px;
  right: 40px;
  display: flex;
  gap: 400px;
  color: rgba(255,255,255,0.2);
  font-family: monospace;
  font-size: 20px;
  pointer-events: none;
}

@media (max-width: 900px) {
  .acc-container {
    flex-direction: column;
    height: 800px;
  }
  .acc-item.is-active { flex: 3; }
  .acc-vertical {
    flex-direction: row;
  }
  .acc-vertical-text {
    writing-mode: horizontal-tb;
    transform: none;
  }
  .acc-content {
    flex-direction: column;
    padding: 30px;
    gap: 24px;
    text-align: center;
    transform: translateY(20px);
  }
  .acc-icon-wrapper {
    width: 80px;
    height: 80px;
  }
  .acc-item.is-active .acc-content { transform: translateY(0); }
  .acc-deco-line, .acc-deco-cross { display: none; }
}
`;

fs.writeFileSync(cssPath, css + newCss, 'utf8');
console.log('CSS updated successfully');
