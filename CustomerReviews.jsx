import React from "react";
import { testimonialsData } from "../data/products";
import { IconStar } from "./Icons";

export const CustomerReviews = () => {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">TESTIMONIALS</span>
          <h2 className="title">WHAT OUR CUSTOMERS SAY</h2>
          <p className="description">
            Read authentic impressions from gentlemen who choose LUXE MEN worldwide.
          </p>
        </div>

        <div className="reviews-grid">
          {testimonialsData.map((item) => (
            <div key={item.id} className="review-card">
              <div className="review-stars">
                {[...Array(5)].map((_, i) => (
                  <IconStar key={i} size={15} filled={true} />
                ))}
              </div>

              <blockquote className="review-quote">
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className="review-author-row">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="review-avatar"
                  loading="lazy"
                />
                <div>
                  <div className="review-name">{item.name}</div>
                  <div className="review-role">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
