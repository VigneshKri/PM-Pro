import React, { useState } from 'react';
import { Sparkles, FileText, Download, Wand2, CheckCircle } from 'lucide-react';
import './PRDGenerator.css';

const PRDGenerator = () => {
  const [formData, setFormData] = useState({
    productName: '',
    problemStatement: '',
    targetAudience: '',
    keyFeatures: '',
    competitors: '',
    timeline: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPRD, setGeneratedPRD] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePRD = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const prd = {
      title: formData.productName || 'Untitled Product',
      sections: [
        {
          title: '1. Executive Summary',
          content: `${formData.productName} is a revolutionary solution designed to address ${formData.problemStatement}. This product targets ${formData.targetAudience} and aims to deliver significant value through innovative features and user-centric design. Our competitive analysis shows strong market opportunities against ${formData.competitors}.`
        },
        {
          title: '2. Problem Statement',
          content: formData.problemStatement || 'Define the core problem this product solves'
        },
        {
          title: '3. Target Users & Personas',
          content: `Primary Audience: ${formData.targetAudience}\n\nUser Persona 1: Early Adopter Emma\n- Age: 28-35\n- Tech-savvy professional\n- Values: Efficiency, innovation, seamless experiences\n\nUser Persona 2: Business Leader Bob\n- Age: 40-50\n- Decision maker\n- Values: ROI, reliability, scalability`
        },
        {
          title: '4. Key Features & Requirements',
          content: formData.keyFeatures + '\n\nTechnical Requirements:\n- Cloud-native architecture\n- RESTful API design\n- Mobile-first responsive design\n- Enterprise-grade security\n- Real-time analytics dashboard'
        },
        {
          title: '5. Success Metrics & KPIs',
          content: '- User Acquisition: 10,000 users in first quarter\n- Engagement Rate: 60% DAU/MAU ratio\n- Customer Satisfaction: NPS score > 50\n- Revenue: $500K ARR by end of year\n- Feature Adoption: 70% of users using core features'
        },
        {
          title: '6. Competitive Analysis',
          content: `Primary Competitors: ${formData.competitors}\n\nOur Competitive Advantages:\n- Superior UX/UI design\n- AI-powered automation\n- Better pricing model\n- Faster implementation\n- Superior customer support`
        },
        {
          title: '7. Timeline & Milestones',
          content: `Target Timeline: ${formData.timeline}\n\nPhase 1 (Months 1-2): Discovery & Design\nPhase 2 (Months 3-4): MVP Development\nPhase 3 (Month 5): Beta Testing\nPhase 4 (Month 6): Launch & Marketing`
        },
        {
          title: '8. Risks & Mitigation',
          content: 'Risk 1: Market Competition\nMitigation: Differentiate through superior UX and AI features\n\nRisk 2: Technical Complexity\nMitigation: Phased rollout with extensive testing\n\nRisk 3: User Adoption\nMitigation: Comprehensive onboarding and customer success program'
        }
      ],
      generatedAt: new Date().toISOString()
    };
    
    setGeneratedPRD(prd);
    setIsGenerating(false);
  };

  const downloadPRD = () => {
    const content = `# ${generatedPRD.title}\n\n${generatedPRD.sections.map(s => `## ${s.title}\n\n${s.content}`).join('\n\n')}`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedPRD.title.replace(/\s+/g, '-')}.md`;
    a.click();
  };

  return (
    <div className="prd-generator fade-in">
      <div className="page-header">
        <h1 className="page-title">
          <FileText className="title-icon" />
          AI PRD Generator
        </h1>
        <p className="page-subtitle">
          Create comprehensive Product Requirement Documents in minutes with AI assistance
        </p>
      </div>

      <div className="prd-content">
        <div className="input-section card">
          <h2 className="section-heading">
            <Wand2 className="section-icon" />
            Product Details
          </h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                name="productName"
                className="input"
                placeholder="e.g., Smart Task Manager"
                value={formData.productName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Timeline</label>
              <input
                type="text"
                name="timeline"
                className="input"
                placeholder="e.g., 6 months"
                value={formData.timeline}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Problem Statement *</label>
              <textarea
                name="problemStatement"
                className="input textarea"
                placeholder="Describe the problem your product solves..."
                value={formData.problemStatement}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Target Audience *</label>
              <textarea
                name="targetAudience"
                className="input textarea"
                placeholder="Who are your primary users? Demographics, behaviors, needs..."
                value={formData.targetAudience}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Key Features *</label>
              <textarea
                name="keyFeatures"
                className="input textarea"
                placeholder="List the main features and capabilities..."
                value={formData.keyFeatures}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Main Competitors</label>
              <input
                type="text"
                name="competitors"
                className="input"
                placeholder="e.g., Asana, Trello, Monday.com"
                value={formData.competitors}
                onChange={handleChange}
              />
            </div>
          </div>

          <button 
            className="btn btn-primary generate-btn"
            onClick={generatePRD}
            disabled={isGenerating || !formData.productName || !formData.problemStatement}
          >
            {isGenerating ? (
              <>
                <div className="spinner"></div>
                Generating PRD...
              </>
            ) : (
              <>
                <Sparkles />
                Generate PRD with AI
              </>
            )}
          </button>
        </div>

        {generatedPRD && (
          <div className="output-section card">
            <div className="output-header">
              <div>
                <h2 className="section-heading">
                  <CheckCircle className="section-icon success" />
                  Generated PRD
                </h2>
                <p className="output-subtitle">
                  Review and download your AI-generated Product Requirement Document
                </p>
              </div>
              <button className="btn btn-secondary" onClick={downloadPRD}>
                <Download />
                Download PRD
              </button>
            </div>

            <div className="prd-document">
              <h1 className="doc-title">{generatedPRD.title}</h1>
              
              {generatedPRD.sections.map((section, index) => (
                <div key={index} className="doc-section">
                  <h2 className="doc-section-title">{section.title}</h2>
                  <p className="doc-content">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PRDGenerator;
