import { useEffect, useState } from "react";
import { MessageCircle, Users } from "lucide-react";

export default function Community() {
  const [count, setCount] = useState(0);

  useEffect(()=> {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/ralph_xpert/count");
        const json = await res.json();
        if (mounted && json?.count !== undefined) setCount(json.count);
      } catch {}
    }
    load();
    const t = setInterval(load, 5000);
    return ()=> { mounted=false; clearInterval(t); };
  },[]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-extrabold">Welcome to Ralph Xpert Community</h2>
      <div className="mt-4 card rounded-xl p-4 flex items-center gap-4">
        <div className="relative">
          <div className="h-3 w-3 rounded-full bg-accent animate-ping" />
          <div className="h-3 w-3 rounded-full bg-accent absolute top-0 left-0" />
        </div>
        <div>
          <div className="font-medium">Live: <span className="text-accent font-semibold">{count}</span> people in VCF</div>
          <div className="text-sm text-gray-300 mt-2">Join our WhatsApp group where the VCF file will be dropped.</div>
          <a href="#" onClick={(e)=>e.preventDefault()} className="mt-3 inline-flex items-center gap-2 btn-primary px-4 py-2 rounded-2xl">
            <MessageCircle size={16}/> Join WhatsApp Group
          </a>
        </div>
      </div>
    </div>
  );
}
