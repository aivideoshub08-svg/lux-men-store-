import React, { createContext, useContext, useState, useEffect } from "react";
import { products } from "../data/products";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Routing state synced with window.location
  const getInitialPath = () => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      return path && path !== "" ? path : "/";
    }
    return "/";
  };

  const [currentPath, setCurrentPath] = useState(getInitialPath);
  const [selectedProductId, setSelectedProductId] = useState(() => {
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/product/")) {
      return window.location.pathname.replace("/product/", "");
    }
    return null;
  });

  // Shop page filters state
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortOption, setSortOption] = useState("featured");
  const [shopSearchQuery, setShopSearchQuery] = useState("");

  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("luxemen_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("luxemen_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Drawers and Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [announcementVisible, setAnnouncementVisible] = useState(() => {
    try {
      const dismissed = sessionStorage.getItem("luxemen_announcement_dismissed");
      return dismissed !== "true";
    } catch {
      return true;
    }
  });

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success") => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("luxemen_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("luxemen_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Sync browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path);
      if (path.startsWith("/product/")) {
        setSelectedProductId(path.replace("/product/", ""));
      } else {
        setSelectedProductId(null);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Custom navigation function
  const navigate = (path, categoryParam = null) => {
    if (categoryParam) {
      setCategoryFilter(categoryParam);
    }
    if (path.startsWith("/product/")) {
      const prodId = path.replace("/product/", "");
      setSelectedProductId(prodId);
    } else {
      setSelectedProductId(null);
    }

    setCurrentPath(path);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setQuickViewProduct(null);

    if (typeof window !== "undefined") {
      window.history.pushState({}, "", path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Dismiss announcement
  const dismissAnnouncement = () => {
    setAnnouncementVisible(false);
    try {
      sessionStorage.setItem("luxemen_announcement_dismissed", "true");
    } catch (e) {
      console.error(e);
    }
  };

  // Cart operations
  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    const color = selectedColor || (product.colors && product.colors[0]) || "Default";
    const size = selectedSize || (product.sizes && product.sizes[0]) || "Standard";
    const cartItemId = `${product.id}-${color}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.image,
          selectedColor: color,
          selectedSize: size,
          quantity: quantity
        }
      ];
    });

    addToast(`Added "${product.name}" to your cart.`);
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    addToast("Item removed from cart.", "info");
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed "${product.name}" from wishlist.`, "info");
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Added "${product.name}" to wishlist.`);
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Computations
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const freeShippingThreshold = 100;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);

  const resetFilters = () => {
    setCategoryFilter("All");
    setPriceFilter("all");
    setSortOption("featured");
    setShopSearchQuery("");
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        currentPath,
        selectedProductId,
        navigate,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartItemCount,
        cartSubtotal,
        freeShippingThreshold,
        isFreeShipping,
        shippingRemaining,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        announcementVisible,
        dismissAnnouncement,
        categoryFilter,
        setCategoryFilter,
        priceFilter,
        setPriceFilter,
        sortOption,
        setSortOption,
        shopSearchQuery,
        setShopSearchQuery,
        resetFilters,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
