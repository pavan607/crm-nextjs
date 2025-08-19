'use client';
import { useState } from 'react';

export default function SendEmailPage() {
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    const res = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, cc, bcc, subject, text }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Send Email</h1>

      <label className="block mb-1 font-medium">To</label>
      <input
        type="email"
        placeholder="Recipient Email"
        className="border p-2 w-full mb-4"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />

      <label className="block mb-1 font-medium">CC</label>
      <input
        type="email"
        placeholder="CC Email"
        className="border p-2 w-full mb-4"
        value={cc}
        onChange={(e) => setCc(e.target.value)}
      />

      <label className="block mb-1 font-medium">BCC</label>
      <input
        type="email"
        placeholder="BCC Email"
        className="border p-2 w-full mb-4"
        value={bcc}
        onChange={(e) => setBcc(e.target.value)}
      />

      <label className="block mb-1 font-medium">Subject</label>
      <input
        type="text"
        placeholder="Subject"
        className="border p-2 w-full mb-4"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <label className="block mb-1 font-medium">Message</label>
      <textarea
        placeholder="Message content..."
        className="border p-2 w-full mb-4"
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>

      {message && (
        <p className={`mt-4 ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
