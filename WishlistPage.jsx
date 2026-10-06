import React from "react";
import { useShop } from "../context/ShopContext";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ProductCard } from "../components/ProductCard";
import { IconHeart } from "../components/Icons";

export const WishlistPage = () => {
  const { wishlist, navigate } = useShop();

  return (
    <div className="section-padding" style={{ paddingTop: "40px" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Wishlist" }]} />

        <div className="section-header" style={{ textAlign: "left", margin: "0 0 40px" }}>
          <span className="subtitle">SAVED PIECES</span>
          <h1 className="title" style={{ fontSize: "2.6rem" }}>MY WISHLIST</h1>
          <p className="description">
            Your personalized selection of iconic designs and wardrobe staples.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="empty-state-box" style={{ background: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", padding: "72px 24px" }}>
            <div className="empty-state-icon">
              <IconHeart size={36} />
            </div>
            <h2 className="empty-state-title" style={{ fontSize: "1.6rem" }}>Your wishlist is empty.</h2>
            <p className="empty-state-desc" style={{ maxWidth: "380px" }}>
              Save your favorite pieces and find them here later.
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/shop")}>
              EXPLORE PRODUCTS
            </button>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: "24px", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              You have <strong style={{ color: "var(--text-primary)" }}>{wishlist.length}</strong> saved {wishlist.length === 1 ? "item" : "items"}
            </div>
            <div className="product-grid">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
