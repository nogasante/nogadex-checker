"use client";

import { useState } from "react";

const MONTHS = [
  { value: "01", label: "01 - January" },
  { value: "02", label: "02 - February" },
  { value: "03", label: "03 - March" },
  { value: "04", label: "04 - April" },
  { value: "05", label: "05 - May" },
  { value: "06", label: "06 - June" },
  { value: "07", label: "07 - July" },
  { value: "08", label: "08 - August" },
  { value: "09", label: "09 - September" },
  { value: "10", label: "10 - October" },
  { value: "11", label: "11 - November" },
  { value: "12", label: "12 - December" },
];

const DAYS = Array.from({ length: 31 }, (_, i) => {
  const d = (i + 1).toString().padStart(2, "0");
  return { value: d, label: d };
});

const YEARS = Array.from({ length: 2016 - 1960 + 1 }, (_, i) => {
  const y = (2016 - i).toString();
  return { value: y, label: y };
});

interface DateOfBirthSelectorProps {
  value: string; // "YYYY-MM-DD"
  onChange: (dateStr: string) => void;
}

export function DateOfBirthSelector({ value, onChange }: DateOfBirthSelectorProps) {
  const parts = value ? value.split("-") : [];
  const initialYear = parts[0] || "2006";
  const initialMonth = parts[1] || "05";
  const initialDay = parts[2] || "15";

  const [day, setDay] = useState(initialDay);
  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDay = e.target.value;
    setDay(newDay);
    onChange(`${year}-${month}-${newDay}`);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value;
    setMonth(newMonth);
    onChange(`${year}-${newMonth}-${day}`);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value;
    setYear(newYear);
    onChange(`${newYear}-${month}-${day}`);
  };

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold text-slate-700">
        Date of Birth
      </label>

      <div className="grid grid-cols-3 gap-2">
        {/* Day */}
        <select
          value={day}
          onChange={handleDayChange}
          className="w-full h-11 px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 cursor-pointer transition-colors shadow-2xs"
        >
          {DAYS.map((d) => (
            <option key={d.value} value={d.value}>
              Day {d.label}
            </option>
          ))}
        </select>

        {/* Month */}
        <select
          value={month}
          onChange={handleMonthChange}
          className="w-full h-11 px-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 cursor-pointer transition-colors shadow-2xs truncate"
        >
          {MONTHS.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        {/* Year */}
        <select
          value={year}
          onChange={handleYearChange}
          className="w-full h-11 px-3 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-xs font-medium text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 cursor-pointer transition-colors shadow-2xs"
        >
          {YEARS.map((y) => (
            <option key={y.value} value={y.value}>
              {y.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
