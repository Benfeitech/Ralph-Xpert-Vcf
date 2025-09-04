// pages/api/messages.js
import { supabaseAdmin } from "../../lib/supabaseServer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { full_name, email, phone, subject, message } = req.body;

    // validate required fields
    if (!full_name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const { data, error } = await supabaseAdmin
        .from("messages")
        .insert([{ full_name, email, phone, subject, message }]);

      if (error) throw error;
      return res.status(200).json({ success: true, data });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
