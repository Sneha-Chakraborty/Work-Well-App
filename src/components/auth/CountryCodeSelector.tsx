
import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Flag } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface Country {
  name: string;
  code: string;
  dialCode: string;
}

// Common country codes with dial codes
const COUNTRIES: Country[] = [
  { name: "United States", code: "US", dialCode: "+1" },
  { name: "United Kingdom", code: "GB", dialCode: "+44" },
  { name: "Canada", code: "CA", dialCode: "+1" },
  { name: "Australia", code: "AU", dialCode: "+61" },
  { name: "India", code: "IN", dialCode: "+91" },
  { name: "China", code: "CN", dialCode: "+86" },
  { name: "Japan", code: "JP", dialCode: "+81" },
  { name: "Germany", code: "DE", dialCode: "+49" },
  { name: "France", code: "FR", dialCode: "+33" },
  { name: "Brazil", code: "BR", dialCode: "+55" },
  { name: "Mexico", code: "MX", dialCode: "+52" },
  { name: "Spain", code: "ES", dialCode: "+34" },
  { name: "Italy", code: "IT", dialCode: "+39" },
  { name: "South Korea", code: "KR", dialCode: "+82" },
  { name: "Russia", code: "RU", dialCode: "+7" },
];

interface CountryCodeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CountryCodeSelector = ({ value, onChange }: CountryCodeSelectorProps) => {
  const [open, setOpen] = useState(false);
  const selectedCountry = COUNTRIES.find((country) => country.dialCode === value) || COUNTRIES[0];
  
  // Handle selecting a country code
  const handleSelect = (dialCode: string) => {
    onChange(dialCode);
    setOpen(false);
  };
  
  return (
    <Select 
      value={value} 
      onValueChange={onChange}
    >
      <SelectTrigger className="w-[120px] border-r-0 rounded-r-none">
        <div className="flex items-center gap-2">
          <Flag className="h-4 w-4" />
          <SelectValue placeholder="Code">
            {value}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {COUNTRIES.map((country) => (
          <SelectItem key={country.code} value={country.dialCode}>
            <div className="flex items-center gap-2">
              <span>{country.name}</span>
              <span className="text-muted-foreground">{country.dialCode}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
