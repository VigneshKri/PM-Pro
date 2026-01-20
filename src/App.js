import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PRDGenerator from './pages/PRDGenerator';
import UserStories from './pages/UserStories';
import FeaturePrioritization from './pages/FeaturePrioritization';
import Roadmap from './pages/Roadmap';
import CompetitiveAnalysis from './pages/CompetitiveAnalysis';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Keyboard shortcut: Ctrl/Cmd + B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <div className={`app ${darkMode ? 'dark' : 'light'}`}>
        <Sidebar isOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className={`main-content ${sidebarOpen ? 'shifted' : ''}`}>
          <Header 
            darkMode={darkMode} 
            setDarkMode={setDarkMode}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/prd-generator" element={<PRDGenerator />} />
              <Route path="/user-stories" element={<UserStories />} />
              <Route path="/prioritization" element={<FeaturePrioritization />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/competitive-analysis" element={<CompetitiveAnalysis />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
