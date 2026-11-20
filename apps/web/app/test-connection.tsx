'use client';

import { useEffect, useState } from 'react';

const ENGINE_URL = process.env.NEXT_PUBLIC_ENGINE_URL || 'http://localhost:8000';

export default function TestConnection() {
  const [backendStatus, setBackendStatus] = useState<'loading' | 'online' | 'offline' | 'error'>('loading');
  const [transcription, setTranscription] = useState<any>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${ENGINE_URL}/health`);
        if (res.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch {
        setBackendStatus('offline');
      }
    };

    checkHealth();
  }, []);

  const handleTranscribe = async () => {
    try {
      const res = await fetch(`${ENGINE_URL}/process-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ video_url: 'test' }),
      });
      const data = await res.json();
      setTranscription(data);
    } catch (e) {
      console.error('Error:', e);
    }
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h2>Test Connection Component</h2>
      <p>Backend Status: <strong>{backendStatus}</strong></p>
      <button 
        onClick={handleTranscribe}
        style={{ 
          background: backendStatus === 'offline' ? '#666' : '#00F0FF',
          color: '#06070B',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          cursor: backendStatus === 'offline' ? 'not-allowed' : 'pointer'
        }}
        disabled={backendStatus !== 'online'}
      >
        Test Transcription
      </button>
      {transcription && (
        <pre style={{ marginTop: '20px', background: '#181B26', padding: '10px' }}>
          {JSON.stringify(transcription, null, 2)}
        </pre>
      )}
    </div>
  );
}