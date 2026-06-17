import { createSlice } from '@reduxjs/toolkit';
import { normalizeProduct } from '../utils/productUtils';

const initialState = {
  items: [],
  orderNotifications: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    addCartItem: (state, action) => {
      const product = normalizeProduct(action.payload.product);
      const quantity = action.payload.quantity || 1;
      if (!product?._id) return;

      const existing = state.items.find(
        (item) => String(item._id) === String(product._id)
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter(
        (item) => String(item._id) !== String(action.payload)
      );
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find(
        (cartItem) => String(cartItem._id) === String(productId)
      );
      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter(
          (cartItem) => String(cartItem._id) !== String(productId)
        );
      } else {
        item.quantity = quantity;
      }
    },
    clearCartItems: (state) => {
      state.items = [];
    },
    addOrderNotification: (state, action) => {
      const notification = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'pending',
        ...action.payload,
      };
      state.orderNotifications.unshift(notification);
    },
    confirmOrderNotification: (state, action) => {
      const notification = state.orderNotifications.find(
        (item) => item.id === action.payload
      );
      if (notification) {
        notification.status = 'confirmed';
      }
    },
    clearOrderNotifications: (state) => {
      state.orderNotifications = [];
    },
  },
});

export const {
  setCartItems,
  addCartItem,
  removeCartItem,
  updateCartItemQuantity,
  clearCartItems,
  addOrderNotification,
  confirmOrderNotification,
  clearOrderNotifications,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + (item.quantity || 1), 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );
export const selectOrderNotifications = (state) => state.cart.orderNotifications;

export default cartSlice.reducer;
