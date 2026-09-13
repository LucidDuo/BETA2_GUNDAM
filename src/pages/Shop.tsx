import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

/* ── Types ── */
interface Product {
  id: number;
  name: string;
  series: string;
  grade: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  stock: number;
  year: number;
  isRare?: boolean;
}

/* ── Product Data ── */
const STANDARD: Product[] = [
  {
    id: 1,
    name: "RX-78-2 GUNDAM",
    series: "Mobile Suit Gundam",
    grade: "MG 1/100",
    price: 58000,
    image: "https://images.unsplash.com/photo-1625314887424-9f190599bd56?w=400&h=500&fit=crop&auto=format",
    stock: 12,
    year: 2023,
  },
  {
    id: 2,
    name: "WING ZERO EW",
    series: "Gundam Wing",
    grade: "RG 1/144",
    price: 46000,
    image: "https://images.unsplash.com/photo-1643345397840-651fc8efd91e?w=400&h=500&fit=crop&auto=format",
    stock: 7,
    year: 2022,
  },
  {
    id: 3,
    name: "UNICORN GUNDAM",
    series: "Unicorn",
    grade: "MG 1/100",
    price: 72000,
    image: "https://images.unsplash.com/photo-1675094945529-826d07232932?w=400&h=500&fit=crop&auto=format",
    badge: "NEW",
    stock: 4,
    year: 2024,
  },
  {
    id: 4,
    name: "BARBATOS LUPUS",
    series: "IBO Season 2",
    grade: "MG 1/100",
    price: 65000,
    image: "https://images.unsplash.com/photo-1771667176821-0baebf99e2b3?w=400&h=500&fit=crop&auto=format",
    stock: 9,
    year: 2023,
  },
];

const RARE: Product[] = [
  {
    id: 5,
    name: "HI-ν GUNDAM",
    series: "CCA: Beltorchika's Children",
    grade: "PG 1/60 PERFECT",
    price: 980000,
    originalPrice: 1200000,
    image: "https://images.unsplash.com/photo-1669399369261-2fc16c3c14cb?w=400&h=500&fit=crop&auto=format",
    badge: "ULTRA RARE",
    stock: 1,
    year: 2019,
    isRare: true,
  },
  {
    id: 6,
    name: "STRIKE FREEDOM",
    series: "GSD Special Edition",
    grade: "MG 1/100 GOLD COAT",
    price: 420000,
    image: "https://images.unsplash.com/photo-1625314887424-9f190599bd56?w=400&h=500&fit=crop&auto=format",
    badge: "P-BANDAI",
    stock: 2,
    year: 2020,
    isRare: true,
  },
  {
    id: 7,
    name: "SAZABI VER.KA",
    series: "Char's Counterattack",
    grade: "MG 1/100 TITANIUM",
    price: 650000,
    originalPrice: 780000,
    image: "https://images.unsplash.com/photo-1643345397840-651fc8efd91e?w=400&h=500&fit=crop&auto=format",
    badge: "한정 2매",
    stock: 2,
    year: 2018,
    isRare: true,
  },
  {
    id: 8,
    name: "EXIA REPAIR IV",
    series: "00 Festival",
    grade: "RG 1/144 SPECIAL",
    price: 380000,
    image: "https://images.unsplash.com/photo-1771667176821-0baebf99e2b3?w=400&h=500&fit=crop&auto=format",
    badge: "이벤트 한정",
    stock: 3,
    year: 2021,
    isRare: true,
  },
];

