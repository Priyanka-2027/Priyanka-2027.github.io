// ============================================================
// AI-Enhanced Chatbot with OpenAI Integration (Optional)
// ============================================================

class AIEnhancedChatbot extends PortfolioChatbot {
    constructor(apiKey = null) {
        super();
        this.apiKey = apiKey;
        this.useAI = !!apiKey;
        this.conversationHistory = [];
        
        // System prompt for AI
        this.systemPrompt = `You are Priyanka Jakkampudi's AI assistant on her portfolio website. You help visitors (especially recruiters) learn about her background, skills, and projects.

ABOUT PRIYANKA:
- Name: Priyanka Jakkampudi
- Role: Full Stack Developer & AI/ML Enthusiast  
- Education: B.Tech Computer Science @ SRM University AP
- Experience: Full Stack Developer Intern at Edubot Technologies (June-July 2025)

SKILLS:
- Languages: C, C++, Java, Python, JavaScript, TypeScript
- Frontend: React, HTML5, CSS3, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB, MySQL
- AI/ML: TensorFlow, PyTorch, Scikit-learn
- Tools: Git, GitHub, AWS

KEY PROJECTS:
1. InsightX AI - Medical imaging analysis with 98% accuracy (TensorFlow, PyTorch)
2. AP EAMCET College Predictor - College prediction system (React, Node.js, MongoDB)
3. PawMatch - Pet adoption platform (React, TypeScript, Supabase)
4. Financial Fraud Detection - 99.8% accuracy ML system (Python, FastAPI)

CONTACT:
- Email: priyanka.jakkampudi3@gmail.com
- GitHub: https://github.com/Priyanka-2027
- LinkedIn: https://www.linkedin.com/in/priyanka-jakkampudi-222911323
- LeetCode: https://leetcode.com/u/wtyBysvV3o/

INSTRUCTIONS:
- Be helpful, professional, and enthusiastic about Priyanka's work
- Keep responses concise but informative
- Always provide specific details about projects and skills
- Encourage visitors to view projects, download resume, or contact her
- If asked about something not in her profile, politely redirect to relevant information
- Use emojis sparingly and professionally`;
    }

    async processMessage(message) {
        this.showTypingIndicator();
        
        let response;
        
        if (this.useAI) {
            try {
                response = await this.getAIResponse(message);
            } catch (error) {
                console.warn('AI API failed, falling back to rule-based responses:', error);
                response = this.generateResponse(message);
            }
        } else {
            response = this.generateResponse(message);
        }
        
        // Simulate thinking time
        const delay = this.useAI ? 500 : 1000 + Math.random() * 1000;
        
        setTimeout(() => {
            this.hideTypingIndicator();
            this.addMessage('bot', response.text);
            
            if (response.suggestions) {
                this.showQuickSuggestions(response.suggestions);
            }
        }, delay);
    }

    async getAIResponse(message) {
        if (!this.apiKey) {
            throw new Error('No API key provided');
        }

        // Add user message to conversation history
        this.conversationHistory.push({
            role: 'user',
            content: message
        });

        // Keep conversation history manageable (last 10 messages)
        if (this.conversationHistory.length > 10) {
            this.conversationHistory = this.conversationHistory.slice(-10);
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: this.systemPrompt },
                    ...this.conversationHistory
                ],
                max_tokens: 300,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.choices[0].message.content;

        // Add AI response to conversation history
        this.conversationHistory.push({
            role: 'assistant',
            content: aiResponse
        });

        // Generate contextual suggestions based on the response
        const suggestions = this.generateContextualSuggestions(message, aiResponse);

        return {
            text: aiResponse,
            suggestions: suggestions
        };
    }

    generateContextualSuggestions(userMessage, aiResponse) {
        const msg = userMessage.toLowerCase();
        const response = aiResponse.toLowerCase();

        // Context-aware suggestions
        if (msg.includes('project') || response.includes('project')) {
            return ["🧠 InsightX AI Details", "🎓 EAMCET Predictor", "🐾 PawMatch Platform", "🛡️ Fraud Detection"];
        }
        
        if (msg.includes('skill') || response.includes('skill')) {
            return ["💻 View Projects", "💼 Work Experience", "🏆 Certifications", "📧 Contact Info"];
        }
        
        if (msg.includes('contact') || response.includes('contact')) {
            return ["📄 Download Resume", "💻 View Projects", "🛠️ Technical Skills"];
        }
        
        if (msg.includes('experience') || response.includes('internship')) {
            return ["💻 View Projects", "🛠️ Technical Skills", "📧 Contact Info"];
        }

        // Default suggestions
        return ["💻 View Projects", "🛠️ Technical Skills", "💼 Work Experience", "📧 Contact Info"];
    }

    // Enhanced welcome message for AI version
    showWelcomeMessage() {
        setTimeout(() => {
            const welcomeMessage = this.useAI 
                ? `👋 Hi! I'm Priyanka's AI-powered assistant. I can answer any questions about her background, skills, projects, and experience. What would you like to know?`
                : `👋 Hi! I'm Priyanka's AI assistant. I can help you learn about her skills, projects, and experience. What would you like to know?`;
            
            this.addMessage('bot', welcomeMessage);
            this.showQuickSuggestions([
                "👤 Who is Priyanka?",
                "💻 View Projects", 
                "🛠️ Technical Skills",
                "📧 Contact Info"
            ]);
        }, 1000);
    }
}

// Voice Input Feature (Optional Enhancement)
class VoiceChatbot extends AIEnhancedChatbot {
    constructor(apiKey = null) {
        super(apiKey);
        this.recognition = null;
        this.isListening = false;
        this.initVoiceRecognition();
    }

    initVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';
            
            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                document.getElementById('chatInput').value = transcript;
                this.sendMessage();
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isListening = false;
                this.updateVoiceButton();
            };
            
            this.recognition.onend = () => {
                this.isListening = false;
                this.updateVoiceButton();
            };
            
            this.addVoiceButton();
        }
    }

    addVoiceButton() {
        const inputWrapper = document.querySelector('.chat-input-wrapper');
        const voiceButton = document.createElement('button');
        voiceButton.className = 'voice-button';
        voiceButton.id = 'voiceButton';
        voiceButton.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
        `;
        
        voiceButton.addEventListener('click', () => this.toggleVoiceInput());
        inputWrapper.insertBefore(voiceButton, document.getElementById('sendButton'));
        
        // Add voice button styles
        const style = document.createElement('style');
        style.textContent = `
            .voice-button {
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background: transparent;
                border: 1px solid var(--border-color);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
                flex-shrink: 0;
                margin-right: 0.5rem;
            }
            
            .voice-button:hover {
                background: var(--bg-secondary);
            }
            
            .voice-button.listening {
                background: #ef4444;
                border-color: #ef4444;
                animation: pulse 1s infinite;
            }
            
            .voice-button svg {
                width: 16px;
                height: 16px;
                color: var(--text-dim);
            }
            
            .voice-button.listening svg {
                color: white;
            }
        `;
        document.head.appendChild(style);
    }

    toggleVoiceInput() {
        if (!this.recognition) return;
        
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
            this.isListening = true;
            this.updateVoiceButton();
        }
    }

    updateVoiceButton() {
        const voiceButton = document.getElementById('voiceButton');
        if (voiceButton) {
            voiceButton.classList.toggle('listening', this.isListening);
        }
    }
}

// Export classes for use
window.AIEnhancedChatbot = AIEnhancedChatbot;
window.VoiceChatbot = VoiceChatbot;