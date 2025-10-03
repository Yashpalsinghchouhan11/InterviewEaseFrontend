import React from "react";
import Header from "../sections/header";
import Footer from "../sections/footer";
import Toast from "../others/toast";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen  flex flex-col  text-black">
      <Header />

      <div className="max-w-custom mx-auto px-6 mt-4">
        <Toast />
      </div>

      <main className="flex-grow max-w-custom mx-auto px-6 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
