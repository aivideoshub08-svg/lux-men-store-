import React from "react";
import { useShop } from "../context/ShopContext";
import { HeroSection } from "../components/HeroSection";
import { CategorySection } from "../components/CategorySection";
import { ProductCard } from "../components/ProductCard";
import { PromoBanner } from "../components/PromoBanner";
import { BestSellers } from "../components/BestSellers";
import { WhyLuxeMen } from "../components/WhyLuxeMen";
import { CustomerReviews } from "../components/CustomerReviews";
import { Newsletter } from "../components/Newsletter";
import { IconArrowRight } from "../components/Icons";

export const HomePage = () => {
  const { products, navigate } = useShop();

  // Exactly 8 product cards for New Arrivals section as requested
  const newArrivals = products.slice(0, 8);

  return (
    <div className="homepage-view">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Shop by Category */}
      <CategorySection />

      {/* 3. New Arrivals */}
      <section className="section-padding" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container">
          <div className="section-header">
            <span className="subtitle">LATEST ARRIVALS</span>
            <h2 className="title">NEW ARRIVALS</h2>
            <p className="description">
              Fresh styles. Timeless confidence.
            </p>
          </div>

          <div className="product-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <button
              className="btn btn-secondary"
              onClick={() => navigate("/new-arrivals")}
            >
              VIEW ALL NEW ARRIVALS <IconArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Promotional Banner */}
      <PromoBanner />

      {/* 5. Best Sellers */}
      <BestSellers />

      {/* 6. Why LUXE MEN */}
      <WhyLuxeMen />

      {/* 7. Customer Reviews */}
      <CustomerReviews />

      {/* 8. Newsletter */}
      <Newsletter />
    </div>
  );
};
