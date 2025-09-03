import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Upload, Users, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // poll the contacts count via API
    let mounted = true;
    async function fetchCount() {
      try {
        const res = await fetch("/api/contacts/count");
        const json = await res.json();
        if (mounted && json?.count !== undefined) setCount(json.count);
      } catch {}
    }
    fetchCount();
    const t = setInterval(fetchCount, 5000);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  const testimonials = [
    {
      name: "Aisha",
      role: "Product Designer",
      result: "Got the PDF instantly.",
      rating: 5,
    },
    {
      name: "Chinedu",
      role: "Software Engineer",
      result: "Smooth upload and export.",
      rating: 5,
    },
    {
      name: "Zainab",
      role: "Marketer",
      result: "The community is buzzing!",
      rating: 4,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* HERO SECTION */}
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-extrabold"
          >
            Welcome to <span className="text-accent">Ralph Xpert VCF</span>
          </motion.h1>
          <p className="text-sm text-gray-300 mt-4">
            Collect contacts quickly, export as .vcf or PDF, and share with your
            community. Admins can manage everything from the dashboard.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/upload">
              <a className="inline-flex items-center gap-2 btn-primary px-4 py-2 rounded-2xl shadow">
                <Upload size={16} /> Upload
              </a>
            </Link>
            {/* ✅ Removed Community button */}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card rounded-2xl p-6"
        >
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/3">
              <div className="text-sm text-gray-300">Total Contacts</div>
              <div className="text-xl font-semibold mt-2">{count}</div>
            </div>
            <div className="p-4 rounded-xl bg-white/3">
              <div className="text-sm text-gray-300">Export</div>
              <div className="text-xl font-semibold mt-2">VCF / PDF</div>
            </div>
            <div className="p-4 rounded-xl bg-white/3">
              <div className="text-sm text-gray-300">Theme</div>
              <div className="text-xl font-semibold mt-2">Dark • Green</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="mt-16">
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
