import React from "react";
import { Breadcrumbs } from "../components/Breadcrumbs";

export const PrivacyPolicyPage = () => (
  <div className="section-padding" style={{ paddingTop: "40px" }}>
    <div className="container" style={{ maxWidth: "840px" }}>
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <h1 className="title" style={{ fontSize: "2.6rem", marginBottom: "24px" }}>PRIVACY POLICY</h1>
      <div style={{ background: "var(--bg-card)", padding: "40px 36px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", lineHeight: "1.8", color: "var(--text-secondary)" }}>
        <p style={{ marginBottom: "20px" }}>
          At LUXE MEN, we respect your privacy and are committed to safeguarding personal information collected through our demonstration storefront. This policy outlines how information is gathered and protected.
        </p>
        <h3 style={{ color: "var(--text-primary)", margin: "24px 0 12px" }}>1. Information We Collect</h3>
        <p style={{ marginBottom: "20px" }}>
          During demonstration interactions, simulated form inputs such as names, addresses, and dummy email entries remain strictly on your local browser session and are not sold or transferred to third-party commercial marketing networks.
        </p>
        <h3 style={{ color: "var(--text-primary)", margin: "24px 0 12px" }}>2. Local Storage & Cookies</h3>
        <p style={{ marginBottom: "20px" }}>
          We employ browser localStorage to preserve your shopping bag contents, wishlist preferences, and interface dismissals between visits for an optimized user experience.
        </p>
        <h3 style={{ color: "var(--text-primary)", margin: "24px 0 12px" }}>3. Data Protection</h3>
        <p>
          All simulated checkout sequences utilize modern industry-standard cryptographic patterns. For inquiries regarding data practices, contact us at hello@luxemen.demo.
        </p>
      </div>
    </div>
  </div>
);

export const TermsPage = () => (
  <div className="section-padding" style={{ paddingTop: "40px" }}>
    <div className="container" style={{ maxWidth: "840px" }}>
      <Breadcrumbs items={[{ label: "Terms & Conditions" }]} />
      <h1 className="title" style={{ fontSize: "2.6rem", marginBottom: "24px" }}>TERMS & CONDITIONS</h1>
      <div style={{ background: "var(--bg-card)", padding: "40px 36px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", lineHeight: "1.8", color: "var(--text-secondary)" }}>
        <p style={{ marginBottom: "20px" }}>
          Welcome to LUXE MEN. By accessing or interacting with this demo e-commerce platform, you agree to be bound by the following demonstration terms and guidelines.
        </p>
        <h3 style={{ color: "var(--text-primary)", margin: "24px 0 12px" }}>1. Platform Nature</h3>
        <p style={{ marginBottom: "20px" }}>
          LUXE MEN is an illustrative luxury menswear demonstration website. Products displayed, pricing models, and checkout workflows represent simulated samples intended for educational, showcase, and developmental evaluation.
        </p>
        <h3 style={{ color: "var(--text-primary)", margin: "24px 0 12px" }}>2. Intellectual Property</h3>
        <p style={{ marginBottom: "20px" }}>
          Brand identity assets, logos, copy, and layout arrangements are proprietary creations of LUXE MEN. Visual imagery is curated via royalty-free editorial licenses.
        </p>
        <h3 style={{ color: "var(--text-primary)", margin: "24px 0 12px" }}>3. Limitation of Liability</h3>
        <p>
          Simulated order confirmations and shipping receipts are generated for demonstration feedback and do not constitute legally binding commercial sales contracts.
        </p>
      </div>
    </div>
  </div>
);

export const ShippingPolicyPage = () => (
  <div className="section-padding" style={{ paddingTop: "40px" }}>
    <div className="container" style={{ maxWidth: "840px" }}>
      <Breadcrumbs items={[{ label: "Shipping Policy" }]} />
      <h1 className="title" style={{ fontSize: "2.6rem", marginBottom: "24px" }}>SHIPPING POLICY</h1>
      <div style={{ background: "var(--bg-card)", padding: "40px 36px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", lineHeight: "1.8", color: "var(--text-secondary)" }}>
        <p style={{ marginBottom: "20px" }}>
          We hold shipping and unboxing to the highest luxury standard. Every order is meticulously hand-inspected, wrapped in archival tissue paper, and packaged in our rigid foil-stamped presentation vaults.
        </p>
        <h3 style={{ color: "var(--text-primary)", margin: "24px 0 12px" }}>Delivery Timelines</h3>
        <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
          <li><strong>Standard Express (Domestic):</strong> 2–4 business days ($15, or FREE on orders over $100).</li>
          <li><strong>Priority Courier (Worldwide):</strong> 3–6 business days with door-to-door signature tracking.</li>
        </ul>
        <h3 style={{ color: "var(--text-primary)", margin: "24px 0 12px" }}>Tracking & Insurance</h3>
        <p>
          All consignments are fully insured against transit loss. Tracking credentials are provided upon simulated dispatch.
        </p>
      </div>
    </div>
  </div>
);

export const ReturnPolicyPage = () => (
  <div className="section-padding" style={{ paddingTop: "40px" }}>
    <div className="container" style={{ maxWidth: "840px" }}>
      <Breadcrumbs items={[{ label: "Return Policy" }]} />
      <h1 className="title" style={{ fontSize: "2.6rem", marginBottom: "24px" }}>RETURN & EXCHANGE POLICY</h1>
      <div style={{ background: "var(--bg-card)", padding: "40px 36px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", lineHeight: "1.8", color: "var(--text-secondary)" }}>
        <p style={{ marginBottom: "20px" }}>
          We want you to feel complete pride in your LUXE MEN pieces. If an item fails to meet your discerning expectations, we provide a smooth 30-day return and exchange window.
        </p>
        <h3 style={{ color: "var(--text-primary)", margin: "24px 0 12px" }}>Conditions for Returns</h3>
        <ul style={{ paddingLeft: "20px", marginBottom: "24px" }}>
          <li>Items must be unworn, unwashed, and in pristine original condition.</li>
          <li>Original protective dust bags, warranty booklets, and tags must remain attached.</li>
          <li>Footwear must be tried on carpeted surfaces only to prevent sole creasing.</li>
        </ul>
        <h3 style={{ color: "var(--text-primary)", margin: "24px 0 12px" }}>How to Initiate</h3>
        <p>
          Submit your return request through our concierge at hello@luxemen.demo to receive a prepaid courier return label.
        </p>
      </div>
    </div>
  </div>
);
