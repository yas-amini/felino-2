import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import './Notification.css';

const Notification: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((n) => (
        <div 
          key={n.id} 
          className={`notification-item notification-${n.type}`}
          onClick={() => removeNotification(n.id)}
        >
          {n.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
