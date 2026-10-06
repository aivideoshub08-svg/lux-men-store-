import React, { useState, useMemo } from "react";
import { useShop } from "../context/ShopContext";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ProductCard } from "../components/ProductCard";
import { IconSearch } from "../components/Icons";

export const NewArrivalsPage = () => {
  const { products } = useShop();
  const [selectedCat, setSelectedCat] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [search, setSearch] = useState("");

  const categories = ["All", "Watches", "Bags", "Footwear", "Accessories"];

  // Filter products that are marked as new or sort them
  const newProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (selectedCat !== "All" && p.category !== selectedCat) return false;
        if (search.trim()) {
          const q = search.toLowerCase();
          if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      });
  }, [products, selectedCat, sortOption, search]);

  return (
    <div className="section-padding" style={{ paddingTop: "40px" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "New Arrivals" }]} />

        <div className="section-header" style={{ textAlign: "left", margin: "0 0 36px" }}>
          <span className="subtitle">FRESH DROPS</span>
          <h1 className="title" style={{ fontSize: "2.5rem" }}>NEW ARRIVALS</h1>
          <p className="description">Fresh styles. Timeless confidence.</p>
        </div>

        {/* Filter bar */}
        <div className="shop-toolbar" style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`pill-btn ${selectedCat === cat ? "active" : ""}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search new drops..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input"
                style={{ padding: "8px 12px", fontSize: "0.86rem" }}
              />
            </div>

            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="shop-sort-select"
            >
              <option value="newest">Featured New</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {newProducts.length === 0 ? (
          <div className="empty-state-box" style={{ background: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <div className="empty-state-icon">
              <IconSearch size={28} />
            </div>
            <h3 className="empty-state-title">No new arrivals found</h3>
            <p className="empty-state-desc">
              Try resetting your category or search query to see the entire release.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSelectedCat("All");
                setSearch("");
              }}
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
