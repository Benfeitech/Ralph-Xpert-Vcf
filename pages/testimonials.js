import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Testimonials() {
  const items = [
    { name: "Aisha", role: "Product Designer", result: "Got the PDF instantly.", rating: 5 },
    { name: "Chinedu", role: "Software Engineer", result: "Smooth upload and export.", rating: 5 },
    { name: "Zainab", role: "Marketer", result: "The community is buzzing!", rating: 4 }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold">Testimonials</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {items.map(t => (
          <motion.div whileHover={{ y: -6 }} key={t.name} className="card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-300">{t.role}</div>
              </div>
              <div className="inline-flex gap-1">
                {Array.from({length:t.rating}).map((_,i)=>(<Star key={i} size={16} className="text-yellow-400"/>))}
              </div>
            </div>
            <p className="mt-3 text-sm">{t.result}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
