/* ==========================================================================
   app.js — 原型全局脚本
   职责：
     1. 工具函数（渲染 / 图片回退 / 语言分布条）
     2. 滚动入场（§4.3：所有区块，不重复）
     3. 鼠标坐标层（§5.1：仅首屏，局部短线，黄点，坐标读数）
     4. 主视觉粒子 + 视差（§5.4：漂浮粒子 + 鼠标排斥 + 视差位移）
   无依赖。原生 JS。
   ========================================================================== */
(function () {
  'use strict';

  const SITE = window.SITE || { projects: [] };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* ── 工具 ─────────────────────────────────────────────────────────── */
  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const LANG_COLORS = {
    HTML: '#E34C26', CSS: '#2965F1', JavaScript: '#F1E05A', TypeScript: '#3178C6',
    Python: '#3572A5', TSQL: '#E38C00', Vue: '#41B883', Shell: '#89E051',
    Java: '#B07219', 'C#': '#178600', Go: '#00ADD8', Rust: '#DEA584',
  };
  const langColor = (n) => LANG_COLORS[n] || '#8A8A8A';

  /* 封面：README 首图，否则回退到默认图 */
  const coverOf = (p) => p.cover || 'media/default-cover.png';

  /* 语言分布条 HTML */
  function langBarHtml(langs) {
    if (!langs || !langs.length) return '';
    return `<span class="langbar">${langs.map((l) =>
      `<i style="width:${l.pct}%;background:${langColor(l.name)}" title="${esc(l.name)} ${l.pct}%"></i>`
    ).join('')}</span>`;
  }

  /* 作品卡 HTML */
  function cardHtml(p, opts = {}) {
    const zh = opts.zh !== false;
    const blocks = ['yellow', 'blue', 'orange', 'red'];
    const blk = blocks[opts.blockIndex % 4];
    /* 撞色块位置按索引变化，避免四张卡完全一样 */
    const blkPos = [
      'left:0;right:58%;bottom:16%;height:26%;',
      'left:52%;right:6%;top:12%;height:22%;',
      'left:8%;right:44%;top:10%;height:20%;',
      'left:46%;right:0;bottom:12%;height:24%;',
    ][opts.blockIndex % 4];

    return `
    <a class="card" href="work-detail.html?slug=${encodeURIComponent(p.slug)}">
      <div class="card__media">
        <img src="${esc(coverOf(p))}" alt="${esc(p.title)} 封面" loading="lazy">
        <span class="card__block card__block--${blk}" style="${blkPos}"></span>
        ${p.isEmpty ? '<span class="card__tag chip chip--solid">IN PROGRESS</span>' : ''}
        ${p.coverSource === 'fallback' && !p.isEmpty ? '<span class="card__tag chip">NO COVER</span>' : ''}
      </div>
      <div class="card__body">
        <div class="card__line">
          <span class="card__name">${esc(p.name)}${zh ? `<small>${esc(p.title)}</small>` : ''}</span>
          <span class="card__year">${esc((p.updated || '').slice(0, 4) || '—')}</span>
        </div>
        <div class="card__meta">
          <span class="mono mono--sm" style="color:var(--ink-70)">${esc(p.language || 'PROJECT')}</span>
          <span class="arrow" aria-hidden="true">→</span>
        </div>
        ${langBarHtml(p.languages)}
      </div>
    </a>`;
  }

  window.PROTO = { $, $$, esc, SITE, cardHtml, coverOf, langBarHtml, langColor, reduceMotion, isTouch };

  /* ══ 1. 滚动入场（所有区块，不重复） ═══════════════════════════════ */
  function initReveal() {
    const items = $$('.reveal');
    if (!items.length) return;
    if (reduceMotion) { items.forEach((el) => el.classList.add('is-in')); return; }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);           // 不重复
        }
      });
    }, { rootMargin: '0px 0px -20% 0px', threshold: 0.01 });

    items.forEach((el) => io.observe(el));
  }

  /* ══ 2. 鼠标坐标层（仅首屏） ═══════════════════════════════════════ */
  function initCoordLayer() {
    if (isTouch || reduceMotion) return;

    const host = $('[data-coord-host]');
    if (!host) return;

    const layer = document.createElement('div');
    layer.className = 'coord-layer';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML =
      '<div class="coord-layer__grid"></div>' +
      '<div class="coord-layer__x"></div>' +
      '<div class="coord-layer__y"></div>' +
      '<div class="coord-layer__dot"></div>' +
      '<div class="coord-layer__readout">X 0000 Y 0000</div>';
    document.body.appendChild(layer);

    const gx = $('.coord-layer__x', layer);
    const gy = $('.coord-layer__y', layer);
    const dot = $('.coord-layer__dot', layer);
    const readout = $('.coord-layer__readout', layer);
    const SPAN = 200;                       // 局部短线：各延伸约 200px

    let mx = 0, my = 0, raf = null, inside = false;

    function render() {
      raf = null;
      gx.style.transform = `translate(${mx - SPAN}px, ${my}px)`;
      gy.style.transform = `translate(${mx}px, ${my - SPAN}px)`;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      readout.style.transform = `translate(${mx}px, ${my}px) translate(16px,-34px)`;
      readout.textContent = `X ${String(mx).padStart(4, '0')} Y ${String(my).padStart(4, '0')}`;

      /* 移到图片上时读数框反白 */
      const el = document.elementFromPoint(mx, my);
      const onImg = !!(el && el.closest('img, .card__media, .hero__art, .splash__art'));
      readout.classList.toggle('is-inverted', onImg);
    }

    function onMove(e) {
      mx = e.clientX; my = e.clientY;
      if (raf === null) raf = requestAnimationFrame(render);
    }

    /* 只在首屏区域内启用 */
    function check() {
      const r = host.getBoundingClientRect();
      const on = r.bottom > 120 && r.top < window.innerHeight - 120;
      if (on !== inside) {
        inside = on;
        layer.classList.toggle('is-on', on);
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    check();
  }

  /* ══ 3. 主视觉：粒子 + 视差 ════════════════════════════════════════ */
  function initHero(host) {
    if (!host || reduceMotion) return;

    const art = $('.hero__art img', host) || $('img', host);
    const canvas = $('.hero__canvas', host);

    /* ── 视差：图片随鼠标反向小幅位移（±12px），lerp 平滑 ── */
    if (art && !isTouch) {
      let tx = 0, ty = 0, cx = 0, cy = 0, running = false;

      const tick = () => {
        cx += (tx - cx) * 0.08;
        cy += (ty - cy) * 0.08;
        art.style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
        if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
          requestAnimationFrame(tick);
        } else { running = false; }
      };
      const kick = () => { if (!running) { running = true; requestAnimationFrame(tick); } };

      host.addEventListener('mousemove', (e) => {
        const r = host.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width - 0.5) * -24;   // ±12px
        ty = ((e.clientY - r.top) / r.height - 0.5) * -24;
        kick();
      }, { passive: true });
      host.addEventListener('mouseleave', () => { tx = 0; ty = 0; kick(); });
    }

    /* ── 粒子：极淡小方块/小十字，鼠标 120px 内被推开 ── */
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = 0, H = 0, dpr = 1, parts = [];
    const mouse = { x: -9999, y: -9999 };
    const REPEL = 120;

    function resize() {
      const r = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function build() {
      const n = W < 700 ? 22 : W < 1200 ? 40 : 58;
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        hx: 0, hy: 0,                       // 家位置
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        s: 1.6 + Math.random() * 2.2,
        cross: Math.random() < 0.28,        // 少数画成小十字
      }));
      parts.forEach((p) => { p.hx = p.x; p.hy = p.y; });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      for (const p of parts) {
        /* 漂浮 */
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        /* 鼠标排斥 */
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < REPEL && d > 0.01) {
          const f = (1 - d / REPEL) * 1.5;
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        } else {
          /* 缓慢回归原轨迹 */
          p.x += (p.hx - p.x) * 0.004;
          p.y += (p.hy - p.y) * 0.004;
        }

        ctx.fillStyle = p.cross ? 'rgba(13,13,13,0.16)' : 'rgba(13,13,13,0.13)';
        if (p.cross) {
          const s = p.s + 1.4;
          ctx.fillRect(p.x - s / 2, p.y - 0.5, s, 1);
          ctx.fillRect(p.x - 0.5, p.y - s / 2, 1, s);
        } else {
          ctx.fillRect(p.x, p.y, p.s, p.s);
        }
      }
      raf = requestAnimationFrame(draw);
    }

    let raf = null;
    let visible = true;

    host.addEventListener('mousemove', (e) => {
      const r = host.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    }, { passive: true });
    host.addEventListener('mouseleave', () => { mouse.x = mouse.y = -9999; });

    /* 页面不可见时暂停渲染，省电 */
    document.addEventListener('visibilitychange', () => {
      visible = !document.hidden;
      if (visible && raf === null) raf = requestAnimationFrame(draw);
      if (!visible && raf !== null) { cancelAnimationFrame(raf); raf = null; }
    });

    window.addEventListener('resize', resize);
    resize();
    raf = requestAnimationFrame(draw);
  }

  /* ══ 启动 ═════════════════════════════════════════════════════════ */
  function boot() {
    initReveal();
    initCoordLayer();
    const hero = $('[data-hero]');
    if (hero) initHero(hero);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else boot();
})();