/* ── Intersection reveal hook ── */
function useReveal(threshold = 0.2) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ── Product Card ── */
function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { ref, visible } = useReveal(0.1);

  const accentColor = product.isRare ? "#8b5cf6" : "#c9a84c";
  const accentLight = product.isRare ? "#c4b5fd" : "#e8c97a";

  function handleAdd() {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  return (
    <div
      ref={ref}
      className={product.isRare ? "card-3d card-rare" : "card-3d card-standard"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered
          ? product.isRare
            ? "linear-gradient(145deg, rgba(139,92,246,0.08), rgba(13,13,20,0.98))"
            : "linear-gradient(145deg, rgba(201,168,76,0.07), rgba(13,13,20,0.98))"
          : "rgba(13,13,20,0.8)",
        border: `1px solid ${hovered ? accentColor + "44" : "rgba(201,168,76,0.1)"}`,
        cursor: "pointer",
        transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0)"
          : "translateY(32px)",
        transitionDelay: `${index * 0.08}s`,
        overflow: "hidden",
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
            fontFamily: "'DM Mono', monospace",
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.15em",
            color: product.isRare ? "#06060a" : "#06060a",
            background: product.isRare
              ? "linear-gradient(135deg, #8b5cf6, #c4b5fd)"
              : "linear-gradient(135deg, #c9a84c, #e8c97a)",
            padding: "5px 10px",
            clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
          }}
        >
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "4/5",
          overflow: "hidden",
          background: "#0a0a12",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: product.isRare
              ? "saturate(0.5) contrast(1.2) hue-rotate(220deg)"
              : "saturate(0.4) contrast(1.1)",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1), filter 0.4s ease",
          }}
        />

        {/* Overlay gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(0deg, rgba(6,6,10,0.95) 0%, rgba(6,6,10,0.3) 60%, transparent 100%)`,
            transition: "opacity 0.4s ease",
          }}
        />

        {/* Hover scan line */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              animation: "scanMove 1.5s linear infinite",
            }}
          />
        )}

        {/* Stock */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            fontFamily: "'DM Mono', monospace",
            fontSize: "9px",
            color: product.stock <= 3 ? "#ff6b6b" : accentColor,
            letterSpacing: "0.15em",
          }}
        >
          {product.stock <= 3 ? `⚠ LAST ${product.stock}` : `IN STOCK: ${product.stock}`}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "20px" }}>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "9px",
            color: accentColor,
            letterSpacing: "0.2em",
            marginBottom: "8px",
            opacity: 0.8,
          }}
        >
          {product.grade} · {product.year}
        </div>
        <h3
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "14px",
            fontWeight: 700,
            color: hovered ? accentLight : "#f0ede8",
            letterSpacing: "0.05em",
            lineHeight: 1.3,
            marginBottom: "4px",
            transition: "color 0.3s ease",
          }}
        >
          {product.name}
        </h3>
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "12px",
            color: "#6b6b7e",
            marginBottom: "20px",
          }}
        >
          {product.series}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "18px",
                fontWeight: 700,
                color: product.isRare ? accentLight : accentColor,
              }}
            >
              ₩{product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "10px",
                  color: "#6b6b7e",
                  textDecoration: "line-through",
                  marginTop: "2px",
                }}
              >
                ₩{product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          <button
            onClick={handleAdd}
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              color: addedToCart ? "#06060a" : accentColor,
              background: addedToCart
                ? `linear-gradient(135deg, ${accentColor}, ${accentLight})`
                : "transparent",
              border: `1px solid ${accentColor}60`,
              padding: "10px 16px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              whiteSpace: "nowrap",
              clipPath:
                "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
            }}
            onMouseEnter={(e) => {
              if (!addedToCart) {
                (e.currentTarget as HTMLElement).style.background = `${accentColor}18`;
                (e.currentTarget as HTMLElement).style.borderColor = accentColor;
              }
            }}
            onMouseLeave={(e) => {
              if (!addedToCart) {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = `${accentColor}60`;
              }
            }}
          >
            {addedToCart ? "✓ ADDED" : "ACQUIRE"}
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          height: "2px",
          background: hovered
            ? `linear-gradient(90deg, transparent, ${accentColor}, transparent)`
            : "transparent",
          transition: "all 0.4s ease",
        }}
      />
    </div>
  );
}

/* ── Section Header ── */
function SectionHeader({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  accent: string;
  description: string;
}) {
  const { ref, visible } = useReveal(0.2);
  return (
    <div
      ref={ref}
      style={{
        marginBottom: "60px",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "all 0.8s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      <div
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "10px",
          color: accent,
          letterSpacing: "0.25em",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            display: "block",
            width: "40px",
            height: "1px",
            background: accent,
          }}
        />
        {eyebrow}
      </div>
      <h2
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(28px, 4vw, 52px)",
          fontWeight: 800,
          color: "#f0ede8",
          letterSpacing: "0.03em",
          marginBottom: "20px",
          lineHeight: 1.1,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "15px",
          color: "#6b6b7e",
          maxWidth: "520px",
          lineHeight: 1.7,
        }}
      >
        {description}
      </p>
    </div>
  );
}

