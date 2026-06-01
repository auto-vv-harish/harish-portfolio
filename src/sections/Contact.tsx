import emailjs from "@emailjs/browser";
import { useState } from "react";
import { supabase } from "../services/supabase";
import toast from "react-hot-toast";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastSubmitTime, setLastSubmitTime] =
  useState(0);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    const now = Date.now();

if (now - lastSubmitTime < 30000) {
  toast.error(
    "Please wait 30 seconds before sending another message."
  );
  return;
}
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobile.trim();
    const trimmedMessage = message.trim();

    // Name Validation
    if (trimmedName.length < 3) {
      toast.error(
        "Name must contain at least 3 characters"
      );
      return;
    }

    if (!/^[A-Za-z ]+$/.test(trimmedName)) {
      toast.error(
        "Name should contain only letters"
      );
      return;
    }

    // Email Validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      toast.error(
        "Please enter a valid email address"
      );
      return;
    }

    // Mobile Validation (Optional)
    if (
      trimmedMobile &&
      !/^[0-9]{10}$/.test(trimmedMobile)
    ) {
      toast.error(
        "Please enter a valid 10-digit mobile number"
      );
      return;
    }

    // Message Validation
    if (trimmedMessage.length < 10) {
      toast.error(
        "Message must contain at least 10 characters"
      );
      return;
    }

    if (trimmedMessage.length > 1000) {
      toast.error(
        "Message is too long"
      );
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("contacts")
      .insert([
        {
          name: trimmedName,
          email: trimmedEmail,
          mobile: trimmedMobile,
          message: trimmedMessage,
        },
      ]);

    if (error) {
      setLoading(false);
      toast.error(error.message);
      return;
    }

    try {
      // Notification Email to Harish
      await emailjs.send(
        "service_uwom8pf",
        "template_s7wr9sf",
        {
          name: trimmedName,
          email: trimmedEmail,
          mobile: trimmedMobile,
          message: trimmedMessage,
        },
        "nrmsOgj76QPY_0kAP"
      );

      // Auto Reply Email
      await emailjs.send(
        "service_uwom8pf",
        "template_xmvngom",
        {
          name: trimmedName,
          email: trimmedEmail,
        },
        "nrmsOgj76QPY_0kAP"
      );

      toast.success(
        "Message sent successfully!"
      );
      setLastSubmitTime(Date.now());
      setName("");
      setEmail("");
      setMobile("");
      setMessage("");
    } catch (emailError: any) {
      console.log(
        "EmailJS Error:",
        emailError
      );

      toast.error(
        emailError?.text ||
          "Email sending failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="max-w-4xl mx-auto px-6 py-24"
    >
      <h2 className="text-4xl font-bold text-center">
        Contact Me
      </h2>

      <p className="text-center text-gray-400 mt-4">
        Feel free to connect with me for
        opportunities, collaborations, or
        technical discussions.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-4"
      >
        <input
          type="text"
          placeholder="Your Name"
          minLength={3}
          maxLength={50}
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
          className="w-full p-4 rounded-lg bg-white/5 border border-white/10"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          className="w-full p-4 rounded-lg bg-white/5 border border-white/10"
        />

        <input
  type="tel"
  placeholder="Mobile Number (Optional)"
  value={mobile}
  onChange={(e) =>
    setMobile(
      e.target.value.replace(/\D/g, "")
    )
  }
  maxLength={10}
  className="w-full p-4 rounded-lg bg-white/5 border border-white/10"
/>
        <textarea
          placeholder="Your Message"
          rows={5}
          minLength={10}
          maxLength={1000}
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          required
          className="w-full p-4 rounded-lg bg-white/5 border border-white/10"
        />

        <button
          type="submit"
          disabled={
  loading ||
  !name.trim() ||
  !email.trim() ||
  !message.trim()
}
         className="bg-cyan-500 px-6 py-3 rounded-lg hover:bg-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Sending..."
            : "Send Message"}
        </button>
      </form>
    </section>
  );
}

export default Contact;