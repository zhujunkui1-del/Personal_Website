/* ==========================================================================
   data.js — 作品数据
   ⚠️ 原型阶段：这份数据是【手动抓取后写死】的静态文件
   正式工程应由 /api/works 从 GitHub API 动态获取（结构保持一致）
   抓取时间：2026-09-12
   ========================================================================== */

window.SITE = {
  user: 'zhujunkui1-del',
  userUrl: 'https://github.com/zhujunkui1-del',
  name: { zh: '不登校', en: 'FUDOKOU' },
  tagline: 'BUILDING USEFUL THINGS WITH CODE',
  contact: {
    github:   'https://github.com/zhujunkui1-del/',
    bilibili: 'https://space.bilibili.com/131583045',
    email:    '3287390083@qq.com',
  },
  projects: [
  {
    "slug": "zhihu-zhiyu",
    "repo": "Zhihu_ZhiYu",
    "name": "Zhihu_ZhiYu",
    "title": "知遇ZhiYu｜在你认识一个人之前，让 Agent 先认识 TA",
    "description": "🧠 知遇ZhiYu｜在你认识一个人之前，让 Agent 先认识 TA",
    "url": "https://github.com/zhujunkui1-del/Zhihu_ZhiYu",
    "homepage": "",
    "branch": "master",
    "language": "HTML",
    "languages": [
      {
        "name": "HTML",
        "pct": 81.3
      },
      {
        "name": "TypeScript",
        "pct": 15.5
      },
      {
        "name": "CSS",
        "pct": 2.2
      },
      {
        "name": "JavaScript",
        "pct": 1
      }
    ],
    "updated": "2026-09-11",
    "created": "2026-09-02",
    "sizeKB": 95042,
    "stars": 1,
    "topics": [],
    "cover": null,
    "coverSource": "fallback",
    "images": [],
    "readmeHTML": "",
    "readmeChars": 0,
    "isEmpty": true
  },
  {
    "slug": "intelligent-service-assistant",
    "repo": "Intelligent-Service-Assistant",
    "name": "Intelligent-Service-Assistant",
    "title": "企业知识与智能服务助手",
    "description": "企业知识与智能服务助手",
    "url": "https://github.com/zhujunkui1-del/Intelligent-Service-Assistant",
    "homepage": "",
    "branch": "master",
    "language": "Python",
    "languages": [
      {
        "name": "Python",
        "pct": 100
      }
    ],
    "updated": "2026-08-14",
    "created": "2026-08-12",
    "sizeKB": 11058,
    "stars": 1,
    "topics": [],
    "cover": "https://raw.githubusercontent.com/zhujunkui1-del/Intelligent-Service-Assistant/master/%E7%B4%A0%E6%9D%90/show.png",
    "coverSource": "readme",
    "images": [
      "https://raw.githubusercontent.com/zhujunkui1-del/Intelligent-Service-Assistant/master/%E7%B4%A0%E6%9D%90/show.png"
    ],
    "readmeHTML": "<h1>氢璞创能 · 企业知识与智能服务助手🤖</h1>\n<p>基于本地稀疏检索与 LLM 的 RAG 企业知识库问答系统。知识来源包括氢璞创能的产品资料、企业宣传册和官网新闻。 <img src=\"https://raw.githubusercontent.com/zhujunkui1-del/Intelligent-Service-Assistant/master/素材/show.png\" alt=\"demo\" loading=\"lazy\"></p>\n<h2>功能💻</h2>\n<ul>\n<li>启动时自动读取三份 Markdown 资料并构建本地知识库。</li>\n<li>后台抓取官网新闻，新闻片段附带标题、日期和来源 URL。</li>\n<li>支持 DeepSeek 与 OpenAI 双提供商切换。</li>\n<li>型号、参数、大事记、合作伙伴、新闻出处等查询有定向检索增强。</li>\n<li>不依赖外部 Embedding API，启动和检索速度快。</li>\n</ul>\n<h2>技术栈🚀</h2>\n<ul>\n<li>Streamlit：页面与聊天交互</li>\n<li>OpenAI SDK：兼容 DeepSeek <code>deepseek-chat</code> 和 OpenAI <code>gpt-4o-mini</code></li>\n<li>scikit-learn：TF-IDF 字符级特征与余弦相似度检索</li>\n<li>requests + BeautifulSoup：官网新闻抓取</li>\n</ul>\n<h2>本地运行⚙️</h2>\n<pre><code>cd ./Intelligent Service Assistant\npython -m pip install -r requirements.txt\npython -m streamlit run app.py</code></pre>\n<p>打开终端提供的本地网址，在侧边栏选择 LLM 提供商并输入 API Key。知识库会自动初始化，官网抓取在后台执行，不阻塞首屏提问。</p>\n<h2>知识库来源📕</h2>\n<ul>\n<li><code>01 氢璞2025产品单页（1023）校正稿.md</code></li>\n<li><code>02（已压缩）氢璞2025宣传册（0905）-解决方案全.md</code></li>\n<li><code>03 氢璞创能氢能产业商机.md</code></li>\n<li>氢璞创能官网首页、新闻中心及有效新闻文章页</li>\n</ul>\n<p>官网不可访问时会静默回退到本地 Markdown 知识库，不影响基础问答。</p>\n<h2>测试🧪</h2>\n<pre><code>python test_kb.py\npython test_kb.py --crawl\npython test_kb.py --crawl --with-llm</code></pre>\n<ul>\n<li>默认运行 10 条本地检索断言。</li>\n<li><code>--crawl</code> 额外测试官网新闻检索。</li>\n<li><code>--with-llm</code> 在检测到有效 <code>DEEPSEEK_API_KEY</code> 后运行真实 LLM 回答测试。</li>\n</ul>\n<h2>项目结构⬜</h2>\n<pre><code>Intelligent Service Assistant/\n├── app.py                 # Streamlit 主程序\n├── kb_engine.py           # Markdown 解析、TF-IDF 检索、官网抓取\n├── test_kb.py             # 自测脚本\n├── requirements.txt       # Python 依赖\n├── README.md\n├── .gitignore\n├── .streamlit/config.toml\n├── 素材/\n├── 01 氢璞2025产品单页（1023）校正稿.md\n├── 02（已压缩）氢璞2025宣传册（0905）-解决方案全.md\n└── 03 氢璞创能氢能产业商机.md</code></pre>\n<h2>项目网站</h2>\n<p>该项目已在Streamlit上线：https://intelligent-service-assistant-ajekavvfmxgzqdqzybnf9n.streamlit.app/</p>",
    "readmeChars": 1485,
    "isEmpty": false
  },
  {
    "slug": "dagou-game",
    "repo": "Dagou_Game",
    "name": "Dagou_Game",
    "title": "唉，大狗？哒哒哒哒哒，好想叫大狗叫叫叫",
    "description": "唉，大狗？哒哒哒哒哒，好想叫大狗叫叫叫",
    "url": "https://github.com/zhujunkui1-del/Dagou_Game",
    "homepage": "",
    "branch": "main",
    "language": "HTML",
    "languages": [
      {
        "name": "HTML",
        "pct": 100
      }
    ],
    "updated": "2026-08-07",
    "created": "2026-07-29",
    "sizeKB": 3871,
    "stars": 1,
    "topics": [],
    "cover": "https://raw.githubusercontent.com/zhujunkui1-del/Dagou_Game/main/%E7%B4%A0%E6%9D%90/dagou.png",
    "coverSource": "readme",
    "images": [
      "https://raw.githubusercontent.com/zhujunkui1-del/Dagou_Game/main/%E7%B4%A0%E6%9D%90/dagou.png"
    ],
    "readmeHTML": "<h1>唉？大狗？</h1>\n<p>大狗大狗大狗大狗大狗大狗大狗到底叫不叫？ 叫——————————  </p>\n<p><img src=\"https://raw.githubusercontent.com/zhujunkui1-del/Dagou_Game/main/素材/dagou.png\" alt=\"dagou.png\" loading=\"lazy\"></p>\n<h2>玩法  </h2>\n<ol>\n<li>点击开始屏幕进入游戏，BGM 自动播放  </li>\n<li>反复点击大狗，进度条 +1，大狗逐渐变红  </li>\n<li>若 5 秒不点，进度条自动衰减  </li>\n<li>攒满 20/20 时大狗爆发  </li>\n<li>右上角音符按钮可开关 BGM  </li>\n</ol>\n<h2>运行  </h2>\n<p>直接用浏览器打开 index.html 即可  </p>\n<h2>技术  </h2>\n<ul>\n<li>纯前端单文件 HTML + CSS + JavaScript  </li>\n<li>Canvas 粒子特效  </li>\n<li>Web Audio API 音频管理  </li>\n<li>requestAnimationFrame 平滑动画  </li>\n</ul>\n<h2>License  </h2>\n<p>仅供个人娱乐使用。</p>",
    "readmeChars": 386,
    "isEmpty": false
  },
  {
    "slug": "student-dormitory-management-system",
    "repo": "Student-Dormitory-Management-System",
    "name": "Student-Dormitory-Management-System",
    "title": "基于Node.js + Express + SQL Server + HTML/CSS/JS技术栈开发的学生宿舍管理系统",
    "description": "基于Node.js + Express + SQL Server + HTML/CSS/JS技术栈开发的学生宿舍管理系统",
    "url": "https://github.com/zhujunkui1-del/Student-Dormitory-Management-System",
    "homepage": "",
    "branch": "main",
    "language": "JavaScript",
    "languages": [
      {
        "name": "JavaScript",
        "pct": 76.5
      },
      {
        "name": "CSS",
        "pct": 8.5
      },
      {
        "name": "TSQL",
        "pct": 7.5
      },
      {
        "name": "HTML",
        "pct": 4.4
      }
    ],
    "updated": "2026-09-12",
    "created": "2026-06-16",
    "sizeKB": 99,
    "stars": 1,
    "topics": [],
    "cover": null,
    "coverSource": "fallback",
    "images": [],
    "readmeHTML": "<h1>宿舍管理系统</h1>\n<p>基于 Node.js + Python + SQL Server 的高校宿舍管理 Web 系统，支持楼栋管理、宿舍分配、报修、访客登记、卫生检查等功能。</p>\n<h2>技术栈</h2>\n<table><thead><tr><th>层</th><th>技术</th></tr></thead><tbody>\n<tr><td>前端</td><td>HTML + CSS + JavaScript</td></tr>\n<tr><td>后端</td><td>Node.js (Express)</td></tr>\n<tr><td>数据库桥接</td><td>Python (pyodbc)</td></tr>\n<tr><td>数据库</td><td>SQL Server</td></tr>\n</tbody></table>\n<h2>快速开始</h2>\n<h3>1. 环境要求</h3>\n<ul>\n<li>Node.js（推荐 v18+）</li>\n<li>Python（推荐 3.8+）</li>\n<li>SQL Server（Express 版即可）</li>\n<li>ODBC Driver 18 for SQL Server</li>\n</ul>\n<h3>2. 初始化数据库</h3>\n<p>用 sqlcmd 执行建库脚本：</p>\n<pre><code>sqlcmd -S \"localhost\" -C -i \"数据库/宿舍.sql\"</code></pre>\n<blockquote><p>如果你的 SQL Server 是命名实例，把 <code>localhost</code> 改成 <code>localhost\\SQLEXPRESS</code>。</p></blockquote>\n<h3>3. 启动系统</h3>\n<p>双击 <code>start.bat</code>，脚本会自动检查环境、安装依赖、打开浏览器访问 <code>http://localhost:3456</code>。</p>\n<h2>项目结构</h2>\n<pre><code>.../\n├── server.js          # Express 后端主程序\n├── db.js              # Node.js Python 数据库桥接\n├── db_bridge.py       # Python 数据库连接桥\n├── start.bat          # 一键启动脚本\n├── package.json       # npm 依赖清单\n├── public/\n&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD\n│   ├── index.html     # 前端主页面\n│   ├── css/style.css  # 样式\n│   └── js/app.js      # 前端逻辑\n├── 数据库/\n│   └── 宿舍.sql       # 建库建表 + 初始数据\n├── ER图/              # 数据库设计文档\n└── 文档/              # 项目报告\n=======\n    ├── index.html     # 前端主页面\n    ├── css/style.css  # 样式\n    └── js/app.js      # 前端逻辑\n\n&gt;&gt;&gt;&gt;&gt;&gt;&gt; 935fc83ccbfe2bcbda3de0d75705a6bde0968148</code></pre>\n<h2>功能模块</h2>\n<ul>\n<li>登录：学生 / 管理员两种角色</li>\n<li>楼栋管理：增删改查</li>\n<li>宿舍管理：按楼栋查看，分配床位</li>\n<li>学生管理：入住 / 调换 / 退宿</li>\n<li>报修管理：提交报修 处理 评价</li>\n<li>访客登记：登记 审核 结束</li>\n<li>卫生检查：评分（A/B/C/D）</li>\n<li>统计面板：入住率、待处理事项概览</li>\n</ul>\n<h2>常见问题</h2>\n<h3>1. 启动后网页提示 \"failed to fetch\" / 登录失败</h3>\n<p>原因：数据库连接不上，通常是 SQL Server 实例名不匹配。</p>\n<p>解决：打开 <code>db_bridge.py</code>，检查第 6 行 <code>SERVER=</code> 的值，改为正确的实例名（如 <code>localhost\\SQLEXPRESS</code>），重启 <code>start.bat</code>。</p>\n<h3>2. 提示 \"Python bridge closed\" / 服务启动后立即退出</h3>\n<p>原因：<code>db.js</code> 中硬编码的 Python 路径在新电脑上不存在。</p>\n<p>解决：打开 <code>db.js</code>，把第 4 行改成 <code>const PYTHON = \"python\";</code></p>\n<h3>3. sqlcmd 无法连接 SQL Server</h3>\n<p>原因：SQL Server 未启用 TCP/IP 或防火墙阻挡。</p>\n<p>解决：</p>\n<ol>\n<li>打开 SQL Server 配置管理器 SQL Server 网络配置 启用 TCP/IP</li>\n<li>重启 SQL Server 服务</li>\n<li>防火墙开放 1433 端口</li>\n</ol>\n<h3>4. pyodbc 连接报错 \"命名管道提供程序: 无法打开与 SQL Server 的连接\"</h3>\n<p>原因：实例名错误。默认实例用 <code>localhost</code>，命名实例必须写 <code>localhost\\实例名</code>。</p>\n<p>解决：用 Get-Service | Where-Object {$_.Name -like '<em>SQL</em>'} 确认实例名。</p>\n<h2>注意事项</h2>\n<ul>\n<li>首次启动时 start.bat 会执行 npm install 和 pip install pyodbc，需要联网</li>\n<li>从旧电脑拷贝到新电脑时，务必检查 db.js 和 db_bridge.py 中的路径和连接配置</li>\n<li>数据库使用 Windows 认证，需当前 Windows 用户有 SQL Server 访问权限</li>\n</ul>\n<h2>许可证</h2>\n<p>仅供学习用途。</p>\n<p>=======</p>\n<p>---------------------------------------------------------------------------</p>\n<h2>2026/06/17</h2>\n<h2>修改摘要</h2>\n<h3>修复</h3>\n<ul>\n<li>db.js: 数据库错误不再静默吞没，修复假报\"操作成功\"的 bug</li>\n<li>server.js: 学生删除时先清理关联记录(allocation/visitor/repair)，解决外键冲突</li>\n<li>server.js: 分配记录按 allocation_id 降序排列，新增楼栋/宿舍筛选接口</li>\n<li>触发器: 新增自动安装+DELETE处理，学生入住/调换/休学/退宿/删除均实时更新宿舍人数</li>\n</ul>\n<h3>新增</h3>\n<ul>\n<li>server.js: 男女分宿校验，男生不能入住女生楼，反之亦然</li>\n<li>server.js: 卫生检查支持 problem_photo 字段</li>\n<li>server.js: 每次启动自动安装触发器 + 修正宿舍人数</li>\n<li>app.js: 卫生检查表格增加照片列、弹窗增加照片输入框</li>\n<li>app.js: 分配记录页面增加楼栋</li>\n</ul>",
    "readmeChars": 2606,
    "isEmpty": false
  },
  {
    "slug": "guangdong-weather",
    "repo": "Guangdong-Weather-",
    "name": "Guangdong-Weather-",
    "title": "基于调用https://wttr.in/来实时获取广东地区的天气情况，本项目使用codex制作。",
    "description": "基于调用https://wttr.in/来实时获取广东地区的天气情况，本项目使用codex制作。",
    "url": "https://github.com/zhujunkui1-del/Guangdong-Weather-",
    "homepage": "",
    "branch": "main",
    "language": "Python",
    "languages": [
      {
        "name": "Python",
        "pct": 100
      }
    ],
    "updated": "2026-05-31",
    "created": "2026-05-31",
    "sizeKB": 23,
    "stars": 0,
    "topics": [],
    "cover": null,
    "coverSource": "fallback",
    "images": [],
    "readmeHTML": "<ol>\n<li>程序内可中英文切换</li>\n<li>可选择每隔一分钟即获取当地实时天气情况，也可以手动点击获取按钮</li>\n<li>可选择获取某个广东省内的具体城市</li>\n</ol>",
    "readmeChars": 67,
    "isEmpty": false
  }
],
};

/* 导出给模块化场景（原型里用不到，正式工程会用到） */
if (typeof module !== 'undefined') module.exports = window.SITE;
