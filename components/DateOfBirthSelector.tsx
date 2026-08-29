"use client";

import { useState } from "react";
import { CustomDropdown } from "./CustomDropdown";

const MONTHS = [
  { value: "01", label: "January (01)" },
  { value: "02", label: "February (02)" },
  { value: "03", label: "March (03)" },
  { value: "04", label: "April (04)" },
  { value: "05", label: "May (05)" },
  { value: "06", label: "June (06)" },
  { value: "07", label: "July (07)" },
  { value: "08", label: "August (08)" },
  { value: "09", label: "September (09)" },
  { value: "10", label: "October (10)" },
  { value: "11", label: "November (11)" },
  { value: "12", label: "December (12)" },
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
  // Parse existing value if any
  const parts = value ? value.split("-") : [];
  const initialYear = parts[0] || "2006";
  const initialMonth = parts[1] || "05";
  const initialDay = parts[2] || "15";

  const [day, setDay] = useState(initialDay);
  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);

  const handleDayChange = (newDay: string) => {
    setDay(newDay);
    onChange(`${year}-${month}-${newDay}`);
  };

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth);
    onChange(`${year}-${newMonth}-${day}`);
  };

  const handleYearChange = (newYear: string) => {
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
        <CustomDropdown
          label="Day"
          options={DAYS}
          value={day}
          onChange={handleDayChange}
          placeholder="Day"
        />

        {/* Month */}
        <CustomDropdown
          label="Month"
          options={MONTHS}
          value={month}
          onChange={handleMonthChange}
          placeholder="Month"
        />

        {/* Year */}
        <CustomDropdown
          label="Year"
          options={YEARS}
          value={year}
          onChange={handleYearChange}
          placeholder="Year"
        />
      </div>
    </div>
  );
}
