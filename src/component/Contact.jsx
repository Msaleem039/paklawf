import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
} from "lucide-react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="bg-[#08111f] text-white min-h-screen">

      {/* Hero */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
            Contact Our Team
          </span>

          <h1 className="mt-6 text-5xl md:text-6xl font-bold">
            Get In <span className="text-amber-400">Touch</span>
          </h1>

          <p className="mt-6 text-slate-300 text-lg">
            Contact us for publications, annual updating services,
            subscriptions and professional tax references.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left */}
          <div>
            <h2 className="text-3xl font-bold mb-8">
              Contact Information
            </h2>

            <div className="space-y-6">

              <div className="flex gap-4">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400">
                  <Phone />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Phone Number
                  </h3>
                  <p className="text-slate-400">
                    03008848226
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400">
                  <Mail />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Website Address
                  </h3>
                  <p className="text-slate-400">
                    https://paklawpublication.com/
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400">
                  <MapPin />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Office Address
                  </h3>
                  <p className="text-slate-400">
                    Lahore, Punjab, Pakistan
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-400">
                  <Clock />
                </div>

                <div>
                  <h3 className="font-semibold text-lg">
                    Working Hours
                  </h3>
                  <p className="text-slate-400">
                    Monday - Saturday
                    <br />
                    09:00 AM - 06:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Send a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 outline-none focus:border-amber-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 outline-none focus:border-amber-500"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 outline-none focus:border-amber-500"
              />

              <textarea
                rows="6"
                name="message"
                placeholder="Write your message..."
                value={form.message}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 outline-none focus:border-amber-500"
              />

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-black py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>

          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;