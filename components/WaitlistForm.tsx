'use client'
import React, { useState } from 'react';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { FaEnvelope, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const supabase = supabaseBrowser();

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }]);

      if (error) throw error;

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Error joining waitlist:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-background text-foreground p-6 rounded-lg shadow-md">
      <div className="flex items-center border border-border rounded-md overflow-hidden">
        <span className="px-3">
          <FaEnvelope className="text-yellow-500" />
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="w-full px-4 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors disabled:opacity-50 flex items-center justify-center"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            Joining...
          </>
        ) : (
          'Join Waitlist'
        )}
      </button>
      {status === 'success' && (
        <div className="flex items-center text-green-600">
          <FaCheckCircle className="mr-2" />
          Successfully joined the waitlist!
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center text-red-600">
          <FaExclamationCircle className="mr-2" />
          Error joining waitlist. Please try again.
        </div>
      )}
    </form>
  );
}