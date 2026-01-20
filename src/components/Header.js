import React, { useState, useEffect, useRef } from 'react';
import { Menu, Moon, Sun, Bell, Search, X } from 'lucide-react';
import './Header.css';

const Header = ({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'PRD Generated', message: 'Mobile App Redesign PRD is ready', time: '2 hours ago', read: false },
    { id: 2, title: 'User Stories Created', message: '5 new user stories added', time: '5 hours ago', read: false },
    { id: 3, title: 'Roadmap Updated', message: 'Q2 2026 milestones added', time: '1 day ago', read: true }
  ]);

  const notificationRef = useRef(null);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add search logic here - could filter/navigate based on query
      alert(`Search functionality: Looking for "${searchQuery}"\n\nThis would typically:\n- Search through PRDs\n- Filter user stories\n- Find features\n- Navigate to relevant pages`);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className={`header ${sidebarOpen ? 'shifted' : ''}`}>
      <div className="header-left">
        <button 
          className="icon-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <Menu />
        </button>
        
        <div className="search-bar">
          <Search className="search-icon" />
          <input 
            type="text" 
            placeholder="Search features, PRDs, stories..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          {searchQuery && (
            <button className="search-clear" onClick={clearSearch} aria-label="Clear search">
              <X />
            </button>
          )}
        </div>
      </div>

      <div className="header-right">
        <div className="notification-wrapper" ref={notificationRef}>
          <button 
            className="icon-btn" 
            aria-label="Notifications"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-header">
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <button className="mark-all-read" onClick={markAllAsRead}>
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="notifications-list">
                {notifications.length === 0 ? (
                  <div className="no-notifications">No notifications</div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                      onClick={() => markAsRead(notif.id)}
                      onKeyDown={(e) => e.key === 'Enter' && markAsRead(notif.id)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="notification-content">
                        <div className="notification-title">{notif.title}</div>
                        <div className="notification-message">{notif.message}</div>
                        <div className="notification-time">{notif.time}</div>
                      </div>
                      {!notif.read && <div className="unread-indicator"></div>}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
        
        <button 
          className="icon-btn"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun /> : <Moon />}
        </button>

        <div className="user-profile">
          <div className="avatar">
            <span>PM</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
