import { useState } from "react";
import { useRouter } from "next/router";
import { Upload as UploadIcon } from "lucide-react";

export default function Upload() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const router = useRouter();

  function sanitizePhone(p) {
    return (p || "").replace(/\D/g, "");
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setStatus("Please fill name and phone.");
      return;
    }
    setStatus("Uploading...");
    try {
      // 👇 ensure suffix always added
      const finalName = name.trim().endsWith("RXP")
        ? name.trim()
        : name.trim() + " RXP";

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: finalName, // 👈 send modified name
          phone: sanitizePhone(phone),
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setStatus(json?.error || "Upload failed");
      } else if (json.exists) {
        setStatus("Contact already exists.");
      } else {
        setStatus(
          "Contact uploaded successfully, redirecting to community page..."
        );
        setTimeout(() => router.push("/community"), 2500);
      }
    } catch (err) {
      setStatus("Upload failed.");
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold">Upload Contact</h2>
      <p className="text-sm text-gray-300 mt-2">
        Add your details to join Ralph Xpert community.
      </p>
      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        <label className="grid gap-1">
          <span className="text-sm text-gray-300">Full Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name..."
            className="px-4 py-3 rounded-xl bg-bgsoft border border-white/10 outline-none focus:ring-accent"
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm text-gray-300">Phone Number</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g +254xxx..."
            className="px-4 py-3 rounded-xl bg-bgsoft border border-white/10 outline-none focus:ring-accent"
          />
        </label>
        <div className="f
        
