/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from "antd";
import { useEffect, useState } from "react";

// Define types for the props
interface YearOptionProps {
  currentYear: number;
  setThisYear: (year: any) => void; // Function to set the selected year
}

interface YearOption {
  value: string;
  label: string;
}

const YearOption: React.FC<YearOptionProps> = ({
  currentYear,
  setThisYear,
}) => {
  const [yearOptions, setYearOptions] = useState<YearOption[]>([]); // Type state as an array of YearOption objects

  useEffect(() => {
    const startYear = 2025;
    const yearRange: YearOption[] = [];

    // Add the years to the list
    for (let i = startYear; i <= currentYear; i++) {
      yearRange.push({ value: i.toString(), label: i.toString() });
    }

    setYearOptions(yearRange);
  }, [currentYear]);

  return (
    <Select
      defaultValue={currentYear >= 2025 ? "2025" : currentYear.toString()}
      style={{ width: 100 }}
      options={yearOptions}
      onChange={(value) => setThisYear(value)}
    />
  );
};

export default YearOption;
