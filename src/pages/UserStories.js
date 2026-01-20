import React, { useState } from 'react';
import { Users, Sparkles, Trash2, CheckSquare } from 'lucide-react';
import './UserStories.css';

const UserStories = () => {
  const [epic, setEpic] = useState('');
  const [persona, setPersona] = useState('end-user');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userStories, setUserStories] = useState([]);

  const personas = [
    { value: 'end-user', label: 'End User', color: '#6366f1' },
    { value: 'admin', label: 'Administrator', color: '#8b5cf6' },
    { value: 'developer', label: 'Developer', color: '#ec4899' },
    { value: 'manager', label: 'Manager', color: '#f59e0b' },
  ];

  const generateStories = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2500));

    const stories = [
      {
        id: 1,
        title: `Account Creation for ${persona}`,
        story: `As a ${persona}, I want to create an account easily so that I can access personalized features`,
        acceptanceCriteria: [
          'User can register with email and password',
          'Email verification is sent upon registration',
          'User profile is created with basic information',
          'Confirmation message is displayed after successful registration'
        ],
        priority: 'High',
        storyPoints: 5,
        status: 'Todo'
      },
      {
        id: 2,
        title: `Dashboard Access for ${persona}`,
        story: `As a ${persona}, I want to view a personalized dashboard so that I can quickly access relevant information`,
        acceptanceCriteria: [
          'Dashboard loads within 2 seconds',
          'Key metrics are displayed prominently',
          'Recent activity is shown',
          'Quick actions are easily accessible'
        ],
        priority: 'High',
        storyPoints: 8,
        status: 'Todo'
      },
      {
        id: 3,
        title: `Settings Management for ${persona}`,
        story: `As a ${persona}, I want to customize my settings so that the application works according to my preferences`,
        acceptanceCriteria: [
          'User can update profile information',
          'Notification preferences can be configured',
          'Privacy settings are adjustable',
          'Changes are saved automatically'
        ],
        priority: 'Medium',
        storyPoints: 5,
        status: 'Todo'
      },
      {
        id: 4,
        title: `Data Export for ${persona}`,
        story: `As a ${persona}, I want to export my data so that I can use it in other applications`,
        acceptanceCriteria: [
          'Multiple export formats available (CSV, JSON, PDF)',
          'Export process completes within 30 seconds',
          'Downloaded file contains all relevant data',
          'Export history is maintained'
        ],
        priority: 'Low',
        storyPoints: 3,
        status: 'Todo'
      },
      {
        id: 5,
        title: `Collaboration Features for ${persona}`,
        story: `As a ${persona}, I want to collaborate with team members so that we can work together efficiently`,
        acceptanceCriteria: [
          'Users can share resources with team members',
          'Real-time collaboration is supported',
          'Comments and feedback can be added',
          'Activity notifications are sent to relevant users'
        ],
        priority: 'High',
        storyPoints: 13,
        status: 'Todo'
      }
    ];

    setUserStories(stories);
    setIsGenerating(false);
  };

  const deleteStory = (id) => {
    setUserStories(userStories.filter(story => story.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setUserStories(userStories.map(story => 
      story.id === id ? { ...story, status: newStatus } : story
    ));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#f59e0b';
      case 'Low': return '#10b981';
      default: return '#6366f1';
    }
  };

  return (
    <div className="user-stories fade-in">
      <div className="page-header">
        <h1 className="page-title">
          <Users className="title-icon" />
          AI User Story Generator
        </h1>
        <p className="page-subtitle">
          Automatically generate user stories with acceptance criteria using AI
        </p>
      </div>

      <div className="stories-content">
        <div className="input-panel card">
          <h2 className="section-heading">
            <Sparkles className="section-icon" />
            Story Configuration
          </h2>

          <div className="form-group">
            <label className="form-label">Epic / Feature Description</label>
            <textarea
              className="input textarea"
              placeholder="Describe the epic or feature area (e.g., User Authentication System)..."
              value={epic}
              onChange={(e) => setEpic(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">User Persona</label>
            <div className="persona-grid">
              {personas.map((p) => (
                <div
                  key={p.value}
                  className={`persona-card ${persona === p.value ? 'selected' : ''}`}
                  onClick={() => setPersona(p.value)}
                  onKeyDown={(e) => e.key === 'Enter' && setPersona(p.value)}
                  role="button"
                  tabIndex={0}
                  style={{ '--persona-color': p.color }}
                >
                  <div className="persona-indicator"></div>
                  <span>{p.label}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            className="btn btn-primary"
            onClick={generateStories}
            disabled={isGenerating || !epic}
          >
            {isGenerating ? (
              <>
                <div className="spinner"></div>
                Generating Stories...
              </>
            ) : (
              <>
                <Sparkles />
                Generate User Stories
              </>
            )}
          </button>
        </div>

        {userStories.length > 0 && (
          <div className="stories-list">
            <div className="stories-header">
              <h2 className="section-heading">
                <CheckSquare className="section-icon success" />
                Generated Stories ({userStories.length})
              </h2>
            </div>

            <div className="stories-grid">
              {userStories.map((story) => (
                <div key={story.id} className="story-card card">
                  <div className="story-header">
                    <div className="story-meta">
                      <span 
                        className="priority-badge"
                        style={{ background: `${getPriorityColor(story.priority)}20`, color: getPriorityColor(story.priority) }}
                      >
                        {story.priority}
                      </span>
                      <span className="story-points">{story.storyPoints} pts</span>
                    </div>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteStory(story.id)}
                      aria-label="Delete story"
                    >
                      <Trash2 />
                    </button>
                  </div>

                  <h3 className="story-title">{story.title}</h3>
                  <p className="story-text">{story.story}</p>

                  <div className="acceptance-criteria">
                    <h4>Acceptance Criteria:</h4>
                    <ul>
                      {story.acceptanceCriteria.map((criteria, index) => (
                        <li key={index}>{criteria}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="story-footer">
                    <select
                      className="status-select"
                      value={story.status}
                      onChange={(e) => updateStatus(story.id, e.target.value)}
                    >
                      <option value="Todo">To Do</option>
                      <option value="InProgress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStories;