/* ── Filter Pills ── */
function FilterPills({
  options,
  selected,
  onSelect,
  accent,
}: {
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  accent: string;
}) {
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.15em",
            color: selected === opt ? "#06060a" : "#6b6b7e",
            background:
              selected === opt
                ? `linear-gradient(135deg, ${accent}, ${accent}cc)`
                : "transparent",
            border: `1px solid ${selected === opt ? accent : "rgba(201,168,76,0.2)"}`,
            padding: "8px 16px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            clipPath:
              "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ── Rare Hero Banner ── */
function RareBanner() {
  const { ref, visible } = useReveal(0.2);
  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        padding: "80px 60px",
        marginBottom: "60px",
        overflow: "hidden",
        border: "1px solid rgba(139,92,246,0.3)",
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, rgba(6,6,10,0) 60%, rgba(76,201,255,0.04) 100%)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: "all 0.9s cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      {/* Corner decorations */}
      {["tl", "tr", "bl", "br"].map((corner) => (
        <div
          key={corner}
          style={{
            position: "absolute",
            width: "30px",
            height: "30px",
            ...(corner.includes("t") ? { top: 16 } : { bottom: 16 }),
            ...(corner.includes("l") ? { left: 16 } : { right: 16 }),
            borderTop: corner.includes("t") ? "2px solid rgba(139,92,246,0.6)" : "none",
            borderBottom: corner.includes("b") ? "2px solid rgba(139,92,246,0.6)" : "none",
            borderLeft: corner.includes("l") ? "2px solid rgba(139,92,246,0.6)" : "none",
            borderRight: corner.includes("r") ? "2px solid rgba(139,92,246,0.6)" : "none",
          }}
        />
      ))}

      {/* Floating orbs */}
      <div
        style={{
          position: "absolute",
          right: "10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          animation: "orbitFloat 6s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            color: "#8b5cf6",
            letterSpacing: "0.3em",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#8b5cf6",
              boxShadow: "0 0 16px rgba(139,92,246,0.8)",
              animation: "glowPulse 2s ease-in-out infinite",
            }}
          />
          RARE ACQUISITION ZONE
        </div>
        <h3
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(22px, 3vw, 36px)",
            fontWeight: 900,
            lineHeight: 1.15,
            maxWidth: "600px",
          }}
        >
          <span style={{ color: "#f0ede8" }}>세상에 없는 것들을</span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #c4b5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            단 하나의 공간에서
          </span>
        </h3>
        <p
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "14px",
            color: "#6b6b7e",
            marginTop: "16px",
            maxWidth: "480px",
            lineHeight: 1.7,
          }}
        >
          P-Bandai 한정, 이벤트 전용, 갤러리 에디션 — 전 세계 경매와 개인 소장품에서 직접 수집한
          단종 희귀 유닛들. 모두 정품 인증 완료.
        </p>
      </div>
    </div>
  );
}

