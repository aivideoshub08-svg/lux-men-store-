import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { IconCheck, IconShield, IconLock, IconArrowRight, IconBag } from "../components/Icons";

export const CheckoutPage = () => {
  const { cart, cartSubtotal, isFreeShipping, clearCart, navigate, addToast } = useShop();

  const [form, setForm] = useState({
    email: "customer@example.com",
    firstName: "Julian",
    lastName: "Vance",
    address: "742 Evergreen Terrace",
    city: "New York",
    postalCode: "10001",
    country: "United States",
    phone: "+1 (555) 019-2834",
    cardNumber: "4242 •••• •••• 4242",
    cardExp: "12/28",
    cardCvc: "888",
    cardName: "Julian Vance"
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shippingCost = isFreeShipping ? 0 : 15;
  const orderTotal = cartSubtotal + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      addToast("Your cart is empty. Please add items before checking out.", "info");
      return;
    }

    const generatedId = "LX-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setOrderConfirmed(true);
    clearCart();
    addToast("Demo order placed successfully!");
  };

  if (orderConfirmed) {
    return (
      <div className="section-padding" style={{ minHeight: "75vh", display: "flex", alignItems: "center" }}>
        <div className="container" style={{ maxWidth: "680px" }}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-gold)", borderRadius: "var(--radius-md)", padding: "52px 40px", textAlign: "center", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "var(--accent-gold-subtle)", border: "2px solid var(--accent-gold)", color: "var(--accent-gold)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <IconCheck size={36} />
            </div>

            <span style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "var(--accent-gold)", fontWeight: "600", display: "block", marginBottom: "8px" }}>
              ORDER {orderId}
            </span>

            <h1 style={{ fontSize: "2.4rem", marginBottom: "16px" }}>
              Order Confirmed
            </h1>

            <p style={{ fontSize: "1.15rem", color: "var(--text-primary)", fontWeight: "500", marginBottom: "8px" }}>
              Thank you for shopping with LUXE MEN.
            </p>

            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "32px", lineHeight: "1.6" }}>
              Your demo order has been successfully placed. In a production environment, a receipt with live tracking details would be dispatched to <strong>{form.email}</strong>.
            </p>

            <div style={{ background: "var(--bg-tertiary)", padding: "20px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", marginBottom: "32px", textAlign: "left", fontSize: "0.88rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "var(--text-muted)" }}>Shipping Address:</span>
                <span style={{ color: "var(--text-primary)", fontWeight: "500" }}>{form.address}, {form.city}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Estimated Arrival:</span>
                <span style={{ color: "var(--accent-gold)", fontWeight: "600" }}>2–4 Business Days</span>
              </div>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/shop")}
            >
              Continue Shopping <IconArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding" style={{ paddingTop: "40px" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Cart", path: "/cart" }, { label: "Demo Checkout" }]} />

        <div className="section-header" style={{ textAlign: "left", margin: "0 0 36px" }}>
          <span className="subtitle">INSTANT CHECKOUT</span>
          <h1 className="title" style={{ fontSize: "2.6rem" }}>SECURE CHECKOUT</h1>
          <p className="description">
            Complete your order below. This is an interactive frontend demonstration.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state-box" style={{ background: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <div className="empty-state-icon">
              <IconBag size={32} />
            </div>
            <h3 className="empty-state-title">Your cart is currently empty.</h3>
            <p className="empty-state-desc">
              Please choose products before proceeding to the checkout portal.
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/shop")}>
              START SHOPPING
            </button>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="checkout-grid">
            {/* Left: Input Sections */}
            <div>
              {/* 1. Contact Information */}
              <div style={{ background: "var(--bg-card)", padding: "32px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "32px" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "18px", letterSpacing: "0.06em" }}>
                  1. CONTACT INFORMATION
                </h3>
                <div className="form-field">
                  <label htmlFor="chk-email">Email Address *</label>
                  <input
                    id="chk-email"
                    type="email"
                    className="form-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div style={{ background: "var(--bg-card)", padding: "32px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", marginBottom: "32px" }}>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "18px", letterSpacing: "0.06em" }}>
                  2. SHIPPING ADDRESS
                </h3>
                <div className="form-group-row">
                  <div className="form-field">
                    <label htmlFor="chk-fname">First Name *</label>
                    <input
                      id="chk-fname"
                      type="text"
                      className="form-input"
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="chk-lname">Last Name *</label>
                    <input
                      id="chk-lname"
                      type="text"
                      className="form-input"
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="chk-addr">Street Address *</label>
                  <input
                    id="chk-addr"
                    type="text"
                    className="form-input"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label htmlFor="chk-city">City *</label>
                    <input
                      id="chk-city"
                      type="text"
                      className="form-input"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="chk-postal">Postal Code *</label>
                    <input
                      id="chk-postal"
                      type="text"
                      className="form-input"
                      value={form.postalCode}
                      onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label htmlFor="chk-country">Country *</label>
                    <input
                      id="chk-country"
                      type="text"
                      className="form-input"
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="chk-phone">Phone Number *</label>
                    <input
                      id="chk-phone"
                      type="tel"
                      className="form-input"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 3. Demo Payment Form */}
              <div style={{ background: "var(--bg-card)", padding: "32px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                  <h3 style={{ fontSize: "1.2rem", letterSpacing: "0.06em" }}>
                    3. DEMO PAYMENT METHOD
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent-gold)", fontSize: "0.8rem" }}>
                    <IconLock size={15} />
                    <span>Demo Mode (Encrypted)</span>
                  </div>
                </div>

                <div style={{ background: "var(--bg-tertiary)", padding: "12px 16px", borderRadius: "var(--radius-sm)", marginBottom: "20px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  💡 This is a frontend demo sandbox. No real charges or payment accounts will be used.
                </div>

                <div className="form-field">
                  <label htmlFor="chk-cname">Cardholder Name *</label>
                  <input
                    id="chk-cname"
                    type="text"
                    className="form-input"
                    value={form.cardName}
                    onChange={(e) => setForm({ ...form, cardName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="chk-cnum">Card Number *</label>
                  <input
                    id="chk-cnum"
                    type="text"
                    className="form-input"
                    value={form.cardNumber}
                    onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label htmlFor="chk-cexp">Expiration Date *</label>
                    <input
                      id="chk-cexp"
                      type="text"
                      className="form-input"
                      value={form.cardExp}
                      onChange={(e) => setForm({ ...form, cardExp: e.target.value })}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="chk-cvc">CVV Security Code *</label>
                    <input
                      id="chk-cvc"
                      type="text"
                      className="form-input"
                      value={form.cardCvc}
                      onChange={(e) => setForm({ ...form, cardCvc: e.target.value })}
                      placeholder="3 digits"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div>
              <div className="order-summary-card">
                <h3 style={{ fontSize: "1.25rem", marginBottom: "20px" }}>
                  ORDER SUMMARY ({cart.length} {cart.length === 1 ? "item" : "items"})
                </h3>

                {/* Items preview */}
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxHeight: "280px", overflowY: "auto", marginBottom: "22px", paddingRight: "4px" }}>
                  {cart.map((item) => (
                    <div key={item.cartItemId} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "52px", height: "58px", objectFit: "cover", borderRadius: "var(--radius-sm)" }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "0.88rem", fontWeight: "600", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.name}
                        </div>
                        <div style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}>
                          Qty: {item.quantity} • {item.selectedColor}
                        </div>
                      </div>
                      <div style={{ fontSize: "0.9rem", fontWeight: "700", color: "var(--accent-gold)" }}>
                        ${item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "18px", display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    <span>Subtotal</span>
                    <span style={{ color: "var(--text-primary)" }}>${cartSubtotal}</span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    <span>Shipping</span>
                    <span style={{ color: isFreeShipping ? "var(--accent-gold)" : "var(--text-primary)" }}>
                      {isFreeShipping ? "FREE" : `$${shippingCost}`}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border-subtle)", paddingTop: "14px", marginTop: "6px", alignItems: "baseline" }}>
                    <span style={{ fontSize: "1.05rem", fontWeight: "700" }}>Total Due</span>
                    <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.7rem", fontWeight: "700", color: "var(--accent-gold)" }}>
                      ${orderTotal}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  style={{ marginTop: "24px", padding: "16px" }}
                >
                  Place Demo Order
                </button>

                <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", color: "var(--text-muted)", fontSize: "0.78rem" }}>
                  <IconShield size={16} style={{ color: "var(--accent-gold)" }} />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
