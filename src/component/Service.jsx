import {
  BookOpen,
  Scale,
  Briefcase,
  FileText,
  GraduationCap,
  RefreshCcw,
  ShieldCheck,
  Library,
} from "lucide-react";

const services = [
  {
    icon: BookOpen,
    title: "Tax Publications",
    desc: "Comprehensive publications covering Income Tax, Sales Tax, PRA, Customs and Federal Excise Laws.",
  },
  {
    icon: RefreshCcw,
    title: "Annual Updating Service",
    desc: "Regular amendments, notifications, circulars and legal updates delivered throughout the year.",
  },
  {
    icon: Scale,
    title: "Case Law Compilations",
    desc: "Carefully compiled landmark judgments and case laws for tax and legal professionals.",
  },
  {
    icon: Briefcase,
    title: "Corporate Compliance Guides",
    desc: "Practical compliance manuals for companies, tax practitioners and consultants.",
  },
  {
    icon: Library,
    title: "Legal Reference Library",
    desc: "Extensive legal reference material for advocates, accountants and researchers.",
  },
  {
    icon: GraduationCap,
    title: "Professional Learning Resources",
    desc: "Study material designed for CA, ACCA, CMA, ICMA and Law students.",
  },
  {
    icon: FileText,
    title: "Research Publications",
    desc: "Detailed technical commentary and analysis on Pakistan tax laws.",
  },
  {
    icon: ShieldCheck,
    title: "Professional Support",
    desc: "Reliable information resources trusted by firms and tax professionals.",
  },
];

const Services = () => {
  return (
    <div className="bg-[#08111f] text-white min-h-screen">

      {/* Hero Section */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-blue-500/10" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
            Trusted Legal & Tax Publications
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-bold leading-tight">
            Professional <span className="text-amber-400">Services</span>
          </h1>

          <p className="mt-6 max-w-3xl mx-auto text-slate-300 text-lg">
            Delivering premium tax publications, legal references,
            annual updating services and professional knowledge resources
            for Chartered Accountants, Advocates, Consultants and Students.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="group bg-slate-900/70 backdrop-blur-sm border border-slate-800 rounded-3xl p-8 hover:border-amber-500 transition duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-6">
                  <Icon size={34} />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  {service.title}
                </h3>

                <p className="text-slate-400 leading-relaxed text-sm">
                  {service.desc}
                </p>
              </div>
            );
          })}

        </div>
      </section>

      {/* Statistics */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>
              <h3 className="text-5xl font-bold text-amber-400">
                20+
              </h3>
              <p className="mt-3 text-slate-400">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-amber-400">
                10K+
              </h3>
              <p className="mt-3 text-slate-400">
                Publications Sold
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-amber-400">
                5K+
              </h3>
              <p className="mt-3 text-slate-400">
                Professional Clients
              </p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-amber-400">
                100%
              </h3>
              <p className="mt-3 text-slate-400">
                Updated Content
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-amber-500 to-yellow-400 rounded-3xl p-14 text-center text-black">

          <h2 className="text-4xl font-bold">
            Looking for Professional Tax Publications?
          </h2>

          <p className="mt-4 text-lg">
            Access trusted legal and tax resources used by
            Chartered Accountants, Advocates and Tax Consultants.
          </p>

          <button className="mt-8 px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-slate-800 transition">
            Explore Publications
          </button>

        </div>
      </section>

    </div>
  );
};

export default Services;