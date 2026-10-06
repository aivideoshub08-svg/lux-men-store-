import React, { useState } from "react";
import { useShop } from "../context/ShopContext";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { addToast } = useShop();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("Please provide a valid email address.", "info");
      return;
    }
    addToast("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <section className="section-padding newsletter-section">
      <div className="container">
        <div className="newsletter-box">
          <span className="subtitle" style={{ color: "var(--accent-gold)", letterSpacing: "0.2em", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: "600", display: "inline-block", marginBottom: "12px" }}>
            PRIVILEGED ACCESS
          </span>
          <h2 className="title" style={{ marginBottom: "14px" }}>
            STAY IN THE LOOP
          </h2>
          <p className="description" style={{ color: "var(--text-muted)", fontSize: "1.05rem" }}>
            Get updates on new arrivals, exclusive offers and seasonal collections.
          </p>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="newsletter-input"
              aria-label="Email address for newsletter"
              required
            />
            <button type="submit" className="btn btn-primary">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
