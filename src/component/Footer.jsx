import { Link } from "react-router-dom";
import {
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Clock,
  Globe,
  ArrowUpRight,
} from "lucide-react";

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Books", path: "/books" },
  { name: "Services", path: "/services" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const categories = [
  { name: "Income Tax", path: "/category/income-tax" },
  { name: "Sales Tax", path: "/category/sales-tax" },
  { name: "PRA Laws", path: "/category/pra-laws" },
  { name: "Customs Laws", path: "/category/customs-laws" },
  { name: "Labour Laws", path: "/category/labour-laws" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#060d18] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border border-amber-500/30 flex items-center justify-center bg-amber-500/10">
                <img src="/logo.jpeg" alt="Pak Law Publication" className="w-8 h-8 rounded-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Pak Law Publication</h3>
                <p className="text-xs text-slate-400">Trusted Legal Publisher</p>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed">
              Pakistan&apos;s leading source for tax laws, legal manuals, court rules,
              and professional publications for lawyers, accountants, and students.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-black flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-amber-400 text-sm transition flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-5">
              Categories
            </h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link
                    to={category.path}
                    className="text-slate-400 hover:text-amber-400 text-sm transition"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-5">
              Contact Info
            </h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-amber-400 mt-0.5 shrink-0" />
                <span>0300-8848226</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-amber-400 mt-0.5 shrink-0" />
                <a href="https://paklawpublication.com/" className="hover:text-amber-400 transition">
                  paklawpublication.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-amber-400 mt-0.5 shrink-0" />
                <span>Lahore, Punjab, Pakistan</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-amber-400 mt-0.5 shrink-0" />
                <span>Mon – Sat, 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 flex items-center gap-2">
            <BookOpen size={14} className="text-amber-400" />
            © {currentYear} Pak Law Publication. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <Link to="/about" className="hover:text-amber-400 transition">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-amber-400 transition">Terms of Service</Link>
            <Link to="/admin/login" className="hover:text-amber-400 transition">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
