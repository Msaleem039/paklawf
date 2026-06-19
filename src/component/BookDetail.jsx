import { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import { useGetFoodListQuery } from "../store/hooks";
import { formatPrice, normalizeProduct } from "../utils/productUtils";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  BookOpen,
  AlertCircle,
} from "lucide-react";

const fallbackBooks = [
  {
    id: 1,
    title: "PRA Provincial Sales Tax",
    category: "Sales Tax",
    price: "Rs. 4000",
    Subscription: "Rs. 1600",
    image: "/image/new.jpeg",
    rating: 5,
    description:
      "A comprehensive guide to Provincial Sales Tax laws and regulations in Pakistan.",
    author: "Tax Experts",
    publisher: "Imran Munir",
          // pages: 450,
          // isbn: "978-1-234567-89-0",
    details: [
      "Complete coverage of Sales Tax rules and regulations",
      "Practical examples and case studies",
      "Updated with latest amendments",
    ],
  },
  {
    id: 2,
    title: "Manual of Banking Laws",
    category: "Banking",
    price: "Rs. 5,500",
    image: "/image/bank.jpeg",
    rating: 4,
    description: "Detailed manual covering all aspects of banking laws and regulations in Pakistan.",
    author: "Banking Law Experts",
    publisher: "Muhammad Yahya",
    // pages: 520,
    // isbn: "978-1-234567-90-6",
    details: ["Complete banking law framework", "Regulatory compliance guidelines"],
  },
  {
    id: 3,
    title: "Customs Act Handbook",
    category: "Customs",
    price: "Rs. 4,000",
    Subscription: "Rs. 1,600",
    image: "/image/custom.jpeg",
    rating: 5,
    description: "A thorough handbook on Pakistan's Customs Act.",
    author: "Customs Experts",
    publisher: "Farhan Shahzad",
    // pages: 380,
    // isbn: "978-1-234567-91-3",
    details: ["Complete Customs Act coverage", "Tariff and duty schedules"],
  },
  {
    id: 4,
    title: "Pakistan Labour Code",
    category: "Labour",
    price: "Rs. 5,500",
    image: "/image/labour.jpeg",
    rating: 5,
    description: "Comprehensive guide to Pakistan's labour laws.",
    author: "Labour Law Specialists",
    publisher: "Muhammad Zahid",
    // pages: 480,
    // isbn: "978-1-234567-92-0",
    details: ["Complete labour law framework", "Workers' rights and protections"],
  },
];

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const { addToCart, isInCart, getCartQuantity } = useCart();
  const { data: apiBooks = [], isLoading } = useGetFoodListQuery();

  const book = useMemo(() => {
    const allAvailableBooks = [
      ...apiBooks.map((item) => ({
        ...normalizeProduct(item),
        price: typeof item.price === "number" ? formatPrice(item.price) : item.price,
        Subscription: item.Subscription || item.subscription,
        description: item.description || "No description available.",
        author: item.author || "Pak Law Publication",
        publisher: item.publisher || "Pak Law Publication",
        pages: item.pages || "N/A",
        isbn: item.isbn || "N/A",
        details: item.details || [item.description].filter(Boolean),
      })),
      ...fallbackBooks,
    ];

    return allAvailableBooks.find(
      (item) => String(item._id ?? item.id) === String(id)
    );
  }, [id, apiBooks]);

  const handleAddToCart = async () => {
    if (!book) return;

    setAdding(true);
    try {
      await addToCart(book, quantity);
      setQuantity(1);
    } finally {
      setAdding(false);
    }
  };

  const inCart = book ? isInCart(book._id ?? book.id) : false;
  const cartQty = book ? getCartQuantity(book._id ?? book.id) : 0;

  if (isLoading) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex items-center justify-center pt-20">
        <p className="text-xl text-slate-400">Loading book details...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-amber-500" />
          <p className="text-xl">Book not found</p>
          <button
            onClick={() => navigate("/books")}
            className="mt-6 bg-amber-500 hover:bg-amber-400 text-black px-6 py-2 rounded-lg font-semibold transition"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  const details = Array.isArray(book.details) ? book.details : [book.description].filter(Boolean);

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <button
          onClick={() => navigate("/books")}
          className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition mb-8"
        >
          <ArrowLeft size={20} />
          Back to Books
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="flex items-center justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <img
                src={book.image}
                alt={book.title}
                className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm">
                <BookOpen size={16} />
                {book.category}
              </span>
              <div className="flex items-center gap-1">
                {[...Array(book.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            <h1 className="text-4xl font-bold leading-tight">{book.title}</h1>

            <div className="space-y-2 text-slate-400">
              <p><span className="text-slate-300 font-semibold">Author:</span> {book.author}</p>
              <p><span className="text-slate-300 font-semibold">Publisher:</span> {book.publisher}</p>
              <p><span className="text-slate-300 font-semibold">Pages:</span> {book.pages}</p>
              <p><span className="text-slate-300 font-semibold">ISBN:</span> {book.isbn}</p>
            </div>

            <p className="text-slate-300 leading-relaxed text-lg">{book.description}</p>

            <div className="space-y-3 bg-slate-900 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-white">
                  {typeof book.price === "number" ? formatPrice(book.price) : book.price}
                </span>
                {book.Subscription && (
                  <span className="text-sm text-slate-400">
                    Annual Subscription:{" "}
                    <span className="text-amber-400 font-semibold">{book.Subscription}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex items-center border border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-800 transition"
                >
                  −
                </button>
                <span className="px-6 py-2 text-white font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-slate-300 hover:bg-slate-800 transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className={`flex-1 disabled:opacity-50 font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition transform hover:scale-105 ${
                  inCart
                    ? "bg-green-600 hover:bg-green-500 text-white"
                    : "bg-amber-500 hover:bg-amber-400 text-black"
                }`}
              >
                <ShoppingCart size={20} />
                {adding ? "Adding..." : inCart ? `In Cart (${cartQty})` : "Add to Cart"}
              </button>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-800">
              <h3 className="text-xl font-bold">Key Features:</h3>
              <ul className="space-y-3">
                {details.map((detail, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
