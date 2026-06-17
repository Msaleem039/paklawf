import { BookOpen, Users, Scale, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">

          <div>
            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-4 py-2 rounded-full text-sm">
              Pakistan's Trusted Legal Publisher
            </span>

            <h1 className="text-5xl lg:text-5xl font-bold leading-tight mt-6">
              Pak 
              <span className="text-amber-400"> Law Publications </span>
            </h1>

            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              Access the latest legal publications, tax laws, court rules,
              legal manuals and professional references trusted by legal
              practitioners across Pakistan.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to="/books"
                className="bg-amber-500 hover:bg-amber-600 px-7 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                Browse Books
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="border border-gray-700 hover:border-amber-500 px-7 py-3 rounded-lg"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://i.pinimg.com/736x/79/1b/90/791b90fada00ceef89eff9de3a679577.jpg"
              alt="Law Books"
              className="rounded-2xl shadow-2xl h-[600px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">

        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-14">
            Why Choose Pak Law Publication?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
              <BookOpen className="text-amber-400 mb-5" size={42} />
              <h3 className="text-2xl font-semibold mb-3">
                Latest Publications
              </h3>
              <p className="text-gray-400">
                Updated editions covering current legal developments,
                amendments and case law.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
              <Scale className="text-amber-400 mb-5" size={42} />
              <h3 className="text-2xl font-semibold mb-3">
                Trusted Legal Content
              </h3>
              <p className="text-gray-400">
                Reliable references for advocates, judges, tax consultants and
                legal researchers.
              </p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
              <Users className="text-amber-400 mb-5" size={42} />
              <h3 className="text-2xl font-semibold mb-3">
                Thousands of Readers
              </h3>
              <p className="text-gray-400">
                Serving legal professionals and students across Pakistan.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-amber-400">
        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-4xl lg:text-5xl font-bold text-black">
            Explore Pakistan's Leading Legal Book Collection
          </h2>

          <p className="text-black/80 mt-5 text-lg">
            Discover professional law books, tax manuals, court rules,
            commentaries and legal references.
          </p>

          <button className="mt-8 bg-black text-white px-8 py-4 rounded-lg font-semibold">
            Shop Now
          </button>

        </div>
      </section>

    </div>
  );
};

export default Home;