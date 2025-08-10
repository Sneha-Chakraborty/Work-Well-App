
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validatePhoneNumber, formatPhoneNumberInput, combinePhoneNumber } from "@/utils/phoneAuth";
import { CountryCodeSelector } from "./CountryCodeSelector";

const phoneFormSchema = z.object({
  phoneNumber: z.string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .refine((val) => validatePhoneNumber(`+${val.replace(/\D/g, '')}`), {
      message: "Please enter a valid phone number"
    }),
});

export type PhoneFormData = z.infer<typeof phoneFormSchema>;

interface PhoneNumberFormProps {
  onSubmit: (values: PhoneFormData) => Promise<void>;
  isSubmitting?: boolean;
}

export const PhoneNumberForm = ({ onSubmit, isSubmitting = false }: PhoneNumberFormProps) => {
  const [countryCode, setCountryCode] = useState("+1");
  const [formattedInput, setFormattedInput] = useState("");

  const phoneForm = useForm<PhoneFormData>({
    resolver: zodResolver(phoneFormSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  // Handle country code change
  const handleCountryCodeChange = (code: string) => {
    setCountryCode(code);
  };

  // Handle phone input formatting
  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const formattedNumber = formatPhoneNumberInput(input);
    setFormattedInput(formattedNumber);
    
    // Update the form value with the raw digits for validation
    phoneForm.setValue("phoneNumber", input.replace(/\D/g, ''));
  };

  // Handle form submission with combined phone number
  const handleSubmit = async (values: PhoneFormData) => {
    const combinedNumber = combinePhoneNumber(countryCode, values.phoneNumber);
    await onSubmit({ phoneNumber: combinedNumber });
  };

  return (
    <Form {...phoneForm}>
      <form onSubmit={phoneForm.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={phoneForm.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <CountryCodeSelector
                    value={countryCode}
                    onChange={handleCountryCodeChange}
                  />
                  <Input 
                    className="flex-1 rounded-l-none"
                    placeholder="(555) 123-4567" 
                    value={formattedInput}
                    onChange={handlePhoneInputChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full bg-zenith-purple hover:bg-zenith-purple-dark"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Code"}
        </Button>
      </form>
    </Form>
  );
};
