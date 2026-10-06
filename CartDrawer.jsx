import React from "react";
import { useShop } from "../context/ShopContext";
import { IconClose, IconPlus, IconMinus, IconTrash, IconBag, IconArrowRight } from "./Icons";

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartSubtotal,
    freeShippingThreshold,
    isFreeShipping,
    shippingRemaining,
    updateCartQuantity,
    removeFromCart,
    navigate
  } = useShop();

  if (!isCartOpen) return null;

  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));

  return (
    <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <IconBag size={20} style={{ color: "var(--accent-gold)" }} />
            <h3 className="title">YOUR SHOPPING BAG</h3>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="action-btn"
            aria-label="Close cart"
          >
            <IconClose size={20} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="shipping-progress-box">
          {isFreeShipping ? (
            <span style={{ color: "var(--accent-gold)", fontWeight: "600" }}>
              🎉 You have unlocked complimentary express shipping!
            </span>
          ) : (
            <span>
              Add <strong style={{ color: "var(--accent-gold)" }}>${shippingRemaining}</strong> more to qualify for <strong>FREE SHIPPING</strong>.
            </span>
          )}
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        {cart.length === 0 ? (
          <div className="empty-state-box">
            <div className="empty-state-icon">
              <IconBag size={28} />
            </div>
            <h4 className="empty-state-title">Your cart is currently empty.</h4>
            <p className="empty-state-desc">
              Explore our luxury collection and elevate your daily wardrobe.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setIsCartOpen(false);
                navigate("/shop");
              }}
            >
              START SHOPPING
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items-scroll">
              {cart.map((item) => (
                <div key={item.cartItemId} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-img"
                  />
                  <div>
                    <h5 className="cart-item-title">{item.name}</h5>
                    <div className="cart-item-meta">
                      {item.selectedColor} • {item.selectedSize}
                    </div>
                    <div className="cart-item-price">${item.price}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="cart-item-remove-btn"
                      aria-label="Remove item"
                      title="Remove"
                    >
                      <IconTrash size={16} />
                    </button>
                    <div className="qty-control">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, -1)}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        <IconMinus size={12} />
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, 1)}
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        <IconPlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="cart-drawer-footer">
              <div className="subtotal-row">
                <span className="subtotal-label">Subtotal</span>
                <span className="subtotal-amount">${cartSubtotal}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                  className="btn btn-primary btn-block"
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate("/checkout");
                  }}
                >
                  PROCEED TO CHECKOUT <IconArrowRight size={16} />
                </button>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="btn btn-secondary btn-block btn-sm"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate("/cart");
                    }}
                  >
                    VIEW FULL CART
                  </button>
                  <button
                    className="btn btn-dark btn-block btn-sm"
                    onClick={() => setIsCartOpen(false)}
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
