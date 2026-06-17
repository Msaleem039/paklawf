const AddProduct = () => {
  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-sm">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Add New Product
      </h1>
      <p className="text-gray-600">
        Product creation is managed through the backend API. Use the product list page to view items loaded from <code>/api/food/list</code>.
      </p>
    </div>
  );
};

export default AddProduct;
