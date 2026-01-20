import React, { useState } from 'react';
import { Map, Calendar, Plus, Edit2, Trash2, X, CheckCircle } from 'lucide-react';
import './Roadmap.css';

const Roadmap = () => {
  const [milestones, setMilestones] = useState([
    {
      id: 1,
      quarter: 'Q1 2026',
      title: 'Platform Foundation',
      status: 'In Progress',
      progress: 65,
      items: [
        { name: 'User Authentication System', status: 'Completed' },
        { name: 'Core Dashboard', status: 'In Progress' },
        { name: 'Analytics Integration', status: 'Planned' }
      ]
    },
    {
      id: 2,
      quarter: 'Q2 2026',
      title: 'AI Features Launch',
      status: 'Planned',
      progress: 0,
      items: [
        { name: 'AI-Powered Search', status: 'Planned' },
        { name: 'Smart Recommendations', status: 'Planned' },
        { name: 'Automated Insights', status: 'Planned' }
      ]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newMilestone, setNewMilestone] = useState({
    quarter: '',
    title: '',
    status: 'Planned',
    progress: 0,
    items: []
  });
  const [newItemName, setNewItemName] = useState('');

  const handleAddMilestone = () => {
    if (!newMilestone.quarter || !newMilestone.title) {
      alert('Please fill in quarter and title');
      return;
    }

    const milestone = {
      id: Date.now(),
      ...newMilestone,
      items: newMilestone.items.length > 0 ? newMilestone.items : [
        { name: 'Feature 1', status: 'Planned' }
      ]
    };

    if (editingId) {
      setMilestones(milestones.map(m => m.id === editingId ? { ...milestone, id: editingId } : m));
      setEditingId(null);
    } else {
      setMilestones([...milestones, milestone]);
    }

    resetForm();
  };

  const handleEditMilestone = (milestone) => {
    setNewMilestone({
      quarter: milestone.quarter,
      title: milestone.title,
      status: milestone.status,
      progress: milestone.progress,
      items: [...milestone.items]
    });
    setEditingId(milestone.id);
    setShowAddForm(true);
  };

  const handleDeleteMilestone = (id) => {
    if (window.confirm('Are you sure you want to delete this milestone?')) {
      setMilestones(milestones.filter(m => m.id !== id));
    }
  };

  const addItemToMilestone = () => {
    if (!newItemName.trim()) return;
    
    setNewMilestone({
      ...newMilestone,
      items: [...newMilestone.items, { name: newItemName, status: 'Planned' }]
    });
    setNewItemName('');
  };

  const removeItemFromMilestone = (index) => {
    setNewMilestone({
      ...newMilestone,
      items: newMilestone.items.filter((_, i) => i !== index)
    });
  };

  const resetForm = () => {
    setNewMilestone({
      quarter: '',
      title: '',
      status: 'Planned',
      progress: 0,
      items: []
    });
    setNewItemName('');
    setShowAddForm(false);
    setEditingId(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return '#10b981';
      case 'In Progress': return '#f59e0b';
      case 'Planned': return '#6366f1';
      default: return '#6c757d';
    }
  };

  const getItemStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'warning';
      case 'Planned': return 'primary';
      default: return 'secondary';
    }
  };

  return (
    <div className="roadmap fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Map className="title-icon" />
            Product Roadmap
          </h1>
          <p className="page-subtitle">
            Visualize your product timeline and strategic initiatives
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={20} />
          Add Milestone
        </button>
      </div>

      {/* Add/Edit Milestone Form */}
      {showAddForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{editingId ? 'Edit Milestone' : 'Add New Milestone'}</h2>
              <button className="icon-btn" onClick={resetForm}>
                <X />
              </button>
            </div>

            <div className="form-group">
              <label className="form-label">Quarter *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Q1 2026"
                value={newMilestone.quarter}
                onChange={(e) => setNewMilestone({ ...newMilestone, quarter: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Platform Foundation"
                value={newMilestone.title}
                onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-input"
                  value={newMilestone.status}
                  onChange={(e) => setNewMilestone({ ...newMilestone, status: e.target.value })}
                >
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Progress (%)</label>
                <input
                  type="number"
                  className="form-input"
                  min="0"
                  max="100"
                  value={newMilestone.progress}
                  onChange={(e) => setNewMilestone({ ...newMilestone, progress: Number.parseInt(e.target.value, 10) || 0 })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Features/Items</label>
              <div className="items-input">
                <input
                  type="text"
                  className="form-input"
                  placeholder="Add feature or item"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addItemToMilestone();
                    }
                  }}
                />
                <button 
                  className="btn btn-secondary"
                  onClick={addItemToMilestone}
                  type="button"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>
              
              {newMilestone.items.length > 0 && (
                <div className="items-list">
                  {newMilestone.items.map((item, index) => (
                    <div key={index} className="item-chip">
                      <span>{item.name}</span>
                      <button 
                        className="item-remove"
                        onClick={() => removeItemFromMilestone(index)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleAddMilestone}>
                <CheckCircle size={18} />
                {editingId ? 'Update Milestone' : 'Create Milestone'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Timeline View */}
      {milestones.length === 0 ? (
        <div className="empty-state card">
          <Map size={64} className="empty-icon" />
          <h3>No Milestones Yet</h3>
          <p>Create your first milestone to start building your product roadmap</p>
          <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
            <Plus size={20} />
            Add Your First Milestone
          </button>
        </div>
      ) : (
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className={`milestone-card card ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="milestone-marker" style={{ background: getStatusColor(milestone.status) }}>
                <Calendar />
              </div>

              <div className="milestone-content">
                <div className="milestone-header">
                  <div>
                    <div className="milestone-quarter">{milestone.quarter}</div>
                    <h3 className="milestone-title">{milestone.title}</h3>
                  </div>
                  <div className="milestone-actions">
                    <span 
                      className="milestone-status"
                      style={{ 
                        background: `${getStatusColor(milestone.status)}20`,
                        color: getStatusColor(milestone.status)
                      }}
                    >
                      {milestone.status}
                    </span>
                    <button 
                      className="icon-btn-small"
                      onClick={() => handleEditMilestone(milestone)}
                      title="Edit milestone"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="icon-btn-small delete"
                      onClick={() => handleDeleteMilestone(milestone.id)}
                      title="Delete milestone"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="milestone-progress">
                  <div className="progress-info">
                    <span>Progress</span>
                    <span className="progress-value">{milestone.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${milestone.progress}%`,
                        background: getStatusColor(milestone.status)
                      }}
                    ></div>
                  </div>
                </div>

                <div className="milestone-items">
                  {milestone.items.map((item, idx) => (
                    <div key={idx} className="milestone-item">
                      <span className={`item-status badge-${getItemStatusColor(item.status)}`}></span>
                      <span className="item-name">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Cards */}
      {milestones.length > 0 && (
        <div className="summary-section">
          <h2 className="section-heading">Roadmap Overview</h2>
          <div className="summary-grid">
            <div className="summary-card card">
              <div className="summary-icon" style={{ background: '#10b98120', color: '#10b981' }}>
                <Calendar />
              </div>
              <div className="summary-content">
                <div className="summary-value">{milestones.length}</div>
                <div className="summary-label">Total Milestones</div>
              </div>
            </div>

            <div className="summary-card card">
              <div className="summary-icon" style={{ background: '#6366f120', color: '#6366f1' }}>
                <Map />
              </div>
              <div className="summary-content">
                <div className="summary-value">{milestones.reduce((sum, m) => sum + m.items.length, 0)}</div>
                <div className="summary-label">Total Features</div>
              </div>
            </div>

            <div className="summary-card card">
              <div className="summary-icon" style={{ background: '#f59e0b20', color: '#f59e0b' }}>
                <Edit2 />
              </div>
              <div className="summary-content">
                <div className="summary-value">{milestones.filter(m => m.status === 'In Progress').length}</div>
                <div className="summary-label">In Progress</div>
              </div>
            </div>

            <div className="summary-card card">
              <div className="summary-icon" style={{ background: '#ec489920', color: '#ec4899' }}>
                <CheckCircle />
              </div>
              <div className="summary-content">
                <div className="summary-value">
                  {milestones.length > 0 ? Math.round(milestones.reduce((sum, m) => sum + m.progress, 0) / milestones.length) : 0}%
                </div>
                <div className="summary-label">Avg Progress</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
