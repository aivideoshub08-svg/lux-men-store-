import React from "react";
import { useShop } from "../context/ShopContext";
import { IconClose } from "./Icons";

export const AnnouncementBar = () => {
  const { announcementVisible, dismissAnnouncement } = useShop();

  if (!announcementVisible) return null;

  return (
    <div className="announcement-bar" role="region" aria-label="Announcement">
      <div className="content">
        <span>✨ FREE SHIPPING ON ORDERS OVER $100</span>
      </div>
      <button
        onClick={dismissAnnouncement}
        className="close-btn"
        aria-label="Close announcement bar"
      >
        <IconClose size={16} />
      </button>
    </div>
  );
};
