import React from 'react';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ notification, onSave, onClearNotification }) => {
  const getNotificationIcon = () => { //used this pattern here so that we can add more notification types in the future
    switch (notification.type) {
      case 'error':
        return '⚠️';
      case 'success':
        return '✅';
      default:
        return '';
    }
  };

  const getNotificationClass = () => {
    switch (notification.type) { //used this pattern here so that we can add more notification types in the future like warning, info, etc.
      case 'error':
        return 'notification-message error';
      case 'success':
        return 'notification-message success';
      default:
        return '';
    }
  };

  return (
    <div className="header">
      <h1>Flow Builder</h1>
      <div className="header-right">
        {notification.message && (
          <div className={getNotificationClass()}>
            <span className="notification-icon">{getNotificationIcon()}</span>
            <span className="notification-text">{notification.message}</span>
            <button className="notification-close" onClick={onClearNotification}>
              ×
            </button>
          </div>
        )}
      </div>
      <button className="save-button" onClick={onSave}>
        Save Changes
      </button>
    </div>
  );
};

export default Header; 