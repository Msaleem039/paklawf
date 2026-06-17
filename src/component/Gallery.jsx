import { ImageIcon } from "lucide-react";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ImageIcon size={32} className="text-amber-400" />
          <h1 className="text-4xl font-bold">Gallery</h1>
        </div>

        <p className="text-gray-400 mb-12">
          Browse our featured collection of law books, publications, and
          resources curated for legal professionals and students.
        </p>

        <div className="grid gap-6 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl"
            >
              <div className="h-64 bg-[url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center" />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">Featured Law Book</h2>
                <p className="text-gray-400 text-sm">
                  Explore key publications, case law summaries, and research
                  materials used by top attorneys.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
