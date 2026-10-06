import React from "react";
import { categoriesData } from "../data/products";
import { useShop } from "../context/ShopContext";
import { IconArrowRight } from "./Icons";

export const CategorySection = () => {
  const { navigate } = useShop();

  const handleCategoryClick = (categoryKey) => {
    navigate("/shop", categoryKey);
  };

  return (
    <section className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">COLLECTIONS</span>
          <h2 className="title">SHOP BY CATEGORY</h2>
          <p className="description">
            Refined essentials for every side of your style.
          </p>
        </div>

        <div className="category-grid">
          {categoriesData.map((cat) => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => handleCategoryClick(cat.categoryKey)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCategoryClick(cat.categoryKey);
                }
              }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="category-card-img"
                loading="lazy"
              />
              <div className="category-overlay">
                <h3 className="category-name">{cat.name}</h3>
                <p className="category-desc">{cat.description}</p>
                <div className="category-btn">
                  <span>SHOP NOW</span>
                  <IconArrowRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
