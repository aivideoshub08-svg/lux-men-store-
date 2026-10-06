import React from "react";
import { useShop } from "../context/ShopContext";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { IconTrash, IconPlus, IconMinus, IconBag, IconArrowRight, IconShield } from "../components/Icons";

export const CartPage = () => {
  const {
    cart,
    cartSubtotal,
    freeShippingThreshold,
    isFreeShipping,
    shippingRemaining,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    navigate
  } = useShop();

  const estimatedShipping = isFreeShipping ? 0 : 15;
  const estimatedTotal = cartSubtotal + (cart.length > 0 ? estimatedShipping : 0);

  return (
    <div className="section-padding" style={{ paddingTop: "40px" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Shopping Bag" }]} />

        <div className="section-header" style={{ textAlign: "left", margin: "0 0 40px" }}>
          <span className="subtitle">REVIEW ORDER</span>
          <h1 className="title" style={{ fontSize: "2.6rem" }}>SHOPPING BAG</h1>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state-box" style={{ background: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", padding: "72px 24px" }}>
            <div className="empty-state-icon">
              <IconBag size={36} />
            </div>
            <h2 className="empty-state-title" style={{ fontSize: "1.6rem" }}>Your cart is currently empty.</h2>
            <p className="empty-state-desc" style={{ maxWidth: "380px" }}>
              Explore the latest releases from LUXE MEN and add distinctive pieces to your collection.
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/shop")}>
              START SHOPPING
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.8fr", gap: "48px", alignItems: "start" }}>
            {/* Left: Items list */}
            <div>
              {/* Shipping banner */}
              <div style={{ background: "var(--bg-card)", padding: "16px 20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", marginBottom: "24px" }}>
                {isFreeShipping ? (
                  <span style={{ color: "var(--accent-gold)", fontWeight: "600", fontSize: "0.9rem" }}>
                    🎉 Qualified for Free Insured Express Delivery!
                  </span>
                ) : (
                  <span style={{ fontSize: "0.88rem" }}>
                    Add <strong>${shippingRemaining}</strong> more to your order to unlock <strong>FREE SHIPPING</strong>.
                  </span>
                )}
              </div>

              <div style={{ background: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: "20px", padding: "18px 24px", borderBottom: "1px solid var(--border-subtle)", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)" }}>
                  <span>Product</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Total</span>
                </div>

                <div style={{ padding: "0 24px" }}>
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto auto auto",
                        gap: "20px",
                        alignItems: "center",
                        padding: "24px 0",
                        borderBottom: "1px solid var(--border-subtle)"
                      }}
                    >
                      {/* Product Column */}
                      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: "72px", height: "80px", objectFit: "cover", borderRadius: "var(--radius-sm)" }}
                        />
                        <div>
                          <h4 style={{ fontSize: "1rem", marginBottom: "4px" }}>{item.name}</h4>
                          <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", display: "block", marginBottom: "8px" }}>
                            {item.selectedColor} • {item.selectedSize}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            style={{ color: "var(--danger)", fontSize: "0.75rem", display: "inline-flex", alignItems: "center", gap: "4px" }}
                          >
                            <IconTrash size={13} /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price Column */}
                      <div style={{ fontWeight: "600", color: "var(--text-secondary)" }}>
                        ${item.price}
                      </div>

                      {/* Quantity Column */}
                      <div>
                        <div className="qty-control">
                          <button
                            className="qty-btn"
                            onClick={() => updateCartQuantity(item.cartItemId, -1)}
                            aria-label="Decrease quantity"
                          >
                            <IconMinus size={12} />
                          </button>
                          <span className="qty-val">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            onClick={() => updateCartQuantity(item.cartItemId, 1)}
                            aria-label="Increase quantity"
                          >
                            <IconPlus size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Subtotal Column */}
                      <div style={{ fontWeight: "700", color: "var(--accent-gold)", minWidth: "60px", textAlign: "right" }}>
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ padding: "18px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-tertiary)" }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate("/shop")}
                  >
                    CONTINUE SHOPPING
                  </button>
                  <button
                    style={{ fontSize: "0.8rem", color: "var(--text-muted)", textDecoration: "underline" }}
                    onClick={clearCart}
                  >
                    Clear All Items
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Summary */}
            <div className="order-summary-card">
              <h3 style={{ fontSize: "1.3rem", marginBottom: "22px" }}>ORDER SUMMARY</h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem", color: "var(--text-muted)" }}>
                  <span>Cart Subtotal</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>${cartSubtotal}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem", color: "var(--text-muted)" }}>
                  <span>Estimated Shipping</span>
                  <span style={{ color: isFreeShipping ? "var(--accent-gold)" : "var(--text-primary)", fontWeight: "600" }}>
                    {isFreeShipping ? "FREE" : `$${estimatedShipping}`}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.92rem", color: "var(--text-muted)" }}>
                  <span>Estimated Taxes</span>
                  <span style={{ color: "var(--text-primary)", fontWeight: "600" }}>Calculated at checkout</span>
                </div>

                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "18px", marginTop: "6px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontSize: "1.05rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.08em" }}>Total</span>
                  <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", fontWeight: "700", color: "var(--accent-gold)" }}>
                    ${estimatedTotal}
                  </span>
                </div>
              </div>

              <button
                className="btn btn-primary btn-block"
                style={{ padding: "16px" }}
                onClick={() => navigate("/checkout")}
              >
                PROCEED TO CHECKOUT <IconArrowRight size={16} />
              </button>

              <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: "10px", color: "var(--text-muted)", fontSize: "0.78rem" }}>
                <IconShield size={18} style={{ color: "var(--accent-gold)" }} />
                <span>Encrypted 256-bit checkout security guaranteed</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
