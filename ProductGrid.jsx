import React from "react";
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ products = [] }) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
