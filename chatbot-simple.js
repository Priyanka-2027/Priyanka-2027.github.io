(function () {

    // ── Data ──────────────────────────────────────────────────
    var DATA = {
        name: "Priyanka Jakkampudi",
        role: "Full Stack Developer & AI/ML Enthusiast",
        education: "B.Tech Computer Science @ SRM University AP",
        email: "priyanka.jakkampudi3@gmail.com",
        github: "https://github.com/Priyanka-2027",
        linkedin: "https://www.linkedin.com/in/priyanka-jakkampudi-222911323",
        leetcode: "https://leetcode.com/u/wtyBysvV3o/",
        resume: "resume.pdf"
    };

    var isOpen = false;
    var isTyping = false;

    // ── Inject HTML ───────────────────────────────────────────
    function inject() {
        var div = document.createElement('div');
        div.innerHTML = [
            '<div id="cb-wrap" style="position:fixed;bottom:2rem;right:2rem;z-index:99999;font-family:Inter,sans-serif">',

            // Button
            '<button id="cb-btn" style="',
                'width:64px;height:64px;border-radius:50%;border:none;cursor:pointer;',
                'background:linear-gradient(135deg,#00d4ff,#a855f7);',
                'box-shadow:0 8px 25px rgba(0,212,255,0.4);',
                'display:flex;align-items:center;justify-content:center;',
                'position:relative;transition:transform .2s,box-shadow .2s;',
                'animation:cbFloat 3s ease-in-out infinite;">',

                // Robot SVG
                '<svg viewBox="0 0 80 80" width="38" height="38">',
                    // head
                    '<rect x="22" y="22" width="36" height="28" rx="12" fill="#f0f0f0"/>',
                    // visor
                    '<rect x="26" y="28" width="28" height="14" rx="7" fill="#1a1a2e"/>',
                    // eyes
                    '<rect x="30" y="32" width="5" height="5" rx="2.5" fill="#00d4ff" class="cb-eye"/>',
                    '<rect x="45" y="32" width="5" height="5" rx="2.5" fill="#00d4ff" class="cb-eye"/>',
                    // mouth
                    '<rect x="35" y="44" width="10" height="2.5" rx="1.25" fill="#555"/>',
                    // antennas
                    '<rect x="31" y="14" width="2.5" height="10" rx="1.25" fill="#ff6b6b"/>',
                    '<rect x="46.5" y="14" width="2.5" height="10" rx="1.25" fill="#ff6b6b"/>',
                    '<circle cx="32.25" cy="12" r="3" fill="#ff6b6b" class="cb-ant"/>',
                    '<circle cx="47.75" cy="12" r="3" fill="#ff6b6b" class="cb-ant"/>',
                    // body
                    '<rect x="26" y="50" width="28" height="20" rx="9" fill="#f0f0f0"/>',
                    '<rect x="30" y="55" width="20" height="9" rx="4" fill="#e0e0e0"/>',
                    '<circle cx="40" cy="59.5" r="2.5" fill="#4ecdc4" class="cb-light"/>',
                    '<rect x="22" y="53" width="3.5" height="9" rx="1.75" fill="#ff6b6b"/>',
                    '<rect x="54.5" y="53" width="3.5" height="9" rx="1.75" fill="#ff6b6b"/>',
                '</svg>',

                '<div id="cb-badge" style="display:none;"></div>',
            '</button>',

            // Chat window (hidden by default)
            '<div id="cb-win" style="',
                'display:none;',
                'position:absolute;bottom:76px;right:0;',
                'width:360px;height:490px;',
                'border-radius:16px;overflow:hidden;',
                'box-shadow:0 20px 60px rgba(0,0,0,0.3);',
                'flex-direction:column;',
                'background:var(--bg-card,#0d0d1a);',
                'border:1px solid rgba(255,255,255,0.1);">',

                // Header
                '<div style="',
                    'background:linear-gradient(135deg,#00d4ff,#a855f7);',
                    'padding:10px 14px;display:flex;align-items:center;gap:10px;">',
                    '<div style="',
                        'width:36px;height:36px;border-radius:50%;',
                        'background:rgba(255,255,255,0.18);',
                        'display:flex;align-items:center;justify-content:center;flex-shrink:0;">',
                        '<svg viewBox="0 0 80 80" width="30" height="30">',
                            '<rect x="22" y="22" width="36" height="28" rx="12" fill="#f0f0f0"/>',
                            '<rect x="26" y="28" width="28" height="14" rx="7" fill="#1a1a2e"/>',
                            '<rect x="30" y="32" width="5" height="5" rx="2.5" fill="#00d4ff"/>',
                            '<rect x="45" y="32" width="5" height="5" rx="2.5" fill="#00d4ff"/>',
                            '<rect x="35" y="44" width="10" height="2.5" rx="1.25" fill="#555"/>',
                            '<rect x="31" y="14" width="2.5" height="10" rx="1.25" fill="#ff6b6b"/>',
                            '<rect x="46.5" y="14" width="2.5" height="10" rx="1.25" fill="#ff6b6b"/>',
                            '<circle cx="32.25" cy="12" r="3" fill="#ff6b6b"/>',
                            '<circle cx="47.75" cy="12" r="3" fill="#ff6b6b"/>',
                            '<rect x="26" y="50" width="28" height="20" rx="9" fill="#f0f0f0"/>',
                            '<circle cx="40" cy="59.5" r="2.5" fill="#4ecdc4"/>',
                        '</svg>',
                    '</div>',
                    '<div>',
                        '<div style="color:rgba(255,255,255,0.8);font-size:11px;display:flex;align-items:center;gap:5px;margin-top:2px;">',
                            '<span style="width:6px;height:6px;border-radius:50%;background:#10b981;display:inline-block;flex-shrink:0;"></span>',
                            'Online – Ready to help!',
                        '</div>',
                    '</div>',
                '</div>',

                // Messages
                '<div id="cb-msgs" style="',
                    'flex:1;overflow-y:auto;padding:14px;',
                    'display:flex;flex-direction:column;gap:10px;',
                    'background:var(--bg-secondary,#0a0a15);',
                    'height:calc(100% - 130px);">',
                '</div>',

                // Input
                '<div style="',
                    'padding:12px;',
                    'background:var(--bg-card,#0d0d1a);',
                    'border-top:1px solid rgba(255,255,255,0.08);">',
                    '<div style="',
                        'display:flex;align-items:center;gap:8px;',
                        'background:var(--bg-secondary,#0a0a15);',
                        'border:1px solid rgba(255,255,255,0.12);',
                        'border-radius:24px;padding:6px 6px 6px 14px;">',
                        '<textarea id="cb-input" rows="1" placeholder="Ask me anything..." style="',
                            'flex:1;border:none;background:transparent;',
                            'color:var(--text,#fff);font-size:14px;',
                            'resize:none;outline:none;font-family:inherit;',
                            'max-height:80px;line-height:1.4;padding:4px 0;">',
                        '</textarea>',
                        '<button id="cb-send" style="',
                            'width:36px;height:36px;border-radius:50%;border:none;cursor:pointer;',
                            'background:linear-gradient(135deg,#00d4ff,#a855f7);',
                            'display:flex;align-items:center;justify-content:center;flex-shrink:0;">',
                            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#fff" stroke-width="2.5">',
                                '<line x1="22" y1="2" x2="11" y2="13"/>',
                                '<polygon points="22,2 15,22 11,13 2,9"/>',
                            '</svg>',
                        '</button>',
                    '</div>',
                '</div>',

            '</div>', // end cb-win
            '</div>'  // end cb-wrap
        ].join('');

        document.body.appendChild(div.firstChild);
        injectStyles();
    }

    // ── Inject keyframe styles ────────────────────────────────
    function injectStyles() {
        var s = document.createElement('style');
        s.textContent = [
            '@keyframes cbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}',
            '@keyframes cbEyeGlow{0%,100%{fill:#00d4ff}50%{fill:#0099cc}}',
            '@keyframes cbAntPulse{0%,100%{transform:scale(1);fill:#ff6b6b}50%{transform:scale(1.3);fill:#ff4757}}',
            '@keyframes cbLightPulse{0%,100%{fill:#4ecdc4}50%{fill:#26d0ce;opacity:.7}}',
            '@keyframes cbMsgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}',
            '@keyframes cbDot{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}',
            '.cb-eye{animation:cbEyeGlow 3s infinite ease-in-out}',
            '.cb-ant{animation:cbAntPulse 2s infinite ease-in-out}',
            '.cb-light{animation:cbLightPulse 2.5s infinite ease-in-out}',
            '#cb-btn{animation:cbFloat 3s ease-in-out infinite}',
            '#cb-btn:hover{transform:scale(1.08)!important;animation:none!important;box-shadow:0 12px 35px rgba(0,212,255,0.5)!important}',
            '#cb-msgs::-webkit-scrollbar{width:4px}',
            '#cb-msgs::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:2px}',
            '.cb-bubble-bot{background:var(--bg-card,#16213e);color:var(--text,#fff);border:1px solid rgba(255,255,255,0.1);border-radius:18px 18px 18px 4px;padding:10px 14px;font-size:13.5px;line-height:1.5;max-width:85%;animation:cbMsgIn .3s ease}',
            '.cb-bubble-user{background:linear-gradient(135deg,#00d4ff,#a855f7);color:#fff;border-radius:18px 18px 4px 18px;padding:10px 14px;font-size:13.5px;line-height:1.5;max-width:85%;margin-left:auto;animation:cbMsgIn .3s ease}',
            '.cb-time{font-size:10px;color:rgba(255,255,255,0.35);margin-top:3px}',
            '.cb-time-user{text-align:right}',
            '.cb-suggestions{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}',
            '.cb-sug-btn{background:rgba(0,212,255,0.1);border:1px solid rgba(0,212,255,0.3);color:#00d4ff;padding:5px 12px;border-radius:20px;font-size:12px;cursor:pointer;transition:all .2s;white-space:nowrap}',
            '.cb-sug-btn:hover{background:rgba(0,212,255,0.2);transform:translateY(-1px)}',
            '.cb-typing{display:flex;align-items:center;gap:4px;padding:10px 14px;background:var(--bg-card,#16213e);border:1px solid rgba(255,255,255,0.1);border-radius:18px 18px 18px 4px;width:fit-content}',
            '.cb-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.5);animation:cbDot 1.4s infinite ease-in-out}',
            '.cb-dot:nth-child(1){animation-delay:-.32s}',
            '.cb-dot:nth-child(2){animation-delay:-.16s}',
            // Light theme overrides
            '[data-theme="light"] .cb-bubble-bot{background:#fff;color:#1a202c;border-color:rgba(0,0,0,0.1)}',
            '[data-theme="light"] .cb-bubble-user{color:#fff}',
            '[data-theme="light"] .cb-time{color:rgba(0,0,0,0.35)}',
            '[data-theme="light"] #cb-msgs{background:#f8fafc}',
            '[data-theme="light"] #cb-win{background:#fff;border-color:rgba(0,0,0,0.1)}',
            '[data-theme="light"] #cb-input{color:#1a202c}',
            '[data-theme="light"] textarea::placeholder{color:#718096}',
            // Mobile
            '@media(max-width:480px){#cb-win{width:calc(100vw - 2rem);right:0}}'
        ].join('');
        document.head.appendChild(s);
    }

    // ── Events ────────────────────────────────────────────────
    function bindEvents() {
        var btn   = document.getElementById('cb-btn');
        var send  = document.getElementById('cb-send');
        var input = document.getElementById('cb-input');

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            toggleChat();
        });

        send.addEventListener('click', function(e) {
            e.stopPropagation();
            sendMessage();
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        input.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 80) + 'px';
        });

        // Stop all clicks inside the window from bubbling to document
        var win = document.getElementById('cb-win');
        if (win) {
            win.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }

        document.addEventListener('click', function (e) {
            var wrap = document.getElementById('cb-wrap');
            if (isOpen && wrap && !wrap.contains(e.target)) {
                closeChat();
            }
        });
    }

    // ── Open / Close ──────────────────────────────────────────
    function toggleChat() {
        isOpen ? closeChat() : openChat();
    }

    function openChat() {
        var win   = document.getElementById('cb-win');
        var badge = document.getElementById('cb-badge');
        var btn   = document.getElementById('cb-btn');

        win.style.display = 'flex';
        win.style.flexDirection = 'column';
        if (badge) badge.style.display = 'none';
        btn.style.animation = 'none';
        isOpen = true;

        setTimeout(function () {
            var input = document.getElementById('cb-input');
            if (input) input.focus();
        }, 200);
    }

    function closeChat() {
        var win = document.getElementById('cb-win');
        var btn = document.getElementById('cb-btn');

        win.style.display = 'none';
        btn.style.animation = 'cbFloat 3s ease-in-out infinite';
        isOpen = false;
    }

    // ── Messages ──────────────────────────────────────────────
    function addMsg(role, html) {
        var msgs = document.getElementById('cb-msgs');
        var time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var isBot = role === 'bot';

        var wrap = document.createElement('div');
        wrap.style.display = 'flex';
        wrap.style.flexDirection = 'column';
        wrap.style.alignItems = isBot ? 'flex-start' : 'flex-end';

        var bubble = document.createElement('div');
        bubble.className = isBot ? 'cb-bubble-bot' : 'cb-bubble-user';
        bubble.innerHTML = html;

        var t = document.createElement('div');
        t.className = 'cb-time' + (isBot ? '' : ' cb-time-user');
        t.textContent = time;

        wrap.appendChild(bubble);
        wrap.appendChild(t);
        msgs.appendChild(wrap);
        msgs.scrollTop = msgs.scrollHeight;

        return bubble;
    }

    function showTyping() {
        var msgs = document.getElementById('cb-msgs');
        var el = document.createElement('div');
        el.id = 'cb-typing';
        el.className = 'cb-typing';
        el.innerHTML = '<div class="cb-dot"></div><div class="cb-dot"></div><div class="cb-dot"></div>';
        msgs.appendChild(el);
        msgs.scrollTop = msgs.scrollHeight;
        isTyping = true;
    }

    function hideTyping() {
        var el = document.getElementById('cb-typing');
        if (el) el.remove();
        isTyping = false;
    }

    function addSuggestions(bubble, list) {
        var div = document.createElement('div');
        div.className = 'cb-suggestions';
        list.forEach(function (label) {
            var b = document.createElement('button');
            b.className = 'cb-sug-btn';
            b.textContent = label;
            b.addEventListener('click', function () {
                document.querySelectorAll('.cb-suggestions').forEach(function (s) { s.remove(); });
                addMsg('user', label);
                respond(label);
            });
            div.appendChild(b);
        });
        bubble.appendChild(div);
    }

    // ── Send ──────────────────────────────────────────────────
    function sendMessage() {
        var input = document.getElementById('cb-input');
        var text = input.value.trim();
        if (!text || isTyping) return;

        document.querySelectorAll('.cb-suggestions').forEach(function (s) { s.remove(); });
        addMsg('user', text);
        input.value = '';
        input.style.height = 'auto';
        respond(text);
    }

    function respond(text) {
        showTyping();
        setTimeout(function () {
            hideTyping();
            var r = getResponse(text);
            var bubble = addMsg('bot', r.text);
            if (r.suggestions) addSuggestions(bubble, r.suggestions);
        }, 900 + Math.random() * 700);
    }

    // ── Welcome ───────────────────────────────────────────────
    function welcome() {
        var bubble = addMsg('bot', "👋 Hi! I'm Priyanka's AI assistant. Ask me about her skills, projects, or experience!");
        addSuggestions(bubble, ["👤 Who is Priyanka?", "💻 Projects", "🛠️ Skills", "📧 Contact"]);
    }

    // ── Responses ─────────────────────────────────────────────
    function getResponse(msg) {
        var m = msg.toLowerCase();

        if (m.includes('who') || m.includes('about') || m.includes('priyanka') || m.includes('👤')) {
            return {
                text: "I'm <strong>Priyanka Jakkampudi</strong>, a <strong>Full Stack Developer & AI/ML Enthusiast</strong> pursuing B.Tech Computer Science at SRM University AP.<br><br>I've built 6+ real-world projects, solved 250+ DSA problems on LeetCode, and completed a Full Stack Developer internship at Edubot Technologies. I'm actively seeking software engineering opportunities!",
                suggestions: ["💻 Projects", "🛠️ Skills", "💼 Experience", "📧 Contact"]
            };
        }

        if (m.includes('skill') || m.includes('tech') || m.includes('🛠️')) {
            return {
                text: "<strong>🛠️ Technical Skills</strong><br><br><strong>Languages:</strong> C, C++, Java, Python, JavaScript, TypeScript<br><strong>Frontend:</strong> React, HTML5, CSS3, Tailwind CSS<br><strong>Backend:</strong> Node.js, Express.js<br><strong>Database:</strong> MongoDB, MySQL<br><strong>AI/ML:</strong> TensorFlow, PyTorch, Scikit-learn<br><strong>Tools:</strong> Git, GitHub, AWS",
                suggestions: ["💻 Projects", "💼 Experience", "🏆 Certifications"]
            };
        }

        if (m.includes('project') || m.includes('built') || m.includes('💻')) {
            return {
                text: "<strong>🚀 Featured Projects</strong><br><br>🧠 <strong>InsightX AI</strong> – Medical imaging analysis with 98% accuracy (TensorFlow, PyTorch)<br><br>🎓 <strong>EAMCET Predictor</strong> – College prediction for 1000+ rank scenarios (React, Node.js, MongoDB)<br><br>🐾 <strong>PawMatch</strong> – Full-stack pet adoption platform (React, TypeScript, Supabase)<br><br>🛡️ <strong>Fraud Detection</strong> – ML system with 99.8% accuracy (Python, FastAPI)",
                suggestions: ["🧠 InsightX Details", "📧 Contact", "📄 Resume"]
            };
        }

        if (m.includes('experience') || m.includes('internship') || m.includes('💼')) {
            return {
                text: "<strong>💼 Full Stack Developer Intern</strong><br><em>Edubot Technologies</em> · June – July 2025<br><br>• Built full-stack pet adoption platform with React, TypeScript & Tailwind CSS<br>• Implemented secure authentication & real-time updates<br>• Designed responsive UI components for all devices<br>• Followed industry best practices in a cross-functional team",
                suggestions: ["💻 Projects", "🛠️ Skills", "📧 Contact"]
            };
        }

        if (m.includes('contact') || m.includes('email') || m.includes('reach') || m.includes('📧')) {
            return {
                text: "<strong>📬 Contact Priyanka</strong><br><br>📧 <a href='mailto:" + DATA.email + "' style='color:#00d4ff'>" + DATA.email + "</a><br><br>💼 <a href='" + DATA.linkedin + "' target='_blank' style='color:#00d4ff'>LinkedIn Profile</a><br><br>🐙 <a href='" + DATA.github + "' target='_blank' style='color:#00d4ff'>GitHub Profile</a><br><br>💻 <a href='" + DATA.leetcode + "' target='_blank' style='color:#00d4ff'>LeetCode Profile</a><br><br>Currently open to internships & full-time opportunities!",
                suggestions: ["📄 Resume", "💻 Projects", "🛠️ Skills"]
            };
        }

        if (m.includes('resume') || m.includes('cv') || m.includes('📄')) {
            return {
                text: "📄 <a href='" + DATA.resume + "' target='_blank' style='color:#00d4ff;font-weight:700'>Click here to download my Resume</a><br><br>It includes my complete project portfolio, technical skills, internship experience, certifications, and contact details.",
                suggestions: ["💻 Projects", "🛠️ Skills", "📧 Contact"]
            };
        }

        if (m.includes('certification') || m.includes('🏆')) {
            return {
                text: "<strong>🏆 Certifications</strong><br><br>• Full Stack Web Development – Udemy (2025)<br>• Data Science & EDA – Scaler Topics (2025)<br>• AWS Cloud Fundamentals – Scaler Topics (2025)<br>• MERN Full Stack Internship – Edubot Technologies (2025)",
                suggestions: ["💻 Projects", "🛠️ Skills", "📧 Contact"]
            };
        }

        if (m.includes('insightx') || m.includes('medical') || m.includes('🧠')) {
            return {
                text: "🧠 <strong>InsightX AI</strong><br><br>Medical imaging analysis platform detecting abnormalities from MRI, X-ray & CT scans with <strong>98% accuracy</strong>.<br><br>• EfficientNet & DenseNet deep learning models<br>• Processes 3 imaging modalities in real-time<br>• Flask-based web interface<br><br><a href='https://chanu716.github.io/InsightX/' target='_blank' style='color:#00d4ff'>🔗 Live Demo</a> · <a href='https://github.com/Priyanka-2027/InsightX' target='_blank' style='color:#00d4ff'>GitHub</a>",
                suggestions: ["🐾 PawMatch", "🛡️ Fraud Detection", "🎓 EAMCET", "📧 Contact"]
            };
        }

        if (m.includes('hello') || m.includes('hi') || m.includes('hey')) {
            return {
                text: "Hello! 👋 Great to meet you! I'm here to help you learn about Priyanka. What would you like to know?",
                suggestions: ["👤 Who is Priyanka?", "💻 Projects", "🛠️ Skills", "📧 Contact"]
            };
        }

        return {
            text: "I can tell you about Priyanka's background, skills, projects, experience, certifications, or contact details. What would you like to know?",
            suggestions: ["👤 About", "💻 Projects", "🛠️ Skills", "📧 Contact"]
        };
    }

    // ── Boot ──────────────────────────────────────────────────
    function boot() {
        inject();
        bindEvents();
        setTimeout(welcome, 1200);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }

})();
