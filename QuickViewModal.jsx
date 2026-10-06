import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { IconClose, IconStar, IconPlus, IconMinus, IconBag, IconHeart } from "./Icons";

export const QuickViewModal = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigate
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const isFavorited = isInWishlist(product.id);
  const activeColor = selectedColor || (product.colors && product.colors[0]);
  const activeSize = selectedSize || (product.sizes && product.sizes[0]);

  const handleAddToCart = () => {
    addToCart(product, quantity, activeColor, activeSize);
    setQuickViewProduct(null);
  };

  const handleViewFullPage = () => {
    setQuickViewProduct(null);
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="modal-backdrop" onClick={() => setQuickViewProduct(null)}>
      <div className="quickview-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close modal"
        >
          <IconClose size={20} />
        </button>

        {/* Left Column: Image */}
        <div style={{ background: "#121417", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", maxHeight: "480px" }}
          />
        </div>

        {/* Right Column: Info & Actions */}
        <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column" }}>
          <span className="product-category-tag">{product.category}</span>
          <h3 style={{ fontSize: "1.45rem", marginBottom: "8px" }}>{product.name}</h3>

          <div className="product-rating" style={{ marginBottom: "16px" }}>
            <div className="stars-row">
              {[...Array(5)].map((_, i) => (
                <IconStar
                  key={i}
                  size={14}
                  filled={i < Math.floor(product.rating)}
                />
              ))}
            </div>
            <span className="reviews-count">({product.reviews} reviews)</span>
          </div>

          <div className="product-price-row" style={{ marginBottom: "18px" }}>
            <span className="current-price" style={{ fontSize: "1.5rem" }}>
              ${product.price}
            </span>
            {product.oldPrice && (
              <span className="old-price" style={{ fontSize: "1rem" }}>
                ${product.oldPrice}
              </span>
            )}
          </div>

          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "22px", lineHeight: "1.6" }}>
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors && product.colors.length > 0 && (
            <div className="options-group">
              <span className="options-label">Color: {activeColor}</span>
              <div className="pills-row">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    className={`pill-btn ${activeColor === c ? "active" : ""}`}
                    onClick={() => setSelectedColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="options-group">
              <span className="options-label">Size: {activeSize}</span>
              <div className="pills-row">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className={`pill-btn ${activeSize === s ? "active" : ""}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "auto", paddingTop: "16px" }}>
            <div className="qty-control" style={{ padding: "4px" }}>
              <button
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <IconMinus size={14} />
              </button>
              <span className="qty-val" style={{ fontSize: "0.95rem" }}>{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <IconPlus size={14} />
              </button>
            </div>

            <button
              className="btn btn-primary"
              style={{ flex: 1 }}
              onClick={handleAddToCart}
            >
              <IconBag size={18} /> ADD TO CART
            </button>

            <button
              className={`wishlist-toggle-btn ${isFavorited ? "active" : ""}`}
              style={{ position: "static", width: "46px", height: "46px" }}
              onClick={() => toggleWishlist(product)}
              title="Wishlist"
            >
              <IconHeart size={20} filled={isFavorited} />
            </button>
          </div>

          <button
            onClick={handleViewFullPage}
            style={{
              marginTop: "16px",
              textAlign: "center",
              fontSize: "0.8rem",
              color: "var(--accent-gold)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "underline"
            }}
          >
            VIEW FULL PRODUCT SPECIFICATIONS →
          </button>
        </div>
      </div>
    </div>
  );
};
