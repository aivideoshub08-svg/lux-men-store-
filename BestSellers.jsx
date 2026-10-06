import React from "react";
import { useShop } from "../context/ShopContext";
import { ProductCard } from "./ProductCard";

export const BestSellers = () => {
  const { products } = useShop();

  const bestSellerProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="container">
        <div className="section-header">
          <span className="subtitle">ICONIC ESSENTIALS</span>
          <h2 className="title">BEST SELLERS</h2>
          <p className="description">
            Our most sought-after designs, trusted by modern tastemakers worldwide.
          </p>
        </div>

        <div className="product-grid">
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
