import React from "react";
import { ShopProvider, useShop } from "./context/ShopContext";
import { AnnouncementBar } from "./components/AnnouncementBar";
import { Navbar } from "./components/Navbar";
import { MobileMenu } from "./components/MobileMenu";
import { CartDrawer } from "./components/CartDrawer";
import { QuickViewModal } from "./components/QuickViewModal";
import { SearchModal } from "./components/SearchModal";
import { ToastContainer } from "./components/ToastContainer";
import { BackToTop } from "./components/BackToTop";
import { Footer } from "./components/Footer";

// Pages
import { HomePage } from "./pages/HomePage";
import { ShopPage } from "./pages/ShopPage";
import { ProductDetailsPage } from "./pages/ProductDetailsPage";
import { NewArrivalsPage } from "./pages/NewArrivalsPage";
import { CollectionsPage } from "./pages/CollectionsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { FAQPage } from "./pages/FAQPage";
import { WishlistPage } from "./pages/WishlistPage";
import {
  PrivacyPolicyPage,
  TermsPage,
  ShippingPolicyPage,
  ReturnPolicyPage
} from "./pages/PolicyPages";
import { NotFoundPage } from "./pages/NotFoundPage";

const MainRouter = () => {
  const { currentPath } = useShop();

  const renderCurrentPage = () => {
    // Normalizing route
    const path = currentPath.toLowerCase();

    if (path === "/" || path === "") {
      return <HomePage />;
    }
    if (path === "/shop") {
      return <ShopPage />;
    }
    if (path.startsWith("/product/")) {
      return <ProductDetailsPage />;
    }
    if (path === "/new-arrivals") {
      return <NewArrivalsPage />;
    }
    if (path === "/collections") {
      return <CollectionsPage />;
    }
    if (path === "/about") {
      return <AboutPage />;
    }
    if (path === "/contact") {
      return <ContactPage />;
    }
    if (path === "/cart") {
      return <CartPage />;
    }
    if (path === "/checkout") {
      return <CheckoutPage />;
    }
    if (path === "/faq") {
      return <FAQPage />;
    }
    if (path === "/wishlist") {
      return <WishlistPage />;
    }
    if (path === "/privacy-policy") {
      return <PrivacyPolicyPage />;
    }
    if (path === "/terms") {
      return <TermsPage />;
    }
    if (path === "/shipping-policy") {
      return <ShippingPolicyPage />;
    }
    if (path === "/return-policy") {
      return <ReturnPolicyPage />;
    }

    return <NotFoundPage />;
  };

  return (
    <div className="app-root">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header */}
      <Navbar />

      {/* Mobile Drawer */}
      <MobileMenu />

      {/* Main Page Content */}
      <main className="main-content" role="main">
        {renderCurrentPage()}
      </main>

      {/* Drawers & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <SearchModal />
      <ToastContainer />
      <BackToTop />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainRouter />
    </ShopProvider>
  );
}
