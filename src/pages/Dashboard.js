import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, 
  TrendingUp, 
  Users, 
  FileText, 
  Target,
  ArrowRight,
  Sparkles,
  BarChart3
} from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Active PRDs', value: '12', change: '+3', icon: FileText, color: '#6366f1' },
    { label: 'User Stories', value: '84', change: '+15', icon: Users, color: '#8b5cf6' },
    { label: 'Features Prioritized', value: '28', change: '+7', icon: Target, color: '#f59e0b' },
    { label: 'AI Insights', value: '156', change: '+42', icon: Sparkles, color: '#10b981' },
  ];

  const quickActions = [
    {
      title: 'Generate PRD',
      description: 'Create comprehensive product requirement documents with AI',
      icon: FileText,
      color: '#6366f1',
      path: '/prd-generator'
    },
    {
      title: 'Create User Stories',
      description: 'Auto-generate user stories with acceptance criteria',
      icon: Users,
      color: '#ec4899',
      path: '/user-stories'
    },
    {
      title: 'Prioritize Features',
      description: 'Use AI-powered RICE scoring and analysis',
      icon: BarChart3,
      color: '#f59e0b',
      path: '/prioritization'
    },
    {
      title: 'Build Roadmap',
      description: 'Visualize your product timeline and milestones',
      icon: TrendingUp,
      color: '#10b981',
      path: '/roadmap'
    },
  ];

  const recentActivity = [
    { action: 'Generated PRD', item: 'Mobile App Redesign', time: '2 hours ago', status: 'completed' },
    { action: 'Created User Stories', item: 'Payment Integration', time: '5 hours ago', status: 'completed' },
    { action: 'Prioritized Features', item: 'Q1 2026 Features', time: '1 day ago', status: 'completed' },
    { action: 'Updated Roadmap', item: 'H1 2026 Product Plan', time: '2 days ago', status: 'completed' },
  ];

  return (
    <div className="dashboard fade-in">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">
            <Zap className="title-icon" />
            AI Product Manager
          </h1>
          <p className="page-subtitle">
            Streamline your product management workflow with intelligent automation
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card card">
            <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
              <stat.icon />
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-change" style={{ color: stat.color }}>
                {stat.change} this week
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <div 
              key={action.path} 
              className="action-card card"
              onClick={() => navigate(action.path)}
              onKeyDown={(e) => e.key === 'Enter' && navigate(action.path)}
              role="button"
              tabIndex={0}
              style={{ '--action-color': action.color }}
            >
              <div className="action-icon" style={{ background: `${action.color}20`, color: action.color }}>
                <action.icon />
              </div>
              <h3 className="action-title">{action.title}</h3>
              <p className="action-description">{action.description}</p>
              <div className="action-arrow">
                <ArrowRight />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="section">
        <h2 className="section-title">Recent Activity</h2>
        <div className="activity-list card">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-status"></div>
              <div className="activity-content">
                <div className="activity-action">{activity.action}</div>
                <div className="activity-item-name">{activity.item}</div>
              </div>
              <div className="activity-time">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Banner */}
      <div className="ai-banner card">
        <div className="ai-banner-icon">
          <Sparkles />
        </div>
        <div className="ai-banner-content">
          <h3>AI-Powered Insights Available</h3>
          <p>Get intelligent recommendations for your product strategy based on market trends and user feedback</p>
        </div>
        <button className="btn btn-primary">View Insights</button>
      </div>
    </div>
  );
};

export default Dashboard;
