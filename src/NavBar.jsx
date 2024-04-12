import React from 'react';
import './NavBar.css'; // Import CSS file for styling

export default function NavBar({ creator, joinedUsers }) {
  return (
    <nav className="navbar-container">
      <div className="user-info">
        <span>Room Creator: {creator}</span>
      </div>
      <div className="user-dropdown">
        <span>Joined Users:</span>
        <ul>
          {joinedUsers && joinedUsers.length > 0 ? (
            joinedUsers.map((user, index) => (
              <li key={index}>{user}</li>
            ))
          ) : (
            <li>No users have joined yet</li>
          )}
        </ul>
      </div>
      <div className="user-count">
        <span>Total Users: {joinedUsers ? joinedUsers.length + 1 : 1}</span>
      </div>
    </nav>
  );
}
