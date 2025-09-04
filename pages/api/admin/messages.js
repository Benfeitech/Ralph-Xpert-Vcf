// pages/admin/messages.js
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminMessages() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [messages, setMessages] = useState([]);

  async function handleLogin(e) {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setUnlocked(true);
      await loadMessages();
    } else {
      alert("❌ Wrong password");
    }
  }

  async function loadMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase fetch error:", error);
    } else {
      setMessages(data || []);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {!unlocked ? (
        <form
          onSubmit={handleLogin}
          className="max-w-sm mx-auto p-6 rounded-xl bg-gray-900 shadow"
        >
          <h1 className="text-xl font-bold mb-4 text-center">🔑 Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
          />
          <button
            type="submit"
            className="mt-4 w-full bg-green-600 py-2 rounded-xl font-semibold hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      ) : (
        <div>
          <h1 className="text-2xl font-bold mb-6">📩 Submitted Messages</h1>
          {messages.length === 0 ? (
            <p className="text-gray-400">No messages yet.</p>
          ) : (
            <div className="space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-xl bg-gray-800 text-white border border-gray-700"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{m.full_name}</h3>
                    <span className="text-xs text-gray-400">
                      {new Date(m.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    {m.email} {m.phone && `| ${m.phone}`}
                  </p>
                  <p className="mt-2 text-green-400 font-medium">{m.subject}</p>
                  <p className="mt-1">{m.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
        }
    
