import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

/* ── Star field ── */
function StarField({ count = 120 }: { count?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 4 + 2,
    delay: Math.random() * 5,
  }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            "--duration": `${s.duration}s`,
            "--delay": `${s.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ── Orbital menu item ── */
function OrbitalMenuItem({
  index,
  label,
  sub,
  accent,
  delay,
  onClick,
}: {
  index: string;
  label: string;
  sub: string;
  accent: string;
  delay: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        padding: "40px 0",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
        display: "grid",
        gridTemplateColumns: "80px 1fr auto",
        alignItems: "center",
        gap: "32px",
        transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
        transform: hovered ? "translateX(16px)" : "translateX(0)",
        opacity: 0,
        animation: `fadeUp 0.7s ease forwards`,
        animationDelay: `${delay}s`,
      }}
    >
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "11px",
          color: accent,
          letterSpacing: "0.15em",
          opacity: 0.7,
        }}
      >
        {index}
      </span>
      <div>
        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "clamp(24px, 3.5vw, 48px)",
            fontWeight: 700,
            color: hovered ? accent : "#f0ede8",
            letterSpacing: "0.05em",
            lineHeight: 1.1,
            transition: "color 0.3s ease",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "13px",
            color: "#6b6b7e",
            marginTop: "6px",
            letterSpacing: "0.08em",
          }}
        >
          {sub}
        </div>
      </div>
      <div
        style={{
          width: 48,
          height: 48,
          border: `1px solid ${hovered ? accent : "rgba(201,168,76,0.2)"}`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          background: hovered ? `${accent}15` : "transparent",
          flexShrink: 0,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke={hovered ? accent : "#6b6b7e"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

/* ── Vision stat ── */
function VisionStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 800,
          background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: `all 0.7s ease ${delay}s`,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: "13px",
          color: "#6b6b7e",
          letterSpacing: "0.15em",
          marginTop: "8px",
          opacity: visible ? 1 : 0,
          transition: `opacity 0.7s ease ${delay + 0.2}s`,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const menuItems = [
    { index: "01", label: "STANDARD SERIES", sub: "HG · MG · RG 정규 시리즈", accent: "#c9a84c", to: "/shop#standard" },
    { index: "02", label: "LIMITED EDITION", sub: "한정판 · 이벤트 한정 · 갤러리 에디션", accent: "#4cc9ff", to: "/shop#limited" },
    { index: "03", label: "RARE ARCHIVE", sub: "단종 희귀템 · 빈티지 · P-Bandai", accent: "#8b5cf6", to: "/shop#rare" },
    { index: "04", label: "RESELL MARKET", sub: "인증 중고 거래 · 시세 보장", accent: "#c9a84c", to: "/shop" },
  ];

  return (
    <div style={{ background: "#06060a", minHeight: "100vh", position: "relative" }}>
      <Nav />

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <StarField count={150} />

        {/* Background gradient orbs */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(76,201,255,0.04) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Video container */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
          >
            
            <source src="/gundamtiger.mp4" type="video/mp4" />
          </video>
          {/* Dark overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(0deg, #06060a 0%, rgba(6,6,10,0.75) 40%, rgba(6,6,10,0.5) 70%, rgba(6,6,10,0.7) 100%)",
            }}
          />
        </div>

        {/* Hero content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            textAlign: "center",
            maxWidth: "900px",
            padding: "0 24px",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid rgba(201,168,76,0.4)",
              padding: "6px 16px",
              marginBottom: "32px",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 0.2s",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#c9a84c",
                animation: "glowPulse 2s ease-in-out infinite",
              }}
              className="animate-glow-pulse"
            />
            <span
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color: "#c9a84c",
                letterSpacing: "0.2em",
              }}
            >
              PREMIUM COLLECTOR PLATFORM
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "clamp(36px, 7vw, 96px)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              marginBottom: "24px",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(40px)",
              transition: "all 0.9s cubic-bezier(0.23,1,0.32,1) 0.35s",
            }}
          >
            <span
              style={{
                display: "block",
                background: "linear-gradient(135deg, #f0ede8 0%, rgba(240,237,232,0.7) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              BEYOND
            </span>
            <span
              className="animate-shimmer"
              style={{ display: "block" }}
            >
              LEGEND
            </span>
          </h1>

          <p
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: "clamp(14px, 1.5vw, 18px)",
              color: "#6b6b7e",
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: "0 auto 48px",
              opacity: heroVisible ? 1 : 0,
              transition: "opacity 0.9s ease 0.55s",
            }}
          >
            희귀 건담 피규어의 새로운 기준. 단종된 전설부터 현재 한정판까지,
            진정한 컬렉터를 위한 큐레이션 마켓플레이스.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.9s ease 0.7s",
            }}
          >
            <button
              onClick={() => navigate("/shop")}
              className="btn-magnetic"
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "#06060a",
                background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                border: "none",
                padding: "18px 40px",
                cursor: "pointer",
                clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              }}
            >
              COLLECTION 보기
            </button>
            <button
              className="btn-magnetic"
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                color: "#c9a84c",
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.4)",
                padding: "18px 40px",
                cursor: "pointer",
                clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
              }}
            >
              TEASER 감상
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            opacity: heroVisible ? 0.6 : 0,
            transition: "opacity 1s ease 1.2s",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              color: "#6b6b7e",
              letterSpacing: "0.2em",
              transform: "rotate(90deg) translateX(24px)",
            }}
          >
            SCROLL
          </span>
          <div
            style={{
              width: 1,
              height: 60,
              background: "linear-gradient(180deg, #c9a84c, transparent)",
              animation: "glowPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid rgba(201,168,76,0.15)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          padding: "14px 0",
          background: "rgba(201,168,76,0.03)",
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: "flex",
            gap: "0",
            whiteSpace: "nowrap",
            width: "max-content",
          }}
        >
          {Array.from({ length: 2 }, (_, i) =>
            ["GUNDAM", "RARE UNITS", "LIMITED EDITION", "P-BANDAI", "MG SERIES", "RG SERIES", "HG SERIES", "PG SERIES", "RESELL"].map(
              (t, j) => (
                <span
                  key={`${i}-${j}`}
                  style={{
                    fontFamily: "'Orbitron', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.3em",
                    color: j % 3 === 0 ? "#c9a84c" : "#6b6b7e",
                    padding: "0 32px",
                  }}
                >
                  {t}
                  <span style={{ color: "rgba(201,168,76,0.3)", marginLeft: "32px" }}>◆</span>
                </span>
              )
            )
          )}
        </div>
      </div>

      {/* ── VISION SECTION ── */}
      <section
        id="vision"
        style={{
          padding: "140px 40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* Left text */}
          <div>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color: "#c9a84c",
                letterSpacing: "0.25em",
                marginBottom: "24px",
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
                  background: "#c9a84c",
                }}
              />
              UNIT ZERO VISION
            </div>
            <h2
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "0.02em",
                marginBottom: "32px",
                color: "#f0ede8",
              }}
            >
              당신의 컬렉션에<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                특별함을 더해보세요.
              </span>
            </h2>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "16px",
                lineHeight: 1.8,
                color: "#6b6b7e",
                marginBottom: "24px",
              }}
            >
              UNIT ZERO는 세계 각지의 희귀·한정판 건담 피규어를 엄선해
              진정한 컬렉터들에게 직접 연결하는 프리미엄 큐레이션 플랫폼입니다.
            </p>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "16px",
                lineHeight: 1.8,
                color: "#6b6b7e",
                marginBottom: "40px",
              }}
            >
              모든 제품은 전문 인증팀의 정품 감별을 거치며,
              합리적 시세와 투명한 거래로 컬렉터 문화를 재정의합니다.
            </p>
            <button
              onClick={() => document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "#c9a84c",
                background: "transparent",
                border: "1px solid rgba(201,168,76,0.4)",
                padding: "14px 28px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)";
                (e.currentTarget as HTMLElement).style.borderColor = "#c9a84c";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)";
              }}
            >
              EXPLORE MORE
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Right image + stats */}
          <div>
            <div
              style={{
                position: "relative",
                aspectRatio: "4/5",
                overflow: "hidden",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1771667176821-0baebf99e2b3?w=600&h=750&fit=crop&auto=format"
                alt="Metallic warrior robot - premium collectible"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "saturate(0.6) contrast(1.1)",
                  transition: "transform 0.6s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = "scale(1.04)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
                }
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(0deg, rgba(6,6,10,0.8) 0%, transparent 50%)",
                }}
              />
              {/* Corner accents */}
              {["tl", "tr", "bl", "br"].map((corner) => (
                <div
                  key={corner}
                  style={{
                    position: "absolute",
                    width: "20px",
                    height: "20px",
                    ...(corner.includes("t") ? { top: 12 } : { bottom: 12 }),
                    ...(corner.includes("l") ? { left: 12 } : { right: 12 }),
                    borderTop: corner.includes("t") ? "2px solid #c9a84c" : "none",
                    borderBottom: corner.includes("b") ? "2px solid #c9a84c" : "none",
                    borderLeft: corner.includes("l") ? "2px solid #c9a84c" : "none",
                    borderRight: corner.includes("r") ? "2px solid #c9a84c" : "none",
                  }}
                />
              ))}
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "24px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "9px",
                    color: "#c9a84c",
                    letterSpacing: "0.2em",
                  }}
                >
                  PREMIUM CERTIFIED
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "40px",
            marginTop: "80px",
            paddingTop: "60px",
            borderTop: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          <VisionStat value="2,400+" label="RARE UNITS IN STOCK" delay={0} />
          <VisionStat value="98%" label="AUTHENTICITY RATE" delay={0.15} />
          <VisionStat value="47국" label="GLOBAL SOURCING" delay={0.3} />
          <VisionStat value="8년" label="COLLECTOR TRUST" delay={0.45} />
        </div>
      </section>

      {/* ── ORBITAL MENU ── */}
      <section
        id="menu-section"
        style={{
          padding: "120px 40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left label */}
          <div style={{ position: "sticky", top: "120px" }}>
            <div
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "10px",
                color: "#c9a84c",
                letterSpacing: "0.25em",
                marginBottom: "24px",
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
                  background: "#c9a84c",
                }}
              />
              NAVIGATION
            </div>
            <h3
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "32px",
                fontWeight: 800,
                lineHeight: 1.2,
                color: "#f0ede8",
                marginBottom: "24px",
              }}
            >
              카테고리<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                선택
              </span>
            </h3>
            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "14px",
                color: "#6b6b7e",
                lineHeight: 1.7,
              }}
            >
              원하는 카테고리를 선택해 큐레이션된 컬렉션을 탐험하세요.
            </p>

            {/* Decorative orbit ring */}
            <div
              style={{
                width: "200px",
                height: "200px",
                border: "1px solid rgba(201,168,76,0.12)",
                borderRadius: "50%",
                marginTop: "48px",
                position: "relative",
                animation: "rotateSlow 20s linear infinite",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "120px",
                  height: "120px",
                  border: "1px solid rgba(76,201,255,0.1)",
                  borderRadius: "50%",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: -4,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#c9a84c",
                  boxShadow: "0 0 12px rgba(201,168,76,0.8)",
                }}
              />
            </div>
          </div>

          {/* Right menu list */}
          <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)" }}>
            {menuItems.map((item, i) => (
              <OrbitalMenuItem
                key={item.label}
                index={item.index}
                label={item.label}
                sub={item.sub}
                accent={item.accent}
                delay={0.1 + i * 0.1}
                onClick={() => {
                  const [path, hash] = item.to.split("#");
                  if (hash) {
                    window.location.href = `${path}#${hash}`;
                  } else {
                    window.location.href = path;
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section
        style={{
          margin: "0 40px 120px",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(201,168,76,0.2)",
          background:
            "linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(6,6,10,0) 50%, rgba(76,201,255,0.04) 100%)",
        }}
      >
        <StarField count={60} />
        <div
          style={{
            position: "relative",
            zIndex: 5,
            padding: "100px 80px",
            display: "flex",
            alignItems: "center",
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
                letterSpacing: "0.25em",
                marginBottom: "16px",
              }}
            >
              — LIMITED ACQUISITION
            </div>
            <h2
              style={{
                fontFamily: "'Orbitron', monospace",
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 900,
                lineHeight: 1.1,
                color: "#f0ede8",
                letterSpacing: "0.02em",
              }}
            >
              당신만의<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                UNIT ZERO
              </span>
              를<br />찾으세요
            </h2>
          </div>
          <button
            onClick={() => navigate("/shop")}
            className="btn-magnetic"
            style={{
              fontFamily: "'Orbitron', monospace",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#06060a",
              background: "linear-gradient(135deg, #c9a84c, #e8c97a)",
              border: "none",
              padding: "22px 56px",
              cursor: "pointer",
              flexShrink: 0,
              clipPath:
                "polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%)",
            }}
          >
            SHOP NOW
          </button>
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
        <div
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: "13px",
            fontWeight: 700,
            color: "#f0ede8",
          }}
        >
          UNIT<span style={{ color: "#c9a84c" }}>ZERO</span>
        </div>
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
