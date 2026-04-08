// ============================================================
// Chatbot Configuration
// ============================================================

const ChatbotConfig = {
    // Basic Configuration
    enableAI: false, // Set to true to enable OpenAI integration
    openaiApiKey: null, // Add your OpenAI API key here if enableAI is true
    enableVoice: false, // Set to true to enable voice input
    
    // UI Configuration
    theme: 'auto', // 'auto', 'light', 'dark'
    position: 'bottom-right', // 'bottom-right', 'bottom-left'
    showNotification: true,
    autoOpen: false,
    
    // Behavior Configuration
    typingDelay: 1000, // Milliseconds
    maxMessages: 50, // Maximum messages to keep in history
    
    // Customization
    botName: "Priyanka's AI Assistant",
    botAvatar: "PJ",
    welcomeDelay: 1000,
    
    // Analytics (Optional)
    trackInteractions: false,
    
    // Initialize chatbot based on configuration
    init() {
        console.log('ChatbotConfig: Initializing with config', this);
        
        // Don't reinitialize if chatbot already exists and is working
        if (window.chatbot && typeof window.chatbot.toggleChat === 'function') {
            console.log('ChatbotConfig: Chatbot already initialized, just applying config');
            this.applyConfig();
            return;
        }
        
        // Load AI-enhanced version if enabled
        if (this.enableAI && this.openaiApiKey) {
            console.log('ChatbotConfig: Creating AI-enhanced chatbot');
            if (this.enableVoice && window.VoiceChatbot) {
                window.chatbot = new VoiceChatbot(this.openaiApiKey);
            } else if (window.AIEnhancedChatbot) {
                window.chatbot = new AIEnhancedChatbot(this.openaiApiKey);
            } else {
                console.warn('ChatbotConfig: AI classes not available, falling back to basic');
                window.chatbot = new PortfolioChatbot();
            }
        } else {
            // Use basic rule-based chatbot
            console.log('ChatbotConfig: Creating basic chatbot');
            if (window.PortfolioChatbot) {
                window.chatbot = new PortfolioChatbot();
            } else {
                console.error('ChatbotConfig: PortfolioChatbot class not found');
                return;
            }
        }
        
        // Apply configuration
        this.applyConfig();
    },
    
    applyConfig() {
        // Apply theme if specified
        if (this.theme !== 'auto') {
            document.documentElement.setAttribute('data-theme', this.theme);
        }
        
        // Apply position
        if (this.position === 'bottom-left') {
            const container = document.querySelector('.chatbot-container');
            if (container) {
                container.style.left = '2rem';
                container.style.right = 'auto';
            }
        }
        
        // Hide notification if disabled
        if (!this.showNotification) {
            const notification = document.getElementById('chatNotification');
            if (notification) {
                notification.style.display = 'none';
            }
        }
        
        // Auto-open if enabled
        if (this.autoOpen) {
            setTimeout(() => {
                if (window.chatbot && !window.chatbot.isOpen) {
                    window.chatbot.toggleChat();
                }
            }, 2000);
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('ChatbotConfig: DOM loaded');
    
    // Check if basic chatbot is already initialized
    if (window.chatbot) {
        console.log('ChatbotConfig: Chatbot already exists, applying config');
        ChatbotConfig.applyConfig();
        return;
    }
    
    // Check if AI files are loaded
    if (ChatbotConfig.enableAI) {
        console.log('ChatbotConfig: Loading AI-enhanced chatbot');
        // Load AI-enhanced chatbot script
        const script = document.createElement('script');
        script.src = 'chatbot-ai.js';
        script.onload = () => {
            console.log('ChatbotConfig: AI script loaded, initializing');
            ChatbotConfig.init();
        };
        script.onerror = () => {
            console.error('ChatbotConfig: Failed to load AI script, falling back to basic');
            ChatbotConfig.enableAI = false;
            ChatbotConfig.init();
        };
        document.head.appendChild(script);
    } else {
        console.log('ChatbotConfig: Using basic chatbot');
        // Small delay to ensure basic chatbot is loaded
        setTimeout(() => {
            ChatbotConfig.init();
        }, 100);
    }
});

// Export for global access
window.ChatbotConfig = ChatbotConfig;