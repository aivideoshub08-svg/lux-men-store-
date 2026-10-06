import React from "react";
import { useShop } from "../context/ShopContext";
import { IconCheck, IconClose } from "./Icons";

export const ToastContainer = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-message">
          <div className="toast-icon">
            <IconCheck size={18} />
          </div>
          <span style={{ flex: 1 }}>{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            style={{ color: "var(--text-muted)", padding: "2px" }}
            aria-label="Dismiss toast"
          >
            <IconClose size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};
