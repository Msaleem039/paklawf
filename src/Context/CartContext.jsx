/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetFoodListQuery,
} from '../store/hooks';
import {
  setCartItems,
  addCartItem,
  removeCartItem,
  updateCartItemQuantity,
  clearCartItems,
  addOrderNotification,
  confirmOrderNotification,
  clearOrderNotifications,
  selectCartItems,
  selectCartTotal,
  selectOrderNotifications,
} from '../store/cartSlice';
import { normalizeProduct, buildCartItemsFromApi } from '../utils/productUtils';
import { showSuccess, showError } from '../utils/toast';

const CartContext = createContext();

const hasAuthToken = () =>
  typeof window !== 'undefined' && Boolean(localStorage.getItem('token'));

export const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const orderNotifications = useSelector(selectOrderNotifications);
  const isAuthenticated = hasAuthToken();

  const { data: foodList = [] } = useGetFoodListQuery();
  const { data: cartData, refetch: refetchCart } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [addToCartApi] = useAddToCartMutation();
  const [removeFromCartApi] = useRemoveFromCartMutation();

  useEffect(() => {
    if (!isAuthenticated || cartData === undefined) return;

    const apiCartItems = buildCartItemsFromApi(cartData, foodList);
    if (apiCartItems.length > 0) {
      dispatch(setCartItems(apiCartItems));
    }
  }, [isAuthenticated, cartData, foodList, dispatch]);

  const addToCart = async (product, quantity = 1) => {
    const normalizedProduct = normalizeProduct(product);
    if (!normalizedProduct?._id) {
      showError('Unable to add this product to cart.');
      return false;
    }

    dispatch(addCartItem({ product: normalizedProduct, quantity }));

    try {
      for (let i = 0; i < quantity; i += 1) {
        await addToCartApi(normalizedProduct._id).unwrap();
      }

      if (isAuthenticated) {
        await refetchCart();
      }

      showSuccess(`${normalizedProduct.title} added to cart!`);
      return true;
    } catch (error) {
      if (isAuthenticated) {
        showError('Could not sync cart with server. Saved locally.');
      } else {
        showSuccess(`${normalizedProduct.title} added to cart!`);
      }
      return true;
    }
  };

  const removeFromCart = async (productId) => {
    dispatch(removeCartItem(productId));

    if (isAuthenticated) {
      try {
        await removeFromCartApi(productId).unwrap();
        await refetchCart();
        showInfo('Item removed from cart.');
      } catch {
        showError('Could not remove item from server cart.');
      }
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    const item = cartItems.find((cartItem) => String(cartItem._id) === String(productId));
    if (!item) return;

    const diff = quantity - item.quantity;
    dispatch(updateCartItemQuantity({ productId, quantity }));

    if (isAuthenticated && diff !== 0) {
      try {
        if (diff > 0) {
          for (let i = 0; i < diff; i += 1) {
            await addToCartApi(productId).unwrap();
          }
        } else {
          for (let i = 0; i < Math.abs(diff); i += 1) {
            await removeFromCartApi(productId).unwrap();
          }
        }
        await refetchCart();
      } catch {
        showError('Could not update quantity on server.');
      }
    }
  };

  const clearCart = () => {
    dispatch(clearCartItems());
  };

  const handleAddOrderNotification = (order) => {
    if (!order) return;
    dispatch(addOrderNotification(order));
  };

  const handleConfirmOrderNotification = (notificationId) => {
    dispatch(confirmOrderNotification(notificationId));
  };

  const handleClearOrderNotifications = () => {
    dispatch(clearOrderNotifications());
  };

  const refreshAuthState = () => {
    if (isAuthenticated) {
      refetchCart();
    }
  };

  const isInCart = (productId) =>
    cartItems.some((item) => String(item._id) === String(productId));

  const getCartQuantity = (productId) => {
    const item = cartItems.find((cartItem) => String(cartItem._id) === String(productId));
    return item?.quantity || 0;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        clearCart,
        orderNotifications,
        addOrderNotification: handleAddOrderNotification,
        confirmOrderNotification: handleConfirmOrderNotification,
        clearOrderNotifications: handleClearOrderNotifications,
        isAuthenticated,
        refreshAuthState,
        isInCart,
        getCartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
