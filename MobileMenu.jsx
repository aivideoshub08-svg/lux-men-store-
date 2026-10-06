import React from "react";
import { useShop } from "../context/ShopContext";
import { IconClose, IconChevronRight, IconHeart, IconBag, IconSearch } from "./Icons";

export const MobileMenu = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    currentPath,
    navigate,
    setIsSearchOpen,
    setIsCartOpen,
    wishlist,
    cartItemCount
  } = useShop();

  if (!isMobileMenuOpen) return null;

  const links = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Collections", path: "/collections" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <div className="mobile-menu-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
      <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-header">
          <div className="brand-logo">
            <span className="logo-main">LUXE MEN</span>
            <span className="logo-sub">NEW YORK</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="action-btn"
          >
            <IconClose size={22} />
          </button>
        </div>

        <nav className="mobile-nav-links">
          {links.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                className={`mobile-nav-link ${isActive ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.path);
                }}
              >
                <span>{link.label}</span>
                <IconChevronRight size={16} />
              </a>
            );
          })}
        </nav>

        <div className="mobile-menu-footer">
          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <button
              className="btn btn-dark btn-sm btn-block"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
            >
              <IconSearch size={16} /> Search
            </button>
            <button
              className="btn btn-dark btn-sm btn-block"
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/wishlist");
              }}
            >
              <IconHeart size={16} /> Wishlist ({wishlist.length})
            </button>
          </div>
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
          >
            <IconBag size={18} /> View Bag ({cartItemCount})
          </button>
        </div>
      </div>
    </div>
  );
};
