# PM-Pro 🚀

An intelligent, AI-powered Product Management platform that streamlines PM workflows with cutting-edge automation and beautiful visualizations. Featuring an intuitive collapsible sidebar, responsive design, and seamless user experience.

## ✨ Features

### 🤖 AI-Powered Tools
- **PRD Generator**: Create comprehensive Product Requirement Documents in minutes
- **User Story Generator**: Automatically generate user stories with acceptance criteria
- **Competitive Analysis**: Get intelligent insights about your competitive landscape
- **Smart Prioritization**: RICE scoring framework enhanced with AI recommendations
- **Ollama Integration**: Run AI models locally with UI-based model selection and management

### 📊 Visual Product Management
- **Interactive Roadmap**: Beautiful timeline visualization of product initiatives
- **Feature Prioritization Charts**: Radar and bar charts for data-driven decisions
- **Analytics Dashboard**: Real-time insights and metrics
- **Progress Tracking**: Visual progress indicators for all initiatives

### 🎨 Modern UI/UX
- **Intelligent Sidebar**: Click logo to expand, close button when open, smooth transitions
- **Dynamic Header**: Search bar and navigation adjust seamlessly with sidebar state
- **Dark Mode**: Sleek, professional dark theme with optimal contrast
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Smooth Animations**: Polished interactions and transitions
- **Glassmorphism**: Modern glass-effect UI elements
- **Keyboard Shortcuts**: Ctrl/Cmd+B to toggle sidebar, Enter for search
- **Accessibility**: Full keyboard navigation and ARIA support

## 🛠️ Tech Stack

- **React 18** - Modern React with Hooks
- **React Router** - Seamless navigation
- **Recharts** - Beautiful, responsive charts
- **Lucide React** - Clean, modern icons
- **Framer Motion** - Smooth animations
- **CSS3** - Advanced styling with variables

## 📁 Project Structure

```
AI-PM/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest
│   └── robots.txt          # SEO configuration
├── src/
│   ├── components/
│   │   ├── Sidebar.js      # Collapsible navigation sidebar
│   │   ├── Sidebar.css     # Sidebar styling
│   │   ├── Header.js       # Top navigation with search & notifications
│   │   ├── Header.css      # Header styling
│   │   ├── Navbar.js       # Additional navigation component
│   │   └── ErrorBoundary.js # Error handling wrapper
│   ├── pages/
│   │   ├── Dashboard.js    # Main dashboard with metrics
│   │   ├── PRDGenerator.js # PRD creation tool
│   │   ├── UserStories.js  # User story generator
│   │   ├── FeaturePrioritization.js # RICE scoring
│   │   ├── Roadmap.js      # Timeline visualization
│   │   └── CompetitiveAnalysis.js # Competitor insights
│   ├── utils/
│   │   └── ollamaAPI.js    # Ollama AI integration utilities
│   ├── App.js              # Main application component
│   ├── App.css             # Global styles
│   ├── index.js            # Application entry point
│   └── index.css           # Base styles
├── OLLAMA_SETUP.md         # Detailed Ollama setup guide
├── NETLIFY_DEPLOY.md       # Deployment instructions
├── package.json            # Dependencies and scripts
└── README.md              # Project documentation
```

## 🤖 How AI is Used

### AI Processing Architecture

PM-Pro supports **two modes** for AI processing:

1. **Simulated Mode (Default)**: Demonstrates AI capabilities with structured templates
2. **Ollama Mode**: Uses local open-source LLMs for real AI generation

#### 🦙 Ollama Integration (Local AI)

PM-Pro includes **built-in Ollama support** with a user-friendly interface:

- **🎯 Model Selection UI**: Choose from multiple models directly in the app
- **📥 Automatic Download**: Pull models with one click
- **⚙️ Easy Configuration**: Enable/disable Ollama from settings
- **🔒 Privacy-First**: All processing happens on your computer
- **💰 Zero Cost**: No API keys or cloud fees

