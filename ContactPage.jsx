import React, { useState } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useShop } from "../context/ShopContext";
import { IconCheck } from "../components/Icons";

export const ContactPage = () => {
  const { addToast } = useShop();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast("Please fill in all required fields.", "info");
      return;
    }
    setSubmitted(true);
    addToast("Thank you! Your message has been received.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="section-padding" style={{ paddingTop: "40px" }}>
      <div className="container">
        <Breadcrumbs items={[{ label: "Contact" }]} />

        <div className="section-header" style={{ textAlign: "left", margin: "0 0 48px" }}>
          <span className="subtitle">CONCIERGE & INQUIRIES</span>
          <h1 className="title" style={{ fontSize: "2.6rem" }}>GET IN TOUCH</h1>
          <p className="description">
            Have a question about our collection? We&apos;d love to hear from you.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "60px", alignItems: "start" }}>
          {/* Left: Contact Info */}
          <div style={{ background: "var(--bg-card)", padding: "40px 32px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "24px" }}>CLIENT ADVISORY</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--accent-gold)", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  EMAIL CONCIERGE
                </span>
                <a href="mailto:hello@luxemen.demo" style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>
                  hello@luxemen.demo
                </a>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--accent-gold)", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  PHONE SUPPORT
                </span>
                <a href="tel:+10001234567" style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>
                  +1 (000) 123-4567
                </a>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--accent-gold)", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  SHOWROOM & HEADQUARTERS
                </span>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
                  123 Fashion Avenue<br />
                  New York, NY 10018
                </p>
              </div>

              <div style={{ paddingTop: "20px", borderTop: "1px solid var(--border-subtle)" }}>
                <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--text-muted)", display: "block", marginBottom: "8px" }}>
                  HOURS OF OPERATION
                </span>
                <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  Monday – Friday: 9:00 AM – 6:00 PM EST<br />
                  Saturday – Sunday: Closed for Atelier Restoration
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div style={{ background: "var(--bg-card)", padding: "40px 36px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
            <h3 style={{ fontSize: "1.4rem", marginBottom: "8px" }}>SEND A MESSAGE</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "28px" }}>
              Our personal styling advisors typically respond within 12 business hours.
            </p>

            {submitted ? (
              <div style={{ padding: "36px 20px", textAlign: "center", background: "var(--bg-tertiary)", borderRadius: "var(--radius-sm)", border: "1px solid var(--accent-gold)" }}>
                <div style={{ color: "var(--accent-gold)", display: "inline-flex", padding: "12px", background: "var(--accent-gold-subtle)", borderRadius: "50%", marginBottom: "16px" }}>
                  <IconCheck size={32} />
                </div>
                <h4 style={{ fontSize: "1.3rem", marginBottom: "8px" }}>
                  Thank you! Your message has been received.
                </h4>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "24px" }}>
                  A member of our client care team has been notified and will be in touch shortly.
                </p>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSubmitted(false)}
                >
                  SEND ANOTHER INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group-row">
                  <div className="form-field">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Julian Vance"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      className="form-input"
                      placeholder="e.g. julian@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    className="form-input"
                    placeholder="Inquiry regarding styling, sizing, or orders"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    className="form-input"
                    placeholder="How may our advisors assist you today?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: "12px" }}>
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
