import { useParams } from "react-router-dom";

const Category = () => {
  const { slug } = useParams();
  const title = slug?.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ") || "Category";

  return (
    <div className="bg-slate-950 text-white min-h-screen py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-slate-400 mb-8">
          Explore publications and materials for the {title} category.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
              <h2 className="text-xl font-semibold mb-2">{title} Resource {item}</h2>
              <p className="text-slate-400">
                A quick overview of {title} publications and resources for students and professionals.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
