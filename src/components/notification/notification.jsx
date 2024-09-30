import React from "react";
import "./notification.css";

const Notification = ({ notifications, onClose }) => {
  return (
    <div className="notificationDropdown">
      <div className="notificationHeader">
        <h4>Notifications</h4>
        <button onClick={onClose} className="closeButton">
          X
        </button>
      </div>
      {notifications.length === 0 ? (
        <div className="notificationEmpty">No notifications</div>
      ) : (
        notifications.map((notification, index) => (
          <div key={index} className="notificationItem">
            <span>{notification}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
