"use client";
import React, { useState } from "react";

export default function Accordion({
  title,
  children,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-3"
        aria-expanded={open}
      >
        <div className="font-medium text-neutral-200">{title}</div>
        <div className="text-neutral-400">{open ? '−' : '+'}</div>
      </button>

      {open && <div className="px-4 pb-4 pt-0 text-sm text-neutral-300">{children}</div>}
    </div>
  );
}
