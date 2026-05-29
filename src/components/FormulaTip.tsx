"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

const PANEL_W = 280;
const GAP = 10;

export function FormulaTip({
  formula,
  title = "Fórmula",
}: {
  formula: string;
  title?: string;
}) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, placement: "below" as "above" | "below" });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const panelH = 120;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const placeBelow = spaceBelow >= panelH + GAP || spaceBelow >= spaceAbove;

    let left = rect.left + rect.width / 2 - PANEL_W / 2;
    left = Math.max(12, Math.min(left, window.innerWidth - PANEL_W - 12));

    if (placeBelow) {
      setPos({ top: rect.bottom + GAP, left, placement: "below" });
    } else {
      setPos({ top: rect.top - GAP, left, placement: "above" });
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onScroll = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t)) return;
      const panel = document.getElementById(id);
      if (panel?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open, id]);

  const panel =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            id={id}
            role="tooltip"
            className={`formula-tip-portal formula-tip-portal--${pos.placement}`}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              width: PANEL_W,
              zIndex: 10000,
              transform: pos.placement === "above" ? "translateY(-100%)" : undefined,
            }}
          >
            <span className="formula-tip-title">{title}</span>
            <span className="formula-tip-body whitespace-pre-line">{formula}</span>
          </div>,
          document.body,
        )
      : null;

  return (
    <span className="inline-flex align-middle ml-1 shrink-0">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className="formula-tip-trigger"
        title={title}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.2c-.8.5-1.5 1.2-1.5 2.3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="12" cy="17" r="1" fill="currentColor" />
        </svg>
      </button>
      {panel}
    </span>
  );
}