/* ── Main Shop Page ── */
export default function Shop() {
  const navigate = useNavigate();
  const [standardFilter, setStandardFilter] = useState("ALL");
  const [rareFilter, setRareFilter] = useState("ALL");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Scroll to hash if present
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, []);

  const standardGrades = ["ALL", "HG", "MG", "RG", "PG"];
  const rareTypes = ["ALL", "P-BANDAI", "이벤트 한정", "갤러리", "빈티지"];

  const filteredStandard =
    standardFilter === "ALL"
      ? STANDARD
      : STANDARD.filter((p) => p.grade.includes(standardFilter));

  const filteredRare =
    rareFilter === "ALL"
      ? RARE
      : RARE.filter((p) => p.badge === rareFilter || p.grade.includes(rareFilter));

  return (
    <div style={{ background: "#06060a", minHeight: "100vh" }}>
      <Nav />

      {/* ── SHOP HERO ── */}
      <div
        style={{
          position: "relative",
          paddingTop: "180px",
          paddingBottom: "80px",
          paddingLeft: "40px",
          paddingRight: "40px",
          overflow: "hidden",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 70% at 50% 0%, rgba(201,168,76,0.05), transparent)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color: "#c9a84c",
                letterSpacing: "0.3em",
                marginBottom: "16px",
              }}
            >
              — UNIT ZERO COLLECTION
            </div>
            <h1
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(40px, 7vw, 88px)",
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: "-0.02em",
              }}
            >
              <span
                style={{
                  display: "block",
                  color: "#f0ede8",
                }}
              >
                THE
              </span>
              <span
                className="animate-shimmer"
                style={{ display: "block" }}
              >
                ARCHIVE
              </span>
            </h1>
          </div>

          <div
            style={{
              display: "flex",
              gap: "40px",
              alignItems: "flex-end",
            }}
          >
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#c9a84c",
                }}
              >
                {STANDARD.length + RARE.length}
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "9px",
                  color: "#6b6b7e",
                  letterSpacing: "0.15em",
                }}
              >
                TOTAL UNITS
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "'Orbitron', monospace",
                  fontSize: "32px",
                  fontWeight: 800,
                  color: "#8b5cf6",
                }}
              >
                {RARE.length}
              </div>
              <div
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "9px",
                  color: "#6b6b7e",
                  letterSpacing: "0.15em",
                }}
              >
                RARE UNITS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── STANDARD SECTION ── */}
      <section
        id="standard"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 40px",
        }}
      >
        <SectionHeader
          eyebrow="STANDARD SERIES"
          title={
            <>
              정규{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                컬렉션
              </span>
            </>
          }
          accent="#c9a84c"
          description="HG · MG · RG · PG 전 등급을 아우르는 정규 건담 시리즈. 빠른 재고 회전과 경쟁력 있는 가격으로 컬렉션을 완성하세요."
        />

        <FilterPills
          options={standardGrades}
          selected={standardFilter}
          onSelect={setStandardFilter}
          accent="#c9a84c"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredStandard.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 40px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), rgba(139,92,246,0.3), transparent)",
        }}
      />

      {/* ── RARE SECTION ── */}
      <section
        id="rare"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "100px 40px",
        }}
      >
        <SectionHeader
          eyebrow="RARE ARCHIVE"
          title={
            <>
              희귀·한정판{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #c4b5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                유닛
              </span>
            </>
          }
          accent="#8b5cf6"
          description="전 세계에서 단 몇 개만 존재하는 희귀 컬렉터 아이템. P-Bandai 한정, 이벤트 전용, 단종 빈티지 — 모두 정품 보증."
        />

        <RareBanner />

        <FilterPills
          options={rareTypes}
          selected={rareFilter}
          onSelect={setRareFilter}
          accent="#8b5cf6"
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "28px",
          }}
        >
          {filteredRare.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Certification notice */}
        <div
          style={{
            marginTop: "60px",
            padding: "32px 40px",
            border: "1px solid rgba(139,92,246,0.2)",
            background: "rgba(139,92,246,0.04)",
            display: "flex",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              border: "1.5px solid rgba(139,92,246,0.5)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "12px",
                fontWeight: 600,
                color: "#c4b5fd",
                letterSpacing: "0.1em",
                marginBottom: "6px",
              }}
            >
              AUTHENTICITY GUARANTEED
            </div>
            <div
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "13px",
                color: "#6b6b7e",
                lineHeight: 1.6,
              }}
            >
              모든 희귀 유닛은 전문 감별사의 3단계 정품 인증 절차를 거칩니다.
              정품 증서 및 감별 리포트 동봉. 30일 반품 보장.
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(201,168,76,0.1)",
          padding: "60px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "13px",
            fontWeight: 700,
            color: "#f0ede8",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          UNIT<span style={{ color: "#c9a84c" }}>ZERO</span>
        </button>
        <div
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "10px",
            color: "#6b6b7e",
            letterSpacing: "0.15em",
          }}
        >
          © 2026 UNITZERO. ALL RIGHTS RESERVED.
        </div>
        <div style={{ display: "flex", gap: "24px" }}>
          {["PRIVACY", "TERMS", "CONTACT"].map((l) => (
            <span
              key={l}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color: "#6b6b7e",
                letterSpacing: "0.15em",
                cursor: "pointer",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#c9a84c")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#6b6b7e")
              }
            >
              {l}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
}
