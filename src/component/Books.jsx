import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ShoppingCart, Check } from "lucide-react";
import { useGetFoodListQuery } from "../store/hooks";
import { useCart } from "../Context/CartContext";
import { formatPrice, normalizeProduct } from "../utils/productUtils";

const fallbackBooks = [
  {
    id: 1,
    title: "PRA Provincial Sales Tax",
    category: "Sales Tax",
    price: "Rs. 3,800",
    Subscription: "Rs. 1,400",
    image: "/image/new.jpeg",
    rating: 5,
  },
  {
    id: 2,
    title: "Manual of Banking Laws",
    category: "Banking",
    price: "Rs. 5,500",
    image: "/image/bank.jpeg",
    rating: 4,
  },
  {
    id: 3,
    title: "Customs Act Handbook",
    category: "Customs",
    price: "Rs. 4,000",
    Subscription: "Rs. 1,600",
    image: "/image/custom.jpeg",
    rating: 5,
  },
  {
    id: 4,
    title: "Pakistan Labour Code",
    category: "Labour",
    price: "Rs. 5,500",
    image: "/image/labour.jpeg",
    rating: 5,
  },
];

const Books = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addingId, setAddingId] = useState(null);
  const { addToCart, isInCart, getCartQuantity } = useCart();
  const { data: apiBooks = [], isLoading, isError } = useGetFoodListQuery();

  const allBooks = useMemo(() => {
    const normalizedApiBooks = apiBooks.map((book) => ({
      ...normalizeProduct(book),
      price: typeof book.price === "number" ? formatPrice(book.price) : book.price,
      Subscription: book.Subscription || book.subscription,
    }));

    if (normalizedApiBooks.length > 0) {
      return normalizedApiBooks;
    }

    return fallbackBooks;
  }, [apiBooks]);

  const categories = useMemo(() => {
    const bookCategories = allBooks
      .map((book) => (book.category || "Other").trim())
      .filter(Boolean);

    return ["All", ...new Set(bookCategories)];
  }, [allBooks]);

  const filteredByCategory =
    selectedCategory === "All"
      ? allBooks
      : allBooks.filter(
          (book) => (book.category || "Other").toLowerCase() === selectedCategory.toLowerCase()
        );

  const formatImageUrl = (imageUrl) =>
    imageUrl?.includes("?")
      ? imageUrl
      : `${imageUrl}?auto=format&fit=crop&w=600&q=80`;

  const handleQuickAdd = async (book) => {
    const bookId = book._id ?? book.id;
    setAddingId(bookId);
    try {
      await addToCart(book, 1);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <section className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-blue-500/10"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm">
            <BookOpen size={16} />
            Professional Tax Publications
          </span>

          <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-tight">
            Explore Our
            <span className="text-amber-400"> Tax Books</span>
          </h1>

          <p className="mt-6 text-slate-300 text-lg max-w-2xl mx-auto">
            Comprehensive Tax, Sales Tax, PRA, Income Tax and Customs
            Publications for Tax Professionals, Lawyers and Students.
          </p>
        </div>
      </section>

      <section className="px-6 mb-16">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-center">
          {categories.map((category) => {
            const isActive = category === selectedCategory;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full border transition ${
                  isActive
                    ? "border-amber-500 bg-amber-500 text-black"
                    : "border-slate-700 hover:bg-amber-500 hover:text-black"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {isLoading && (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-12 text-center text-slate-400">
            Loading books...
          </div>
        )}

        {!isLoading && isError && (
          <div className="rounded-3xl bg-slate-900 border border-amber-500/30 p-4 text-center text-amber-300 mb-6">
            Could not load books from server. Showing available catalog.
          </div>
        )}

        {!isLoading && filteredByCategory.length === 0 ? (
          <div className="rounded-3xl bg-slate-900 border border-slate-800 p-12 text-center text-slate-400">
            No books match your search or selected category.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredByCategory.map((book) => (
              <div
                key={book._id ?? book.id}
                className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500 transition duration-300 flex flex-col"
              >
                <Link to={`/books/${book._id ?? book.id}`} className="overflow-hidden flex-grow">
                  <img
                    src={
                      book.image
                        ? formatImageUrl(book.image)
                        : "https://via.placeholder.com/600x400?text=Book+Image"
                    }
                    alt={book.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition duration-500 cursor-pointer"
                  />
                </Link>

                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-amber-400 text-sm">{book.category}</span>

                  <h3 className="text-xl font-semibold mt-2 mb-3 flex-grow">
                    {book.title}
                  </h3>

                  <div className="flex justify-between items-center gap-2">
                    <div>
                      <span className="text-2xl font-bold text-white">
                        {typeof book.price === "number" ? formatPrice(book.price) : book.price}
                      </span>
                      {book.Subscription && (
                        <div className="text-sm text-slate-400">
                          Annual Subscription:{" "}
                          <span className="text-amber-400 font-semibold">{book.Subscription}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Link
                      to={`/books/${book._id ?? book.id}`}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold py-2 rounded-lg text-center transition text-sm"
                    >
                      View Details
                    </Link>
                    <button
                      onClick={() => handleQuickAdd(book)}
                      disabled={addingId === (book._id ?? book.id)}
                      className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg font-semibold text-sm transition ${
                        isInCart(book._id ?? book.id)
                          ? "bg-green-600 hover:bg-green-500 text-white"
                          : "bg-amber-500 hover:bg-amber-400 text-black"
                      }`}
                      title={isInCart(book._id ?? book.id) ? `In cart (${getCartQuantity(book._id ?? book.id)})` : "Add to cart"}
                    >
                      {addingId === (book._id ?? book.id) ? (
                        "..."
                      ) : isInCart(book._id ?? book.id) ? (
                        <>
                          <Check size={16} />
                          {getCartQuantity(book._id ?? book.id)}
                        </>
                      ) : (
                        <ShoppingCart size={16} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Books;
