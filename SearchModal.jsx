import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { IconSearch, IconClose, IconArrowRight } from "./Icons";

export const SearchModal = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    navigate,
    setShopSearchQuery,
    setCategoryFilter
  } = useShop();

  const [query, setQuery] = useState("");

  if (!isSearchOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSelectProduct = (product) => {
    setIsSearchOpen(false);
    navigate(`/product/${product.id}`);
  };

  const handleTagClick = (tag) => {
    setIsSearchOpen(false);
    setCategoryFilter("All");
    setShopSearchQuery(tag);
    navigate("/shop");
  };

  const popularTags = ["Watches", "Leather Sneakers", "Bags", "Wallets", "Oxford"];

  return (
    <div className="modal-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-header">
          <IconSearch size={22} style={{ color: "var(--accent-gold)" }} />
          <input
            type="text"
            className="search-input-field"
            placeholder="Search watches, leather footwear, bags, wallets..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="action-btn"
            aria-label="Close search"
          >
            <IconClose size={22} />
          </button>
        </div>

        {/* Popular Tags */}
        <div style={{ padding: "14px 24px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)" }}>
            Popular:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="pill-btn"
              style={{ fontSize: "0.75rem", padding: "4px 10px" }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="search-results-list">
          {query.trim() === "" ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Type a keyword to discover handcrafted luxury pieces.
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <p style={{ color: "var(--text-muted)", marginBottom: "14px" }}>
                No products found matching &ldquo;{query}&rdquo;
              </p>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  setIsSearchOpen(false);
                  navigate("/shop");
                }}
              >
                VIEW ALL PRODUCTS
              </button>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="search-result-item"
                onClick={() => handleSelectProduct(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="search-result-thumb"
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.72rem", color: "var(--accent-gold)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    {item.category}
                  </div>
                  <div style={{ fontFamily: "var(--font-serif)", fontSize: "0.98rem", color: "var(--text-primary)" }}>
                    {item.name}
                  </div>
                </div>
                <div style={{ fontWeight: "700", color: "var(--accent-gold)" }}>
                  ${item.price}
                </div>
                <IconArrowRight size={16} style={{ color: "var(--text-muted)" }} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
