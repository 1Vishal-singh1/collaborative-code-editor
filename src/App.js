import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RoomSelection from './RoomSelection';
import CollaborativeEditor from './CollaborativeEditor';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomSelection/>} />
        <Route path="/room/:roomId" element={<CollaborativeEditor/>} />
      </Routes>
    </BrowserRouter>
  );
}
