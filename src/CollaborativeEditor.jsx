import React, { useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { MonacoBinding } from 'y-monaco';
import { useParams } from 'react-router-dom';

export default function CollaborativeEditor() {
    let params = useParams();
    let match = params.roomId;
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    const doc = new Y.Doc();
    const provider = new WebrtcProvider(match, doc);
    const type = doc.getText('monaco');
    new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), provider.awareness);
  }

  return (
    <Editor
      height="100vh"
      width="100vw"
      theme="vs-dark"
      onMount={handleEditorDidMount}
    />
  );
}
