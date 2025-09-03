import { useEffect, useState } from "react";
import { Shield, Trash2, Download, FileText, LogOut } from "lucide-react";

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  async function checkAuth() {
    try {
      const res = await fetch("/api/admin/check");
      if (res.ok) setAuthed(true);
      else setAuthed(false);
    } catch { setAuthed(false); }
  }

  useEffect(()=>{ checkAuth(); loadContacts(); }, []);

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {"content-type":"application/json"},
      body: JSON.stringify({ username: user, password: pass })
    });
    setLoading(false);
    if (res.ok) {
      setAuthed(true);
      loadContacts();
    } else {
      const j = await res.json();
      alert(j?.error || "Login failed");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setContacts([]);
  }

  async function loadContacts() {
    try {
      const res = await fetch("/api/contacts");
      const j = await res.json();
      if (res.ok) setContacts(j.contacts || []);
    } catch {}
  }

  async function deleteOne(id) {
    if (!confirm("Delete contact?")) return;
    const res = await fetch("/api/delete", { method: "POST", headers: {"content-type":"application/json"}, body: JSON.stringify({ id }) });
    if (res.ok) loadContacts();
    else alert("Failed");
  }

  async function deleteAll() {
    if (!confirm("Delete ALL contacts?")) return;
    const res = await fetch("/api/deleteAll", { method: "POST" });
    if (res.ok) loadContacts();
    else alert("Failed");
  }

  function downloadVCF() {
    // navigate to API route which returns a file
    window.location.href = "/api/export-vcf";
  }
  function downloadPDF() {
    window.location.href = "/api/export-pdf";
  }

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold inline-flex items-center gap-2"><Shield size={18}/> Admin Login</h2>
        <form onSubmit={login} className="mt-4 grid gap-3">
          <input placeholder="username" value={user} onChange={e=>setUser(e.target.value)} className="px-4 py-3 rounded-xl bg-bgsoft border border-white/10"/>
          <input placeholder="password" type="password" value={pass} onChange={e=>setPass(e.target.value)} className="px-4 py-3 rounded-xl bg-bgsoft border border-white/10"/>
          <button type="submit" className="btn-primary px-4 py-2 rounded-2xl">{loading ? "..." : "Login"}</button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold inline-flex items-center gap-2"><Shield size={18}/> Admin Dashboard</h2>
        <div className="flex items-center gap-2">
          <button onClick={downloadVCF} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10"><Download size={16}/> Download VCF</button>
          <button onClick={downloadPDF} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10"><FileText size={16}/> Download PDF</button>
          <button onClick={deleteAll} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10"><Trash2 size={16}/> Delete All</button>
          <button onClick={logout} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10"><LogOut size={16}/> Logout</button>
        </div>
      </div>

      <div className="mt-6 card rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-300/80">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Created</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c,i)=>(<tr key={c.id} className="odd:bg-white/[0.02]">
              <td className="px-4 py-2">{i+1}</td>
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2">{c.phone}</td>
              <td className="px-4 py-2">{new Date(c.created_at).toLocaleString()}</td>
              <td className="px-4 py-2">
                <button onClick={()=>deleteOne(c.id)} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10"> <Trash2 size={14}/> Delete</button>
              </td>
            </tr>))}
            {contacts.length===0 && <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400">No contacts yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
