import React from "react";
import { useShop } from "../context/ShopContext";
import { IconArrowRight } from "./Icons";

export const PromoBanner = () => {
  const { navigate } = useShop();

  return (
    <section className="promo-banner">
      <div className="container">
        <div className="promo-content">
          <span className="promo-badge">THE ART OF MODERN LUXURY</span>
          <h2 className="promo-title">YOUR STYLE. YOUR SIGNATURE.</h2>
          <p className="promo-description">
            Discover carefully selected pieces designed to elevate your everyday look. Exceptional craftsmanship and refined details for the man who values quiet sophistication.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/shop")}
          >
            SHOP MEN&apos;S COLLECTION <IconArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};
