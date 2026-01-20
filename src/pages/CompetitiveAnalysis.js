import React, { useState } from 'react';
import { TrendingUp, Search, Sparkles } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './CompetitiveAnalysis.css';

const CompetitiveAnalysis = () => {
  const [productName, setProductName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeCompetition = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const analysisData = {
      product: productName,
      competitors: [
        {
          name: 'Asana',
          marketShare: 28,
          pricing: '$10.99/user/month',
          features: 8.5,
          ux: 9.0,
          performance: 8.0,
          support: 7.5,
          integration: 9.5,
          strengths: ['Excellent UX', 'Strong integrations', 'Robust features'],
          weaknesses: ['Expensive at scale', 'Learning curve for advanced features']
        },
        {
          name: 'Monday.com',
          marketShare: 24,
          pricing: '$9/user/month',
          features: 9,
          ux: 8.5,
          performance: 8.5,
          support: 8,
          integration: 8.5,
          strengths: ['Highly customizable', 'Great visualizations', 'Good value'],
          weaknesses: ['Can feel overwhelming', 'Performance issues with large boards']
        },
        {
          name: 'Trello',
          marketShare: 22,
          pricing: '$5/user/month',
          features: 6.5,
          ux: 9.5,
          performance: 9.0,
          support: 6.5,
          integration: 7.5,
          strengths: ['Very simple to use', 'Affordable', 'Fast performance'],
          weaknesses: ['Limited features', 'Not suitable for complex projects']
        },
        {
          name: 'ClickUp',
          marketShare: 18,
          pricing: '$7/user/month',
          features: 9.5,
          ux: 7.0,
          performance: 7.0,
          support: 7.5,
          integration: 8.0,
          strengths: ['Feature-rich', 'Competitive pricing', 'All-in-one solution'],
          weaknesses: ['Complex UI', 'Steep learning curve']
        }
      ],
      recommendations: [
        'Focus on AI-powered automation to differentiate from competitors',
        'Offer competitive pricing between $6-8/user/month',
        'Prioritize UX simplicity while maintaining powerful features',
        'Build strong integration ecosystem from day one',
        'Provide excellent onboarding and customer support'
      ]
    };

    setAnalysis(analysisData);
    setIsAnalyzing(false);
  };

  const radarData = analysis?.competitors.map(c => ({
    competitor: c.name,
    Features: c.features,
    UX: c.ux,
    Performance: c.performance,
    Support: c.support,
    Integration: c.integration
  }));

  const marketShareData = analysis?.competitors.map(c => ({
    name: c.name,
    'Market Share': c.marketShare
  }));

  return (
    <div className="competitive-analysis fade-in">
      <div className="page-header">
        <h1 className="page-title">
          <TrendingUp className="title-icon" />
          AI Competitive Analysis
        </h1>
        <p className="page-subtitle">
          Get intelligent insights about your competitive landscape
        </p>
      </div>

      <div className="analysis-content">
        {/* Input Section */}
        <div className="search-section card">
          <h2 className="section-heading">
            <Search className="section-icon" />
            Product Analysis
          </h2>
          
          <div className="search-form">
            <input
              type="text"
              className="input"
              placeholder="Enter your product name or category (e.g., Project Management Tool)..."
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <button
              className="btn btn-primary"
              onClick={analyzeCompetition}
              disabled={isAnalyzing || !productName}
            >
              {isAnalyzing ? (
                <>
                  <div className="spinner"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles />
                  Analyze Competition
                </>
              )}
            </button>
          </div>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <>
            {/* Competitors Grid */}
            <div className="competitors-section">
              <h2 className="section-heading">Top Competitors</h2>
              <div className="competitors-grid">
                {analysis.competitors.map((competitor, index) => (
                  <div key={index} className="competitor-card card">
                    <div className="competitor-header">
                      <h3 className="competitor-name">{competitor.name}</h3>
                      <span className="market-share">{competitor.marketShare}% market</span>
                    </div>

                    <div className="competitor-pricing">
                      <span className="pricing-label">Pricing</span>
                      <span className="pricing-value">{competitor.pricing}</span>
                    </div>

                    <div className="competitor-metrics">
                      <div className="metric">
                        <span className="metric-label">Features</span>
                        <span className="metric-value">{competitor.features}/10</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">UX</span>
                        <span className="metric-value">{competitor.ux}/10</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Performance</span>
                        <span className="metric-value">{competitor.performance}/10</span>
                      </div>
                    </div>

                    <div className="competitor-analysis">
                      <div className="analysis-section">
                        <h4 className="analysis-title success">Strengths</h4>
                        <ul>
                          {competitor.strengths.map((strength, idx) => (
                            <li key={idx}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="analysis-section">
                        <h4 className="analysis-title error">Weaknesses</h4>
                        <ul>
                          {competitor.weaknesses.map((weakness, idx) => (
                            <li key={idx}>{weakness}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visualizations */}
            <div className="charts-section">
              <div className="chart-card card">
                <h2 className="section-heading">Feature Comparison</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="competitor" stroke="#b8b8d1" />
                    <PolarRadiusAxis stroke="#b8b8d1" domain={[0, 10]} />
                    {analysis.competitors.map((c, index) => {
                      const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b'];
                      return (
                        <Radar
                          key={c.name}
                          name={c.name}
                          dataKey="Features"
                          stroke={colors[index]}
                          fill={colors[index]}
                          fillOpacity={0.3}
                        />
                      );
                    })}
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

              <div className="chart-card card">
                <h2 className="section-heading">Market Share Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={marketShareData}>
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
                    <Bar dataKey="Market Share" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recommendations */}
            <div className="recommendations-card card">
              <h2 className="section-heading">
                <Sparkles className="section-icon" />
                AI-Powered Recommendations
              </h2>
              <div className="recommendations-list">
                {analysis.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-item">
                    <div className="recommendation-number">{index + 1}</div>
                    <p className="recommendation-text">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CompetitiveAnalysis;
