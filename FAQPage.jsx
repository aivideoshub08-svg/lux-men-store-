import React, { useState } from "react";
import { faqsData } from "../data/products";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { useShop } from "../context/ShopContext";
import { IconChevronDown, IconChevronUp } from "../components/Icons";

export const FAQPage = () => {
  const { navigate } = useShop();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="section-padding" style={{ paddingTop: "40px" }}>
      <div className="container" style={{ maxWidth: "860px" }}>
        <Breadcrumbs items={[{ label: "Frequently Asked Questions" }]} />

        <div className="section-header" style={{ textAlign: "left", margin: "0 0 48px" }}>
          <span className="subtitle">CLIENT ASSISTANCE</span>
          <h1 className="title" style={{ fontSize: "2.6rem" }}>FREQUENTLY ASKED QUESTIONS</h1>
          <p className="description">
            Find immediate clarity regarding orders, delivery timelines, product provenance, and returns.
          </p>
        </div>

        <div className="accordion-wrapper" style={{ borderTop: "none" }}>
          {faqsData.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="accordion-item" style={{ background: "var(--bg-card)", padding: "0 24px", marginBottom: "16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)" }}>
                <button
                  className="accordion-trigger"
                  onClick={() => toggleFAQ(idx)}
                  style={{ borderBottom: "none" }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{faq.question}</span>
                  {isOpen ? (
                    <IconChevronUp size={20} style={{ color: "var(--accent-gold)" }} />
                  ) : (
                    <IconChevronDown size={20} />
                  )}
                </button>
                {isOpen && (
                  <div className="accordion-body" style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div style={{ marginTop: "60px", padding: "36px", background: "var(--bg-secondary)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", textAlign: "center" }}>
          <h3 style={{ fontSize: "1.4rem", marginBottom: "10px" }}>Still have inquiries?</h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "22px" }}>
            Our concierge team in New York is at your disposal 7 days a week.
          </p>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate("/contact")}>
            CONTACT CLIENT SERVICES
          </button>
        </div>
      </div>
    </div>
  );
};
