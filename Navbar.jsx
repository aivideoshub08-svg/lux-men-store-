import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { IconSearch, IconHeart, IconBag, IconMenu } from "./Icons";

export const Navbar = () => {
  const {
    currentPath,
    navigate,
    setIsCartOpen,
    setIsSearchOpen,
    cartItemCount,
    wishlist,
    setIsMobileMenuOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "New Arrivals", path: "/new-arrivals" },
    { label: "Collections", path: "/collections" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        {/* Left: Mobile Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <IconMenu size={24} />
        </button>

        {/* Left/Center: Luxury Brand Logo */}
        <a
          href="/"
          className="brand-logo"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
          aria-label="LUXE MEN Home"
        >
          <span className="logo-main">LUXE MEN</span>
          <span className="logo-sub">EST. 2026 • NEW YORK</span>
        </a>

        {/* Center: Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                className={`nav-link ${isActive ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(link.path);
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Header Actions */}
        <div className="header-actions">
          <button
            className="action-btn"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search products"
            title="Search"
          >
            <IconSearch size={20} />
          </button>

          <button
            className="action-btn"
            onClick={() => navigate("/wishlist")}
            aria-label="Wishlist"
            title="Wishlist"
          >
            <IconHeart size={20} />
            {wishlist.length > 0 && (
              <span className="badge-count">{wishlist.length}</span>
            )}
          </button>

          <button
            className="action-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            title="Cart"
          >
            <IconBag size={20} />
            {cartItemCount > 0 && (
              <span className="badge-count">{cartItemCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
