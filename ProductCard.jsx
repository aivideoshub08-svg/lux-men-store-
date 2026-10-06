import React from "react";
import { useShop } from "../context/ShopContext";
import { IconHeart, IconEye, IconBag, IconStar } from "./Icons";

export const ProductCard = ({ product }) => {
  const {
    navigate,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useShop();

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="product-card">
      <div className="product-image-container" onClick={handleCardClick}>
        <img
          src={product.image}
          alt={product.name}
          className="product-card-img"
          loading="lazy"
        />

        {/* Badges */}
        {product.badge && (
          <span
            className={`product-badge ${
              product.badge === "BEST SELLER"
                ? "badge-bestseller"
                : product.badge === "NEW"
                ? "badge-new"
                : product.badge === "SALE"
                ? "badge-sale"
                : "badge-luxury"
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          className={`wishlist-toggle-btn ${isFavorited ? "active" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          title={isFavorited ? "In Wishlist" : "Save to Wishlist"}
        >
          <IconHeart size={18} filled={isFavorited} />
        </button>

        {/* Quick View Button */}
        <button
          className="quick-view-overlay-btn"
          onClick={(e) => {
            e.stopPropagation();
            setQuickViewProduct(product);
          }}
        >
          <IconEye size={16} /> QUICK VIEW
        </button>
      </div>

      <div className="product-info">
        <span className="product-category-tag">{product.category}</span>
        
        <h4 className="product-title" onClick={handleCardClick}>
          {product.name}
        </h4>

        {/* Star Rating */}
        <div className="product-rating">
          <div className="stars-row">
            {[...Array(5)].map((_, i) => (
              <IconStar
                key={i}
                size={13}
                filled={i < Math.floor(product.rating)}
              />
            ))}
          </div>
          <span className="reviews-count">({product.reviews})</span>
        </div>

        {/* Price Row */}
        <div className="product-price-row">
          <span className="current-price">${product.price}</span>
          {product.oldPrice && (
            <>
              <span className="old-price">${product.oldPrice}</span>
              <span className="discount-percentage">-{discountPercent}%</span>
            </>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className="add-to-cart-btn"
          onClick={() => addToCart(product, 1)}
        >
          <IconBag size={16} /> ADD TO CART
        </button>
      </div>
    </div>
  );
};
