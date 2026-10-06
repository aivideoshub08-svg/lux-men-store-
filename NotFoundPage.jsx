import React from "react";
import { useShop } from "../context/ShopContext";

export const NotFoundPage = () => {
  const { navigate } = useShop();

  return (
    <div className="section-padding" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="empty-state-box">
        <span style={{ fontSize: "5rem", fontFamily: "var(--font-serif)", color: "var(--accent-gold)", fontWeight: "700", lineHeight: "1" }}>
          404
        </span>
        <h1 className="title" style={{ fontSize: "2.4rem", margin: "16px 0 12px" }}>
          PAGE NOT FOUND
        </h1>
        <p className="description" style={{ maxWidth: "420px", marginBottom: "32px", fontSize: "1.05rem" }}>
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/")}
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};
