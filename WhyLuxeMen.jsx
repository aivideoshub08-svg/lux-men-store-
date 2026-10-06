import React from "react";
import { IconShield, IconSparkles, IconLock, IconTruck } from "./Icons";

export const WhyLuxeMen = () => {
  const benefits = [
    {
      icon: <IconSparkles size={26} />,
      title: "Premium Quality",
      description: "Selected materials and refined craftsmanship."
    },
    {
      icon: <IconShield size={26} />,
      title: "Modern Design",
      description: "Timeless styles built for today's wardrobe."
    },
    {
      icon: <IconLock size={26} />,
      title: "Secure Shopping",
      description: "A smooth and secure shopping experience."
    },
    {
      icon: <IconTruck size={26} />,
      title: "Fast Delivery",
      description: "Reliable delivery on every order."
    }
  ];

  return (
    <section className="section-padding benefits-section">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">THE LUXE STANDARD</span>
          <h2 className="title">WHY LUXE MEN?</h2>
          <p className="description">
            Commitment to uncompromising aesthetics, ethical sourcing, and distinguished quality.
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((item, idx) => (
            <div key={idx} className="benefit-card">
              <div className="benefit-icon-wrapper">{item.icon}</div>
              <h3 className="benefit-title">{item.title}</h3>
              <p className="benefit-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
