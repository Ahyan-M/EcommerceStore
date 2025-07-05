'use client';

import { useState } from 'react';

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const checkConfiguration = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout_sessions?debug=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: [] }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setDebugInfo(data);
      } else {
        setDebugInfo({ error: 'Failed to get debug info' });
      }
    } catch (error) {
      setDebugInfo({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-text mb-8">Debug Configuration</h1>
          
          <button
            onClick={checkConfiguration}
            disabled={loading}
            className="btn-primary mb-6"
          >
            {loading ? 'Checking...' : 'Check Configuration'}
          </button>

          {debugInfo && (
            <div className="bg-card border border-border-muted rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Configuration Status</h2>
              <pre className="text-sm text-text/80 overflow-auto">
                {JSON.stringify(debugInfo, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-8 bg-card border border-border-muted rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Common Issues</h2>
            <ul className="space-y-2 text-sm text-text/70">
              <li>• <strong>STRIPE_SECRET_KEY not configured:</strong> Add your Stripe secret key to Vercel environment variables</li>
              <li>• <strong>Stripe not initialized:</strong> Check if the secret key is valid</li>
              <li>• <strong>File system errors:</strong> The app now uses in-memory storage for serverless environments</li>
              <li>• <strong>Network errors:</strong> Check your internet connection and Vercel deployment status</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 