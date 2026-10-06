import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useShop } from "../context/ShopContext";
import { IconShield, IconSparkles, IconArrowRight } from "../components/Icons";

export const AboutPage = () => {
  const { navigate } = useShop();

  return (
    <div className="section-padding" style={{ paddingTop: "40px" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "About" }]} />

        {/* Hero Header */}
        <div style={{ maxWidth: "840px", margin: "20px auto 60px", textAlign: "center" }}>
          <span className="subtitle" style={{ color: "var(--accent-gold)", letterSpacing: "0.2em", fontSize: "0.85rem", textTransform: "uppercase", fontWeight: "600", display: "inline-block", marginBottom: "12px" }}>
            THE HOUSE OF REFINEMENT
          </span>
          <h1 className="title" style={{ fontSize: "3rem", marginBottom: "22px" }}>
            ABOUT LUXE MEN
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: "1.75" }}>
            LUXE MEN is a modern men&apos;s fashion destination focused on timeless design, refined details and effortless confidence.
          </p>
        </div>

        {/* Main Imagery Showcase */}
        <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: "80px", border: "1px solid var(--border-gold)", maxHeight: "500px" }}>
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=85"
            alt="LUXE MEN atelier and design workshop"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Narrative Sections */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "40px", marginBottom: "80px" }}>
          <div style={{ background: "var(--bg-card)", padding: "40px 32px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ color: "var(--accent-gold)", marginBottom: "18px" }}>
              <IconSparkles size={32} />
            </div>
            <h3 style={{ fontSize: "1.45rem", marginBottom: "14px" }}>OUR STORY</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.7" }}>
              Founded in 2026, LUXE MEN emerged from a simple desire: to rid menswear of fleeting gimmicks and restore honest, enduring craftsmanship. We collaborate directly with master leather tanneries in Tuscany and horological ateliers to build pieces that age with character.
            </p>
          </div>

          <div style={{ background: "var(--bg-card)", padding: "40px 32px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ color: "var(--accent-gold)", marginBottom: "18px" }}>
              <IconShield size={32} />
            </div>
            <h3 style={{ fontSize: "1.45rem", marginBottom: "14px" }}>OUR PHILOSOPHY</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.7" }}>
              True style whispers; it never screams. We believe in minimalist silhouettes where proportion, material weight, and precision tactile textures do the speaking. When you invest in a LUXE MEN piece, you wear an heirloom engineered for a lifetime.
            </p>
          </div>

          <div style={{ background: "var(--bg-card)", padding: "40px 32px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <div style={{ color: "var(--accent-gold)", marginBottom: "18px" }}>
              <IconSparkles size={32} />
            </div>
            <h3 style={{ fontSize: "1.45rem", marginBottom: "14px" }}>OUR MISSION</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: "1.7" }}>
              To empower modern gentlemen with wardrobe foundations that instill unwavering confidence in boardrooms, transatlantic flights, and casual evenings alike. Exceptional luxury made accessible through honest design.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div style={{ textAlign: "center", background: "var(--bg-secondary)", padding: "60px 24px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
          <h3 style={{ fontSize: "1.8rem", marginBottom: "14px" }}>EXPERIENCE THE COLLECTION</h3>
          <p style={{ color: "var(--text-muted)", maxWidth: "540px", margin: "0 auto 28px" }}>
            Explore our curated range of Swiss-inspired timepieces, full-grain Italian leather goods, and refined wardrobe staples.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/shop")}>
            DISCOVER THE CATALOG <IconArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