**Available Models:**
- **Phi-3 Mini** (2.3GB) ⭐ - Best balance of speed & quality
- **Gemma 2B** (1.4GB) - Lightest & fastest
- **Mistral 7B** (4.1GB) - Highest accuracy
- **Llama 2 7B** (3.8GB) - Most reliable

**Quick Setup:**
```bash
# 1. Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# 2. Start Ollama service
ollama serve

# 3. Open PM-Pro sidebar (expand if closed)
# 4. Select your preferred model from the dropdown next to "AI Active"
# 5. Your selection is automatically saved and applied
# 6. Start generating PRDs, user stories, and more!
```

**How It Works:**
1. **Select Model**: Choose from 4 pre-configured models directly in the sidebar dropdown (next to "AI Active" status)
2. **Instant Switch**: Model selection persists across sessions and automatically applies to all AI operations
3. **Zero Configuration**: No code changes or manual configuration needed
4. **Generate Content**: All AI features (PRD, User Stories, Competitive Analysis) seamlessly use your chosen model

**Live Model Switching!** Switch between models anytime from the sidebar - your preference is automatically saved and applied to all AI processing.

📖 See [OLLAMA_SETUP.md](OLLAMA_SETUP.md) for detailed setup guide and troubleshooting.

---

### AI Features by Module

#### 1. **PRD Generator** 
**Input Processing:**
- Collects: Product name, problem statement, target audience, key features, competitors, timeline
- **AI Analysis**: Processes requirements and generates structured sections

**Output Generation:**
- Executive Summary: Synthesizes product vision and goals
- Problem Statement: Contextualizes user pain points
- Target Audience: Defines user personas and demographics
- Features & Requirements: Breaks down functionality into detailed specs
- Success Metrics: Proposes KPIs and measurement frameworks
- Timeline: Creates phased implementation plan

**Technical Implementation:**
```javascript
// Simulated AI processing with realistic delay
const generatePRD = (input) => {
  // Template-based generation with dynamic content insertion
  // Real implementation would use: OpenAI GPT-4, Claude, or Gemini
  return {
    title: input.productName,
    sections: [
      { title: "Executive Summary", content: aiGenerated },
      { title: "Problem Statement", content: contextualAnalysis },
      // ... more sections
    ]
  }
}
```

#### 2. **User Stories Generator**
**Input Processing:**
- Epic/feature description
- User persona (Developer, Designer, Manager, End User)
- Context and goals

**AI Processing:**
- Analyzes feature scope
- Determines user needs and pain points
- Generates story format: "As a [persona], I want [goal], so that [benefit]"
- Creates 3-5 acceptance criteria per story
- Estimates story points based on complexity

**Output:**
- Formatted user stories with full acceptance criteria
- Priority levels (High/Medium/Low)
- Story points estimation
- Ready for sprint planning

#### 3. **Feature Prioritization**
**RICE Scoring with AI:**
- **Reach**: Number of users affected (per period)
- **Impact**: Benefit level (Massive=3, High=2, Medium=1, Low=0.5)
- **Confidence**: Data reliability percentage
- **Effort**: Team-months required

**AI Enhancement:**
```javascript
RICE Score = (Reach × Impact × Confidence) / Effort

// AI adds:
// - Historical data analysis
// - Market trend insights
// - Competitive intelligence
// - Risk assessment
```

**Recommendations Engine:**
- Compares features across dimensions
- Suggests optimal roadmap sequence
- Identifies quick wins vs. strategic bets
- Balances short-term gains with long-term vision

#### 4. **Competitive Analysis**
**Data Collection:**
- Competitor identification
- Feature matrix comparison
- Market positioning

**AI Analysis:**
- Feature gap detection
- Strength/weakness mapping
- Market opportunity identification
- Strategic recommendations

**Visualization:**
- Radar charts for multi-dimensional comparison
- Competitive positioning matrix
- Feature parity analysis
- AI-generated strategic insights

#### 5. **Roadmap Planning**
**User-Driven Roadmap Creation:**
- Create custom milestones for any quarter/timeframe
- Define milestone title and strategic goals
- Set status (Planned, In Progress, Completed)
- Track progress percentage (0-100%)
- Add multiple features/initiatives per milestone

