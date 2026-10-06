import React from "react";
import { useShop } from "../context/ShopContext";
import { IconArrowRight, IconSparkles, IconShield } from "./Icons";

export const HeroSection = () => {
  const { navigate } = useShop();

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Content Column */}
          <div className="hero-content">
            <div className="hero-tag">
              <IconSparkles size={14} />
              <span>THE 2026 SIGNATURE COLLECTION</span>
            </div>

            <h1 className="hero-title">
              DEFINE YOUR <span>STYLE</span>
            </h1>

            <p className="hero-subheading">
              Premium men&apos;s fashion and accessories designed for a confident, modern lifestyle. Meticulously handcrafted chronographs, Italian full-grain leathers, and tailored essentials built for distinction.
            </p>

            <div className="hero-ctas">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/shop")}
              >
                SHOP COLLECTION <IconArrowRight size={16} />
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/new-arrivals")}
              >
                EXPLORE NEW ARRIVALS
              </button>
            </div>
          </div>

          {/* Visual Showcase Column */}
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=85"
                alt="Sophisticated man dressed in tailored blazer and luxury accessories"
                loading="eager"
              />
            </div>

            {/* Luxury Floating Badge */}
            <div className="hero-floating-badge">
              <div className="floating-badge-icon">
                <IconShield size={22} />
              </div>
              <div className="floating-badge-text">
                <div className="title">BESPOKE QUALITY</div>
                <div className="sub">Handcrafted European Materials</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
