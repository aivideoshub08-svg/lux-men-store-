import React from "react";
import { collectionsData } from "../data/products";
import { useShop } from "../context/ShopContext";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { IconArrowRight } from "../components/Icons";

export const CollectionsPage = () => {
  const { navigate } = useShop();

  const handleExplore = (categoryFilter) => {
    navigate("/shop", categoryFilter);
  };

  return (
    <div className="section-padding" style={{ paddingTop: "40px" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Collections" }]} />

        <div className="section-header" style={{ textAlign: "left", margin: "0 0 48px" }}>
          <span className="subtitle">CURATED CAPSULES</span>
          <h1 className="title" style={{ fontSize: "2.6rem" }}>COLLECTIONS</h1>
          <p className="description">
            Four distinguished design narratives crafted for every facet of the modern gentleman&apos;s lifestyle.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
          {collectionsData.map((col, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={col.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.1fr 1fr",
                  gap: "48px",
                  alignItems: "center",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden"
                }}
                className={isReversed ? "collection-row-reversed" : ""}
              >
                <div
                  style={{
                    order: isReversed ? 2 : 1,
                    height: "100%",
                    minHeight: "380px",
                    overflow: "hidden"
                  }}
                >
                  <img
                    src={col.image}
                    alt={col.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </div>

                <div
                  style={{
                    order: isReversed ? 1 : 2,
                    padding: "48px 40px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}
                >
                  <span
                    style={{
                      color: "var(--accent-gold)",
                      fontSize: "0.82rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontWeight: "600",
                      marginBottom: "12px"
                    }}
                  >
                    {col.subtitle}
                  </span>
                  <h2
                    style={{
                      fontSize: "2rem",
                      marginBottom: "18px",
                      letterSpacing: "0.04em"
                    }}
                  >
                    {col.title}
                  </h2>
                  <p
                    style={{
                      color: "var(--text-muted)",
                      fontSize: "1rem",
                      lineHeight: "1.7",
                      marginBottom: "32px"
                    }}
                  >
                    {col.description}
                  </p>
                  <div>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleExplore(col.categoryFilter)}
                    >
                      EXPLORE COLLECTION <IconArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
