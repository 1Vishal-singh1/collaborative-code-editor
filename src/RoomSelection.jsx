import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoomSelection() {
  const [roomId, setRoomId] = useState('');
  const history = useNavigate();

  const handleJoinRoom = () => {
    // Navigate to the room with the provided room ID
    history(`/room/${roomId}`);
  };

  const handleCreateRoom = () => {
    // Generate a random room ID and navigate to it
    const newRoomId = Math.random().toString(36).substr(2, 7);
    history(`/room/${newRoomId}`);
  };

  return (
    <div>
    <h2>Collaborative Code Editor</h2>
    <input
      type="text"
      placeholder="Enter Room ID"
      value={roomId}
      onChange={(e) => setRoomId(e.target.value)}
    />
    <button onClick={handleJoinRoom}>Join Room</button>
    <button onClick={handleCreateRoom}>Create New Room</button>
  </div>
  );
}
