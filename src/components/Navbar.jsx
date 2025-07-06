// src/components/Navbar.jsx

import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { id: "publications", label: "Daftar Publikasi", path: "/publications" },
  { id: "add", label: "Tambah Publikasi", path: "/publications/add" },
  { id: "logout", label: "Logout", path: "/login" },
];

function BpsLogo() {
  return (
    <img
      src="https://res.cloudinary.com/djcm0swgo/image/upload/v1751775675/bps-logo_1_ldppzk.png"
      alt="BPS Logo"
      className="h-12 w-12"
    />
  );
}

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-[#0369A1] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <BpsLogo />
            <span className="text-white text-base md:text-lg font-bold tracking-wider hidden sm:block">
              BPS PROVINSI BENGKULU
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.id === "add" &&
                  location.pathname.startsWith("/publications/add")) ||
                (item.id === "publications" &&
                  location.pathname === "/publications");
              const isImplemented = ["publications", "add"].includes(item.id);

              return (
                <Link
                  key={item.id}
                  to={isImplemented ? item.path : "#"}
                  className={
                    `px-3 py-2 rounded-md text-sm font-semibold transition-all duration-300 border border-transparent ` +
                    `${
                      isImplemented
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-60"
                    } ` +
                    `${
                      isActive && isImplemented
                        ? "bg-slate-200 text-sky-900 shadow-inner"
                        : "text-sky-100 hover:bg-sky-700 hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
