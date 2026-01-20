import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  BarChart3, 
  Map, 
  TrendingUp,
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, setSidebarOpen }) => {
  const [selectedModel, setSelectedModel] = useState('phi3');

  const models = [
    { id: 'phi3', name: 'Phi-3 Mini', value: 'phi3' },
    { id: 'gemma', name: 'Gemma 2B', value: 'gemma:2b' },
    { id: 'mistral', name: 'Mistral 7B', value: 'mistral' },
    { id: 'llama2', name: 'Llama 2 7B', value: 'llama2' }
  ];

  // Load saved model from localStorage on mount
  useEffect(() => {
    const savedModel = localStorage.getItem('selectedModel');
    if (savedModel) {
      setSelectedModel(savedModel);
    }
  }, []);

  // Save model to localStorage and update global config
  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);
    localStorage.setItem('selectedModel', newModel);
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('modelChanged', { 
      detail: { model: newModel } 
    }));
  };
  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard', color: '#6366f1' },
    { path: '/prd-generator', icon: FileText, label: 'PRD Generator', color: '#8b5cf6' },
    { path: '/user-stories', icon: Users, label: 'User Stories', color: '#ec4899' },
    { path: '/prioritization', icon: BarChart3, label: 'Prioritization', color: '#f59e0b' },
    { path: '/roadmap', icon: Map, label: 'Roadmap', color: '#10b981' },
    { path: '/competitive-analysis', icon: TrendingUp, label: 'Competitive Analysis', color: '#06b6d4' },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setSidebarOpen(false)}
          role="button"
          tabIndex={-1}
          aria-label="Close sidebar"
        />
      )}
      
      <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div 
            className="logo" 
            onClick={() => !isOpen && setSidebarOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && !isOpen && setSidebarOpen(true)}
            style={{ cursor: isOpen ? 'default' : 'pointer' }}
          >
            <Sparkles className="logo-icon" />
            {isOpen && <span className="logo-text">PM-Pro</span>}
          </div>
          
          {/* Close button visible only when sidebar is open */}
          {isOpen && (
            <button 
              className="sidebar-toggle-btn"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <ChevronLeft />
            </button>
          )}
        </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            style={{ '--item-color': item.color }}
          >
            <item.icon className="nav-icon" />
            {isOpen && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {isOpen && (
          <div className="ai-status-container">
            <div className="ai-status">
              <div className="ai-pulse"></div>
              <span>AI Active</span>
            </div>
            <div className="model-selector">
              <select 
                value={selectedModel} 
                onChange={handleModelChange}
                className="model-dropdown"
                aria-label="Select AI model"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.value}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Sidebar;
