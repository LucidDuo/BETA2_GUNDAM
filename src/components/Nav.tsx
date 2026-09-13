import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isShop = location.pathname === "/shop";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? "12px 40px" : "24px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          background: scrolled
            ? "rgba(6, 6, 10, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(201, 168, 76, 0.12)"
            : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: 36,
                height: 36,
                border: "1.5px solid #c9a84c",
                transform: "rotate(45deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  background: "#c9a84c",
                  transform: "rotate(0deg)",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "15px",
                fontWeight: 700,
                color: "#f0ede8",
                letterSpacing: "0.15em",
                lineHeight: 1,
              }}
            >
              UNIT
              <span style={{ color: "#c9a84c" }}>ZERO</span>
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
          }}
        >
          {[
            { label: "HOME", to: "/" },
            { label: "SHOP", to: "/shop" },
            { label: "RARE UNITS", to: "/shop#rare" },
            { label: "ABOUT", to: "/#vision" },
          ].map((item) => (
            <Link
              key={item.label}
              to={item.to}
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                color:
                  (item.to === "/" && !isShop) ||
                  (item.to === "/shop" && isShop)
                    ? "#c9a84c"
                    : "#6b6b7e",
                textDecoration: "none",
                transition: "color 0.3s ease",
                position: "relative",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#c9a84c")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color =
                  (item.to === "/" && !isShop) ||
                  (item.to === "/shop" && isShop)
                    ? "#c9a84c"
                    : "#6b6b7e")
              }
            >
              {item.label}
            </Link>
          ))}

          <Link
            to="/shop"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#06060a",
              textDecoration: "none",
              background: "#c9a84c",
              padding: "10px 20px",
              transition: "all 0.3s ease",
              clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#e8c97a";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#c9a84c";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            ACQUIRE
          </Link>
        </div>
      </nav>
    </>
  );
}
