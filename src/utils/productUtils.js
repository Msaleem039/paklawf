export const parsePrice = (price) => {
  if (typeof price === 'number' && !Number.isNaN(price)) return price;
  if (price == null) return 0;

  const cleaned = String(price)
    .replace(/rs\.?/gi, '')
    .replace(/,/g, '')
    .trim();

  const match = cleaned.match(/\d+(\.\d+)?/);
  if (!match) return 0;

  const amount = parseFloat(match[0]);
  return Number.isNaN(amount) ? 0 : amount;
};

export const normalizeProduct = (product) => {
  if (!product) return null;

  const price = parsePrice(product.price);
  const id = product._id ?? product.id;

  return {
    ...product,
    _id: id,
    id,
    title: product.title || product.name || 'Untitled',
    name: product.name || product.title || 'Untitled',
    price,
    category: product.category ? product.category.trim() : 'Other',
    image: product.image || product.Image || '',
    rating: product.rating || 4,
  };
};

export const formatPrice = (price) => {
  const amount = parsePrice(price);
  return `Rs. ${amount.toLocaleString('en-IN')}`;
};

export const buildCartItemsFromApi = (cartData, foodList = []) => {
  if (!cartData) return [];

  if (Array.isArray(cartData)) {
    return cartData.map((item) => normalizeProduct({
      ...item,
      quantity: item.quantity || 1,
    })).filter(Boolean);
  }

  if (typeof cartData === 'object') {
    return Object.entries(cartData).map(([itemId, value]) => {
      const quantity = typeof value === 'number' ? value : value?.quantity || 1;
      const embeddedProduct = typeof value === 'object' ? value : null;
      const product = embeddedProduct || foodList.find(
        (item) => String(item._id ?? item.id) === String(itemId)
      );

      if (!product) return null;

      return normalizeProduct({ ...product, quantity });
    }).filter(Boolean);
  }

  return [];
};
