import React, { useState } from 'react';
import { BarChart3, Sparkles, TrendingUp, Plus, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import './FeaturePrioritization.css';

const FeaturePrioritization = () => {
  const [features, setFeatures] = useState([
    {
      id: 1,
      name: 'AI-Powered Search',
      reach: 8,
      impact: 9,
      confidence: 7,
      effort: 5,
      riceScore: 0
    },
    {
      id: 2,
      name: 'Mobile App',
      reach: 9,
      impact: 8,
      confidence: 6,
      effort: 9,
      riceScore: 0
    },
    {
      id: 3,
      name: 'Analytics Dashboard',
      reach: 6,
      impact: 7,
      confidence: 8,
      effort: 4,
      riceScore: 0
    },
    {
      id: 4,
      name: 'Social Integration',
      reach: 7,
      impact: 6,
      confidence: 7,
      effort: 3,
      riceScore: 0
    }
  ]);

  const [newFeature, setNewFeature] = useState({
    name: '',
    reach: 5,
    impact: 5,
    confidence: 5,
    effort: 5
  });

  const calculateRICE = (reach, impact, confidence, effort) => {
    return ((reach * impact * confidence) / effort).toFixed(2);
  };

  const calculateAll = () => {
    const updated = features.map(f => ({
      ...f,
      riceScore: parseFloat(calculateRICE(f.reach, f.impact, f.confidence, f.effort))
    })).sort((a, b) => b.riceScore - a.riceScore);
    setFeatures(updated);
  };

  const addFeature = () => {
    if (!newFeature.name) return;
    
    const feature = {
      id: Date.now(),
      ...newFeature,
      riceScore: parseFloat(calculateRICE(
        newFeature.reach,
        newFeature.impact,
        newFeature.confidence,
        newFeature.effort
      ))
    };
    
    setFeatures([...features, feature].sort((a, b) => b.riceScore - a.riceScore));
    setNewFeature({ name: '', reach: 5, impact: 5, confidence: 5, effort: 5 });
  };

  const removeFeature = (id) => {
    setFeatures(features.filter(f => f.id !== id));
  };

  const chartData = features.map(f => ({
    name: f.name,
    'RICE Score': f.riceScore,
    Reach: f.reach,
    Impact: f.impact,
    Confidence: f.confidence,
    Effort: f.effort
  }));

  const radarData = features.map(f => ({
    feature: f.name.length > 15 ? f.name.substring(0, 15) + '...' : f.name,
    Reach: f.reach,
    Impact: f.impact,
    Confidence: f.confidence,
    Effort: 10 - f.effort
  }));

  return (
    <div className="feature-prioritization fade-in">
      <div className="page-header">
        <h1 className="page-title">
          <BarChart3 className="title-icon" />
          AI Feature Prioritization
        </h1>
        <p className="page-subtitle">
          Use RICE scoring framework enhanced with AI insights to prioritize features
        </p>
      </div>

      <div className="prioritization-content">
        {/* Add Feature Section */}
        <div className="add-feature-card card">
          <h2 className="section-heading">
            <Plus className="section-icon" />
            Add New Feature
          </h2>
          
          <div className="feature-form">
            <input
              type="text"
              className="input"
              placeholder="Feature name..."
              value={newFeature.name}
              onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
            />

            <div className="criteria-grid">
              {['reach', 'impact', 'confidence', 'effort'].map((criterion) => (
                <div key={criterion} className="criterion-input">
                  <label className="criterion-label">
                    {criterion.charAt(0).toUpperCase() + criterion.slice(1)}
                    <span className="criterion-value">{newFeature[criterion]}</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={newFeature[criterion]}
                    onChange={(e) => setNewFeature({ ...newFeature, [criterion]: parseInt(e.target.value) })}
                    className="range-slider"
                  />
                </div>
              ))}
            </div>

            <button className="btn btn-primary" onClick={addFeature}>
              <Plus />
              Add Feature
            </button>
          </div>
        </div>

        {/* Features List */}
        <div className="features-section card">
          <div className="section-header">
            <h2 className="section-heading">
              <TrendingUp className="section-icon" />
              Feature Rankings
            </h2>
            <button className="btn btn-secondary" onClick={calculateAll}>
              <Sparkles />
              Calculate RICE Scores
            </button>
          </div>

          <div className="features-list">
            {features.map((feature, index) => (
              <div key={feature.id} className="feature-item">
                <div className="feature-rank">{index + 1}</div>
                <div className="feature-details">
                  <h3 className="feature-name">{feature.name}</h3>
                  <div className="feature-metrics">
                    <span>Reach: {feature.reach}</span>
                    <span>Impact: {feature.impact}</span>
                    <span>Confidence: {feature.confidence}</span>
                    <span>Effort: {feature.effort}</span>
                  </div>
                </div>
                <div className="feature-score">
                  <div className="score-value">{feature.riceScore}</div>
                  <div className="score-label">RICE Score</div>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFeature(feature.id)}
                  aria-label="Remove feature"
                >
                  <X />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Visualizations */}
        {features.some(f => f.riceScore > 0) && (
          <>
            <div className="chart-card card">
              <h2 className="section-heading">RICE Score Comparison</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#b8b8d1" />
                  <YAxis stroke="#b8b8d1" />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#1a1a2e', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="RICE Score" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-card card">
              <h2 className="section-heading">Feature Attributes Comparison</h2>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="feature" stroke="#b8b8d1" />
                  <PolarRadiusAxis stroke="#b8b8d1" />
                  <Radar name="Reach" dataKey="Reach" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                  <Radar name="Impact" dataKey="Impact" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                  <Radar name="Confidence" dataKey="Confidence" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} />
                  <Tooltip 
                    contentStyle={{ 
                      background: '#1a1a2e', 
                      border: '1px solid #333',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeaturePrioritization;
