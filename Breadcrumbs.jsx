import React from "react";
import { useShop } from "../context/ShopContext";
import { IconChevronRight } from "./Icons";

export const Breadcrumbs = ({ items = [] }) => {
  const { navigate } = useShop();

  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        Home
      </a>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <IconChevronRight size={12} />
          {item.path ? (
            <a
              href={item.path}
              onClick={(e) => {
                e.preventDefault();
                navigate(item.path);
              }}
            >
              {item.label}
            </a>
          ) : (
            <span>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
