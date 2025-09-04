import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap,
  Upload,
  Users,
  Star,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Rocket,
  HelpCircle,
  MapPin,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [count, setCount] = useState(0);

  // ✅ Form state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
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

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      setStatus("✅ Message sent successfully!");
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } else {
      setStatus("❌ Failed to send. Try again.");
    }
  };

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

      {/* CONTACT SECTION */}
      <div className="mt-20">
        <div className="bg-green-600 text-center py-10 rounded-2xl shadow">
          <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
            <Phone /> Contact Ralph Xpert
          </h2>
          <p className="text-gray-100 mt-3 max-w-2xl mx-auto">
            Do you have a question, a project, or simply want to chat? Our team
            is here to support you in your digital growth.
          </p>
        </div>

        <div className="card mt-8 p-8 rounded-2xl">
          <h3 className="text-xl font-semibold flex items-center gap-2 text-green-400">
            <MessageCircle /> Send us a message
          </h3>
          <p className="text-gray-300 mb-6">
            Fill out the form below and we will get back to you as soon as
            possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Full name *</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+509 1234 5678"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm">Subject *</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              >
                <option value="">Choose a topic</option>
                <option>General Inquiry</option>
                <option>Project Discussion</option>
                <option>Support</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your request in detail..."
                rows="4"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-green-600 w-full py-3 rounded-xl font-semibold hover:bg-green-700 transition"
            >
              📩 Send message
            </button>
            {status && (
              <p className="mt-2 text-sm text-gray-300">{status}</p>
            )}
          </form>
        </div>
      </div>

      {/* CONTACT DETAILS SECTION */}
      <div className="contact-details-card">
        <h3>
          <MapPin size={20} className="location-icon" />
          Our contact details
        </h3>
        <p className="subtitle">
          Several ways to contact us according to your preferences.
        </p>

        <div className="contact-items-container">
          {/* Email Item */}
          <div className="contact-item">
            <Mail size={24} className="icon" />
            <div>
              <h4>E-mail</h4>
              <p className="value">elogekenguer@gmail.com</p>
              <p className="sub-value">Response within 24 hours</p>
            </div>
          </div>
          {/* Phone Item */}
          <div className="contact-item">
            <Phone size={24} className="icon" />
            <div>
              <h4>Phone</h4>
              <p className="value">+1 849 459 7173</p>
              <p className="sub-value">Mon-Fri 9am-6pm</p>
            </div>
          </div>
          {/* WhatsApp Item */}
          <div className="contact-item">
            <MessageCircle size={24} className="icon" />
            <div>
              <h4>WhatsApp</h4>
              <p className="value">+1 849 459 7173</p>
              <p className="sub-value">24/7 Available</p>
            </div>
          </div>
          {/* Schedules Item */}
          <div className="contact-item">
            <Clock size={24} className="icon" />
            <div>
              <h4>Schedules</h4>
              <p className="value">9am - 6pm</p>
              <p className="sub-value">Monday to Friday</p>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h3>
            <Rocket size={20} />
            Quick actions
          </h3>
          <div className="quick-actions-grid">
            <a
              href="https://wa.me/18494597173"
              target="_blank"
              rel="noopener noreferrer"
              className="quick-action-btn"
            >
              <MessageCircle size={16} /> WhatsApp Direct
            </a>
            <a href="tel:+18494597173" className="quick-action-btn">
              <Phone size={16} /> Call now
            </a>
            <a href="mailto:elogekenguer@gmail.com" className="quick-action-btn">
              <Mail size={16} /> Send an email
            </a>
            <Link href="/">
              <a className="quick-action-btn">🏠 Return to home</a>
            </Link>
          </div>
        </div>

        <div className="faq-section">
          <Link href="/faq">
            <a className="faq-link">
              <HelpCircle size={18} />
              Frequently Asked Questions
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
  
