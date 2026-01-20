/**
 * Ollama API Integration
 * 
 * This utility provides integration with Ollama for local AI model inference.
 * Recommended model: Phi-3 Mini (3.8B parameters) - Fast, efficient, and high quality
 * 
 * Setup Instructions:
 * 1. Install Ollama: https://ollama.ai/download
 * 2. Pull the model: `ollama pull phi3`
 * 3. Start Ollama service (runs on http://localhost:11434 by default)
 * 4. Enable the integration by setting USE_OLLAMA = true below
 */

// Configuration
const OLLAMA_API_URL = 'http://localhost:11434/api/generate';
const MODEL_NAME = 'phi3'; // Alternative: 'mistral', 'llama2', 'gemma:2b'
const USE_OLLAMA = false; // Set to true to use Ollama, false for simulated responses

/**
 * Generate text using Ollama model
 * @param {string} prompt - The prompt to send to the model
 * @param {object} options - Optional parameters
 * @returns {Promise<string>} - Generated text
 */
export const generateWithOllama = async (prompt, options = {}) => {
  if (!USE_OLLAMA) {
    // Fallback to simulation if Ollama is not enabled
    return simulateAIResponse(prompt);
  }

  try {
    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: prompt,
        stream: false,
        options: {
          temperature: options.temperature || 0.7,
          top_p: options.top_p || 0.9,
          max_tokens: options.max_tokens || 2000,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;

  } catch (error) {
    console.error('Ollama API Error:', error);
    console.warn('Falling back to simulated response');
    return simulateAIResponse(prompt);
  }
};

/**
 * Generate PRD sections using Ollama
 * @param {object} formData - Product information
 * @returns {Promise<object>} - Generated PRD structure
 */
export const generatePRD = async (formData) => {
  const prompt = `Generate a comprehensive Product Requirements Document (PRD) for the following product:

Product Name: ${formData.productName}
Problem Statement: ${formData.problemStatement}
Target Audience: ${formData.targetAudience}
Key Features: ${formData.keyFeatures}
Competitors: ${formData.competitors}
Timeline: ${formData.timeline}

Please structure the PRD with the following sections:
1. Executive Summary (2-3 paragraphs)
2. Problem Statement (detailed analysis)
3. Target Users & Personas (define 2-3 user personas)
4. Key Features & Requirements (detailed feature list)
5. Success Metrics & KPIs (measurable goals)
6. Competitive Analysis (comparison with competitors)
7. Timeline & Milestones (phased approach)
8. Risks & Mitigation (identify key risks)

Format each section clearly and provide actionable details.`;

  const response = await generateWithOllama(prompt, { 
    temperature: 0.7,
    max_tokens: 3000 
  });

  // Parse the response into sections
  return parsePRDResponse(response, formData);
};

/**
 * Generate user stories using Ollama
 * @param {string} featureDescription - Feature/epic description
 * @param {string} persona - User persona type
 * @returns {Promise<array>} - Array of user stories
 */
export const generateUserStories = async (featureDescription, persona) => {
  const prompt = `As a product manager, generate 3-5 user stories for the following feature:

Feature Description: ${featureDescription}
User Persona: ${persona}

Format each user story as:
Title: [Brief title]
Story: As a [persona], I want [goal], so that [benefit]
Acceptance Criteria:
- [Criterion 1]
- [Criterion 2]
- [Criterion 3]

Priority: [High/Medium/Low]
Story Points: [1-13]`;

  const response = await generateWithOllama(prompt, { 
    temperature: 0.6,
    max_tokens: 1500 
  });

  return parseUserStories(response);
};

/**
 * Generate competitive analysis using Ollama
 * @param {array} competitors - List of competitors
 * @returns {Promise<object>} - Competitive analysis
 */
export const generateCompetitiveAnalysis = async (competitors) => {
  const prompt = `Analyze the following competitors and provide insights:

Competitors: ${competitors.join(', ')}

For each competitor, provide:
1. Key Strengths (3-4 points)
2. Weaknesses (3-4 points)
3. Feature comparison ratings (Features, UX, Performance, Integration, Support) on scale 1-10
4. Market positioning

Then provide strategic recommendations for our product.`;

  const response = await generateWithOllama(prompt, { 
    temperature: 0.6,
    max_tokens: 2000 
  });

  return parseCompetitiveAnalysis(response, competitors);
};

// Helper function to simulate AI response when Ollama is not available
const simulateAIResponse = async (prompt) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return "This is a simulated response. Enable Ollama integration by setting USE_OLLAMA = true and installing Ollama with the phi3 model.";
};

