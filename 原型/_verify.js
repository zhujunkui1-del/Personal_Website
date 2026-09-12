/**
 * 原型结构校验：检查 HTML 里的静态结构 + 所有本地引用是否可访问
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BASE = 'http://127.0.0.1:8099';

const PAGES = ['index.html', 'home.html', 'work.html', 'work-detail.html'];
let problems = 0;

/* ── 1. 静态结构校验 ─────────────────────────────────────────────── */
console.log('═'.repeat(74));
console.log('1. 页面静态结构');
console.log('═'.repeat(74));

const EXPECT = [
  ['sidebar',        'class="sidebar"'],
  ['nav 六项',        'nav__item'],
  ['aria-current',   'aria-current="page"'],
  ['topbar',         'class="topbar"'],
  ['footer',         'class="footer"'],
  ['tokens.css',     'assets/tokens.css'],
  ['base.css',       'assets/base.css'],
  ['components.css', 'assets/components.css'],
  ['pages.css',      'assets/pages.css'],
  ['data.js',        'assets/data.js'],
  ['app.js',         'assets/app.js'],
];

for (const page of PAGES) {
  const p = path.join(ROOT, page);
  if (!fs.existsSync(p)) { console.log(`  ✗ ${page} 不存在`); problems++; continue; }
  const html = fs.readFileSync(p, 'utf8');

  const navCount = (html.match(/class="nav__item"/g) || []).length;
  const missing = EXPECT.filter(([, needle]) => !html.includes(needle)).map(([label]) => label);
  const cur = /aria-current="page"/.test(html);

  console.log(
    `  ${missing.length ? '✗' : '✓'} ${page.padEnd(18)}` +
    ` nav项:${navCount}  当前项:${cur ? '有' : '无'}  ` +
    (missing.length ? `缺: ${missing.join(', ')}` : '结构完整')
  );
  if (missing.length) problems++;
  if (navCount !== 6) { console.log(`      ⚠ nav 项数应为 6，实际 ${navCount}`); problems++; }
}

/* ── 2. 本地资源引用可访问性 ─────────────────────────────────────── */
console.log();
console.log('═'.repeat(74));
console.log('2. 本地资源引用');
console.log('═'.repeat(74));

const refs = new Set();
for (const page of PAGES) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const v = m[1];
    // 跳过外链、锚点、mailto，以及 JS 模板拼接产生的伪引用
    if (/^(https?:|mailto:|#|data:)/.test(v)) continue;
    if (/['+`]/.test(v)) continue;
    if (v === 'assets/data.js') continue;
    refs.add(v);
  }
}
// 补上 JS 里引用的图片
refs.add('media/default-cover.png');
refs.add('media/audio/track-01-cover.jpg');

/* 本阶段尚未做的页面（导航已连向它们，第二步补齐） */
const PENDING = new Set(['about.html', 'articles.html', 'notes.html', 'guestbook.html']);

for (const ref of [...refs].sort()) {
  const file = path.join(ROOT, ref);
  const ok = fs.existsSync(file);
  const pending = PENDING.has(ref);
  const kb = ok ? (fs.statSync(file).size / 1024).toFixed(0) + ' KB' : '—';
  if (!ok && !pending) problems++;
  console.log(`  ${ok ? '✓' : pending ? '○' : '✗'} ${ref.padEnd(34)} ${ok ? kb : pending ? '本阶段未做（第二步补齐）' : '缺失'}`);
}
/* ── 3. 内部页面链接 ────────────────────────────────────────────── */
console.log();
console.log('═'.repeat(74));
console.log('3. 内部页面链接');
console.log('═'.repeat(74));

const links = new Set();
for (const page of PAGES) {
  const html = fs.readFileSync(path.join(ROOT, page), 'utf8');
  for (const m of html.matchAll(/href="([a-z-]+\.html)(?:\?[^"]*)?"/g)) links.add(m[1]);
}
for (const l of [...links].sort()) {
  const ok = fs.existsSync(path.join(ROOT, l));
  if (!ok && !PENDING.has(l)) problems++;
  console.log(`  ${ok ? '✓' : '○'} ${l.padEnd(24)} ${ok ? '存在' : '本阶段未做（第二步补齐）'}`);
}

/* ── 4. 结果 ────────────────────────────────────────────────────── */
console.log();
console.log('═'.repeat(74));
console.log(problems === 0 ? '✓ 校验通过，无阻塞问题' : `✗ 发现 ${problems} 处问题`);
console.log('═'.repeat(74));
