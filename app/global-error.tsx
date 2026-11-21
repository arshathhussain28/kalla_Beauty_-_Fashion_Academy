"use client";

import { useEffect } from "react";
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from "@/data/site";
import "./globals.css";

// The last resort: this replaces the ROOT layout, so there is no navbar, footer, provider or
// font variable to inherit — it must render its own <html> and <body>. Everything here is
// deliberately self-contained (plain anchors, no shared components, no next/link, no motion):
// this screen only appears when the root layout itself failed, so it must not depend on
// anything that could be the thing that broke.
//
// globals.css is imported for the colour tokens; the brand fonts are loaded by the root layout,
// so this page falls back to serif/sans-serif, which is correct for a last-resort screen.
// The contact facts still come from data/site.ts — a dependency-free module of two strings that
// cannot plausibly be the thing that broke, and duplicating the number here would mean this
// screen keeps showing the old one after it changes. Colours are inlined because the brand
// tokens are the one thing a stylesheet failure would take with it.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[kala] root error", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.25rem",
          padding: "2rem 1.5rem",
          textAlign: "center",
          background: "#fbf1ef",
          color: "#2a1d21",
          fontFamily: "Jost, system-ui, sans-serif",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#7e1f3d",
          }}
        >
          KALA Beauty &amp; Fashion Academy
        </p>
        <h1
          style={{
            margin: 0,
            maxWidth: "34rem",
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
            fontWeight: 600,
            lineHeight: 1.1,
          }}
        >
          The site ran into a problem.
        </h1>
        <p style={{ margin: 0, maxWidth: "28rem", fontSize: "1.0625rem", color: "#6b5358" }}>
          Please try again. If it keeps happening, message us on WhatsApp or call — a course
          advisor can help you directly.
        </p>

        <div
          style={{
            marginTop: "0.75rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={reset}
            style={{
              border: 0,
              cursor: "pointer",
              background: "#7e1f3d",
              color: "#fbf1ef",
              padding: "0.875rem 1.75rem",
              borderRadius: "2px",
              font: "inherit",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontSize: "0.8125rem",
            }}
          >
            Try again
          </button>
          <a
            href={`https://wa.me/${SITE_PHONE_TEL.replace(/[^\d]/g, "")}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid #7e1f3d",
              color: "#7e1f3d",
              padding: "0.875rem 1.75rem",
              borderRadius: "2px",
              textDecoration: "none",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontSize: "0.8125rem",
            }}
          >
            WhatsApp us
          </a>
          <a
            href={`tel:${SITE_PHONE_TEL}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              color: "#7e1f3d",
              padding: "0.875rem 0.5rem",
              textDecoration: "none",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontSize: "0.8125rem",
            }}
          >
            Call {SITE_PHONE_DISPLAY}
          </a>
        </div>

        {error.digest && (
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6b5358",
            }}
          >
            Reference {error.digest}
          </p>
        )}
      </body>
    </html>
  );
}
