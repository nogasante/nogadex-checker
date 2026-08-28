"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface OptionItem {
  value: string;
  label: string;
  sublabel?: string;
}

interface CustomDropdownProps {
  label: string;
  options: OptionItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CustomDropdown({
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll active item into view when opened
  useEffect(() => {
    if (isOpen && listRef.current) {
      const selectedEl = listRef.current.querySelector('[data-selected="true"]') as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen]);

  return (
    <div className={`space-y-1.5 relative ${className}`} ref={dropdownRef}>
      <label className="block text-xs font-semibold text-slate-700 select-none">
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-11 px-3.5 rounded-xl bg-white border text-left flex items-center justify-between text-xs font-medium transition-all cursor-pointer select-none ${
          isOpen
            ? "border-slate-900 ring-2 ring-slate-900/10 shadow-xs"
            : "border-slate-200 hover:border-slate-300 shadow-2xs text-slate-900"
        }`}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180 text-slate-800" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu with Visible Scrollbar */}
      {isOpen && (
        <div
          ref={listRef}
          className="absolute z-50 left-0 right-0 top-full mt-1.5 max-h-56 overflow-y-auto custom-scrollbar rounded-xl bg-white border border-slate-200 shadow-xl py-1 animate-in fade-in zoom-in-95 duration-100 divide-y divide-slate-50"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                type="button"
                key={option.value}
                data-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3.5 py-2.5 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-slate-50 text-red-600 font-bold"
                    : "text-slate-700 hover:bg-slate-50/80 hover:text-slate-900 font-medium"
                }`}
              >
                <div>
                  <span>{option.label}</span>
                  {option.sublabel && (
                    <span className="block text-[10px] text-slate-400 font-normal">
                      {option.sublabel}
                    </span>
                  )}
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-red-600 stroke-[2.5]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
