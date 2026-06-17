import { useGetFoodListQuery } from "../store/hooks";
import { formatPrice, normalizeProduct } from "../utils/productUtils";
import { Package, RefreshCw } from "lucide-react";

const ProductList = () => {
  const { data: products = [], isLoading, isError, refetch, isFetching } = useGetFoodListQuery();

  const normalizedProducts = products.map((item) => normalizeProduct(item));

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Product List</h1>
          <p className="text-sm text-gray-500 mt-1">
            Products loaded from API · <span className="font-semibold text-blue-600">{normalizedProducts.length}</span> items
          </p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm disabled:opacity-50"
        >
          <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {isLoading && (
        <div className="flex items-center gap-3 text-gray-500 mb-4">
          <Package size={18} />
          Loading products from API...
        </div>
      )}

      {isError && (
        <p className="text-red-500 mb-4 p-3 bg-red-50 rounded-lg">
          Failed to load products. Check API connection and try refresh.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-blue-600">Total Products</p>
          <p className="text-2xl font-bold text-blue-800">{normalizedProducts.length}</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-sm text-green-600">API Status</p>
          <p className="text-2xl font-bold text-green-800">{isError ? "Offline" : "Connected"}</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
          <p className="text-sm text-amber-600">Categories</p>
          <p className="text-2xl font-bold text-amber-800">
            {new Set(normalizedProducts.map((p) => p.category)).size}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">ID</th>
            </tr>
          </thead>

          <tbody>
            {normalizedProducts.length > 0 ? (
              normalizedProducts.map((item, index) => (
                <tr key={item._id ?? item.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 text-gray-500">{index + 1}</td>
                  <td className="p-4">
                    <img
                      src={item.image || "https://via.placeholder.com/50"}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">{item.name}</td>
                  <td className="p-4 text-gray-600">{formatPrice(item.price)}</td>
                  <td className="p-4 text-gray-600 capitalize">{item.category}</td>
                  <td className="p-4 text-xs text-gray-400 font-mono">{item._id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-8 text-gray-400">
                  {isLoading ? "Loading products..." : "No products found in API"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
