const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'src', 'app', 'globals.css');
let css = fs.readFileSync(cssPath, 'utf8');

const markerAcc = '/* ---- strategic-acc ---- */';
const markerStrat = '/* ---- strategic ---- */';

let index = css.indexOf(markerAcc);
if (index === -1) index = css.indexOf(markerStrat);
if (index !== -1) {
  css = css.substring(0, index);
}

const newCss = `/* ---- strategic ---- */
.strategic-horizontal {
  background: var(--deep);
  color: #fff;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.h-sticky-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.h-track {
  display: flex;
  height: 100%;
  align-items: center;
  padding-left: 10vw;
}

.h-panel {
  flex: none;
  height: 60vh;
  min-height: 400px;
  display: flex;
  align-items: center;
}

.h-panel--intro {
  width: 40vw;
  min-width: 400px;
  padding-right: 100px;
}
.h-title {
  font-size: clamp(48px, 6vw, 80px);
  line-height: 1.1;
  margin: 20px 0;
  background: linear-gradient(135deg, #fff, #a0c0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.h-card {
  width: 35vw;
  min-width: 380px;
  max-width: 500px;
  padding: 0 20px;
}

.h-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 48px;
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: 0 30px 60px -20px rgba(0,0,0,0.5);
  background: rgba(10, 25, 60, 0.4);
}

.h-card__bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(72,120,255,0.15) 100%);
  z-index: 0;
}

.h-card__num {
  position: absolute;
  top: 20px;
  right: 40px;
  font-family: var(--sora);
  font-size: 140px;
  font-weight: 900;
  color: rgba(255,255,255,0.03);
  line-height: 1;
  z-index: 0;
  pointer-events: none;
}

.h-card__content {
  position: relative;
  z-index: 10;
}

.h-card__icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: rgba(72,120,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4878FF;
  margin-bottom: 32px;
  border: 1px solid rgba(72,120,255,0.2);
}

.h-card__title {
  font-family: var(--sora);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #fff;
  line-height: 1.2;
}

.h-card__desc {
  font-size: 16px;
  color: rgba(255,255,255,0.6);
  line-height: 1.6;
  margin: 0;
}

.h-panel--outro {
  width: 20vw;
}

/* Mobile Fallback */
@media (max-width: 800px) {
  .strategic-horizontal {
    padding: 100px 0;
  }
  .h-sticky-wrapper {
    height: auto;
    overflow: visible;
  }
  .h-track {
    flex-direction: column;
    padding: 0 24px;
    width: 100%;
  }
  .h-panel {
    width: 100%;
    min-width: 100%;
    height: auto;
    min-height: auto;
    padding: 0;
    margin-bottom: 40px;
  }
  .h-panel--intro {
    padding-right: 0;
  }
  .h-card__inner {
    padding: 32px;
    height: auto;
  }
  .h-card__num {
    font-size: 80px;
    top: 10px;
    right: 20px;
  }
  .h-panel--outro { display: none; }
}
`;

fs.writeFileSync(cssPath, css + newCss, 'utf8');
console.log('CSS updated successfully');
