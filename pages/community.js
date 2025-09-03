import { useEffect, useState } from "react";
import { MessageCircle, Users, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function CommunityPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch("/api/contacts/count");
        const json = await res.json();
        if (mounted && json?.count !== undefined) setCount(json.count);
      } catch {}
    }
    load();
    const t = setInterval(load, 5000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  const testimonials = [
    { name: "Aisha", role: "Product Designer", result: "Got the PDF instantly.", rating: 5 },
    { name: "Chinedu", role: "Software Engineer", result: "Smooth upload and export.", rating: 5 },
    { name: "Zainab", role: "Marketer", result: "The community is buzzing!", rating: 4 }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Community Section */}
      <h2 className="text-3xl font-extrabold">Welcome to Ralph Xpert Community</h2>
      <div className="mt-4 card rounded-xl p-4 flex items-center gap-4">
        <div className="relative">
          <div className="h-3 w-3 rounded-full bg-accent animate-ping" />
          <div className="h-3 w-3 rounded-full bg-accent absolute top-0 left-0" />
        </div>
        <div>
          <div className="font-medium">
            Live:{" "}
            <span className="text-accent font-semibold">{count}</span> people in VCF
          </div>
          <div className="text-sm text-gray-300 mt-2">
            Join our WhatsApp group where the VCF file will be dropped.
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mt-3 inline-flex items-center gap-2 btn-primary px-4 py-2 rounded-2xl"
          >
            <MessageCircle size={16} /> Join WhatsApp Group
          </a>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {testimonials.map((t) => (
            <motion.div
              whileHover={{ y: -6 }}
              key={t.name}
              className="card rounded-2xl p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-gray-300">{t.role}</div>
                </div>
                <div className="inline-flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm">{t.result}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
        }
    
