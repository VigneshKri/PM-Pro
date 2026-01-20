# Ollama Integration Guide for PM-Pro

## 🤖 What is Ollama?

Ollama is a free, open-source tool that lets you run large language models (LLMs) locally on your computer. No API keys, no cloud costs, complete privacy!

## 📦 Installation

### Step 1: Install Ollama

**macOS:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

Or download from: https://ollama.ai/download

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

**Windows:**
Download the installer from: https://ollama.ai/download

### Step 2: Verify Installation

```bash
ollama --version
```

## 🎯 Recommended Models for PM-Pro

### Option 1: Phi-3 Mini (RECOMMENDED) ⭐
- **Size**: 3.8B parameters (~2.3GB)
- **Speed**: Very fast
- **Quality**: Excellent for PM tasks
- **Install**:
```bash
ollama pull phi3
```

### Option 2: Mistral 7B
- **Size**: 7B parameters (~4.1GB)
- **Speed**: Fast
- **Quality**: High accuracy
- **Install**:
```bash
ollama pull mistral
```

### Option 3: Gemma 2B (Lightest)
- **Size**: 2B parameters (~1.4GB)
- **Speed**: Ultra-fast
- **Quality**: Good for quick tasks
- **Install**:
```bash
ollama pull gemma:2b
```

### Option 4: Llama 2 7B
- **Size**: 7B parameters (~3.8GB)
- **Speed**: Moderate
- **Quality**: Very reliable
- **Install**:
```bash
ollama pull llama2
```

## ⚙️ Configuration

### Step 1: Start Ollama Service

Ollama runs as a background service on `http://localhost:11434`

**Start service:**
```bash
ollama serve
```

Keep this terminal running while using PM-Pro.

### Step 2: Test the Model

```bash
ollama run phi3 "Write a brief product requirement summary"
```

### Step 3: Enable in PM-Pro

Open `src/utils/ollamaAPI.js` and update:

```javascript
const MODEL_NAME = 'phi3'; // or 'mistral', 'llama2', 'gemma:2b'
const USE_OLLAMA = true;   // Change from false to true
```

## 🚀 Usage in PM-Pro

Once enabled, Ollama will automatically handle:

### 1. PRD Generation
- Executive summaries
- Problem statements
- User personas
- Feature requirements
- Success metrics
- Competitive analysis
- Timeline planning

### 2. User Stories
- Story generation from features
- Acceptance criteria
- Story point estimation
- Priority assignment

### 3. Competitive Analysis
- Competitor strengths/weaknesses
- Market positioning
- Strategic recommendations

## 🔧 Advanced Configuration

### Adjust Model Parameters

In `src/utils/ollamaAPI.js`, modify generation settings:

```javascript
await generateWithOllama(prompt, { 
  temperature: 0.7,      // 0.1-1.0 (lower = more focused, higher = more creative)
  top_p: 0.9,           // 0.1-1.0 (nucleus sampling)
  max_tokens: 2000      // Maximum response length
});
```

### Performance Tuning

**For faster responses:**
- Use smaller models (gemma:2b, phi3)
- Reduce max_tokens
- Lower temperature

**For better quality:**
- Use larger models (mistral, llama2)
- Increase max_tokens
- Adjust temperature to 0.7-0.8

## 📊 Model Comparison

| Model | Size | Speed | Quality | Best For |
|-------|------|-------|---------|----------|
| Gemma 2B | 1.4GB | ⚡⚡⚡ | ⭐⭐⭐ | Quick tasks |
| Phi-3 Mini | 2.3GB | ⚡⚡⚡ | ⭐⭐⭐⭐⭐ | **Best overall** |
| Llama 2 7B | 3.8GB | ⚡⚡ | ⭐⭐⭐⭐ | Reliability |
| Mistral 7B | 4.1GB | ⚡⚡ | ⭐⭐⭐⭐⭐ | High accuracy |

## 🛠️ Troubleshooting

### Issue: "Connection refused"
**Solution**: Make sure Ollama service is running:
```bash
ollama serve
```

### Issue: "Model not found"
**Solution**: Pull the model first:
```bash
ollama pull phi3
```

### Issue: Slow responses
**Solutions**:
- Switch to a smaller model (gemma:2b or phi3)
- Close other applications
- Reduce max_tokens in configuration

### Issue: CORS errors in browser
**Solution**: Ollama automatically handles CORS for localhost. Ensure you're accessing the app from `http://localhost:3000`

## 🔄 Switching Models

To use a different model:

1. Pull the new model:
```bash
ollama pull mistral
```

2. Update `src/utils/ollamaAPI.js`:
```javascript
const MODEL_NAME = 'mistral';
```

3. Restart your React app:
```bash
npm start
```

## 📈 Benefits of Local AI

✅ **Privacy**: All data stays on your machine
✅ **Cost**: $0 - completely free
✅ **Speed**: No network latency (once model is loaded)
✅ **Offline**: Works without internet
✅ **Unlimited**: No API rate limits or quotas
✅ **Control**: Full control over model parameters

## 🎓 Learning Resources

- **Ollama Documentation**: https://github.com/ollama/ollama
- **Model Library**: https://ollama.ai/library
- **Community**: https://discord.gg/ollama

## 🔐 Privacy Note

When using Ollama:
- ✅ No data sent to external servers
- ✅ No API keys required
- ✅ Complete local processing
- ✅ Your product ideas stay private

## 🚦 Quick Start Commands

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Pull recommended model
ollama pull phi3

# Start service
ollama serve

# Test it
ollama run phi3 "Hello!"

# In PM-Pro: Enable USE_OLLAMA = true in src/utils/ollamaAPI.js
```

---

**Ready to use local AI in PM-Pro! 🎉**