**Interactive Management:**
- Full edit capabilities for all milestone properties
- Delete milestones with confirmation
- Add/remove features dynamically
- Real-time statistics calculation

**Timeline Generation:**
- Visual alternating timeline layout
- Color-coded status indicators
- Progress bars for each milestone
- Responsive design for all screen sizes

**AI Optimization:**
- Suggests optimal milestone sequencing
- Identifies dependencies and critical paths
- Recommends resource allocation
- Provides timeline feasibility insights
- Highlights potential bottlenecks

### Integration Ready
The application supports multiple AI backends:

**Option 1: Ollama (Local, Free, Privacy-First)**
```javascript
// Already integrated in src/utils/ollamaAPI.js
import { generatePRD } from './utils/ollamaAPI';

const prd = await generatePRD(formData);
```

**Option 2: Cloud AI APIs**
```javascript
// OpenAI GPT-4
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }]
  })
});

// Anthropic Claude
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': API_KEY,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json'
  },
  body: JSON.stringify({
    model: "claude-3-sonnet-20240229",
    messages: [{ role: "user", content: prompt }]
  })
});
```

### AI Integration Comparison

| Option | Cost | Privacy | Setup | Speed | Quality |
|--------|------|---------|-------|-------|---------|
| **Ollama (Phi-3)** | Free | 100% Private | Medium | Fast | ⭐⭐⭐⭐ |
| OpenAI GPT-4 | $$$$ | Cloud | Easy | Fast | ⭐⭐⭐⭐⭐ |
| Anthropic Claude | $$$ | Cloud | Easy | Fast | ⭐⭐⭐⭐⭐ |
| Simulated | Free | N/A | None | Instant | ⭐⭐ |

