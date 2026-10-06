import React, { useMemo } from "react";
import { useShop } from "../context/ShopContext";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ProductCard } from "../components/ProductCard";
import { IconSearch, IconSliders, IconClose } from "../components/Icons";

export const ShopPage = () => {
  const {
    products,
    categoryFilter,
    setCategoryFilter,
    priceFilter,
    setPriceFilter,
    sortOption,
    setSortOption,
    shopSearchQuery,
    setShopSearchQuery,
    resetFilters
  } = useShop();

  // Categories list
  const categories = ["All", "Watches", "Bags", "Footwear", "Accessories"];

  // Price range options
  const priceRanges = [
    { label: "All Prices", value: "all" },
    { label: "Under $50", value: "under-50" },
    { label: "$50 – $100", value: "50-100" },
    { label: "$100 – $150", value: "100-150" },
    { label: "$150+", value: "150-plus" }
  ];

  // Combined Filtering and Sorting logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        // Category filter
        if (categoryFilter !== "All" && item.category !== categoryFilter) {
          return false;
        }

        // Search query filter
        if (shopSearchQuery.trim()) {
          const q = shopSearchQuery.toLowerCase();
          const matches =
            item.name.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // Price range filter
        if (priceFilter === "under-50" && item.price >= 50) return false;
        if (priceFilter === "50-100" && (item.price < 50 || item.price > 100)) return false;
        if (priceFilter === "100-150" && (item.price < 100 || item.price > 150)) return false;
        if (priceFilter === "150-plus" && item.price < 150) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        if (sortOption === "bestseller") return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        return 0; // featured default
      });
  }, [products, categoryFilter, priceFilter, sortOption, shopSearchQuery]);

  const hasActiveFilters =
    categoryFilter !== "All" ||
    priceFilter !== "all" ||
    shopSearchQuery.trim() !== "" ||
    sortOption !== "featured";

  return (
    <div className="section-padding" style={{ paddingTop: "40px" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Shop" }]} />

        <div className="section-header" style={{ textAlign: "left", margin: "0 0 36px" }}>
          <span className="subtitle">COLLECTION ARCHIVE</span>
          <h1 className="title" style={{ fontSize: "2.5rem" }}>SHOP ALL</h1>
          <p className="description">Explore the LUXE MEN collection.</p>
        </div>

        <div className="shop-layout">
          {/* Left: Filter Sidebar */}
          <aside className="filters-sidebar">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", color: "var(--text-primary)" }}>
                <IconSliders size={18} style={{ color: "var(--accent-gold)" }} />
                <span>FILTERS</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  style={{ fontSize: "0.76rem", color: "var(--accent-gold)", textDecoration: "underline", textTransform: "uppercase" }}
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Keyword Search */}
            <div className="filter-group">
              <h4 className="filter-title">Search</h4>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Filter by name..."
                  value={shopSearchQuery}
                  onChange={(e) => setShopSearchQuery(e.target.value)}
                  className="form-input"
                  style={{ width: "100%", paddingRight: "36px" }}
                />
                {shopSearchQuery && (
                  <button
                    onClick={() => setShopSearchQuery("")}
                    style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}
                    aria-label="Clear search"
                  >
                    <IconClose size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="filter-group">
              <h4 className="filter-title">Category</h4>
              <div className="filter-options-list">
                {categories.map((cat) => (
                  <label key={cat} className="filter-radio-label">
                    <input
                      type="radio"
                      name="category"
                      checked={categoryFilter === cat}
                      onChange={() => setCategoryFilter(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="filter-group">
              <h4 className="filter-title">Price Range</h4>
              <div className="filter-options-list">
                {priceRanges.map((range) => (
                  <label key={range.value} className="filter-radio-label">
                    <input
                      type="radio"
                      name="price"
                      checked={priceFilter === range.value}
                      onChange={() => setPriceFilter(range.value)}
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                className="btn btn-dark btn-block btn-sm"
                onClick={resetFilters}
                style={{ marginTop: "16px" }}
              >
                Reset Filters
              </button>
            )}
          </aside>

          {/* Right: Products Area */}
          <main>
            {/* Toolbar */}
            <div className="shop-toolbar">
              <div style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
                Showing <strong style={{ color: "var(--text-primary)" }}>{filteredProducts.length}</strong> of {products.length} products
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label htmlFor="shop-sort" style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                  Sort by:
                </label>
                <select
                  id="shop-sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="shop-sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="bestseller">Best Selling</option>
                </select>
              </div>
            </div>

            {/* Products Grid or Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="empty-state-box" style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)" }}>
                <div className="empty-state-icon">
                  <IconSearch size={28} />
                </div>
                <h3 className="empty-state-title">No products found</h3>
                <p className="empty-state-desc">
                  We couldn&apos;t find any pieces matching your current filter criteria. Try adjusting your search or clear your filters.
                </p>
                <button
                  className="btn btn-primary"
                  onClick={resetFilters}
                >
                  VIEW ALL PRODUCTS
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
