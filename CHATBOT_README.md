# 🤖 AI-Powered Portfolio Chatbot

A modern, intelligent chatbot for your portfolio website that helps visitors (especially recruiters) quickly learn about your skills, projects, and experience.

## ✨ Features

### 🎨 **Modern UI Design**
- Floating chat button with smooth animations
- Clean, minimal interface matching portfolio theme
- Full dark/light mode compatibility
- Mobile-responsive design
- Typing indicators and message timestamps

### 🧠 **Smart Conversation**
- Rule-based responses for instant replies
- Optional OpenAI integration for dynamic conversations
- Context-aware suggestions
- Quick action buttons for common queries
- Conversation history management

### 🎯 **Portfolio-Specific Knowledge**
- Personal information and background
- Technical skills and expertise
- Project portfolio with details
- Work experience and internships
- Contact information and resume
- Certifications and achievements

### 🚀 **Advanced Features**
- Voice input support (optional)
- Real-time typing simulation
- Auto-scroll messages
- Click-outside to close
- Notification badge
- Performance optimized

## 🛠️ **Setup & Configuration**

### Basic Setup (Rule-based)
1. Include the CSS and JS files in your HTML:
```html
<link rel="stylesheet" href="chatbot.css">
<script src="chatbot.js"></script>
<script src="chatbot-config.js"></script>
```

2. The chatbot will automatically initialize when the page loads.

### Advanced Setup (AI-Enhanced)
1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/)

2. Update `chatbot-config.js`:
```javascript
const ChatbotConfig = {
    enableAI: true,
    openaiApiKey: 'your-api-key-here',
    enableVoice: true, // Optional voice input
    // ... other settings
};
```

3. Include the AI enhancement script:
```html
<script src="chatbot-ai.js"></script>
```

## ⚙️ **Configuration Options**

```javascript
const ChatbotConfig = {
    // AI Features
    enableAI: false,           // Enable OpenAI integration
    openaiApiKey: null,        // Your OpenAI API key
    enableVoice: false,        // Enable voice input
    
    // UI Settings
    theme: 'auto',             // 'auto', 'light', 'dark'
    position: 'bottom-right',  // 'bottom-right', 'bottom-left'
    showNotification: true,    // Show notification badge
    autoOpen: false,           // Auto-open on page load
    
    // Behavior
    typingDelay: 1000,         // Typing simulation delay
    maxMessages: 50,           // Message history limit
    
    // Customization
    botName: "Priyanka's AI Assistant",
    botAvatar: "PJ",
    welcomeDelay: 1000
};
```

## 💬 **Supported Queries**

The chatbot can answer questions about:

### 👤 **Personal Information**
- "Who are you?" / "Tell me about Priyanka"
- Background and education
- Career goals and interests

### 🛠️ **Technical Skills**
- "What are your skills?"
- Programming languages
- Frameworks and tools
- AI/ML expertise

### 💻 **Projects**
- "Show me your projects"
- Project details and tech stacks
- Live demos and GitHub links
- Specific project deep-dives

### 💼 **Experience**
- "Tell me about your internship"
- Work experience details
- Achievements and responsibilities

### 📧 **Contact & Resume**
- "How can I contact you?"
- Email, LinkedIn, GitHub links
- Resume download
- LeetCode profile

### 🏆 **Certifications**
- Professional certifications
- Course completions
- Skill validations

## 🎨 **Customization**

### Styling
The chatbot uses CSS variables that automatically adapt to your portfolio's theme:
- `--accent` - Primary accent color
- `--bg-card` - Card background
- `--text` - Text color
- `--border-color` - Border colors

### Personal Data
Update the `personalData` object in `chatbot.js` with your information:
```javascript
this.personalData = {
    name: "Your Name",
    role: "Your Role",
    email: "your.email@example.com",
    // ... add your details
};
```

### Responses
Modify the `generateResponse()` method to customize bot responses for specific queries.

## 📱 **Mobile Optimization**

- Responsive design for all screen sizes
- Touch-friendly interface
- Optimized chat window sizing
- Smooth animations on mobile devices

## 🔒 **Privacy & Security**

- No data is stored permanently
- Conversation history is session-based only
- OpenAI API calls are made client-side
- No personal data is transmitted without user consent

## 🚀 **Performance**

- Lightweight implementation (~15KB total)
- Lazy loading of AI features
- Optimized animations
- Minimal impact on page load speed

## 🔧 **Browser Support**

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📈 **Analytics (Optional)**

Enable interaction tracking by setting `trackInteractions: true` in the config and implementing your analytics:

```javascript
// Example: Track chatbot interactions
function trackChatbotInteraction(action, message) {
    // Your analytics code here
    gtag('event', 'chatbot_interaction', {
        action: action,
        message: message
    });
}
```

## 🤝 **Contributing**

Feel free to customize and enhance the chatbot for your needs:

1. Fork the implementation
2. Add new response patterns
3. Enhance the UI/UX
4. Add new features
5. Submit improvements

## 📄 **License**

This chatbot implementation is part of your portfolio project. Customize freely for your personal use.

---

**Built with ❤️ for modern portfolio websites**