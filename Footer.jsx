import React from "react";
import { useShop } from "../context/ShopContext";
import { IconInstagram, IconFacebook, IconTikTok, IconPinterest } from "./Icons";

export const Footer = () => {
  const { navigate } = useShop();

  const handleLinkClick = (e, path, categoryParam = null) => {
    e.preventDefault();
    navigate(path, categoryParam);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Bio */}
          <div className="footer-col-brand">
            <div className="brand-logo">
              <span className="logo-main">LUXE MEN</span>
              <span className="logo-sub">EST. 2026 • NEW YORK</span>
            </div>
            <p className="footer-text">
              Premium men&apos;s fashion and accessories for the modern lifestyle. Calibrated for confidence, enduring elegance, and refined living.
            </p>
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
                <IconInstagram size={17} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
                <IconFacebook size={17} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="TikTok">
                <IconTikTok size={17} />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Pinterest">
                <IconPinterest size={17} />
              </a>
            </div>
          </div>

          {/* Column 2: SHOP */}
          <div>
            <h4 className="footer-heading">SHOP</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/new-arrivals" className="footer-link" onClick={(e) => handleLinkClick(e, "/new-arrivals")}>
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/shop" className="footer-link" onClick={(e) => handleLinkClick(e, "/shop", "Watches")}>
                  Watches
                </a>
              </li>
              <li>
                <a href="/shop" className="footer-link" onClick={(e) => handleLinkClick(e, "/shop", "Bags")}>
                  Bags
                </a>
              </li>
              <li>
                <a href="/shop" className="footer-link" onClick={(e) => handleLinkClick(e, "/shop", "Footwear")}>
                  Footwear
                </a>
              </li>
              <li>
                <a href="/shop" className="footer-link" onClick={(e) => handleLinkClick(e, "/shop", "Accessories")}>
                  Accessories
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div>
            <h4 className="footer-heading">COMPANY</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/about" className="footer-link" onClick={(e) => handleLinkClick(e, "/about")}>
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="footer-link" onClick={(e) => handleLinkClick(e, "/contact")}>
                  Contact
                </a>
              </li>
              <li>
                <a href="/collections" className="footer-link" onClick={(e) => handleLinkClick(e, "/collections")}>
                  Collections
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: HELP */}
          <div>
            <h4 className="footer-heading">HELP</h4>
            <ul className="footer-links-list">
              <li>
                <a href="/shipping-policy" className="footer-link" onClick={(e) => handleLinkClick(e, "/shipping-policy")}>
                  Shipping
                </a>
              </li>
              <li>
                <a href="/return-policy" className="footer-link" onClick={(e) => handleLinkClick(e, "/return-policy")}>
                  Returns
                </a>
              </li>
              <li>
                <a href="/faq" className="footer-link" onClick={(e) => handleLinkClick(e, "/faq")}>
                  FAQs
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="footer-link" onClick={(e) => handleLinkClick(e, "/privacy-policy")}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="footer-link" onClick={(e) => handleLinkClick(e, "/terms")}>
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 LUXE MEN. All rights reserved.
          </div>
          <div style={{ display: "flex", gap: "16px", color: "var(--text-muted)", fontSize: "0.78rem" }}>
            <span>SSL 256-Bit Encrypted</span>
            <span>•</span>
            <span>Worldwide Insured Shipping</span>
            <span>•</span>
            <span>30-Day Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
