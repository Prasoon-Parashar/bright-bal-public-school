"use client";

import { FaWhatsapp } from "react-icons/fa";
import { MessageCircle, Sparkles } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/918266095287"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Bright Bal Public School on WhatsApp"
      className="group fixed bottom-6 right-5 z-[999] sm:bottom-7 sm:right-7"
    >
      {/* Outer glow */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/30 blur-xl transition-all duration-500 group-hover:bg-[#25D366]/50" />

      {/* Animated pulse ring */}
      <span className="absolute inset-0 animate-ping rounded-full border-2 border-[#25D366]/40" />

      {/* Main button */}
      <div className="relative flex h-[64px] w-[64px] items-center justify-center rounded-full border-4 border-white bg-[#25D366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.4)] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#20bd5a] group-hover:shadow-[0_16px_45px_rgba(37,211,102,0.55)] sm:h-[70px] sm:w-[70px]">
        
        {/* Shine */}
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute -left-10 top-0 h-full w-6 rotate-[25deg] bg-white/30 blur-sm transition-all duration-700 group-hover:left-[110%]" />
        </span>

        {/* WhatsApp icon */}
        <FaWhatsapp
          className="relative z-10 transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110"
          size={35}
        />

        {/* Small sparkle */}
        <Sparkles
          size={13}
          className="absolute right-1 top-1 text-white/90 transition-all duration-500 group-hover:rotate-180 group-hover:scale-125"
        />
      </div>

      {/* Floating message label */}
      <div className="pointer-events-none absolute right-[76px] top-1/2 hidden -translate-y-1/2 translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
        <div className="relative whitespace-nowrap rounded-2xl border border-green-100 bg-white px-4 py-3 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-[#25D366]">
              <MessageCircle size={17} />
            </span>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Bright Bal Public School
              </p>
              <p className="text-sm font-extrabold text-slate-800">
                Chat with us
              </p>
            </div>
          </div>

          {/* Arrow */}
          <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-green-100 bg-white" />
        </div>
      </div>

      {/* Status dot */}
      <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-green-500">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </span>

      {/* Tiny decorative dot */}
      <span className="absolute -bottom-1 -left-1 h-2.5 w-2.5 rounded-full bg-yellow-400 shadow-sm transition-transform duration-300 group-hover:scale-125" />
    </a>
  );
}