// Parse PRD response into structured format
const parsePRDResponse = (response, formData) => {
  // If using simulated response or Ollama is disabled, return structured default
  if (!USE_OLLAMA || response.includes('simulated response')) {
    return {
      title: formData.productName || 'Untitled Product',
      sections: [
        {
          title: '1. Executive Summary',
          content: `${formData.productName} addresses ${formData.problemStatement} for ${formData.targetAudience}. By leveraging ${formData.keyFeatures}, we aim to differentiate from ${formData.competitors} and deliver exceptional value.`
        },
        {
          title: '2. Problem Statement',
          content: formData.problemStatement || 'Define the core problem this product solves'
        },
        {
          title: '3. Target Users & Personas',
          content: `Primary Audience: ${formData.targetAudience}\n\nPersona 1: Tech-Savvy Professional\n- Values efficiency and innovation\n- Seeks seamless experiences\n\nPersona 2: Business Decision Maker\n- Focuses on ROI and scalability\n- Requires reliability and support`
        },
        {
          title: '4. Key Features & Requirements',
          content: `${formData.keyFeatures}\n\nTechnical Requirements:\n- Cloud-native architecture\n- RESTful API\n- Mobile-responsive design\n- Enterprise security\n- Real-time analytics`
        },
        {
          title: '5. Success Metrics & KPIs',
          content: '- User Acquisition: 10K users in Q1\n- Engagement: 60% DAU/MAU\n- NPS Score: >50\n- ARR: $500K by year-end\n- Feature Adoption: 70%'
        },
        {
          title: '6. Competitive Analysis',
          content: `Competitors: ${formData.competitors}\n\nOur Advantages:\n- Superior UX/UI\n- AI-powered features\n- Competitive pricing\n- Faster deployment\n- Better support`
        },
        {
          title: '7. Timeline & Milestones',
          content: `Timeline: ${formData.timeline}\n\nPhase 1 (Months 1-2): Discovery\nPhase 2 (Months 3-4): MVP Development\nPhase 3 (Month 5): Beta Testing\nPhase 4 (Month 6): Launch`
        },
        {
          title: '8. Risks & Mitigation',
          content: 'Risk: Market Competition\nMitigation: Unique AI features\n\nRisk: Technical Complexity\nMitigation: Phased rollout\n\nRisk: User Adoption\nMitigation: Onboarding program'
        }
      ],
      generatedAt: new Date().toISOString()
    };
  }

  // Parse Ollama response (implement actual parsing logic based on response format)
  const sections = response.split(/(?=\d+\.\s+[A-Z])/);
  return {
    title: formData.productName,
    sections: sections.map((section, index) => ({
      title: `${index + 1}. ${section.split('\n')[0].replace(/^\d+\.\s+/, '')}`,
      content: section.split('\n').slice(1).join('\n').trim()
    })).filter(s => s.content),
    generatedAt: new Date().toISOString()
  };
};

// Parse user stories response
const parseUserStories = (response) => {
  // Simplified parsing - implement based on actual response format
  return [
    {
      id: Date.now(),
      title: 'Story extracted from Ollama response',
      story: response.slice(0, 200),
      acceptanceCriteria: ['Criterion from AI', 'Criterion from AI', 'Criterion from AI'],
      priority: 'Medium',
      storyPoints: 5
    }
  ];
};

// Parse competitive analysis response
const parseCompetitiveAnalysis = (response, competitors) => {
  // Simplified parsing
  return {
    competitors: competitors.map(name => ({
      name,
      strengths: ['AI-generated strength 1', 'AI-generated strength 2'],
      weaknesses: ['AI-generated weakness 1', 'AI-generated weakness 2'],
      ratings: {
        features: 8,
        ux: 7,
        performance: 8,
        integration: 7,
        support: 8
      }
    })),
    recommendations: response.slice(0, 500)
  };
};

// Check if Ollama is available
export const checkOllamaStatus = async () => {
  try {
    const response = await fetch('http://localhost:11434/api/tags');
    return response.ok;
  } catch {
    return false;
  }
};

export default {
  generateWithOllama,
  generatePRD,
  generateUserStories,
  generateCompetitiveAnalysis,
  checkOllamaStatus
};
