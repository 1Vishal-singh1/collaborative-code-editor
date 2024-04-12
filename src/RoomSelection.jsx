import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RoomSelection.css'; // Import CSS file for styling

export default function RoomSelection() {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode
  const history = useNavigate();

  const handleJoinRoom = () => {
    if (roomId.trim() !== '') {
      // Save joined user to local storage
      localStorage.setItem('joinedUser', username);

      history(`/room/${roomId}?username=${username}`);
    }
  };

  const handleCreateRoom = () => {
    if (username.trim() !== '') {
      // Save room creator to local storage
      localStorage.setItem('roomCreator', username);

      const newRoomId = Math.random().toString(36).substr(2, 7);
      history(`/room/${newRoomId}?username=${username}`);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode state
  };

  return (
    <div className='room-color'>
    <div className={`backG-color ${darkMode ? 'dark-mode' : ''}`}>
      <div className="toggle-container mt-5 mr-10 ml-10">
        <button onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <div className="room-selection-container">
        <h2>Collaborative Code Editor</h2>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="room-options">
          <div>
            <input
              type="radio"
              id="join"
              name="roomOption"
              checked={selectedOption === 'join'}
              onChange={() => setSelectedOption('join')}
            />
            <label htmlFor="join">Join Room</label>
          </div>
          <div>
            <input
              type="radio"
              id="create"
              name="roomOption"
              checked={selectedOption === 'create'}
              onChange={() => setSelectedOption('create')}
            />
            <label htmlFor="create">Create Room</label>
          </div>
        </div>
        {selectedOption === 'join' && (
          <div>
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button onClick={handleJoinRoom}>Join Room</button>
          </div>
        )}
        {selectedOption === 'create' && (
          <button onClick={handleCreateRoom}>Create Room</button>
        )}
      </div>
    </div>
    </div>
  );
}