### Benefits of AI Integration
- ⚡ **Speed**: Generate PRDs in minutes vs. hours
- 🎯 **Consistency**: Standardized format across all documents
- 💡 **Insights**: Data-driven recommendations
- 🔄 **Iteration**: Quick refinements and updates
- 📊 **Analysis**: Deep competitive and market insights
- 🔒 **Privacy**: With Ollama, keep all data local
- 💰 **Cost-Effective**: Free local AI with Ollama

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory:
```bash
cd AI-PM
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and visit:
```
http://localhost:3000
```

## 🌐 Deployment to Netlify

This project is **100% ready for Netlify deployment** with zero configuration needed!

### Quick Deploy Options:

**Option 1: One-Click Deploy**
```bash
npm run build
netlify deploy --prod
```

**Option 2: GitHub Integration**
1. Push to GitHub
2. Connect repository in [Netlify Dashboard](https://app.netlify.com/)
3. Auto-deploys on every push

**Option 3: Drag & Drop**
1. Run `npm run build`
2. Drag `build` folder to [Netlify Drop](https://app.netlify.com/drop)

✅ Includes `netlify.toml` with:
- Client-side routing support
- Security headers
- Asset caching optimization
- Automatic redirects

📖 See [NETLIFY_DEPLOY.md](NETLIFY_DEPLOY.md) for detailed deployment guide.

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + B** - Toggle sidebar
- **Enter** - Submit search query
- **Escape** - Close notifications/overlays

## 🎮 User Interface Features

### Collapsible Sidebar
- **Closed State**: Icon-only navigation (70px width) for maximum screen space
- **Open State**: Full navigation with labels (260px width)
- **Click Logo**: Expand sidebar by clicking the PM-Pro logo when closed
- **Close Button**: Visible inside sidebar when open for easy collapse
- **AI Model Switcher**: Dropdown in sidebar footer to switch between 4 AI models instantly
- **Mobile Friendly**: Tap outside overlay to close on mobile devices

### Smart Header
- **Adaptive Positioning**: Automatically adjusts left position based on sidebar state
- **Search Bar**: Real-time search with clear button and keyboard support
- **Notifications**: Dropdown with unread counter, mark as read functionality
- **Theme Toggle**: Switch between dark/light modes
- **Proper Spacing**: Maintains optimal padding between sidebar and content

## 📱 Features Overview

### Dashboard
- Quick stats and metrics
- Recent activity feed
- Quick action cards
- AI insights banner

### PRD Generator
- Product details input form
- AI-powered PRD generation
- Multi-section document output
- Markdown export functionality

### User Stories
- Epic/feature description
- Persona selection
- Acceptance criteria generation
- Story status management

### Feature Prioritization
- RICE scoring methodology
- Interactive sliders
- Visual comparisons
- Radar and bar charts

### Product Roadmap
- **Create Custom Milestones**: Add quarters (Q1, Q2, etc.) with title and status
- **Progress Tracking**: Set and visualize progress percentage for each milestone
- **Feature Management**: Add multiple features/items to each milestone
- **Edit & Delete**: Full CRUD operations on roadmap milestones
- **Timeline Visualization**: Beautiful alternating timeline layout
- **Status Management**: Track Planned, In Progress, and Completed states
- **Dynamic Statistics**: Auto-calculated overview of total milestones, features, and progress
- **Empty State Guidance**: Helpful prompts when starting fresh
- **Responsive Modal Forms**: Glassmorphism-styled forms matching app theme

### Competitive Analysis
- Competitor research
- Feature comparison
- Market share analysis
- AI recommendations

## 🎯 Use Cases

Perfect for demonstrating:
- ✅ Product Management expertise
- ✅ AI integration capabilities
- ✅ Modern React development
- ✅ UI/UX design skills
- ✅ Data visualization
- ✅ Full-stack thinking

## 📈 Resume Benefits

This project showcases:
1. **Technical Skills**: React 18, modern JavaScript ES6+, responsive CSS
2. **PM Knowledge**: PRDs, user stories, RICE scoring, roadmaps, competitive analysis
3. **Design Sense**: Modern UI/UX, accessibility, responsive design
4. **AI Integration**: Smart automation and intelligent recommendations
5. **Product Thinking**: End-to-end product development workflow
6. **Attention to Detail**: Smooth animations, keyboard shortcuts, proper spacing
7. **User Experience**: Intuitive navigation, mobile-first approach

## 🔮 Future Enhancements

- ✅ Ollama integration for local AI (Setup guide included!)
- Real AI API integration (OpenAI, Anthropic, Google Gemini)
- User authentication and user accounts
- Cloud storage integration (Google Drive, Dropbox)
- Collaborative features (team workspaces)
- Export to Jira/Asana/Linear
- Analytics tracking and usage insights
- Version control for PRDs and documents
- Template library for common PM scenarios

## 📄 License

This project is created for portfolio and educational purposes.

## 👨‍💻 Author

Built with ❤️ for Tech Product Managers who code

---

## 🎯 Key Improvements in Latest Version

- ✅ Rebranded to PM-Pro for professional appeal
- ✅ Intelligent sidebar with click-to-expand functionality
- ✅ Dynamic header that adapts to sidebar state
- ✅ Proper spacing and padding for optimal content visibility
- ✅ Removed distracting animations (logo rotation)
- ✅ Enhanced accessibility with keyboard navigation
- ✅ Fixed compilation issues and improved code quality
- ✅ Better mobile experience with overlay interactions
- ✅ Interactive roadmap creation with full CRUD operations
- ✅ Custom milestone management with progress tracking
- ✅ Glassmorphism-styled modal forms matching app theme
- ✅ Ollama AI integration with UI-based model selection
- ✅ Live model switcher in sidebar (next to "AI Active" status)
- ✅ Support for 4 popular open-source models (Phi-3, Gemma, Mistral, Llama 2)
- ✅ Persistent model selection with localStorage (remembers your choice)
- ✅ Zero-configuration AI: Switch models instantly from the sidebar dropdown

---

**Note**: This application currently uses simulated AI responses. For production use, integrate with actual AI APIs like OpenAI's GPT-4 or Anthropic's Claude.
