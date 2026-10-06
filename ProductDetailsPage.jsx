import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ProductCard } from "../components/ProductCard";
import {
  IconStar,
  IconHeart,
  IconBag,
  IconPlus,
  IconMinus,
  IconChevronDown,
  IconChevronUp,
  IconShield,
  IconTruck
} from "../components/Icons";

export const ProductDetailsPage = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigate
  } = useShop();

  const product = products.find((p) => p.id === selectedProductId);

  // Fallback if product not found
  if (!product) {
    return (
      <div className="section-padding" style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="empty-state-box">
          <h1 className="title" style={{ marginBottom: "16px" }}>Product Not Found</h1>
          <p className="description" style={{ marginBottom: "28px" }}>
            The requested product may have been archived or does not exist.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/shop")}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : "Standard"
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : "One Size"
  );
  const [quantity, setQuantity] = useState(1);

  // Accordion open/close state
  const [openSection, setOpenSection] = useState("description");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const isFavorited = isInWishlist(product.id);
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const galleryImages = [
    product.image,
    ...(product.additionalImages || [])
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    navigate("/checkout");
  };

  // Related products in the same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="section-padding" style={{ paddingTop: "40px" }}>
      <div className="container">
        <Breadcrumbs
          items={[
            { label: "Shop", path: "/shop" },
            { label: product.category, path: "/shop" },
            { label: product.name }
          ]}
        />

        <div className="product-details-grid">
          {/* Left: Gallery Showcase */}
          <div className="gallery-container">
            {galleryImages.length > 1 && (
              <div className="thumbnails-column">
                {galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    className={`thumbnail-btn ${activeImage === imgUrl ? "active" : ""}`}
                    onClick={() => setActiveImage(imgUrl)}
                    aria-label={`Thumbnail ${idx + 1}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${product.name} view ${idx + 1}`}
                      className="thumbnail-img"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="main-image-wrapper">
              <img
                src={activeImage}
                alt={product.name}
                loading="eager"
              />
            </div>
          </div>

          {/* Right: Info & Controls */}
          <div>
            <div className="product-meta-header">
              <span className="product-category-tag">{product.category}</span>
              <h1 className="product-detail-title">{product.name}</h1>

              <div className="product-rating">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <IconStar
                      key={i}
                      size={15}
                      filled={i < Math.floor(product.rating)}
                    />
                  ))}
                </div>
                <span className="reviews-count">
                  {product.rating} ({product.reviews} customer reviews)
                </span>
              </div>

              <div className="product-price-row" style={{ marginTop: "16px" }}>
                <span className="current-price" style={{ fontSize: "2rem" }}>
                  ${product.price}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="old-price" style={{ fontSize: "1.2rem" }}>
                      ${product.oldPrice}
                    </span>
                    <span className="discount-percentage" style={{ fontSize: "0.85rem" }}>
                      SAVE {discountPercent}%
                    </span>
                  </>
                )}
              </div>
            </div>

            <p style={{ color: "var(--text-secondary)", fontSize: "0.98rem", lineHeight: "1.7", marginBottom: "28px" }}>
              {product.description}
            </p>

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="options-group">
                <span className="options-label">Selected Color: <strong>{selectedColor}</strong></span>
                <div className="pills-row">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className={`pill-btn ${selectedColor === c ? "active" : ""}`}
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
                <span className="options-label">Available Size: <strong>{selectedSize}</strong></span>
                <div className="pills-row">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      className={`pill-btn ${selectedSize === s ? "active" : ""}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "16px", marginTop: "32px" }}>
              <div className="qty-control" style={{ padding: "6px" }}>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <IconMinus size={14} />
                </button>
                <span className="qty-val" style={{ fontSize: "1rem", minWidth: "32px" }}>
                  {quantity}
                </span>
                <button
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
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
                style={{ position: "static", width: "52px", height: "52px" }}
                onClick={() => toggleWishlist(product)}
                aria-label="Save to wishlist"
                title={isFavorited ? "In Wishlist" : "Save to Wishlist"}
              >
                <IconHeart size={22} filled={isFavorited} />
              </button>
            </div>

            <button
              className="btn btn-secondary btn-block"
              style={{ marginBottom: "28px" }}
              onClick={handleBuyNow}
            >
              BUY NOW
            </button>

            {/* Guarantee Callout */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", padding: "16px", background: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", marginBottom: "32px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <IconTruck size={18} style={{ color: "var(--accent-gold)" }} />
                <span>Express Insured Shipping</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <IconShield size={18} style={{ color: "var(--accent-gold)" }} />
                <span>30-Day Authenticity Guarantee</span>
              </div>
            </div>

            {/* Information Accordion */}
            <div className="accordion-wrapper">
              {/* 1. Description */}
              <div className="accordion-item">
                <button
                  className="accordion-trigger"
                  onClick={() => toggleSection("description")}
                >
                  <span>DESCRIPTION</span>
                  {openSection === "description" ? (
                    <IconChevronUp size={18} />
                  ) : (
                    <IconChevronDown size={18} />
                  )}
                </button>
                {openSection === "description" && (
                  <div className="accordion-body">
                    {product.description}
                  </div>
                )}
              </div>

              {/* 2. Materials */}
              <div className="accordion-item">
                <button
                  className="accordion-trigger"
                  onClick={() => toggleSection("materials")}
                >
                  <span>MATERIALS & SPECIFICATIONS</span>
                  {openSection === "materials" ? (
                    <IconChevronUp size={18} />
                  ) : (
                    <IconChevronDown size={18} />
                  )}
                </button>
                {openSection === "materials" && (
                  <div className="accordion-body">
                    {product.materials || "Crafted using premium surgical-grade 316L stainless steel, European full-grain leather, and hypoallergenic coatings."}
                  </div>
                )}
              </div>

              {/* 3. Shipping & Returns */}
              <div className="accordion-item">
                <button
                  className="accordion-trigger"
                  onClick={() => toggleSection("shipping")}
                >
                  <span>SHIPPING & RETURNS</span>
                  {openSection === "shipping" ? (
                    <IconChevronUp size={18} />
                  ) : (
                    <IconChevronDown size={18} />
                  )}
                </button>
                {openSection === "shipping" && (
                  <div className="accordion-body">
                    {product.shipping || "Complimentary worldwide shipping on all orders over $100. Delivered in signature gift-ready presentation packaging within 2-4 business days. 30-day hassle-free returns."}
                  </div>
                )}
              </div>

              {/* 4. Care Instructions */}
              <div className="accordion-item">
                <button
                  className="accordion-trigger"
                  onClick={() => toggleSection("care")}
                >
                  <span>CARE INSTRUCTIONS</span>
                  {openSection === "care" ? (
                    <IconChevronUp size={18} />
                  ) : (
                    <IconChevronDown size={18} />
                  )}
                </button>
                {openSection === "care" && (
                  <div className="accordion-body">
                    {product.care || "Store in the supplied microfibre travel pouch. Clean with a soft, lint-free cloth. Protect from extreme heat and solvent contact."}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ marginTop: "96px", paddingTop: "64px", borderTop: "1px solid var(--border-subtle)" }}>
            <div className="section-header">
              <span className="subtitle">CURATED PAIRINGS</span>
              <h3 className="title">YOU MAY ALSO ADMIRE</h3>
            </div>
            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
