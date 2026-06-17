import {
  ShieldCheck,
  Briefcase,
  Award,
  Users,
  BookOpen,
  Building2,
} from "lucide-react";

const About = () => {
  return (
    <section className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 opacity-95"></div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="max-w-4xl">
            <span className="inline-block px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium">
              Trusted Tax Publications
            </span>

            <h1 className="mt-6 text-5xl lg:text-6xl font-bold leading-tight">
              Empowering Tax Professionals With
              <span className="text-amber-400"> Reliable Knowledge</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-relaxed">
              We specialize in publishing premium taxation, corporate,
              accounting and legal reference books designed for Chartered
              Accountants, Tax Practitioners, Advocates, Corporate Consultants
              and Business Professionals.
            </p>
          </div>
        </div>
      </div>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-amber-500 font-semibold uppercase tracking-wider">
              About Our Publication
            </span>

            <h2 className="mt-4 text-4xl font-bold text-slate-900">
              Excellence In Tax & Legal Publications
            </h2>

            <p className="mt-6 text-slate-600 leading-relaxed">
              Our mission is to provide comprehensive and practical guidance on
              Pakistan's taxation and corporate laws through professionally
              researched publications. Our books are widely used by Chartered
              Accountants, Tax Consultants, Lawyers, Corporate Executives and
              Finance Professionals.
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Every publication is carefully prepared to simplify complex legal
              and taxation matters, helping professionals stay compliant,
              informed and ahead of regulatory changes.
            </p>
          </div>

          <div className="bg-slate-50 p-10 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Why Professionals Trust Us
            </h3>

            <div className="space-y-5">
              <div className="flex gap-4">
                <ShieldCheck className="text-amber-500" size={28} />
                <div>
                  <h4 className="font-semibold">Authentic Content</h4>
                  <p className="text-slate-600">
                    Updated according to latest tax laws and regulations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Award className="text-amber-500" size={28} />
                <div>
                  <h4 className="font-semibold">Professional Standards</h4>
                  <p className="text-slate-600">
                    Developed for serious practitioners and professionals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Users className="text-amber-500" size={28} />
                <div>
                  <h4 className="font-semibold">Trusted By Experts</h4>
                  <p className="text-slate-600">
                    Preferred by accountants, lawyers and tax consultants.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-lg transition">
            <BookOpen className="text-amber-500 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2">Premium Books</h3>
            <p className="text-slate-600">
              Detailed publications covering tax and corporate laws.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-lg transition">
            <Briefcase className="text-amber-500 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2">Professional Focus</h3>
            <p className="text-slate-600">
              Designed specifically for practitioners and firms.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-lg transition">
            <Building2 className="text-amber-500 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2">Corporate Solutions</h3>
            <p className="text-slate-600">
              Practical guidance for business and corporate compliance.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:shadow-lg transition">
            <Award className="text-amber-500 mb-4" size={40} />
            <h3 className="font-bold text-xl mb-2">Quality Assurance</h3>
            <p className="text-slate-600">
              Accurate, reliable and professionally reviewed content.
            </p>
          </div>
        </div>

        {/* Stats */}
        
      </div>
    </section>
  );
};

export default About;