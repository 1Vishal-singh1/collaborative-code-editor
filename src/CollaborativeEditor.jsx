import React, { useRef, useEffect, useState } from 'react';
import { Editor } from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import { useParams } from 'react-router-dom';
import NavBar from './NavBar'; // Import the NavBar component

export default function CollaborativeEditor() {
  const { roomId } = useParams();
  const [users, setUsers] = useState([]);
  const editorRef = useRef(null);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const username = params.username;

    // Fetch users list from server (mocking data for demonstration)
    // Replace this with your actual logic to fetch users from the server
    const fetchUsers = async () => {
      // Mocking users list
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data.users);
    };

    fetchUsers();
  }, []);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    const doc = new Y.Doc();
    const provider = new WebrtcProvider(roomId, doc);
    const type = doc.getText('monaco');
    new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
  }

  return (
    <div>
       <NavBar users={users} />
      <Editor
        height="100vh"
        width="100vw"
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
