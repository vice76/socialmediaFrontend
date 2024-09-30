import React, { useContext, useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Authcontext";
import Notification from "../notification/notification";
import "./topbar.css";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function Topbar() {
  const { user, handleLogout } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (user?.userId) {
      const socket = new SockJS(
        `https://social-mediabackend-0f30044bc180.herokuapp.com/ws`
      );
      const client = new Client({
        webSocketFactory: () => socket,
        onConnect: (frame) => {
          console.log("Connected: " + frame);
          client.subscribe(
            `/topic/notifications/${user.userId}`,
            (notification) => {
              setNotifications((prevNotifications) => [
                ...prevNotifications,
                notification.body,
              ]);
              console.log(notification.body);
            }
          );
        },
        debug: (str) => {
          console.log(str);
        },
      });

      client.activate();

      return () => {
        client.deactivate();
      };
    }
  }, [user.userId]);

  const handleClick = () => {
    handleLogout();
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Social Media App</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search for posts or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarlinks">
          <button onClick={handleClick}>Logout</button>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <NotificationsIcon onClick={toggleDropdown} />
            <span className="topbarIconBadge">{notifications.length}</span>
          </div>
        </div>

        <div className="topbarImg">
          <PersonIcon />
        </div>
        <div className="userName">{user.userName}</div>
      </div>
      {isDropdownOpen && (
        <Notification
          notifications={notifications}
          onClose={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
}
