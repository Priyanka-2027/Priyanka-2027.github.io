// ============================================================
// AI Chatbot Implementation
// ============================================================

class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.currentSuggestions = [];
        
        // Personal data for responses
        this.personalData = {
            name: "Priyanka Jakkampudi",
            role: "Full Stack Developer & AI/ML Enthusiast",
            education: "B.Tech Computer Science @ SRM University AP",
            email: "priyanka.jakkampudi3@gmail.com",
            github: "https://github.com/Priyanka-2027",
            linkedin: "https://www.linkedin.com/in/priyanka-jakkampudi-222911323",
            leetcode: "https://leetcode.com/u/wtyBysvV3o/",
            resume: "resume.pdf",
            skills: {
                languages: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript"],
                frontend: ["React", "HTML5", "CSS3", "Tailwind CSS"],
                backend: ["Node.js", "Express.js"],
                database: ["MongoDB", "MySQL"],
                aiml: ["TensorFlow", "PyTorch", "Scikit-learn", "NumPy", "Pandas"],
                tools: ["Git", "GitHub", "AWS", "VS Code"]
            },
            projects: [
                {
                    name: "InsightX AI",
                    description: "Medical imaging analysis platform with 98% accuracy using deep learning",
                    tech: ["TensorFlow", "PyTorch", "Flask"],
                    link: "https://github.com/Priyanka-2027/InsightX"
                },
                {
                    name: "AP EAMCET College Predictor",
                    description: "College prediction system analyzing 1000+ rank scenarios",
                    tech: ["React", "Node.js", "MongoDB"],
                    link: "https://github.com/Priyanka-2027/Eamcet_college_predictor"
                },
                {
                    name: "PawMatch - Pet Adoption Platform",
                    description: "Full-stack platform connecting shelters with adopters",
                    tech: ["React", "TypeScript", "Supabase"],
                    link: "https://github.com/Priyanka-2027/Pet-Adoption-Platform"
                },
                {
                    name: "Financial Fraud Detection",
                    description: "ML system achieving 99.8% accuracy in fraud detection",
                    tech: ["Python", "FastAPI", "Scikit-learn"],
                    link: "https://github.com/Priyanka-2027/Fraud_detecion_using_RandomForest"
                }
            ],
            experience: {
                role: "Full Stack Developer Intern",
                company: "Edubot Technologies",
                duration: "June 2025 – July 2025",
                description: "Developed full-stack pet adoption platform using React, TypeScript, and Tailwind CSS with secure authentication and responsive UI."
            }
        };

        this.init();
    }

    init() {
        console.log('Initializing PortfolioChatbot...');
        
        // Add a small delay to ensure DOM is fully ready
        setTimeout(() => {
            this.createChatbot();
            this.bindEvents();
            this.showWelcomeMessage();
            console.log('PortfolioChatbot initialization complete');
        }, 100);
    }

    createChatbot() {
        const chatbotHTML = `
            <div class="chatbot-container">
                <button class="chat-button" id="chatButton" onclick="window.chatbot && window.chatbot.toggleChat()">
                    <div class="ai-robot-icon">
                        <svg viewBox="0 0 80 80" class="robot-svg">
                            <!-- Robot Head -->
                            <rect x="25" y="25" width="30" height="25" rx="12" fill="#f0f0f0" class="robot-head"/>
                            
                            <!-- Robot Visor/Screen -->
                            <rect x="28" y="30" width="24" height="12" rx="6" fill="#2a2a2a" class="robot-visor"/>
                            
                            <!-- Robot Eyes (Glowing) -->
                            <rect x="32" y="34" width="4" height="4" rx="2" fill="#00d4ff" class="robot-eye left-eye"/>
                            <rect x="44" y="34" width="4" height="4" rx="2" fill="#00d4ff" class="robot-eye right-eye"/>
                            
                            <!-- Robot Mouth -->
                            <rect x="37" y="44" width="6" height="2" rx="1" fill="#666" class="robot-mouth"/>
                            
                            <!-- Robot Antennas -->
                            <rect x="32" y="20" width="2" height="8" rx="1" fill="#ff6b6b" class="robot-antenna left-antenna"/>
                            <rect x="46" y="20" width="2" height="8" rx="1" fill="#ff6b6b" class="robot-antenna right-antenna"/>
                            
                            <!-- Antenna Tips -->
                            <circle cx="33" cy="18" r="2" fill="#ff6b6b" class="antenna-tip left-tip"/>
                            <circle cx="47" cy="18" r="2" fill="#ff6b6b" class="antenna-tip right-tip"/>
                            
                            <!-- Robot Body -->
                            <rect x="28" y="50" width="24" height="18" rx="8" fill="#f0f0f0" class="robot-body"/>
                            
                            <!-- Body Panel -->
                            <rect x="32" y="54" width="16" height="8" rx="3" fill="#e0e0e0" class="robot-panel"/>
                            
                            <!-- Control Light -->
                            <circle cx="40" cy="58" r="2" fill="#4ecdc4" class="control-light"/>
                            
                            <!-- Side Panels -->
                            <rect x="24" y="52" width="3" height="8" rx="1.5" fill="#ff6b6b" class="side-panel left-panel"/>
                            <rect x="53" y="52" width="3" height="8" rx="1.5" fill="#ff6b6b" class="side-panel right-panel"/>
                        </svg>
                    </div>
                    <div class="chat-notification" id="chatNotification">1</div>
                </button>
                
                <div class="chat-window" id="chatWindow">
                    <div class="chat-header">
                        <div class="chat-avatar">
                            <svg viewBox="0 0 80 80" class="avatar-robot">
                                <!-- Robot Head -->
                                <rect x="25" y="25" width="30" height="25" rx="12" fill="#f0f0f0"/>
                                
                                <!-- Robot Visor/Screen -->
                                <rect x="28" y="30" width="24" height="12" rx="6" fill="#2a2a2a"/>
                                
                                <!-- Robot Eyes (Glowing) -->
                                <rect x="32" y="34" width="4" height="4" rx="2" fill="#00d4ff" class="avatar-eye left-eye"/>
                                <rect x="44" y="34" width="4" height="4" rx="2" fill="#00d4ff" class="avatar-eye right-eye"/>
                                
                                <!-- Robot Mouth -->
                                <rect x="37" y="44" width="6" height="2" rx="1" fill="#666"/>
                                
                                <!-- Robot Antennas -->
                                <rect x="32" y="20" width="2" height="8" rx="1" fill="#ff6b6b"/>
                                <rect x="46" y="20" width="2" height="8" rx="1" fill="#ff6b6b"/>
                                
                                <!-- Antenna Tips -->
                                <circle cx="33" cy="18" r="2" fill="#ff6b6b"/>
                                <circle cx="47" cy="18" r="2" fill="#ff6b6b"/>
                                
                                <!-- Robot Body -->
                                <rect x="28" y="50" width="24" height="18" rx="8" fill="#f0f0f0"/>
                                
                                <!-- Body Panel -->
                                <rect x="32" y="54" width="16" height="8" rx="3" fill="#e0e0e0"/>
                                
                                <!-- Control Light -->
                                <circle cx="40" cy="58" r="2" fill="#4ecdc4"/>
                            </svg>
                        </div>
                        <div class="chat-info">
                            <h3>Priyanka's AI Assistant</h3>
                            <p class="chat-status">
                                <span class="status-dot"></span>
                                Online - Ready to help!
                            </p>
                        </div>
                    </div>
                    
                    <div class="chat-messages" id="chatMessages"></div>
                    
                    <div class="chat-input-container">
                        <div class="chat-input-wrapper">
                            <textarea 
                                class="chat-input" 
                                id="chatInput" 
                                placeholder="Ask me about Priyanka's skills, projects, or experience..."
                                rows="1"
                            ></textarea>
                            <button class="send-button" id="sendButton">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="22" y1="2" x2="11" y2="13"></line>
                                    <polygon points="22,2 15,22 11,13 2,9"></polygon>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        console.log('Binding chatbot events...');
        
        const chatButton = document.getElementById('chatButton');
        const chatWindow = document.getElementById('chatWindow');
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendButton');

        if (!chatButton) {
            console.error('Chat button not found!');
            return;
        }

        console.log('Chat button found, binding click event');
        chatButton.addEventListener('click', (e) => {
            console.log('Chat button clicked!');
            e.preventDefault();
            e.stopPropagation();
            this.toggleChat();
        });

        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendMessage());
        }

        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Auto-resize textarea
            chatInput.addEventListener('input', () => {
                chatInput.style.height = 'auto';
                chatInput.style.height = Math.min(chatInput.scrollHeight, 100) + 'px';
            });
        }

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (chatWindow && !chatWindow.contains(e.target) && !chatButton.contains(e.target) && this.isOpen) {
                this.toggleChat();
            }
        });

        console.log('All chatbot events bound successfully');
    }

    toggleChat() {
        console.log('toggleChat called, current state:', this.isOpen);
        
        const chatButton = document.getElementById('chatButton');
        const chatWindow = document.getElementById('chatWindow');
        const notification = document.getElementById('chatNotification');

        if (!chatButton || !chatWindow) {
            console.error('Chat elements not found:', { chatButton, chatWindow });
            return;
        }

        this.isOpen = !this.isOpen;
        console.log('New chat state:', this.isOpen);
        
        if (this.isOpen) {
            console.log('Opening chat window');
            chatWindow.classList.add('open');
            chatButton.classList.add('open');
            if (notification) {
                notification.style.display = 'none';
            }
            
            // Focus input after a short delay to ensure window is open
            setTimeout(() => {
                const chatInput = document.getElementById('chatInput');
                if (chatInput) {
                    chatInput.focus();
                }
            }, 300);
        } else {
            console.log('Closing chat window');
            chatWindow.classList.remove('open');
            chatButton.classList.remove('open');
        }
    }

    showWelcomeMessage() {
        setTimeout(() => {
            const welcomeMessage = `👋 Hi! I'm Priyanka's AI assistant. I can help you learn about her skills, projects, and experience. What would you like to know?`;
            
            this.addMessage('bot', welcomeMessage);
            this.showQuickSuggestions([
                "👤 Who is Priyanka?",
                "💻 View Projects", 
                "🛠️ Technical Skills",
                "📧 Contact Info"
            ]);
        }, 1000);
    }

    addMessage(sender, content, showTime = true) {
        const messagesContainer = document.getElementById('chatMessages');
        const time = showTime ? new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
        
        const messageHTML = `
            <div class="message ${sender}">
                <div class="message-bubble">${content}</div>
                ${showTime ? `<div class="message-time">${time}</div>` : ''}
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        this.messages.push({ sender, content, time });
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');
        const chatButton = document.getElementById('chatButton');
        
        const typingHTML = `
            <div class="typing-indicator" id="typingIndicator">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
                <span style="margin-left: 0.5rem; color: var(--text-dim); font-size: 0.8rem;">Priyanka's assistant is typing...</span>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // Add thinking animation to chat button
        if (chatButton) {
            chatButton.classList.add('thinking');
        }
        
        this.isTyping = true;
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typingIndicator');
        const chatButton = document.getElementById('chatButton');
        
        if (typingIndicator) {
            typingIndicator.remove();
        }
        
        // Remove thinking animation from chat button
        if (chatButton) {
            chatButton.classList.remove('thinking');
        }
        
        this.isTyping = false;
    }

    showQuickSuggestions(suggestions) {
        const messagesContainer = document.getElementById('chatMessages');
        const suggestionsHTML = `
            <div class="quick-suggestions">
                ${suggestions.map(suggestion => 
                    `<button class="suggestion-btn" onclick="chatbot.handleSuggestion('${suggestion}')">${suggestion}</button>`
                ).join('')}
            </div>
        `;
        
        const lastMessage = messagesContainer.lastElementChild;
        if (lastMessage && lastMessage.classList.contains('message')) {
            lastMessage.insertAdjacentHTML('beforeend', suggestionsHTML);
        }
    }

    handleSuggestion(suggestion) {
        // Remove suggestion buttons
        document.querySelectorAll('.quick-suggestions').forEach(el => el.remove());
        
        // Add user message
        this.addMessage('user', suggestion);
        
        // Process the suggestion
        this.processMessage(suggestion);
    }

    sendMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (!message || this.isTyping) return;
        
        // Remove any existing suggestions
        document.querySelectorAll('.quick-suggestions').forEach(el => el.remove());
        
        this.addMessage('user', message);
        chatInput.value = '';
        chatInput.style.height = 'auto';
        
        this.processMessage(message);
    }

    processMessage(message) {
        this.showTypingIndicator();
        
        // Simulate thinking time
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage('bot', response.text);
            
            if (response.suggestions) {
                this.showQuickSuggestions(response.suggestions);
            }
        }, 1000 + Math.random() * 1000);
    }

    generateResponse(message) {
        const msg = message.toLowerCase();
        
        // Introduction & About
        if (msg.includes('who') || msg.includes('about') || msg.includes('priyanka') || msg.includes('👤')) {
            return {
                text: `I'm ${this.personalData.name}, a ${this.personalData.role} currently pursuing ${this.personalData.education}. 

I'm passionate about building scalable web applications and AI/ML solutions. I've completed a Full Stack Developer internship and built 6+ real-world projects including an AI medical imaging platform with 98% accuracy!

I've solved 250+ DSA problems on LeetCode and am actively seeking software engineering opportunities.`,
                suggestions: ["💻 View Projects", "🛠️ Technical Skills", "💼 Work Experience", "📧 Contact Info"]
            };
        }
        
        // Skills
        if (msg.includes('skill') || msg.includes('tech') || msg.includes('🛠️')) {
            const skills = this.personalData.skills;
            return {
                text: `Here are my technical skills:

**Languages:** ${skills.languages.join(', ')}

**Frontend:** ${skills.frontend.join(', ')}

**Backend:** ${skills.backend.join(', ')}

**Database:** ${skills.database.join(', ')}

**AI/ML:** ${skills.aiml.join(', ')}

**Tools:** ${skills.tools.join(', ')}

I'm particularly strong in full-stack MERN development and have hands-on experience with machine learning frameworks like TensorFlow and PyTorch.`,
                suggestions: ["💻 View Projects", "💼 Work Experience", "🏆 Certifications"]
            };
        }
        
        // Projects
        if (msg.includes('project') || msg.includes('work') || msg.includes('built') || msg.includes('💻')) {
            const projectsText = this.personalData.projects.map((project, index) => 
                `**${index + 1}. ${project.name}**
${project.description}
*Tech Stack:* ${project.tech.join(', ')}
🔗 [View Project](${project.link})`
            ).join('\n\n');
            
            return {
                text: `Here are my featured projects:

${projectsText}

Each project demonstrates different aspects of my skills - from AI/ML to full-stack development. Would you like to know more about any specific project?`,
                suggestions: ["🧠 InsightX AI Details", "🎓 EAMCET Predictor", "🐾 PawMatch Platform", "🛡️ Fraud Detection"]
            };
        }
        
        // Experience/Internship
        if (msg.includes('experience') || msg.includes('internship') || msg.includes('work') || msg.includes('💼')) {
            const exp = this.personalData.experience;
            return {
                text: `**${exp.role}** at *${exp.company}*
📅 ${exp.duration}

${exp.description}

Key achievements:
• Developed full-stack pet adoption platform with React, TypeScript, and Tailwind CSS
• Implemented secure authentication and real-time updates
• Built responsive UI components improving user experience across devices
• Collaborated with cross-functional teams following industry best practices`,
                suggestions: ["💻 View Projects", "🛠️ Technical Skills", "📧 Contact Info"]
            };
        }
        
        // Contact
        if (msg.includes('contact') || msg.includes('email') || msg.includes('reach') || msg.includes('📧')) {
            return {
                text: `Here's how you can reach me:

📧 **Email:** [${this.personalData.email}](mailto:${this.personalData.email})

💼 **LinkedIn:** [Connect with me](${this.personalData.linkedin})

🐙 **GitHub:** [View my code](${this.personalData.github})

💻 **LeetCode:** [See my problem-solving](${this.personalData.leetcode})

I'm currently open to software engineering internships and full-time opportunities. Feel free to reach out!`,
                suggestions: ["📄 Download Resume", "💻 View Projects", "🛠️ Technical Skills"]
            };
        }
        
        // Resume
        if (msg.includes('resume') || msg.includes('cv') || msg.includes('📄')) {
            return {
                text: `📄 You can download my resume here: [Download Resume](${this.personalData.resume})

My resume includes:
• Complete project portfolio with live demos
• Technical skills and certifications
• Internship experience and achievements
• Education and academic projects
• Contact information

Would you like me to highlight any specific section?`,
                suggestions: ["💻 View Projects", "🛠️ Technical Skills", "💼 Work Experience", "📧 Contact Info"]
            };
        }
        
        // Certifications
        if (msg.includes('certification') || msg.includes('certificate') || msg.includes('🏆')) {
            return {
                text: `🏆 **My Certifications:**

• **Full Stack Web Development** - Udemy (2025)
• **Data Science & EDA** - Scaler Topics (2025)  
• **AWS Cloud Fundamentals** - Scaler Topics (2025)
• **MERN Full Stack Web Development Internship** - Edubot Technologies (2025)

These certifications complement my hands-on project experience and demonstrate my commitment to continuous learning in web development and cloud technologies.`,
                suggestions: ["💻 View Projects", "🛠️ Technical Skills", "💼 Work Experience"]
            };
        }
        
        // Specific project details
        if (msg.includes('insightx') || msg.includes('medical') || msg.includes('🧠')) {
            return {
                text: `🧠 **InsightX AI - Medical Imaging Analysis Platform**

This is my flagship AI project that detects medical abnormalities from MRI, X-ray, and CT scans with **98% accuracy**.

**Key Features:**
• Processes 3 different imaging modalities
• Uses EfficientNet and DenseNet models
• Real-time analysis capabilities
• Flask-based web interface

**Tech Stack:** TensorFlow, PyTorch, Flask, Computer Vision

🔗 [Live Demo](https://chanu716.github.io/InsightX/) | [GitHub](https://github.com/Priyanka-2027/InsightX)

This project showcases my deep learning expertise and ability to solve real-world healthcare problems.`,
                suggestions: ["🎓 EAMCET Predictor", "🐾 PawMatch Platform", "🛡️ Fraud Detection", "🛠️ All Skills"]
            };
        }
        
        // Greetings
        if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('👋')) {
            return {
                text: `Hello! 👋 Great to meet you! I'm here to help you learn about Priyanka Jakkampudi - a talented Full Stack Developer and AI/ML enthusiast.

What would you like to know about her?`,
                suggestions: ["👤 Who is Priyanka?", "💻 View Projects", "🛠️ Technical Skills", "📧 Contact Info"]
            };
        }
        
        // Default response
        return {
            text: `I'd be happy to help you learn about Priyanka! I can tell you about:

• Her background and education
• Technical skills and expertise  
• Project portfolio and achievements
• Work experience and internships
• Contact information and resume

What specific information are you looking for?`,
            suggestions: ["👤 About Priyanka", "💻 View Projects", "🛠️ Technical Skills", "📧 Contact Info"]
        };
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing chatbot...');
    try {
        window.chatbot = new PortfolioChatbot();
        console.log('Chatbot initialized successfully');
    } catch (error) {
        console.error('Error initializing chatbot:', error);
    }
});

// Fallback initialization after window load
window.addEventListener('load', () => {
    if (!window.chatbot) {
        console.log('Fallback: Initializing chatbot after window load');
        try {
            window.chatbot = new PortfolioChatbot();
            console.log('Fallback chatbot initialized successfully');
        } catch (error) {
            console.error('Fallback chatbot initialization failed:', error);
        }
    }
});

// Manual initialization function for debugging
window.initChatbot = function() {
    console.log('Manual chatbot initialization');
    if (window.chatbot) {
        console.log('Chatbot already exists, recreating...');
    }
    window.chatbot = new PortfolioChatbot();
    console.log('Manual chatbot initialization complete');
};

// Make chatbot globally accessible
window.PortfolioChatbot = PortfolioChatbot;